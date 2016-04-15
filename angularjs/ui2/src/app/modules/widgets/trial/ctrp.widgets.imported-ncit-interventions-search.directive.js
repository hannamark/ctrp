/**
 * Created by wangg5 on 4/15/2016.
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpNcitInterventionsSearch', ctrpNcitInterventionsSearch);

  ctrpNcitInterventionsSearch.$inject = ['$timeout', '_', 'PATrialService', 'Common'];

  function ctrpNcitInterventionsSearch($timeout, _, PATrialService, Common) {

      var directive = {
        link: linkerFn,
        restrict: 'E',
        scope: {
          maxRowSelectable: '=?'
        },
        controller: nciInterventionsSearchCtrl,
        controllerAs: 'interventionsLookupView',
        templateUrl: 'app/modules/widgets/trial/ctrp.imported-ncit-interventions-search-template.html'
      };

      return directive;

      function linkerFn(scope, element, attrs) {
          console.info('in linker: nciInterventionsSearchCtrl');
      }

      function nciInterventionsSearchCtrl($scope, $element, $attrs) {
          console.info('in controller: nciInterventionsSearchCtrl');
          var vm = this;
          vm.lookupInterventions = lookupInterventions;
          vm.resetSearch = resetSearch;
          vm.searchParams = _getSearchParams();
          vm.searchResults = _initResultsObj();

          function lookupInterventions(params) {
              PATrialService.lookupNcitInterventions(params).then(function(res) {
                 console.info('res from the interventions lookup: ', res);
                 res.server_response = null;
                 vm.searchResults = res;
              }).catch(function(err) {
                  console.error('err in the lookup: ', err);
                  vm.searchResults = _initResultsObj();
              });
          }

          function resetSearch() {
              vm.searchParams = _getSearchParams();
          }

          function _initResultsObj() {
              var results = angular.copy(vm.searchParams);
              results.data = [];
              results.total = -1;
              return results;
          }

          function _getSearchParams() {
              return {
                  sort: '',
                  order: '',
                  rows: 10,
                  start: 1,
                  name: '' // against either preferred_name or synonyms in ncit_interventions table
              };
          }
      }


  }

  })();
