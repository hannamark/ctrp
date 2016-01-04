/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('familyCtrl', familyCtrl);

    familyCtrl.$inject = ['FamilyService', 'uiGridConstants', '$scope', '$rootScope',
        'Common','familyStatusObj','familyTypeObj','$modal'];

    function familyCtrl(FamilyService, uiGridConstants, $scope, $rootScope,
                        Common,familyStatusObj,familyTypeObj, $modal) {

        var vm = this;

        vm.searchParams = FamilyService.getInitialFamilySearchParams();
        vm.familyStatusArr = familyStatusObj.data;
        vm.familyStatusArr.sort(Common.a2zComparator());
        vm.familyTypeArr = familyTypeObj.data;
        vm.familyTypeArr.sort(Common.a2zComparator());
        vm.gridScope=vm;
        vm.searchWarningMessage = '';

        //ui-grid plugin options
        vm.gridOptions = FamilyService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function(gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchFamilies();
            });
        }; //gridOptions


        vm.searchFamilies = function(newSearchFlag) {

            if (newSearchFlag === 'fromStart') {
                vm.searchParams.start = 1; //from first page
            }

            /**
             * If not, it should throw a warning to the user to select atleast one parameter.
             * Right now, ignoring the alias parameter as it is set to true by default.
             * To refactor and look at default parameters instead of hardcoding -- radhika
             */
            var isEmptySearch = true;
            var excludedKeys = ['sort', 'order', 'rows', 'start','wc_search'];
            Object.keys(vm.searchParams).forEach(function (key) {
                if (excludedKeys.indexOf(key) === -1 && vm.searchParams[key] !== '') {
                    isEmptySearch = false;
                }
            });

            if (isEmptySearch  && newSearchFlag === 'fromStart') {
                vm.gridOptions.data = [];
                vm.searchWarningMessage = 'At least one selection value must be entered prior to running the search';
            } else {
                vm.searchWarningMessage = '';
            }

            if (!isEmptySearch) { //skip searching if no search parameters supplied by user
                FamilyService.searchFamilies(vm.searchParams).then(function (data) {
                    console.log('received search results: ' + JSON.stringify(data.data));
                    vm.gridOptions.data = data.data.families; //prepareGridData(data.data.orgs); //data.data.orgs;

                    //console.log('vm grid: ' + JSON.stringify(vm.gridOptions.data));
                    //console.log('received search results: ' + JSON.stringify(data.data));
                    vm.gridOptions.totalItems = data.data.total;
                }).catch(function (err) {
                    console.log('search people failed');
                });
            }
        }; //searchPeople


        vm.resetSearch = function() {
            vm.searchParams = FamilyService.getInitialFamilySearchParams();
            var excludedKeys = ['wc_search'];
            Object.keys(vm.searchParams).forEach(function(key, index) {
                if (excludedKeys.indexOf(key) === -1) {
                    // vm.searchParams[key] = '';
                    vm.searchParams[key] = angular.isArray(vm.searchParams[key]) ? [] : '';
                }
            });
            vm.searchParams['wc_search'] = true;
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;
            vm.searchWarningMessage = '';
        }; //resetSearch

        activate();

        /****************************** implementations **************************/

        function activate() {
            // vm.searchFamilies();
            // updateSearchResultsUponParamsChanges();
        } //activate

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
            if (sortColumns.length === 0) {
                console.log('removing sorting');
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
            vm.searchFamilies();
        } //sortChangedCallBack

    }

})();
