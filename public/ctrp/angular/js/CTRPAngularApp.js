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
        'PromiseServiceModule',
        'LocalCacheModule',
        'ngAnimate',
        'toastr',
        'ui.bootstrap',
        'datatables',
        'ui.grid',
        'ui.grid.pagination'

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
                        countryList : function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        }
                    }
                })

                .state('main.orgDetail', {
                    url: '/organizations/:orgId',
                    templateUrl: '/ctrp/angular/partials/orgDetails.html',
                    controller: 'orgDetailCtrl as orgDetailView',
                    resolve: {
                        OrgService : 'OrgService',
                        orgDetailObj : function($stateParams, OrgService) {
                            return OrgService.getOrgById($stateParams.orgId);
                        }
                    } //resolve the promise and pass it to controller
                })

                .state('main.addOrganization', {
                    url: '/new_organization',
                    templateUrl: '/ctrp/angular/partials/orgDetails.html',
                    controller: 'orgDetailCtrl as orgDetailView',
                    resolve: {
                        orgDetailObj: function($q) {
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
