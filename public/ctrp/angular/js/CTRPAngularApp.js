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
//        'datatables',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.scrollpoint',
        'DateServiceMod',
        'CTRPUnderscoreModule'
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




            $urlRouterProvider.otherwise('/main/welcome');

            $stateProvider.state('main', {
                url: '/main',
                views: {
                    '': {
                        templateUrl: '/ctrp/angular/partials/main_content_frame.html'
                    },

                    'right_panel@main': {
                        templateUrl: '/ctrp/angular/partials/right_panel.html'
                    },

                    'main_content@main': {
                        templateUrl: '/ctrp/angular/partials/main_content.html'
                    }
                }
            })

                .state('main.defaultContent', {
                    url: '/welcome',
                    templateUrl: '/ctrp/angular/partials/welcome_content.html'
                })

                .state('main.organizations', {
                    url: '/organizations',
                    templateUrl: '/ctrp/angular/partials/organization_list.html',
                    controller: 'organizationCtrl as orgsView'
                })

                .state('main.orgDetail', {
                    url: '/organizations/:orgId',
                    templateUrl: '/ctrp/angular/partials/orgDetails.html',
                    controller: 'orgDetailCtrl as orgDetailView',
                    resolve: {
                        OrgService : 'OrgService',
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
                    } //resolve the promise and pass it to controller
                })

                .state('main.addOrganization', {
                    url: '/new_organization',
                    templateUrl: '/ctrp/angular/partials/orgDetails.html',
                    controller: 'orgDetailCtrl as orgDetailView',
                    resolve: {
                        OrgService : 'OrgService',
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
                    }
                })

                .state('main.sign_in', {
                    url: '/sign_in',
                    templateUrl: '/ctrp/angular/partials/sign_in.html',
                    controller: 'userCtrl as userView'
                })

                .state('main.error403', {
                    url: '/error403',
                    templateUrl: '/ctrp/angular/partials/error403.html',
                    controller: 'userCtrl as userView'
                })

                .state('main.families', {
                    url: '/families',
                    templateUrl: '/ctrp/angular/partials/family_list.html',
                    controller: 'familyCtrl as familyView',
                    resolve: {
                        FamilyService: 'FamilyService',
                        familyStatusObj : function(FamilyService) {
                            return FamilyService.getFamilyStatuses();
                        },
                        familyTypeObj : function(FamilyService) {
                            return FamilyService.getFamilyTypes();
                        }
                    }
                })

                .state('main.familyDetail', {
                    url: '/families/:familyId',
                    templateUrl: '/ctrp/angular/partials/familyDetails.html',
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
                    } //resolve the promise and pass it to controller
                })

                .state('main.addFamily', {
                    url: '/new_family',
                    templateUrl: '/ctrp/angular/partials/familyDetails.html',
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
                        }
                    }
                })


                .state('main.people', {
                    url: '/people',
                    templateUrl: '/ctrp/angular/partials/person_list.html',
                    controller: 'personCtrl as personView',
                    resolve: {
                        OrgService: 'OrgService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj: function(OrgService) {
                            return OrgService.getSourceStatuses();
                        }
                    }
                })

                .state('main.personDetail', {
                    url: '/people/:personId',
                    templateUrl: '/ctrp/angular/partials/personDetails.html',
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
                    } //resolve the promise and pass it to controller
                })

                .state('main.addPerson', {
                    url: '/new_person',
                    templateUrl: '/ctrp/angular/partials/personDetails.html',
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
                    }
                });
                //.state('main.sign_out', {
                //    url: '/sign_out',
                //    controller: 'userCtrl',
                //    resolve: {
                //        logOut: function($q) {
                //            var deferred = $q.defer();
                //            //config.headers.Authorization = '';
                //            deferred.resolve({data: "logout"});
                //            return deferred.promise;
                //        }
                //    }
                //
                //})


        }).run(function() {
            console.log('running ctrp angular app');
        });



})();
