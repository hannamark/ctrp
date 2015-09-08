/**
 * Created by wangg5 on 6/1/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp', [
        'ui.router',
        'ngTouch',
        'Constants',
        'CommonTools',
        'PromiseTimeoutModule',
        'PromiseServiceModule',
        'LocalCacheModule',
        'ngAnimate',
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
        'TimeoutModule'
    ])
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
                        templateUrl: '/ctrp/ui/partials/main_content_frame.html'
                    },

                    'right_panel@main': {
                        templateUrl: '/ctrp/ui/partials/right_panel.html'
                    },

                    'main_content@main': {
                        templateUrl: '/ctrp/ui/partials/main_content.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home',
                    skip: true
                }
            })

                .state('main.defaultContent', {
                    url: '/welcome',
                    templateUrl: '/ctrp/ui/partials/welcome_content.html',
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
                    ncyBreadcrumb: {
                        parent: '',
                        label: 'Sign in',
                        skip: true
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
                        familyRelationshipObj : function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
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
                    url: '',
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Search Trials'
                    }
                })

                .state('main.addTrial', {
                    url: '/new_trial',
                    templateUrl: '/ctrp/ui/partials/trialDetails.html',
                    controller: 'trialDetailCtrl as trialDetailView',
                    resolve: {
                        TrialService: 'TrialService',
                        trialDetailObj: function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
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
                        parent: 'main.trials',
                        label: 'Register Trial'
                    }
                });


        }).run(function($rootScope, $urlRouter, $state, $stateParams, $injector) {
            console.log('running ctrp angular app');

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

                //get appversion from DMZ if unauthenticated
                var tempUserService = $injector.get('UserService'); //reference to UserService
                if (toState.name == 'main.sign_in') {

                    if (!tempUserService.isLoggedIn()) {
                        tempUserService.getAppVerFromDMZ().then(function(data) {
                           // console.log('retrieved data from dmz: ' + JSON.stringify(data));
                            tempUserService.setAppVersion(data.appver);
                        });
                    }
                } else {
                    //do not show appversion on other pages unless authenticated
                    if (!tempUserService.isLoggedIn()) {
                        tempUserService.setAppVersion('');
                    }
                }
            });
        });



})();
