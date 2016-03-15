/**
 * Created by wangg5 on 3/15/2016.
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpPaTrialSearch', ctrpPaTrialSearch);

  ctrpPaTrialSearch.$inject = ['$compile', '$log', '$timeout', '_', 'PATrialService',
      'UserService', '$mdToast', '$document', 'Common', 'MESSAGES', 'DateService', '$state'];

  function ctrpPaTrialSearch($compile, $log, $timeout, _, PATrialService,
      $mdToast, $document, Common, MESSAGES, DateService, $state) {

        var directive = {
          link: link,
          restrict: 'E',
          scope: {
            showGrid: '=?',
            usedInModal: '=?',
            maxRowSelectable: '=?',
            // trialSearchResults: '@',
            // selectedTrialsArray: '@'
          },
          controller: paTrialSearchCtrl,
          controllerAs: 'trialSearchView',
          templateUrl: 'app/modules/widgets/trial/ctrp.pa-trial-search-template.html'
        };

        return directive;

        function link(scope, element, attrs) {
            // scope.name = 'Tony';
        } //link

        function paTrialSearchCtrl($scope, $element, $attrs) {
            var vm = this;
            vm.searchParams = PATrialService.getInitialTrialSearchParams();

            // actions
            vm.resetSearch = resetSearch;
            vm.searchTrials = searchTrials;

            activate();
            function activate() {
                _resolveFormFieldsData();
            }

            function _resolveFormFieldsData() {
                PATrialService.groupPATrialSearchFieldsData().then(function(res) {
                    $log.info('res is: ', res);
                    vm.studySourceArr = res[0];
                    vm.phaseArr = res[1];
                    vm.primaryPurposeArr = res[2];
                    vm.trialStatusArr = res[3];
                    vm.milestoneArr = res[5];
                    vm.processingStatusArr = res[11];
                    //console.log("processing status = " + JSON.stringify(processingStatusObj));
                    vm.protocolIdOriginArr = res[4];
                    vm.researchCategoriesArr = res[6];
                    vm.nciDivArr = res[7];
                    vm.nciProgArr = res[8];
                    //console.log("nciProgObj = " + JSON.stringify(nciProgObj));
                    vm.submissionTypesArr = res[9];
                    vm.submissionMethodsArr = res[10];
                })
                .catch(function(err) {
                    console.error('failed to resolve: ', err);
                });
            }

            function searchTrials() {
                vm.searching = true;
                PATrialService.searchTrialsPa(vm.searchParams).then(function (data) {
                    $log.info('received research results: ', data.trials);
                }).catch(function (err) {
                    console.log('search trial failed');
                }).finally(function() {
                    console.log('finished search');
                    vm.searching = false;
                });
            };


            function resetSearch() {
                vm.searchParams = PATrialService.getInitialTrialSearchParams();
                Object.keys(vm.searchParams).forEach(function(key, index) {
                    vm.searchParams[key] = '';
                });
            };

        } //ctrpPATrialSearch
    }

})();
