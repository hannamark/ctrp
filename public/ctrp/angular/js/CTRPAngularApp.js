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
        'DateServiceMod'
    ])
        .config(['$httpProvider', function($httpProvider) {
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
                $httpProvider.defaults.headers.common = {};
            }

            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }])

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.defaults.useXDomain = true;
            //  $httpProvider.defaults.withCredentials = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            //    $httpProvider.interceptors.push('AuthInterceptor');

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
                    controller: 'organizationCtrl as orgsView',
                    resolve: {
                        GeoLocationService : 'GeoLocationService',
                        OrgService : 'OrgService',
                        countryList : function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        },
                        sourceStatusObj : function(OrgService) {
                            return OrgService.getSourceStatuses();
                        }
                    }
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

                .state('main.people', {
                    url: '/people',
                    templateUrl: '/ctrp/angular/partials/person_list.html',
                    controller: 'personCtrl as personView',
                    resolve: {
                        OrgService: 'OrgService',
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
                        }
                    }
                })

        }).run(function() {
            console.log('running ctrp angular app');
        });



})();
