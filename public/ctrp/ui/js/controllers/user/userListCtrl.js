/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$sce',
        '$state', '$timeout', 'LocalCacheService', 'UserService'];

    function userListCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout, LocalCacheService, UserService) {
        var vm = this;

        toastr.success('Success', 'In userListCtrl');
        vm.searchParams = UserService.getInitialUserSearchParams();
        vm.gridScope = vm;

        //ui-grid plugin options
        vm.gridOptions = UserService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchUsers();
            });
        }; //gridOptions

        vm.searchUsers = function () {
            toastr.success('Success', 'In userListCtrl, searchUsers');
            // vm.searchParams.name = vm.searchParams.name || "*";
            //console.log("searching params: " + JSON.stringify(vm.searchParams));
            UserService.searchUsers(vm.searchParams).then(function (data) {
                console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.data = data.data.users; //prepareGridData(data.data.orgs); //data.data.orgs;

                //console.log("vm grid: " + JSON.stringify(vm.gridOptions.data));
                //console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.totalItems = data.data.total;

                $location.hash('users_search_results');
                $anchorScroll();
            }).catch(function (err) {
                console.log('Search Users failed');
            });
        }; //searchUsers


        vm.resetSearch = function () {
            // vm.states.length = 0;
            vm.searchParams = UserService.getInitialUserSearchParams();
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;

            Object.keys(vm.searchParams).forEach(function (key, index) {
                vm.searchParams[key] = '';
            });
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
            if (sortColumns.length == 0) {
                console.log("removing sorting");
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
            } else {
                vm.searchParams.sort = sortColumns[0].name; //sort the column
                switch (sortColumns[0].sort.direction) {
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
            vm.searchUsers();
        }; //sortChangedCallBack

    }

})();