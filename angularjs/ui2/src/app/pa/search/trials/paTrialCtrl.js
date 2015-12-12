/**
 * Created by wus4 on 9/24/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.pa').controller('paTrialCtrl', paTrialCtrl);

    paTrialCtrl.$inject = ['TrialService', 'uiGridConstants', '$scope', '$rootScope', 'Common', '$modal',
                         'studySourceObj', 'phaseObj', 'primaryPurposeObj', '$state', 'trialStatusObj'
    ,'PATrialService', 'milestoneObj', 'processingStatusObj', 'protocolIdOriginObj'];

    function paTrialCtrl(TrialService, uiGridConstants, $scope, $rootScope, Commo, $modal,
                         studySourceObj, phaseObj, primaryPurposeObj, $state, trialStatusObj,
                         PATrialService, milestoneObj, processingStatusObj, protocolIdOriginObj) {

        var vm = this;
        var fromStateName = $state.fromState.name || '';
        vm.searchParams = PATrialService.getInitialTrialSearchParams();
        // clean search params
        vm.studySourceArr = studySourceObj;
        vm.phaseArr = phaseObj;
        vm.primaryPurposeArr = primaryPurposeObj;
        vm.trialStatusArr = trialStatusObj;
        vm.milestoneArr = milestoneObj;
        vm.processingStatusArr = processingStatusObj;
        vm.protocolIdOriginArr = protocolIdOriginObj;
        vm.gridScope=vm;

        //ui-grid plugin options
        vm.gridOptions = PATrialService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function(gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
            vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchTrials();
            });
        }; //gridOptions

        vm.searchTrials = function() {
            PATrialService.searchTrialsPa(vm.searchParams).then(function (data) {
                vm.gridOptions.data = data.trials;
                vm.gridOptions.totalItems = data.total;
            }).catch(function (err) {
                console.log('search trial failed');
            });
        };

        vm.resetSearch = function() {
            vm.searchParams = PATrialService.getInitialTrialSearchParams();
            Object.keys(vm.searchParams).forEach(function(key, index) {
                vm.searchParams[key] = '';
            });

            vm.gridOptions.data = [];
            vm.gridOptions.totalItems = null;
        };

        $scope.takeTrialAction = function(actionType, trialId) {
            if (actionType == 'Complete') {
                $state.go('main.trialDetail', {trialId: trialId});
            } else if (actionType == 'Update') {
                $state.go('main.trialDetail', {trialId: trialId, editType: 'update'});
            }
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            if (fromStateName != 'main.pa.trialOverview') {
                vm.resetSearch();
            } else {
                vm.searchTrials(); //refresh search results
            }
        }

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
            if (sortColumns.length == 0) {
                console.log("removing sorting");
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
            } else {
                vm.searchParams.sort = sortColumns[0].name; //sort the column
                switch( sortColumns[0].sort.direction ) {
                    case uiGridConstants.ASC:
                        vm.searchParams.order = 'ASC';
                        break;
                    case uiGridConstants.DESC:
                        vm.searchParams.order = 'DESC';
                        break;
                    case undefined:
                        break;
                }
            }

            //do the search with the updated sorting
            vm.searchTrials();
        }; //sortChangedCallBack
    }
})();
