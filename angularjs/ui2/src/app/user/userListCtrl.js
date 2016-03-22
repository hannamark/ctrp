/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', 'toastr', 'LocalCacheService',
    'UserService', 'uiGridConstants', '$location', '$anchorScroll'];

    function userListCtrl($scope, toastr, LocalCacheService,
        UserService, uiGridConstants, $location, $anchorScroll) {

        $scope.changeUserStatus = function(row) {
            var userObj = {};

            console.log('user row is: ', row);
            if (row && row.entity) {
                if (row.entity.user_status.id === 4) {
                    row.entity.user_status_id = 4;
                    row.entity.user_status.name = 'Deleted';
                } else {
                    row.entity.user_status_id = 3;
                    row.entity.user_status.name = 'Inactive';
                }

                userObj.id = row.entity.id;
                userObj.user = row.entity;
            }

            vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);

            vm.upsertUser(userObj);
        }

        $scope.changeUserApproval = function(row) {
            var userObj = {};

            console.log('user row is: ', row);

            userObj.id = row.entity.id;
            userObj.user = row.entity;

            vm.upsertUser(userObj);
            vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
        }

        var vm = this;
        var userSoftDeleteColumnDef = {
            name: 'delete',
            displayName: 'Delete',
            enableSorting: true,
            minWidth: '100',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}"><input id="{{row.entity.id}}" type="checkbox" ng-model="row.entity.user_status.id" ng-true-value="4" ng-false-value="3" ng-click="grid.appScope.changeUserStatus(row)"><label></div>'
        };

        vm.statusArr = UserService.getStatusArray();
        //toastr.success('Success', 'In userListCtrl');
        vm.searchParams = UserService.getInitialUserSearchParams();

        //ui-grid plugin options
        vm.gridOptions = UserService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchUsers();
            });
        }; //gridOptions
        vm.gridOptions.changeUserStatus = function (gridApi) {
            console.log('i can get here');
        }; //gridOptions
        vm.gridOptions.columnDefs.push(userSoftDeleteColumnDef);

        vm.searchUsers = function () {
            //toastr.success('Success', 'In userListCtrl, searchUsers');
            // vm.searchParams.name = vm.searchParams.name || '*';
            //console.log('searching params: ' + JSON.stringify(vm.searchParams));
            UserService.searchUsers(vm.searchParams).then(function (data) {
                //toastr.success('Success', 'In userListCtrl, UserService.searchUsers');
                console.log('received search results data: ' + JSON.stringify(data));
                vm.gridOptions.data = data['users']; //prepareGridData(data.data.orgs); //data.data.orgs;

                //console.log('vm grid: ' + JSON.stringify(vm.gridOptions.data));
                //console.log('received search results: ' + JSON.stringify(data.data));
                vm.gridOptions.totalItems =  data.total;

                $location.hash('users_search_results');
                //$anchorScroll();
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

        vm.upsertUser = function(updatedUser) {
            UserService.upsertUser(updatedUser).then(function(response) {
                toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
                console.log('response data is: ', response);
            }).catch(function(err) {
                console.log('error in updating user');
            });
        }; //upsertUser

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
        } //sortChangedCallBack
    }

})();
