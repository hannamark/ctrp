/**
 * Created by wus4 on 9/24/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.pa.trial').controller('trialCtrl', trialCtrl);

    trialCtrl.$inject = ['TrialService', 'uiGridConstants', '$scope', '$rootScope',
                         'Common', '$modal', '$location', '$anchorScroll',
                         'studySourceObj', 'phaseObj', 'primaryPurposeObj'];

    function trialCtrl(TrialService, uiGridConstants, $scope,
                $rootScope, Commo, $modal, $location, $anchorScroll,
                       studySourceObj, phaseObj, primaryPurposeObj) {
        var vm = this;
        vm.searchParams = TrialService.getInitialTrialSearchParams();
        vm.studySourceArr = studySourceObj;
        vm.phaseArr = phaseObj;
        vm.primaryPurposeArr = primaryPurposeObj;
        vm.gridScope=vm;

        //ui-grid plugin options
        vm.gridOptions = TrialService.getGridOptions();
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
            TrialService.searchTrials(vm.searchParams).then(function (data) {
                vm.gridOptions.data = data.trials;
                vm.gridOptions.totalItems = data.total;
                $location.hash('trial_search_results');
                //$anchorScroll();
            }).catch(function (err) {
                console.log('search trial failed');
            });
        };

        vm.resetSearch = function() {
            Object.keys(vm.searchParams).forEach(function(key, index) {
                vm.searchParams[key] = '';
            });

            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
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
