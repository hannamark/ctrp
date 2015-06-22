/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService', 'uiGridConstants', '$scope', 'countryList', 'GeoLocationService'];

    function organizationCtrl(OrgService, uiGridConstants, $scope, countryList, GeoLocationService) {

        var vm = this;
        vm.countriesArr = countryList.data;
        vm.countriesArr.sort(OrgService.a2zComparator());
        vm.states = [];
        vm.searchParams = OrgService.getInitialOrgSearchParams();

        //ui-grid plugin options
        vm.gridOptions = OrgService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function(gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
                vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                    vm.searchParams.start = newPage;
                    vm.searchParams.rows = pageSize;
                    vm.searchParams.name = vm.searchParams.name || "*";
                    vm.searchOrgs();
                });
        }; //gridOptions


        vm.searchOrgs = function() {
                vm.searchParams.name = vm.searchParams.name || "*";
                console.log("searching params: " + JSON.stringify(vm.searchParams));
                OrgService.searchOrgs(vm.searchParams).then(function (data) {
                  //  console.log("received search results: " + JSON.stringify(data.data));
                    vm.gridOptions.data = data.data.orgs; //prepareGridData(data.data.orgs); //data.data.orgs;
                    vm.gridOptions.totalItems = data.data.total;
                }).catch(function (err) {
                    console.log('search organizations failed');
                });
        }; //searchOrgs


        vm.resetSearch = function() {
            vm.states.length = 0;
            angular.forEach(Object.keys(vm.searchParams), function(key, index) {
                if (vm.searchParams[key]) {
                    if (key == "start") {
                        vm.searchParams.start = 1;
                    } else if (key == "rows") {
                        vm.searchParams.rows = 10;
                    } else {
                        vm.searchParams[key] = '';
                    }
                }
            });

            vm.searchOrgs();
        }


        vm.watchCountrySelection = function() {
            console.log('country selected: ' + vm.searchParams.country);
            GeoLocationService.getStateListInCountry(vm.searchParams.country).then(function(response) {
                vm.states = response.data;
                vm.states.sort(OrgService.a2zComparator());
            });
        }; //watchCountrySelection


        activate();

    /****************************** implementations **************************/

        function activate() {
            vm.searchOrgs();
        } //activate




        /**
         *
         * @param dataArr
         * @returns {Array}
         */
        function prepareGridData(dataArr) {
            var results = [];
            angular.forEach(dataArr, function(item, index) {
                // vm.gridOptions.data.push(item);

                var curId = item.id;
                var curName = '<a ui-sref="main.orgDetail({orgId : ' + curId +' })">' + item.name + '</a>';
                results.push({"name" : item.name,
                    "identifier": "",
                    "id": curId, "city" : item.city,
                    "state" : item.state_province
                });
            });

            return results;
        }



        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
            console.log("sortColumns.length = " + sortColumns.length);
            console.log("vm.gridOptions.columnDefs[0].name: " + vm.gridOptions.columnDefs[0].name);
            if (sortColumns.length == 0) { // || sortColumns[0].name != vm.gridOptions.columnDefs[0].name
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
            } else {
                console.log("sortColumns[0].sort: " + JSON.stringify(sortColumns[0].sort));
                vm.searchParams.sort = vm.gridOptions.columnDefs[0].name; //sort the column
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

    }

})();
