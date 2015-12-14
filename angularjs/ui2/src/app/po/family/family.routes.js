/**
 * Configure routes for person component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(familyRoutes);

    familyRoutes.$inject = ['$stateProvider'];
    function familyRoutes($stateProvider) {
        $stateProvider
          .state('main.families', {
              url: '/families',
              templateUrl: 'app/po/family/family_list.html',
              controller: 'familyCtrl as familyView',
              section: 'po',
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
              templateUrl: 'app/po/family/familyDetails.html',
              controller: 'familyDetailCtrl as familyDetailView',
              section: 'po',
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
              templateUrl: 'app/po/family/familyDetails.html',
              controller: 'familyDetailCtrl as familyDetailView',
              section: 'po',
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
          });


    } //familyRoutes


})();
