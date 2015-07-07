/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService', 'uiGridConstants', '$scope', 
        'countryList', 'Common', 'MESSAGES', 'sourceStatusObj'];

    function organizationCtrl(OrgService, uiGridConstants, $scope,
                              countryList, Common, MESSAGES, sourceStatusObj) {

        var vm = this;

        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList.data;
        vm.countriesArr.sort(Common.a2zComparator());
        vm.states = [];
        vm.searchParams = OrgService.getInitialOrgSearchParams();
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());

        //ui-grid plugin options
        vm.gridOptions = OrgService.getGridOptions();
        //vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        //vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function(gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
                vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                    vm.searchParams.start = newPage;
                    vm.searchParams.rows = pageSize;
                    vm.searchOrgs();
                });
        }; //gridOptions


        vm.searchOrgs = function() {
                // vm.searchParams.name = vm.searchParams.name || "*";
                //console.log("searching params: " + JSON.stringify(vm.searchParams));
                OrgService.searchOrgs(vm.searchParams).then(function (data) {
                    // console.log("received search results: " + JSON.stringify(data));
                    vm.gridOptions.data = data.orgs; //prepareGridData(data.data.orgs); //data.data.orgs;
                    vm.gridOptions.totalItems = data.total;
                    vm.gridHeight = vm.gridOptions.rowHeight * vm.gridOptions.data.length;
                }).catch(function (err) {
                    console.log('search organizations failed');
                });
        }; //searchOrgs


        vm.resetSearch = function() {
           // vm.states.length = 0;
            vm.searchParams = OrgService.getInitialOrgSearchParams();
            vm.searchOrgs();
        }; //resetSearch

        activate();

    /****************************** implementations **************************/

        function activate() {
            vm.searchOrgs();
            listenToStatesProvinces();
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
            vm.searchOrgs();
        }; //sortChangedCallBack


        /**
         * Listen to the message for availability of states or provinces
         * for the selected country
         */
        function listenToStatesProvinces() {
            vm.watchCountrySelection(vm.searchParams.country);

            $scope.$on(MESSAGES.STATES_AVAIL, function() {
                console.log("states available for country: " + vm.searchParams.country);
                vm.states = OrgService.getStatesOrProvinces();
            });

            $scope.$on(MESSAGES.STATES_UNAVAIL, function() {
                vm.states = [];
            });
        }  //listenToStatesProvinces


        /**
         * update search results while search parameters is changed
         */
        function updateSearchResultsUponParamsChanges() {
            //can change vm.searchParams.country to vm.searchParams to watch all search parameters
            $scope.$watch(function() {return vm.searchParams.country;}, function(newVal, oldval) {
                vm.searchOrgs();
            }, true);
        }

    }

})();
