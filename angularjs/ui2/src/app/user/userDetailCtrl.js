/**
 * Created by schintal on 9/12/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', 'PromiseTimeoutService', 'uiGridConstants','toastr','OrgService','userDetailObj','MESSAGES', '$rootScope', '$state', '$timeout', '$scope', 'AppSettingsService', 'URL_CONFIGS'];

    function userDetailCtrl(UserService, PromiseTimeoutService, uiGridConstants, toastr, OrgService, userDetailObj, MESSAGES, $rootScope, $state, $timeout, $scope, AppSettingsService, URL_CONFIGS) {
        var vm = this;

        $scope.userDetail_form = {};
        vm.userDetails = userDetailObj;
        vm.isCurationEnabled = UserService.isCurationModeEnabled();
        vm.userDetailsOrig = angular.copy(userDetailObj);
        vm.selectedOrgsArray = [];
        vm.savedSelection = [];
        vm.states = [];
        vm.userRole = UserService.getUserRole();
        vm.isCurrentUser = UserService.getCurrentUserId() === vm.userDetailsOrig.id;
        $rootScope.$broadcast('isWriteModeSupported', vm.userDetailsOrig.write_access);

        vm.updateUser = function (redirect) {

            vm.chooseTransferTrials = false;
            vm.showTransferTrialsModal = false;
            vm.showAddTrialsModal = false;
            if(vm.selectedOrgsArray.length >0) {
                vm.userDetails.organization_id = vm.selectedOrgsArray[0].id;
            }

            UserService.upsertUser(vm.userDetails).then(function(response) {
                if ( response.username ) {
                    toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
                }
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
            var newOrg = vm.selectedOrgsArray[0];
            // If form is invalid, return and let AngularJS show validation errors.
            if ($scope.userDetail_form.$invalid) {
                return;
            } else {
                if (vm.inactivatingUser || (vm.userDetailsOrig.organization_id !== vm.selectedOrgsArray[0].id && !_.where(vm.userDetailsOrig.family_orgs, {id: newOrg.id}).length) ) {
                    UserService.getUserTrialsOwnership(vm.searchParams).then(function (data) {
                        if (vm.gridTrialsOwnedOptions.totalItems > 0) {
                           if (vm.userRole === 'ROLE_ADMIN'
                                    || vm.userRole === 'ROLE_SUPER'
                                        || vm.userRole === 'ROLE_ACCOUNT-APPROVER'
                                            || vm.userRole === 'ROLE_SITE-SU') {
                                vm.chooseTransferTrials = true;
                                return;
                            } else if (vm.isCurrentUser) {
                               vm.updateAfterModalSave = true;
                               vm.confirmRemoveTrialOwnershipsPopUp = true;
                               return;
                            }
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
            var newOrg = vm.selectedOrgsArray[0];
            if (vm.userDetailsOrig.organization_id !== newOrg.id) {
                var review_id = _.where(vm.statusArr, {code: 'INR'})[0].id;
                if (vm.userRole === 'ROLE_SITE-SU') {
                    //because site admin loses accessibility to user
                    redirect = true;
                }
                if (//new org is not part of the family and user is not an admin
                    !_.where(vm.userDetailsOrig.family_orgs, {id: newOrg.id}).length
                        && vm.userRole !== 'ROLE_ADMIN' && vm.userRole !== 'ROLE_SUPER'
                            && vm.userRole !== 'ROLE_ACCOUNT-APPROVER') {
                    vm.userDetails.user_status_id = review_id;
                }
            }
            return redirect;
        };

        vm.saveWithoutTransfer = function() {
            vm.chooseTransferTrials = false;
            var redirect = vm.checkForOrgChange();

            UserService.endUserTrialsOwnership({user_id: vm.userDetails.id}).then(function (data) {
                if(data.results === 'success') {
                    vm.getUserTrials();
                    vm.updateUser(redirect);
                }
            });
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
                    if (role.id === vm.userDetails.role) {
                        vm.currentRoleName = role.name;
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

        UserService.getUserStatuses().then(function (response) {
            vm.statusArr = response.data;
            if (vm.userRole == 'ROLE_SITE-SU') {
                vm.statusArrForROLESITESU = _.filter(vm.statusArr, function (item, index) {
                    return _.contains(['ACT', 'INA', 'INR'], item.code);
                });
            }
            if (vm.userRole == 'ROLE_ACCOUNT-APPROVER') {
                vm.statusArrForROLEAPPROVER = _.filter(vm.statusArr, function (item, index) {
                    return _.contains(['ACT', 'INR', 'REJ'], item.code);
                });
            }
        });

        /**** USER TRIALS *****/
        // Initial User Search Parameters
        var TrialSearchParams = function (){
            return {
                user_id: vm.userDetails.id,
                sort: 'nci_id',
                order: 'desc',
                rows: 50,
                start: 1
            }
        }; //initial User Search Parameters


        vm.chooseTransferTrials = false;
        vm.showTransferTrialsModal = false;
        vm.showAddTrialsModal = false;

        vm.export_row_type = "visible";
        vm.export_column_type = "visible";
        vm.searchParams = new TrialSearchParams;
        vm.viewCount = vm.searchParams.start + vm.searchParams.rows - 1;
        vm.gridTrialsOwnedOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            paginationPageSizes: [10, 25, 50, 100, 1000],
            paginationPageSize: 50,
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
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.pa.trialOverview({trialId : row.entity.trial_id })">{{COL_FIELD}}</a></div>',
                    width: '180'
                },
                {
                    name: 'lead_org_name',
                    displayName: 'Lead Organization',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.orgDetail({orgId : row.entity.lead_org_id })">{{COL_FIELD}}</a></div>',
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
                    name: 'process_priority',
                    displayName: 'Processing Priority',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.viewTrial({trialId: row.entity.process_priority })">{{COL_FIELD}}</a></div>',
                    enableSorting: true,
                    width: '*'
                },
                {
                    name: 'ctep_id',
                    displayName: 'CTEP ID',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.viewTrial({trialId: row.entity.ctep_id })">{{COL_FIELD}}</a></div>',
                    enableSorting: true,
                    width: '*'
                },
                {
                    name: 'official_title',
                    displayName: 'Official Title for Trial',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.viewTrial({trialId: row.entity.trial_id })">{{COL_FIELD}}</a></div>',
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
                return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString() + ' - ' + vm.userDetails.username + ' owns a total of ' + vm.gridTrialsOwnedOptions.totalItems + ' trials.', style: 'footerStyle', margin: [40, 10, 40, 40] };
            },
            exporterPdfCustomFormatter: function ( docDefinition ) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterMenuAllData: true,
            exporterMenuPdfAll: true,
            exporterPdfOrientation: 'landscape',
            exporterPdfMaxGridWidth: 700
        };

        vm.gridTrialsOwnedOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortOwnedChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.getUserTrials();
            });
        };
        vm.gridTrialsOwnedOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS, allSearchParams).then(
                function (data) {
                    vm.gridTrialsOwnedOptions.useExternalPagination = false;
                    vm.gridTrialsOwnedOptions.useExternalSorting = false;
                    vm.gridTrialsOwnedOptions.data = data['trial_ownerships'];
                }
            );
        };

        vm.gridTrialsSubmittedOptions = angular.copy(vm.gridTrialsOwnedOptions);

        vm.gridTrialsSubmittedOptions.exporterPdfHeader.text = 'Trials submitted by ' + vm.userDetails.username + ':';
        vm.gridTrialsSubmittedOptions.exporterPdfFooter = function ( currentPage, pageCount ) {
            return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString() + ' - ' + vm.userDetails.username + ' submitted a total of ' + vm.gridTrialsSubmittedOptions.totalItems + ' trials.', style: 'footerStyle', margin: [40, 10, 40, 40] };
        };

        vm.gridTrialsSubmittedOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortSubmittedChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.getUserSubmittedTrials();
            });
        };
        vm.gridTrialsSubmittedOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_SUBMITTED_TRIALS, allSearchParams).then(
                function (data) {
                    vm.gridTrialsSubmittedOptions.useExternalPagination = false;
                    vm.gridTrialsSubmittedOptions.useExternalSorting = false;
                    vm.gridTrialsSubmittedOptions.data = data['trial_submissions'];
                }
            );
        };
        vm.getUserSubmittedTrials = function () {
            vm.gridTrialsSubmittedOptions.useExternalPagination = true;
            vm.gridTrialsSubmittedOptions.useExternalSorting = true;
            UserService.getUserTrialsSubmitted(vm.searchParams).then(function (data) {
                vm.gridTrialsSubmittedOptions.data = data['trial_submissions'];
                vm.gridTrialsSubmittedOptions.totalItems =  data.total;
            }).catch(function (err) {
                console.log('Get User Submitted Trials failed');
            });
        };
        vm.getUserSubmittedTrials();

        vm.gridTrialsOwnedOptions.gridMenuCustomItems = new UserService.TransferTrialsGridMenuItems($scope, vm);
        vm.getUserTrials = function () {
            vm.gridTrialsOwnedOptions.useExternalPagination = true;
            vm.gridTrialsOwnedOptions.useExternalSorting = true;
            UserService.getUserTrialsOwnership(vm.searchParams).then(function (data) {
                vm.gridTrialsOwnedOptions.data = data['trial_ownerships'];
                vm.gridTrialsOwnedOptions.totalItems =  data.total;
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
            vm.confirmRemoveTrialOwnershipsPopUp = false;
            vm.updateAfterModalSave = false;
        };
        vm.removeTrialsOwnerships = function () {
            var trialOwnershipIdArr = vm.trialOwnershipRemoveIdArr;

             var searchParams = {user_id: vm.userDetails.id};
             if (trialOwnershipIdArr) {
                searchParams['ids'] = trialOwnershipIdArr;
             }
             UserService.endUserTrialsOwnership(searchParams).then(function (data) {
                 if(data.results === 'success') {
                    toastr.success('Trial Ownership Removed', 'Success!');
                    vm.getUserTrials();
                 }
                 vm.trialOwnershipRemoveIdArr = null;
                 if (vm.updateAfterModalSave) {
                     vm.updateUser(vm.checkForOrgChange());
                     vm.updateAfterModalSave = false;
                 }
             });
            vm.confirmRemoveTrialOwnershipsPopUp = false;
        };
        /****************** implementations below ***************/
        var activate = function() {
            if(vm.userDetails.organization_id != null) {
                OrgService.getOrgById(vm.userDetails.organization_id).then(function(organization) {
                    vm.selectedOrgsArray = [{'id' : vm.userDetails.organization_id, 'name': organization.name}];
                });
            }
        }();
        
        $scope.$on(vm.redirectToAllUsers, function () {
            vm.states = [];
        });

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortOwnedChangedCallBack(grid, sortColumns) {

            if (sortColumns.length === 0) {
                vm.searchParams.sort = 'nci_id';
                vm.searchParams.order = 'desc';
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
        function sortSubmittedChangedCallBack(grid, sortColumns) {

            if (sortColumns.length === 0) {
                vm.searchParams.sort = 'nci_id';
                vm.searchParams.order = 'desc';
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
            vm.getUserSubmittedTrials();
        } //sortChangedCallBack

        //Listen to the write-mode switch
        $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
            vm.gridTrialsOwnedOptions.gridMenuCustomItems = new UserService.TransferTrialsGridMenuItems($scope, vm);
        });
    }
})();
