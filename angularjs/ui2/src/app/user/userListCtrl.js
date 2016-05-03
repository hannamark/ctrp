/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['$scope', 'toastr', 'UserService', 'uiGridConstants', '$location'];

    function userListCtrl($scope, toastr, UserService, uiGridConstants, $location) {

        $scope.changeUserStatus = function(row) {
            var userObj = {};
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
        };

        var vm = this;
        vm.statusArr = UserService.getStatusArray();
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
        };

        vm.searchUsers = function () {
            UserService.searchUsers(vm.searchParams).then(function (data) {
                vm.gridOptions.data = data['users'];
                vm.gridOptions.totalItems =  data.total;
                $location.hash('users_search_results');
            }).catch(function (err) {
                console.log('Search Users failed');
            });
        }; //searchUsers


        vm.resetSearch = function () {
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
            }).catch(function(err) {
                console.log('error in updating user');
            });
        }; //upsertUser

        /****************************** implementations **************************/

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
