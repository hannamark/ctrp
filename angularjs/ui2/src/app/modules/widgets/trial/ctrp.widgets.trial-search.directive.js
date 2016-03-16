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
            vm.numTrialsFound = -1;
            // ag-grid options
            vm.gridOptions = getGridOptions();

            // actions
            vm.resetSearch = resetSearch;
            vm.searchTrials = searchTrials;

            activate();
            function activate() {
                _resolveFormFieldsData();
            }

            function _resolveFormFieldsData() {
                PATrialService.groupPATrialSearchFieldsData().then(function(res) {
                    // $log.info('res is: ', res);
                    vm.studySourceArr = res[0];
                    vm.phaseArr = res[1];
                    vm.primaryPurposeArr = res[2];
                    vm.trialStatusArr = res[3];
                    vm.protocolIdOriginArr = res[4];
                    vm.milestoneArr = res[5];
                    vm.researchCategoriesArr = res[6];
                    vm.nciDivArr = res[7];
                    vm.nciProgArr = res[8];
                    vm.submissionTypesArr = res[9];
                    vm.submissionMethodsArr = res[10];
                    vm.processingStatusArr = res[11];
                })
                .catch(function(err) {
                    console.error('failed to resolve: ', err);
                });
            }

            function searchTrials() {
                vm.searching = true;
                PATrialService.searchTrialsPa(vm.searchParams).then(function (data) {
                    $log.info('received research results: ', data.trials);
                    vm.gridOptions.api.setRowData(data.trials);
                    vm.gridOptions.api.refreshView();
                    vm.numTrialsFound = data.trials.length;
                }).catch(function (err) {
                    console.log('search trial failed');
                }).finally(function() {
                    console.log('finished search');
                    vm.searching = false;
                });
            };


            function resetSearch() {
                vm.searchParams = PATrialService.getInitialTrialSearchParams();
                vm.gridOptions.api.setRowData([]);
                Object.keys(vm.searchParams).forEach(function(key, index) {
                    vm.searchParams[key] = '';
                });
                vm.searchWarningMessage = '';
            };

            function getGridOptions() {

                var options = {
                     columnDefs: getColumnDefs(),
                     rowData: [
                         {'ctrp_id': 1232, 'ctep_id': 321},
                         {'ctrp_id': 12322, 'ctep_id': 3212},
                     ],
                     rowSelection: 'multiple',
                     enableColResize: true,
                     enableSorting: true,
                     enableFilter: true,
                     groupHeaders: true,
                     rowHeight: 22,
                     onModelUpdated: onModelUpdated,
                     suppressRowClickSelection: true
                 };
                 // options.datasource = tableDataSource;
                 return options;
            }

            function onModelUpdated() {
                console.info('on model updated triggered!');
            }

            function getColumnDefs() {
                // {headerCellTemplate: '<strong>Head</strong>'}
                var colDefs = [
                    {headerName: '', width: 30, checkboxSelection: true,
                         suppressSorting: true, suppressMenu: true, pinned: true},
                    {headerName: 'NCI ID', field: 'nci_id', width: 150, cellHeight: 20, unSortIcon: true, editable: true},
                    {headerName: 'Lead Protocol ID', field: 'lead_protocol_id', width: 160, cellHeight: 20},
                    {headerName: 'Official Title', field: 'official_title', width: 240, cellHeight: 20},
                    {headerName: 'Phase', field: 'phase', width: 70, cellHeight: 20},
                    {headerName: 'Purpose', field: 'purpose', width: 100, cellHeight: 20},
                    {headerName: 'Pilot?', field: 'pilot', width: 70, cellHeight: 20},
                    {headerName: 'Principal Investigator', field: 'pi', width: 170, cellHeight: 20},
                    {headerName: 'Lead Organization', field: 'lead_org', width: 180, cellHeight: 20},
                    {headerName: 'Sponsor', field: 'sponsor', width: 150, cellHeight: 20},
                    {headerName: 'Current Trial Status', field: 'current_trial_status', width: 150, cellHeight: 20},
                    {headerName: 'Current Milestone', field: 'current_milestone', width: 170, cellHeight: 20},
                    {headerName: 'Scientific Milestone', field: 'scientific_milestone', width: 190, cellHeight: 20},
                    {headerName: 'Admin Milestone', field: 'admin_milestone', width: 180, cellHeight: 20},
                    {headerName: 'Other IDs', field: 'other_ids', width: 120, cellHeight: 20},
                    {headerName: 'Current Processing Status', field: 'current_processing_status', width: 160, cellHeight: 20},
                    {headerName: 'Submission Type', field: 'submission_type', width: 150, cellHeight: 20},
                    {headerName: 'Submission Method', field: 'submission_method', width: 160, cellHeight: 20},
                    {headerName: 'Submission Source', field: 'submission_source', width: 160, cellHeight: 20},
                    {headerName: 'NIH NCI Div', field: 'nih_nci_div', width: 130, cellHeight: 20},
                    {headerName: 'NIH NCI Prog', field: 'nih_nci_prog', width: 130, cellHeight: 20}
                 ];

                return colDefs;
            }

            var tableDataSource = {
                getRows: getRows,
                pageSize: vm.searchParams.rows,
                rowCount: 100,
                overflowSize: 100,
                maxConcurrentRequests: 3
            };

            function getRows(params) {
                params.startRow = (vm.searchParams.start - 1) * vm.searchParams.rows;
                params.endRow = vm.searchParams.start * vm.searchParams.rows;
                params.successCallback = function() {
                    console.info('success in getRows');
                }
                return params;
            }

        } //ctrpPATrialSearch
    }

})();
