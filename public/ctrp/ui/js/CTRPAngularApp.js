/**
 * Created by wangg5 on 6/1/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp', [
        'ui.router',
        'ngTouch',
        'ngAnimate',
        'ngSanitize',
        'ngMaterial',
        'ctrp.constants',
        'ctrp.commonTools',
        'PromiseTimeoutModule',
        'PromiseServiceModule',
        'LocalCacheModule',
        'toastr',
        'ui.bootstrap',
        'ncy-angular-breadcrumb',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.scrollpoint',
        'DateServiceMod',
        'CTRPUnderscoreModule',
        'toggle-switch',
        'TimeoutModule',
        'ngFileUpload',
        'angularMoment',
        'ctrpApp.widgets',
        'ctrpForm'
    ])
        .config(function($provide) {
            $provide.decorator('$state', function($delegate, $rootScope) {
               $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                   $delegate.fromParams = fromParams;
                   $delegate.fromState = fromState;
                   //$delegate.current = toState;
               });
                return $delegate;
            });
        })
        .config(['$httpProvider', function($httpProvider) {
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
                $httpProvider.defaults.headers.common = {};
            }

            $httpProvider.interceptors.push('AuthInterceptor');


            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

            //interceptor below:
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])

        .config(function ($stateProvider, $urlRouterProvider) {




            // $urlRouterProvider.otherwise('/main/welcome'); //the bug in ui.router causes this to be infinite loop
            $urlRouterProvider.otherwise(function($injector) {
               var $state = $injector.get('$state');
                $state.go('main.defaultContent');
            });

            $stateProvider.state('main', {
                url: '/main',
                views: {
                    '': {
                        templateUrl: '/ctrp/ui/partials/mainContentFrame.html'
                    },

                    'rightPanel@main': {
                        templateUrl: '/ctrp/ui/partials/rightPanel.html'
                    },

                    'mainContent@main': {
                        templateUrl: '/ctrp/ui/partials/mainContent.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home',
                    skip: true
                }
            })

                .state('main.defaultContent', {
                    url: '/welcome',
                    templateUrl: '/ctrp/ui/partials/welcome/welcomeContent.html',
                    controller: 'headerNavigationCtrl as headerView',
                    ncyBreadcrumb: {
                        label: 'Home'
                    }
                })

                .state('main.organizations', {
                    url: '/organizations',
                    templateUrl: '/ctrp/ui/partials/organization_list.html',
                    controller: 'organizationCtrl as orgsView',
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Search Organizations'
                    }
                })

                .state('main.orgDetail', {
                    url: '/organizations/:orgId',
                    templateUrl: '/ctrp/ui/partials/orgDetails.html',
                    controller: 'orgDetailCtrl as orgDetailView',
                    resolve: {
                        OrgService : 'OrgService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj : function(OrgService) {
                            console.log("getting source statuses!");
                            return OrgService.getSourceStatuses();
                        },
                        GeoLocationService : 'GeoLocationService',
                        countryList : function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        },
                        orgDetailObj : function($stateParams, OrgService) {
                            console.log("getting org by id: " + $stateParams.orgId);
                            return OrgService.getOrgById($stateParams.orgId);
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.organizations',
                        label: 'Organization Detail'
                    }
                })

                .state('main.addOrganization', {
                    url: '/new_organization',
                    templateUrl: '/ctrp/ui/partials/orgDetails.html',
                    controller: 'orgDetailCtrl as orgDetailView',
                    resolve: {
                        OrgService : 'OrgService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj : function(OrgService) {
                            return OrgService.getSourceStatuses();
                        },
                        orgDetailObj: function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
                        },
                        GeoLocationService : 'GeoLocationService',
                        countryList : function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.organizations',
                        label: 'Add Organization'
                    }
                })

                .state('main.sign_in', {
                    url: '/sign_in',
                    templateUrl: '/ctrp/ui/partials/sign_in.html',
                    controller: 'userCtrl as userView',
                    resolve: {
                        UserService: 'UserService',
                        loginBulletin: function(UserService, $q) {
                            /*
                            var deferred = $q.defer();
                            deferred.resolve({'login_bulletin': 'No Message'});
                            return deferred.promise;
                            */
                            return UserService.getLoginBulletin();
                        }
                    },
                    onEnter: function($state, UserService, toastr) {
                        if (UserService.isLoggedIn()) {
                            toastr.warning('Redirected ...', 'You are already signed in')
                            $state.go('main.defaultContent');
                        }
                    },
                    ncyBreadcrumb: {
                        parent: '',
                        label: 'CTRP Sign In',
                        skip: true,

                    }
                })

                .state('main.signup', {
                    url: '/sign_up',
                    templateUrl: '/ctrp/ui/partials/sign_up.html',
                    controller: 'userSignupCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    }
                })

                .state('main.welcome_signup', {
                    url: '/welcome_signup',
                    templateUrl: '/ctrp/ui/partials/welcome_signup.html'
                })

                .state('main.gsa', {
                    url: '/gsa',
                    templateUrl: '/ctrp/ui/partials/gsa.html',
                    controller: 'gsaCtrl as gsaView',
                    resolve: {
                        UserService: 'UserService',
                        gsaObj : function(UserService) {
                            return UserService.getGsa();
                        },
                    }
                })

                .state('main.users', {
                    url: '/users',
                    templateUrl: '/ctrp/ui/partials/user_list.html',
                    controller: 'userListCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    }
                })

                .state('main.changePassword', {
                    url: '/change_password',
                    templateUrl: '/ctrp/ui/partials/changePassword.html',
                    controller: 'userChangePasswordCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    },
                    username : function(UserService) {
                        return UserService.getLoggedInUsername();
                    }
                })

                .state('main.userDetail', {
                    url: '/userDetail/username',
                    templateUrl: '/ctrp/ui/partials/userDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    resolve: {
                        UserService: 'UserService',
                        GeoLocationService : 'GeoLocationService',
                        countryList : function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        },
                        userDetailObj : function(UserService) {
                            return UserService.getUserDetailsByUsername();
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        label: 'User Profile',

                    }

                })

                .state('main.families', {
                    url: '/families',
                    templateUrl: '/ctrp/ui/partials/family_list.html',
                    controller: 'familyCtrl as familyView',
                    resolve: {
                        FamilyService: 'FamilyService',
                        familyStatusObj : function(FamilyService) {
                            return FamilyService.getFamilyStatuses();
                        },
                        familyTypeObj : function(FamilyService) {
                            return FamilyService.getFamilyTypes();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Search Families'
                    }
                })

                .state('main.familyDetail', {
                    url: '/families/:familyId',
                    templateUrl: '/ctrp/ui/partials/familyDetails.html',
                    controller: 'familyDetailCtrl as familyDetailView',
                    resolve: {
                        FamilyService: 'FamilyService',
                        familyStatusObj : function(FamilyService) {
                            return FamilyService.getFamilyStatuses();
                        },
                        familyTypeObj : function(FamilyService) {
                            return FamilyService.getFamilyTypes();
                        },
                        familyDetailObj: function($stateParams, FamilyService) {
                            return FamilyService.getFamilyById($stateParams.familyId);
                        },
                        familyRelationshipObj: function(FamilyService) {
                            return FamilyService.getFamilyRelationships();
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.families',
                        label: 'Family Detail'
                    }
                })

                .state('main.addFamily', {
                    url: '/new_family',
                    templateUrl: '/ctrp/ui/partials/familyDetails.html',
                    controller: 'familyDetailCtrl as familyDetailView',
                    resolve: {
                        FamilyService: 'FamilyService',
                        familyStatusObj : function(FamilyService) {
                            return FamilyService.getFamilyStatuses();
                        },
                        familyTypeObj : function(FamilyService) {
                            return FamilyService.getFamilyTypes();
                        },
                        familyDetailObj: function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
                        },
                        familyRelationshipObj : function(FamilyService) {
                            return FamilyService.getFamilyRelationships();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.families',
                        label: 'Add Family'
                    }
                })
                .state('main.people', {
                    url: '/people',
                    templateUrl: '/ctrp/ui/partials/person_list.html',
                    controller: 'personCtrl as personView',
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Search Persons'
                    }
                })

                .state('main.personDetail', {
                    url: '/people/:personId',
                    templateUrl: '/ctrp/ui/partials/personDetails.html',
                    controller: 'personDetailCtrl as personDetailView',
                    resolve: {
                        OrgService: 'OrgService',
                        PersonService: 'PersonService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj: function(OrgService) {
                            return OrgService.getSourceStatuses();
                        },
                        personDetailObj: function($stateParams, PersonService) {
                            return PersonService.getPersonById($stateParams.personId);
                        },
                        poAffStatuses : function(PersonService) {
                            return PersonService.getPoAffStatuses();
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.people',
                        label: 'Person Detail'
                    }
                })

                .state('main.addPerson', {
                    url: '/new_person',
                    templateUrl: '/ctrp/ui/partials/personDetails.html',
                    controller: 'personDetailCtrl as personDetailView',
                    resolve: {
                        OrgService: 'OrgService',
                        PersonService: 'PersonService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj: function(OrgService) {
                            return OrgService.getSourceStatuses();
                        },
                        personDetailObj: function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
                        },
                        poAffStatuses : function(PersonService) {
                            return PersonService.getPoAffStatuses();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.people',
                        label: 'Add Person'
                    }
                })

                .state('main.testPerson', {
                    url: '/person_directive',
                    templateUrl: '/ctrp/ui/partials/person_search.html',
                    controller: 'personSearchCtrl as personSearchView'
                })

                .state('main.trials', {
                    url: '/trials',
                    templateUrl: '/ctrp/ui/partials/trial_list.html',
                    controller: 'trialCtrl as trialView',
                    resolve: {
                        TrialService: 'TrialService',
                        studySourceObj: function(TrialService) {
                            return TrialService.getStudySources();
                        },
                        phaseObj: function(TrialService) {
                            return TrialService.getPhases();
                        },
                        primaryPurposeObj: function(TrialService) {
                            return TrialService.getPrimaryPurposes();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Search Trials'
                    }
                })

                .state('main.addTrial', {
                    url: '/new_trial/:studySourceCode',
                    templateUrl: '/ctrp/ui/partials/trialDetails.html',
                    controller: 'trialDetailCtrl as trialDetailView',
                    resolve: {
                        TrialService: 'TrialService',
                        trialDetailObj: function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
                        },
                        studySourceCode: function($stateParams) {
                            return $stateParams.studySourceCode;
                        },
                        studySourceObj: function(TrialService) {
                            return TrialService.getStudySources();
                        },
                        protocolIdOriginObj: function(TrialService) {
                            return TrialService.getProtocolIdOrigins();
                        },
                        phaseObj: function(TrialService) {
                            return TrialService.getPhases();
                        },
                        researchCategoryObj: function(TrialService) {
                            return TrialService.getResearchCategories();
                        },
                        primaryPurposeObj: function(TrialService) {
                            return TrialService.getPrimaryPurposes();
                        },
                        secondaryPurposeObj: function(TrialService) {
                            return TrialService.getSecondaryPurposes();
                        },
                        accrualDiseaseTermObj: function(TrialService) {
                            return TrialService.getAccrualDiseaseTerms();
                        },
                        responsiblePartyObj: function(TrialService) {
                            return TrialService.getResponsibleParties();
                        },
                        fundingMechanismObj: function(TrialService) {
                            return TrialService.getFundingMechanisms();
                        },
                        instituteCodeObj: function(TrialService) {
                            return TrialService.getInstituteCodes();
                        },
                        nciObj: function(TrialService) {
                            return TrialService.getNci();
                        },
                        trialStatusObj: function(TrialService) {
                            return TrialService.getTrialStatuses();
                        },
                        holderTypeObj: function(TrialService) {
                            return TrialService.getHolderTypes();
                        },
                        expandedAccessTypeObj: function(TrialService) {
                            return TrialService.getExpandedAccessTypes();
                        },
                        GeoLocationService : 'GeoLocationService',
                        countryList: function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        }
                    },
                    ncyBreadcrumb: {
                        //parent: 'main.trials',
                        parent: 'main.trials',
                        label: 'Register Trial'
                    }
                })

            .state('main.trialDetail', {
                url: '/trials/:trialId',
                templateUrl: '/ctrp/ui/partials/trialDetails.html',
                controller: 'trialDetailCtrl as trialDetailView',
                resolve: {
                    TrialService: 'TrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    studySourceCode: function() {
                        return '';
                    },
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                    },
                    protocolIdOriginObj: function(TrialService) {
                        return TrialService.getProtocolIdOrigins();
                    },
                    phaseObj: function(TrialService) {
                        return TrialService.getPhases();
                    },
                    researchCategoryObj: function(TrialService) {
                        return TrialService.getResearchCategories();
                    },
                    primaryPurposeObj: function(TrialService) {
                        return TrialService.getPrimaryPurposes();
                    },
                    secondaryPurposeObj: function(TrialService) {
                        return TrialService.getSecondaryPurposes();
                    },
                    accrualDiseaseTermObj: function(TrialService) {
                        return TrialService.getAccrualDiseaseTerms();
                    },
                    responsiblePartyObj: function(TrialService) {
                        return TrialService.getResponsibleParties();
                    },
                    fundingMechanismObj: function(TrialService) {
                        return TrialService.getFundingMechanisms();
                    },
                    instituteCodeObj: function(TrialService) {
                        return TrialService.getInstituteCodes();
                    },
                    nciObj: function(TrialService) {
                        return TrialService.getNci();
                    },
                    trialStatusObj: function(TrialService) {
                        return TrialService.getTrialStatuses();
                    },
                    holderTypeObj: function(TrialService) {
                        return TrialService.getHolderTypes();
                    },
                    expandedAccessTypeObj: function(TrialService) {
                        return TrialService.getExpandedAccessTypes();
                    },
                    GeoLocationService : 'GeoLocationService',
                    countryList: function(GeoLocationService) {
                        return GeoLocationService.getCountryList();
                    }
                },
                ncyBreadcrumb: {
                    //parent: 'main.trials',
                    parent: 'main.trials',
                    label: 'Trial Detail'
                }
            });
        }).run(function($rootScope, $urlRouter, $state, $stateParams, $injector, UserService, LocalCacheService) {

            $rootScope.$on('stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var statesNotRequiringGsa = ['main.sign_in', 'main.sign_up', 'main.gsa'];
                if (statesNotRequiringGsa.indexOf(toState.name) == -1 && LocalCacheService.getCacheWithKey("gsaFlag") !== 'Accept') {
                    $state.go('main.gsa');
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

                event.preventDefault();
                //get appversion from DMZ if unauthenticated
                //var tempUserService = $injector.get('UserService'); //reference to UserService
                if (toState.name == 'main.sign_in' || toState.name == 'main.sign_up') {

                    if (!UserService.isLoggedIn()) {
                        UserService.getAppVerFromDMZ().then(function(data) {
                            console.log('retrieved data from dmz: ' + JSON.stringify(data));
                            UserService.setAppVersion(data.app_version);
                        });
                        UserService.getAppRelMilestoneFromDMZ().then(function(data) {
                            console.log('retrieved data from dmz: ' + JSON.stringify(data));
                            UserService.setAppRelMilestone(data.app_rel_milestone);
                        });
                    }
                } else {
                    //do not show app version or release milestone on other pages unless authenticated
                    if (!UserService.isLoggedIn()) {
                        UserService.setAppVersion('');
                        UserService.setAppRelMilestone('');
                    }
                }
            });


            /*
            $rootScope.$on('$stateChangeStart', function(event, next, current) {
                if (next && current) {
                    var answer = confirm("Are you sure you want to navigate away from this page");
                    if (!answer) {
                        event.preventDefault();
                    }
                }

            });
            */
        });



})();
