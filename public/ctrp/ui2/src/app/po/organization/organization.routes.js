/**
 * Configure routes for organization component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(organizationRoutes);

    organizationRoutes.$inject = ['$stateProvider'];
    function organizationRoutes($stateProvider) {
        $stateProvider
          .state('main.organizations', {
              url: '/organizations',
              templateUrl: 'app/po/organization/organization_list.html',
              controller: 'organizationCtrl as orgsView',
              ncyBreadcrumb: {
                  parent: 'main.defaultContent',
                  label: 'Search Organizations'
              }
          })

          .state('main.orgDetail', {
              url: '/organizations/:orgId',
              templateUrl: 'app/po/organization/orgDetails.html',
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
              templateUrl: 'app/po/organization/orgDetails.html',
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
          });

    } //organizationRoutes


})();
