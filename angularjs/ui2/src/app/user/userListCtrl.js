/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['PromiseTimeoutService', 'toastr', '$state', '$scope', 'UserService', 'uiGridConstants', '$location', 'AppSettingsService', 'URL_CONFIGS', 'OrgService', 'uiGridExporterConstants', 'uiGridExporterService', '$stateParams'];

    function userListCtrl(PromiseTimeoutService, toastr, $state, $scope, UserService, uiGridConstants, $location, AppSettingsService, URL_CONFIGS, OrgService, uiGridExporterConstants, uiGridExporterService, $stateParams) {

        var vm = this;
        vm.curUser = UserService.getCurrentUserDetails();
        vm.trialId = $stateParams.trialId;

        vm.registeredUsersPage = $state.includes('main.registeredUsers');

        // Initial User Search Parameters
        var SearchParams = function (){
            return {
                username: vm.trialId ? '*' : '',
                first_name: '',
                middle_name: '',
                last_name: '',
                email: '',
                phone: '',
                approved: '',
                rows: 25,
                trial_id: vm.trialId ? vm.trialId : undefined,
                registered_users: vm.registeredUsersPage || vm.trialId? true : false,
                start: 1
            }
        }; //initial User Search Parameters


        var optionOrg = {
            name: 'organization_name',
            displayName: 'Organizational Affiliation',
            enableSorting: true,
            minWidth: '210',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="Organization Affiliation">' +
            '{{COL_FIELD CUSTOM_FILTERS}}</div>'
        };

        var optionOrgFamilies = {
            name: 'organization_family',
            displayName: 'Organization Family',
            enableSorting: true,
            minWidth: '210',
            width: '*'
        };

        var optionRole = {
            name: 'admin_role',
            displayName: 'Site Administrator Privileges',
            enableSorting: true,
            width: '235'
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
            enableSorting: false,
            width: '90',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{row.entity.user_status_name}}">{{row.entity.user_status_name}}</div>'
        };

        var optionStatusDate = {
            name: 'status_date',
            displayName: 'Status Date',
            enableSorting: true,
            width: '200',
            cellFilter: 'date:"medium"'};

        var userName = {
            name: 'username',
            enableSorting: true,
            displayName: 'Username',
            minWidth: '120',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.trialId ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
            '{{row.entity.username.indexOf(\'nihusernothaveanaccount\') > - 1 ? \'\': row.entity.username}}</a></div>'
        };

        var firstName = {
            name: 'first_name',
            displayName: 'First Name',
            enableSorting: true,
            minWidth: '120',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.trialId ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
                '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
        };

        var lastName = {
            name: 'last_name',
            displayName: 'Last Name',
            enableSorting: true,
            minWidth: '120',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.trialId ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
                '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
        };

        var middleName = {
            name: 'middle_name',
            displayName: 'Middle Name',
            enableSorting: false,
            minWidth: '100',
            visible: false,
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            (vm.registeredUsersPage || vm.trialId ? '<a ui-sref="main.regUserDetail({username : row.entity.username })">' : '<a ui-sref="main.userDetail({username : row.entity.username })">') +
                '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
        };

        var userEmail = {
            name: 'email',
            displayName: 'Email',
            enableSorting: true,
            minWidth: '150',
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                '{{COL_FIELD CUSTOM_FILTERS}}</div>'
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
            columnDefs: [],
            enableGridMenu: true,
            enableSelectAll: false,
            exporterCsvFilename: 'users.csv',
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [
                {
                    title: 'Export All Data As CSV',
                    order: 1,
                    action: function ($event){
                        this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                    }
                },
                {
                    title: 'Remove Selected User from Ownership',
                    order: 2,
                    shown: function () {
                        return vm.gridApi.selection.getSelectedRows().length > 0
                    },
                    action: function (){
                        vm.confirmRemoveTrialsOwnerships(_.chain(vm.gridApi.selection.getSelectedRows()).pluck('id').value());
                    }
                }
            ]
        };

         UserService.getUserStatuses().then(function (response) {
             vm.statusArr = response.data;
            if (vm.curUser.role == 'ROLE_SITE-SU') {
                vm.statusArrForROLESITESU = _.filter(vm.statusArr, function (item, index) {
                    return _.contains(['ACT', 'INR'], item.code);
                });
            }
            if (vm.curUser.role == 'ROLE_ACCOUNT-APPROVER') {
                vm.statusArrForROLEAPPROVER = _.filter(vm.statusArr, function (item, index) {
                    return _.contains(['ACT', 'INR'], item.code);
                });
            }
         });

        //ui-grid plugin options
        vm.searchParams = new SearchParams;
        vm.gridOptions = gridOptions;
        if (!vm.trialId && !vm.registeredUsersPage && (vm.curUser.role === "ROLE_SITE-SU" || vm.curUser.role === "ROLE_ABSTRACTOR" || vm.curUser.role === "ROLE_ABSTRACTOR-SU") ) {
            if (vm.curUser.org_families.length) {
                vm.searchOrganizationFamily = vm.curUser.org_families[0].name;
            } else {
                vm.searchOrganization = vm.curUser.organization.name;
                vm.searchOrganizationFamily = '';
            }
            vm.searchType = vm.curUser.role;
            vm.gridOptions.columnDefs.push(userName, firstName, lastName, userEmail, optionOrg, optionRole, optionEmail, optionPhone, optionStatus, optionStatusDate);
        } else if (!vm.trialId && !vm.registeredUsersPage){
            vm.gridOptions.columnDefs.push(userName, firstName, lastName, userEmail, optionOrg, optionOrgFamilies, optionRole, optionEmail, optionPhone, optionStatus, optionStatusDate);
        } else if (vm.trialId || vm.registeredUsersPage) {
            vm.gridOptions.columnDefs.push(userName, lastName, firstName, optionOrg, optionOrgFamilies);
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
            var origGridColumnDefs = angular.copy(vm.gridOptions.columnDefs);

            //add extra fields here
            //vm.gridOptions.columnDefs.push(middleName);

            allSearchParams.start = null;
            allSearchParams.rows = null;

            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, allSearchParams).then(
                function (data) {
                    vm.gridOptions.useExternalPagination = false;
                    vm.gridOptions.useExternalSorting = false;
                    vm.gridOptions.data = data['users'];

                    vm.gridOptions.columnDefs = origGridColumnDefs;
                }
            );
        };
        vm.searchUsers = function () {
            vm.gridOptions.useExternalPagination = true;
            vm.gridOptions.useExternalSorting = true;

            /**
             * If not, it should throw a warning to the user to select atleast one parameter.
             * Right now, ignoring the alias parameter as it is set to true by default.
             * To refactor and look at default parameters instead of hardcoding -- radhika
             */
            var isEmptySearch = true;
            var excludedKeys = ['sort', 'order', 'rows', 'start'];
            Object.keys(vm.searchParams).forEach(function (key) {
                if (excludedKeys.indexOf(key) === -1 && vm.searchParams[key] !== '' && vm.searchParams[key] !== undefined) {
                    isEmptySearch = false;
                }
            });

            if (isEmptySearch) {
                vm.searchWarningMessage = 'At least one selection value must be entered prior to running the search';
                vm.gridOptions.data = [];
                vm.gridOptions.totalItems = null;
            } else {
                vm.searchWarningMessage = '';
                UserService.searchUsers(vm.searchParams).then(function (data) {

                    if(!data.search_access){
                        vm.searchWarningMessage = "You currently have no access to this search."
                    }
                    vm.gridOptions.data = data['users'];
                    vm.gridOptions.totalItems =  data.total;
                }).catch(function (err) {
                    console.log('Search Users failed: ' + err);
                });
            }
        }; //searchUsers

        vm.resetSearch = function () {
            vm.searchParams = new SearchParams;
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;

            Object.keys(vm.searchParams).forEach(function (key) {
                vm.searchParams[key] = '';
            });
        }; //resetSearch

        vm.typeAheadParams = {};
        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.organization_name, vm.searchOrganizationFamily);
        };

        vm.setTypeAheadOrg = function (searchObj) {
            var splitVal = searchObj.split('<span class="hide">');
            vm.organization_name = splitVal[0];
            vm.userChosenOrg = JSON.parse(splitVal[1].split('</span>')[0].replace(/"null"/g, 'null'));
            vm.searchParams.organization_id = vm.userChosenOrg.id;
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.searchParams.organization_name = vm.searchParams.organization_id = undefined;
        };

        if (vm.trialId) {
            vm.searchUsers();
        }

        vm.trialOwnershipRemoveIdArr = null;
        vm.confirmRemoveTrialOwnershipsPopUp = false;
        vm.confirmRemoveTrialsOwnerships = function (userIdArr) {
            vm.confirmRemoveTrialOwnershipsPopUp = true;
            vm.trialOwnershipRemoveIdArr = userIdArr;
        };
        vm.cancelRemoveTrialsOwnerships = function () {
            vm.confirmRemoveTrialOwnershipsPopUp = false;
        };

        vm.removeTrialsOwnerships = function () {
            var searchParams = {
                user_ids: vm.trialOwnershipRemoveIdArr,
                trial_ids: [vm.trialId]
            };
            UserService.endUserTrialsOwnership(searchParams).then(function (data) {
                if (data.results === 'success') {
                    toastr.success('Trial Ownerships Removed', 'Success!');
                    vm.trialOwnershipRemoveIdArr = null;
                    vm.confirmRemoveTrialOwnershipsPopUp = false;
                    vm.searchUsers();
                }
            });
        };



        /****************************** implementations **************************/

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {

            if (sortColumns.length === 0) {
                vm.searchParams.sort = 'username';
                vm.searchParams.order = 'asc';
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
