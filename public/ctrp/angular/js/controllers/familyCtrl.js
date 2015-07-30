/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('familyCtrl', familyCtrl);

    familyCtrl.$inject = ['FamilyService', 'uiGridConstants', '$scope', 'Common','familyStatusObj','familyTypeObj','affiliatedOrg'];

    function familyCtrl(FamilyService, uiGridConstants, $scope, Common,familyStatusObj,familyTypeObj,affiliatedOrg) {

        var vm = this;

        vm.searchParams = FamilyService.getInitialFamilySearchParams();

        vm.familyStatusArr = familyStatusObj.data;
        vm.familyStatusArr.sort(Common.a2zComparator());
        vm.familyTypeArr = familyTypeObj.data;
        vm.familyTypeArr.sort(Common.a2zComparator());
        console.log("hello ....." +JSON.stringify(familyStatusObj));
        console.log("aff orgs ....." +JSON.stringify(affiliatedOrg));

        //ui-grid plugin options
        vm.gridOptions = FamilyService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function(gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
            vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchFamilies();
            });
        }; //gridOptions


        vm.searchFamilies = function() {
            // vm.searchParams.name = vm.searchParams.name || "*";
            //console.log("searching params: " + JSON.stringify(vm.searchParams));
            FamilyService.searchFamilies(vm.searchParams).then(function (data) {
                console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.data = data.data.families; //prepareGridData(data.data.orgs); //data.data.orgs;

                console.log("vm grid: " + JSON.stringify(vm.gridOptions.data));

                console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.totalItems = data.data.total;
            }).catch(function (err) {
                console.log('search people failed');
            });
        }; //searchPeople


        vm.resetSearch = function() {
            // vm.states.length = 0;
            vm.searchParams = FamilyService.getInitialFamilySearchParams();
            vm.searchFamilies();
        }; //resetSearch

        activate();

        /****************************** implementations **************************/

        function activate() {
            vm.searchFamilies();
            updateSearchResultsUponParamsChanges();
        } //activate




        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
//            console.log("sortColumns.length = " + sortColumns.length);
//            console.log("sortColumns[0].name: " + sortColumns[0].name);
//            console.log("vm.gridOptions.columnDefs[0].name: " + vm.gridOptions.columnDefs[0].name);
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
            vm.searchFamilies();
        }; //sortChangedCallBack

        /**
         * update search results while search parameters is changed
         */
        function updateSearchResultsUponParamsChanges() {
            //can change vm.searchParams.country to vm.searchParams to watch all search parameters
            $scope.$watch(function() {return vm.searchParams.name;}, function(newVal, oldval) {
                vm.searchFamilies();
            }, true);
        }

    }

})();
