/**
 * Created by schintal on 9/12/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', 'PromiseTimeoutService', 'uiGridConstants','toastr','OrgService','userDetailObj','MESSAGES', '$state', '$timeout', '$scope', 'countryList', 'AppSettingsService', 'URL_CONFIGS'];

    function userDetailCtrl(UserService, PromiseTimeoutService, uiGridConstants, toastr, OrgService, userDetailObj, MESSAGES, $state, $timeout, $scope, countryList, AppSettingsService, URL_CONFIGS) {
        var vm = this;

        $scope.userDetail_form = {};
        vm.userDetails = userDetailObj;
        vm.isCurationEnabled = UserService.isCurationModeEnabled();
        vm.userDetailsOrig = angular.copy(userDetailObj);
        vm.selectedOrgsArray = [];
        vm.savedSelection = [];
        vm.states = [];
        vm.countriesArr = countryList;
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.userRole = UserService.getUserRole();
        vm.updateUser = function (redirect) {
            vm.chooseTransferTrials = false;
            vm.showAllTrialsModal = false;
            if(vm.selectedOrgsArray.length >0) {
                vm.userDetails.organization_id = vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].id;
            }

            UserService.upsertUser(vm.userDetails).then(function(response) {
                toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
                if (redirect) {
                    UserService.allOrgUsers = null;
                    $timeout(function() {
                        $state.go('main.users', {}, {reload: true});
                    }, 500);
                } else {
                    vm.userDetailsOrig = angular.copy(vm.userDetails);
                    vm.getUserTrials();
                }
            }).catch(function(err) {
                console.log('error in updating user ' + JSON.stringify(vm.userDetails));
            });
        };

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumberPO(vm.userDetails.phone, vm.userDetails.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

        vm.reset = function() {
            vm.userDetails = angular.copy(vm.userDetailsOrig);
        };

        vm.userRequestAdmin = function(params) {
            UserService.userRequestAdmin(params);
        };

        vm.confirmSave = function() {
            if (vm.irreversibleRoleSwitchId === undefined || vm.irreversibleRoleSwitchId === vm.userDetails.role) {
                vm.confirmMsg = "You are about to switch this user's role from a role that you have no permissions to re-assign once you leave this form.";
                return true;
            }
        };

        vm.validateSave = function() {
            vm.showValidation = true;
            // If form is invalid, return and let AngularJS show validation errors.
            if ($scope.userDetail_form.$invalid) {
                return;
            } else {
                if (vm.inactivatingUser || vm.userDetailsOrig.organization_id !== vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].id ) {
                    UserService.getUserTrialsOwnership(vm.searchParams).then(function (data) {
                        if (vm.gridOptions.totalItems > 0
                                && (vm.userRole === 'ROLE_ADMIN'
                                    || vm.userRole === 'ROLE_SUPER'
                                        || vm.userRole === 'ROLE_SITE-SU')) {
                            vm.chooseTransferTrials = true;
                            return;
                        } else {
                            vm.updateUser(vm.checkForOrgChange());
                            return;
                        }
                    });
                } else {
                    vm.updateUser();
                    return;
                }
            }
        };

        vm.checkForOrgChange = function() {
            var redirect = false;
            if (vm.userDetailsOrig.organization_id !== vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].id) {
                if (vm.userRole === 'ROLE_ADMIN' || vm.userRole === 'ROLE_SUPER' || vm.userRole === 'ROLE_SITE-SU') {
                    vm.userDetails.user_status_id = _.where(vm.statusArr, {code: 'INR'})[0].id;
                }
                if (vm.userRole === 'ROLE_SITE-SU') {
                    //because site admin loses accessibility to user
                    redirect = true;
                } else if (vm.userRole !== 'ROLE_ADMIN' && vm.userRole !== 'ROLE_SUPER') {
                    vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].id = vm.userDetailsOrig.organization_id;
                    vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].name = 'Request has been sent';
                }
            }
            return redirect;
        };

        vm.saveWithoutTransfer = function() {
            vm.chooseTransferTrials = false;
            var redirect = vm.checkForOrgChange();
            vm.updateUser(redirect);
        };

        vm.transferAllUserTrials = function() {
            vm.passiveTransferMode = true;
            UserService.createTransferTrialsOwnership(vm);
        };
        
        AppSettingsService.getSettings({ setting: 'USER_DOMAINS'}).then(function (response) {
            vm.domainArr = response.data[0].settings.split('||');
        }).catch(function (err) {
            vm.domainArr = [];
            console.log("Error in retrieving USER_DOMAINS " + err);
        });

        AppSettingsService.getSettings({ setting: 'USER_ROLES'}).then(function (response) {
            vm.rolesArr = JSON.parse(response.data[0].settings);
            vm.assignRoles = _.find(vm.rolesArr, function(obj) { return obj.id === vm.userRole }).assign_access;
            if (vm.assignRoles.length) {
                var rolesArr = [];
                angular.forEach(vm.rolesArr, function(role){
                    if (vm.assignRoles.indexOf(role.id) > -1) {
                        rolesArr.push(role);
                    } else if(role.id === vm.userDetails.role) {
                        rolesArr.push(role);
                        vm.irreversibleRoleSwitchName = role.name;
                        vm.irreversibleRoleSwitchId = role.id;
                    }
                });
                vm.rolesArr = rolesArr;
            } else {
                vm.disableRows = true;
            }
        }).catch(function (err) {
            vm.rolesArr = [];
            console.log("Error in retrieving USER_ROLES " + err);
        });

        vm.statusArr = [];
        AppSettingsService.getSettings({ setting: 'USER_STATUSES', json_path: 'users/user_statuses'}).then(function (response) {
            vm.statusArr = response.data;
            if (vm.userRole == 'ROLE_SITE-SU') {
                vm.statusArrForROLESITESU = _.filter(vm.statusArr, function (item, index) {
                    return _.contains(['ACT', 'INA'], item.code);
                });
            }
        }).catch(function (err) {
            vm.statusArr = [];
            console.log("Error in retrieving USER_STATUSES " + err);
        });

        /**** USER TRIALS *****/
        // Initial User Search Parameters
        var TrialSearchParams = function (){
            return {
                user_id: vm.userDetails.id,
                rows: 10,
                start: 1
            }
        }; //initial User Search Parameters


        vm.chooseTransferTrials = false;
        vm.showAllTrialsModal = false;

        vm.export_row_type = "visible";
        vm.export_column_type = "visible";
        vm.searchParams = new TrialSearchParams;
        vm.viewCount = vm.searchParams.start + vm.searchParams.rows - 1;
        vm.gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            paginationPageSizes: [10, 25, 50, 100, 1000],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableFiltering: false,
            enableVerticalScrollbar: 2,
            enableHorizontalScrollbar: 2,
            columnDefs: [
                {
                    name: 'nci_id',
                    enableSorting: true,
                    displayName: 'NCI Trial Identifier',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.trial_id })">{{COL_FIELD}}</a></div>',
                    width: '180'
                },
                {
                    name: 'lead_org_name',
                    displayName: 'Lead Organization',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.orgDetail({orgId : row.entity.lead_org_id })">{{COL_FIELD}}</a></div>',
                    enableSorting: false,
                    width: '*'
                },
                {
                    name: 'lead_protocol_id',
                    displayName: 'Lead Org PO ID',
                    enableSorting: true,
                    width: '155'
                },
                {
                    name: 'official_title',
                    displayName: 'Official Title for Trial',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '<a ui-sref="main.viewTrial({trialId: row.entity.trial_id })">{{COL_FIELD}}</a></div>',
                    enableSorting: true,
                    width: '*'
                }
            ],
            enableRowHeaderSelection : true,
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: vm.userDetails.username + '-trials.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [0, 0, 0, 0]},
            exporterPdfTableHeaderStyle: {fontSize: 12, bold: true},
            exporterPdfHeader: {margin: [40, 10, 40, 40], text: 'Trials owned by ' + vm.userDetails.username + ':', style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
                return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString() + ' - ' + vm.userDetails.username + ' owns a total of ' + vm.gridOptions.totalItems + ' trials.', style: 'footerStyle', margin: [40, 10, 40, 40] };
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
            gridMenuCustomItems: new UserService.TransferTrialsGridMenuItems($scope, vm)
        };

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.getUserTrials();
            });
        };
        vm.gridOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS, allSearchParams).then(
                function (data) {
                    vm.gridOptions.useExternalPagination = false;
                    vm.gridOptions.useExternalSorting = false;
                    vm.gridOptions.data = data['trial_ownerships'];
                }
            );
        };
        vm.getUserTrials = function () {
            vm.gridOptions.useExternalPagination = true;
            vm.gridOptions.useExternalSorting = true;
            UserService.getUserTrialsOwnership(vm.searchParams).then(function (data) {
                vm.gridOptions.data = data['trial_ownerships'];
                vm.gridOptions.totalItems =  data.total;

            }).catch(function (err) {
                console.log('Get User Trials failed');
            });
        };
        vm.getUserTrials();

        vm.trialOwnershipRemoveIdArr = null;
        vm.confirmRemoveTrialOwnershipsPopUp = false;
        vm.confirmRemoveTrialsOwnerships = function (trialOwnershipIdArr) {
            vm.confirmRemoveTrialOwnershipsPopUp = true;
            vm.trialOwnershipRemoveIdArr = trialOwnershipIdArr;
        };
        vm.removeTrialsOwnerships = function () {
            var trialOwnershipIdArr = vm.trialOwnershipRemoveIdArr;

             var searchParams = {user_id: vm.userDetails.id};
             if (trialOwnershipIdArr) {
                searchParams['ids'] = trialOwnershipIdArr;
             }
             UserService.endUserTrialsOwnership(searchParams).then(function (data) {
                 if(data.results === 'success') {
                    vm.getUserTrials();
                 }
                 vm.trialOwnershipRemoveIdArr = null;
             });
            vm.confirmRemoveTrialOwnershipsPopUp = false;
        };
        /****************** implementations below ***************/
        var activate = function() {
            if(vm.userDetails.organization_id != null) {
                OrgService.getOrgById(vm.userDetails.organization_id).then(function(organization) {
                    var curOrg = {'id' : vm.userDetails.organization_id, 'name': organization.name};
                    vm.savedSelection.push(curOrg);
                    vm.selectedOrgsArray = angular.copy(vm.savedSelection);
                });
            }
            listenToStatesProvinces();
        }();

        /**
         * Listen to the message for availability of states or provinces
         * for the selected country
         */
        function listenToStatesProvinces() {
            if (vm.userDetails.country) {
                vm.watchCountrySelection(vm.userDetails.country);
            } else {
                vm.userDetails.country = 'United States'; //default country
                vm.watchCountrySelection(vm.userDetails.country);
            }

            $scope.$on(MESSAGES.STATES_AVAIL, function () {
                vm.states = OrgService.getStatesOrProvinces();
            });

            $scope.$on(MESSAGES.STATES_UNAVAIL, function () {
                vm.states = [];
            });


        } //listenToStatesProvinces
        
        $scope.$on(vm.redirectToAllUsers, function () {
            vm.states = [];
        });

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
            vm.getUserTrials();
        } //sortChangedCallBack

        //Listen to the write-mode switch
        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.gridOptions.gridMenuCustomItems = new UserService.TransferTrialsGridMenuItems($scope, vm);
        });
    }
})();
