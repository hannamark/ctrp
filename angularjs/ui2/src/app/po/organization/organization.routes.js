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
              section: 'po',
              ncyBreadcrumb: {
                  parent: 'main.defaultContent',
                  label: 'Search Organizations'
              }
          })

          .state('main.orgDetail', {
              url: '/organizations/:orgId',
              templateUrl: 'app/po/organization/orgDetails.html',
              controller: 'orgDetailCtrl as orgDetailView',
              section: 'po',
              resolve: {
                  OrgService : 'OrgService',
                  sourceContextObj: function(OrgService) {
                      return OrgService.getSourceContexts();
                  },
                  sourceStatusObj: function(OrgService) {
                      return OrgService.getSourceStatuses();
                  },
                  serviceRequests: function(OrgService) {
                    return OrgService.getServiceRequests();
                  },
                  GeoLocationService : 'GeoLocationService',
                  countryList : function(GeoLocationService) {
                      return GeoLocationService.getCountryList();
                  },
                  orgDetailObj : function($stateParams, OrgService) {
                      console.log("getting org by id: " + $stateParams.orgId);
                      return OrgService.getOrgById($stateParams.orgId);
                  },
                  associatedOrgsObj : function($stateParams, OrgService) {
                      return OrgService.getAssociatedOrgs($stateParams.orgId);
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
              section: 'po',
              resolve: {
                  OrgService : 'OrgService',
                  sourceContextObj: function(OrgService) {
                      return OrgService.getSourceContexts();
                  },
                  sourceStatusObj : function(OrgService) {
                      return OrgService.getSourceStatuses();
                  },
                  serviceRequests: function(OrgService) {
                    return OrgService.getServiceRequests();
                  },
                  orgDetailObj: function($q) {
                      var deferred = $q.defer();
                      deferred.resolve(null);
                      return deferred.promise;
                  },
                  associatedOrgsObj : function($q) {
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
