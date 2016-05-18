/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['PromiseTimeoutService', '$scope', 'userDetailObj', 'toastr', 'UserService', 'uiGridConstants', '$location', 'AppSettingsService', 'URL_CONFIGS'];

    function userListCtrl(PromiseTimeoutService, $scope, userDetailObj, toastr, UserService, uiGridConstants, $location, AppSettingsService, URL_CONFIGS ) {

        var vm = this;
        vm.curUser = userDetailObj;

        // Initial User Search Parameters
        var SearchParams = function (){
            return {
                username: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                email: '',
                phone: '',
                approved: '',
                user_status_id: '',
                // affiliated_org_name: '',

                //for pagination and sorting
                rows: 25,
                start: 1
            }
        }; //initial User Search Parameters


        var optionOrg = {
            name: 'user_organization_name',
            displayName: 'Organizational Affiliation',
            enableSorting: true,
            minWidth: '100',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="Organization Affiliation">' +
            '{{COL_FIELD CUSTOM_FILTERS}}</div>'
        };

        var optionOrgFamilies = {
            name: 'organization_family_name',
            displayName: 'Organization Family',
            enableSorting: false,
            minWidth: '100',
            width: '*'
        };

        var optionRole = {
            name: 'admin_role',
            displayName: 'Site Administrator Privileges',
            enableSorting: true,
            width: '110'
        };

        var optionEmail = {
            name: 'receive_email_notifications',
            displayName: 'e-mails',
            enableSorting: true,
            width: '120'
        };

        var optionPhone = {
            name: 'phone',
            displayName: 'Phone',
            enableSorting: true,
            minWidth: '100',
            width: '*',
            visible: false,
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
        };

        var optionStatus = {
            name: 'user_status',
                displayName: 'Status',
            enableSorting: true,
            width: '90',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{row.entity.user_status_name}}">{{row.entity.user_status_name}}</div>'
        };

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            paginationPageSizes: [10, 25, 50, 100, 1000],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            enableFiltering: false,
            enableVerticalScrollbar: 2,
            enableHorizontalScrollbar: 2,
            columnDefs: [
                {
                    name: 'username',
                    enableSorting: true,
                    displayName: 'Username',
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid"' +
                    ' title="{{COL_FIELD}}">' +
                    ' <a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'first_name',
                    displayName: 'First Name',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'last_name',
                    displayName: 'Last Name',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'middle_name',
                    displayName: 'Middle Name',
                    enableSorting: false,
                    minWidth: '100',
                    visible: false,
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'email',
                    displayName: 'Email',
                    enableSorting: true,
                    minWidth: '150',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                }
            ],
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: 'users.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [0, 0, 0, 0]},
            exporterPdfTableHeaderStyle: {fontSize: 12, bold: true},
            exporterPdfHeader: {margin: [40, 10, 40, 40], text: 'Users:', style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
                return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString() + ' - Total Users: ' + vm.gridOptions.totalItems, style: 'footerStyle', margin: [40, 10, 40, 40] };
            },
            exporterPdfCustomFormatter: function ( docDefinition ) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterMenuAllData: true,
            exporterMenuPdfAll: true,
            exporterPdfOrientation: 'landscape',
            exporterPdfMaxGridWidth: 700,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
        };

        AppSettingsService.getSettings({ setting: 'USER_STATUSES', json_path: 'users/user_statuses'}).then(function (response) {
            vm.statusArr = response.data;
        }).catch(function (err) {
            vm.statusArr = [];
            console.log("Error in retrieving USER_STATUSES " + err);
        });

        //ui-grid plugin options
        vm.searchParams = new SearchParams;
        vm.gridOptions = gridOptions;
        if (vm.curUser.role === "ROLE_SITE-SU") {
            vm.searchOrganization = vm.curUser.organization.name;
            vm.searchOrganizationFamily = vm.curUser.family_orgs.length ? vm.curUser.family_orgs[0].name : '';
            vm.searchStatus = 'Active';
            vm.searchType = vm.curUser.role;
            vm.gridOptions.columnDefs.push(optionRole, optionEmail, optionPhone);
        } else {
            vm.gridOptions.columnDefs.push(optionOrg, optionOrgFamilies, optionRole, optionEmail, optionPhone, optionStatus);
        }
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
        vm.gridOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, allSearchParams).then(
                function (data) {
                    vm.gridOptions.useExternalPagination = false;
                    vm.gridOptions.useExternalSorting = false;
                    vm.gridOptions.data = data['users'];
                }
            );
        };
        vm.searchUsers = function () {
            vm.gridOptions.useExternalPagination = true;
            vm.gridOptions.useExternalSorting = true;
            UserService.searchUsers(vm.searchParams).then(function (data) {
                vm.gridOptions.data = data['users'];
                vm.gridOptions.totalItems =  data.total;
                $location.hash('users_search_results');
            }).catch(function (err) {
                console.log('Search Users failed');
            });
        }; //searchUsers
        vm.searchUsers();

        vm.resetSearch = function () {
            vm.searchParams = new SearchParams;
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;

            Object.keys(vm.searchParams).forEach(function (key, index) {
                vm.searchParams[key] = '';
            });
            vm.searchUsers();
        }; //resetSearch

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
