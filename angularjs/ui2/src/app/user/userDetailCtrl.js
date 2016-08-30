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

        vm.userDetailsOrig = angular.copy(userDetailObj);
        if (vm.userDetailsOrig.username) {
            if (vm.userDetailsOrig.username.indexOf('nihusernothaveanaccount') > - 1) {
                vm.userDetailsOrig.username = '';
            }
            vm.userDetails = angular.copy(vm.userDetailsOrig);
        } else {
            vm.pageFauilure = true;
            return;
        }

        vm.isCurationEnabled = UserService.isCurationModeEnabled();
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
                if (response.username) {
                    toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
                    if (vm.userDetailsOrig.username !== response.username) {
                        $state.go('main.userDetail', response, {reload: true});
                    }
                }
                if (vm.logUserOut === true){
                    vm.logUserOut = false;
                    UserService.logout();
                } else if (redirect) {
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

        vm.validateUserName = function() {

            UserService.searchUsers({username: vm.userDetails.username}).then(function (data) {
                if ( data.total >  0 && vm.userDetails.username !== vm.userDetailsOrig.username){
                    vm.newUserNameInvalid = true;
                } else {
                    vm.newUserNameInvalid = false;
                }
            }).catch(function (err) {
                console.log('Search Users failed: ' + err);
            });
        };

        vm.validateSave = function() {
            var newOrg = vm.selectedOrgsArray[0];

            // if inactivating user or changing org of user, check to transfer trials if trials exist
            // otherwise if it is current user changing org, give warning popup up and safe after po up OK
            if (vm.inactivatingUser || (vm.userDetailsOrig.organization_id !== vm.selectedOrgsArray[0].id && !_.where(vm.userDetailsOrig.family_orgs, {id: newOrg.id}).length) ) {
                UserService.getUserTrialsOwnership(vm.searchParams).then(function (data) {
                    vm.userOptions.data = data['trial_ownerships'];
                    vm.userOptions.totalItems = data.total;
                    if (vm.userOptions.totalItems > 0
                           && (vm.userRole === 'ROLE_ADMIN'
                                || vm.userRole === 'ROLE_SUPER'
                                    || vm.userRole === 'ROLE_ACCOUNT-APPROVER'
                                        || vm.userRole === 'ROLE_SITE-SU') ) {
                            if ( vm.isCurrentUser && vm.checkForOrgChange() ) {
                                vm.logUserOut = true;
                            }
                            vm.chooseTransferTrials = true;
                            return;
                    } else if (vm.isCurrentUser) {
                        vm.updateAfterModalSave = true;
                        vm.logUserOut = true;
                        vm.confirmChangeFamilyPopUp = true;
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
                    if (vm.userDetails.role === 'ROLE_SITE-SU') {
                        vm.userDetails.role = 'ROLE_TRIAL-SUBMITTER';
                    }
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
                vm.statusArrForROLESITESU = _.filter(vm.statusArr, function (item) {
                    var allowedStatus = ['INR'];
                    if (vm.userDetails.status_date) {
                        allowedStatus.push('ACT', 'INA');
                    }
                    return _.contains(allowedStatus, item.code);
                });
            } else if (vm.userRole == 'ROLE_ACCOUNT-APPROVER') {
                vm.statusArrForROLEAPPROVER = _.filter(vm.statusArr, function (item) {
                    var allowedStatus = ['ACT', 'INR'];
                    return _.contains(allowedStatus, item.code);
                });
            } else {
                vm.statusArrForROLESITESU = _.filter(vm.statusArr, function (item) {
                    var allowedStatus = ['ACT', 'INR'];
                    if (!vm.userDetails.status_date) {
                    } else {
                        allowedStatus.push('INA', 'DEL');
                    }
                    return _.contains(allowedStatus, item.code);
                });
            }
        });

        /**** USER TRIALS *****/
        // Initial User Search Parameters
        var TrialSearchParams = function (){
            return {
                user_id: vm.userDetails.id,
                protocol_id: '*',
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
        vm.userOptions = {
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
                    name: 'lead_org_name',
                    displayName: 'Lead Organization',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.orgDetail({orgId : row.entity.lead_org_id })">{{COL_FIELD}}</a></div>',
                    enableSorting: false,
                    width: '*',
                    minWidth: '300'
                },
                {
                    name: 'lead_protocol_id',
                    displayName: 'Lead Org PO ID',
                    enableSorting: true,
                    width: '205'
                },
                {
                    name: 'process_priority',
                    displayName: 'Processing Priority',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.viewTrial({trialId: row.entity.process_priority })">{{COL_FIELD}}</a></div>',
                    enableSorting: true,
                    width: '200'
                },
                {
                    name: 'ctep_id',
                    displayName: 'CTEP ID',
                    enableSorting: true,
                    width: '110'
                },
                {
                    name: 'dcp_id',
                    displayName: 'DCP ID',
                    enableSorting: true,
                    width: '*',
                    minWidth: '150'
                }
            ],
            enableRowHeaderSelection : true,
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: vm.userDetails.username + '-owned-trials.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [0, 0, 0, 0]},
            exporterPdfTableHeaderStyle: {fontSize: 12, bold: true},
            exporterPdfHeader: {margin: [40, 10, 40, 40], text: 'Trials owned by ' + vm.userDetails.username + ':', style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
                return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString() + ' - ' + vm.userDetails.username + ' owns a total of ' + vm.userOptions.totalItems + ' trials.', style: 'footerStyle', margin: [40, 10, 40, 40] };
            },
            exporterPdfCustomFormatter: function ( docDefinition ) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterPdfOrientation: 'landscape',
            exporterPdfMaxGridWidth: 700
        };


        var writeNciId = {
            name: 'nci_id',
            enableSorting: true,
            displayName: 'NCI Trial Identifier',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                '<a ui-sref="main.pa.trialOverview({trialId : row.entity.trial_id })">{{COL_FIELD}}</a></div>',
            width: '180'
        };
        var readNciId = {
            name: 'nci_id',
            enableSorting: true,
            displayName: 'NCI Trial Identifier',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            '<a ui-sref="main.viewTrial({trialId : row.entity.trial_id })">{{COL_FIELD}}</a></div>',
            width: '180'
        };
        var writeTitle = {
            name: 'official_title',
            displayName: 'Official Title',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
        '<a ui-sref="main.pa.trialOverview({trialId: row.entity.trial_id })">{{COL_FIELD}}</a></div>',
            enableSorting: true,
            width: '*',
            minWidth: '250'
        };
        var readTitle = {
            name: 'official_title',
            displayName: 'Official Title',
            cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
            '<a ui-sref="main.viewTrial({trialId: row.entity.trial_id })">{{COL_FIELD}}</a></div>',
            enableSorting: true,
            width: '*',
            minWidth: '250'
        };

        if (vm.userDetails.write_access && vm.userRole != 'ROLE_TRIAL-SUBMITTER' && vm.userRole != 'ROLE_ACCRUAL-SUBMITTER') {
            vm.userOptions.columnDefs.splice(0, 0, writeNciId);
            vm.userOptions.columnDefs.splice(4, 0, writeTitle);
            addRemainingFields();
        } else {
            vm.userOptions.columnDefs.splice(4, 0, readTitle);
            vm.userOptions.columnDefs.splice(0, 0, readNciId);
            addRemainingFields();
        }

        function addRemainingFields() {
            vm.userOptions.columnDefs.splice(7, 0,
                {
                    name: 'current_milestone_name',
                    displayName: 'Current Milestone, Milestone Date',
                    enableSorting: true,
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD.replace(" Date", ", " + row.entity.current_submission_date)}}</div>',
                    width: '*',
                    minWidth: '300'
                },
                {
                    name: 'current_administrative_milestone',
                    displayName: 'Current Admin Milestone, Milestone Date',
                    enableSorting: true,
                    width: '*',
                    minWidth: '350'
                },
                {
                    name: 'current_scientific_milestone',
                    displayName: 'Current Scientific Milestone, Milestone Date',
                    enableSorting: true,
                    width: '*',
                    minWidth: '350'
                },
                {
                    name: 'current_processing_status',
                    displayName: 'Current Processing Status',
                    enableSorting: true,
                    width: '*',
                    minWidth: '250'
                },
                {
                    name: 'current_processing_status_date',
                    displayName: 'Current Processing Status Date',
                    enableSorting: true,
                    width: '*',
                    minWidth: '250'
                },
                {
                    name: 'clinical_research_category',
                        displayName: 'Clinical Research Category',
                    enableSorting: true,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'submission_type_label',
                    displayName: 'Submission Type',
                    enableSorting: true,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'verification_date',
                    displayName: 'Record Verification Date',
                    enableSorting: true,
                    width: '*',
                    minWidth: '250'
                },
                {
                    name: 'onhold_desc',
                    displayName: 'On Hold Reasons',
                    enableSorting: true,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'onhold_date',
                    displayName: 'On Hold Dates',
                    enableSorting: true,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'submission_method_name',
                    displayName: 'Submission Method',
                    enableSorting: true,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'checkout',
                    displayName: 'Checked Out By',
                    enableSorting: true,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    cellTemplate: "<div class=\"ui-grid-cell-contents tooltip-uigrid\" >{{grid.appScope.getCheckOut(row.entity.checkout)}}</div>",
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'id',
                    displayName: 'View TSR',
                    enableSorting: false,
                    cellTemplate: "<div class=\"ui-grid-cell-contents tooltip-uigrid\" ><a ui-sref=\"main.pa.trialOverview.viewTSR({trialId: row.entity.id })\" ui-sref-opts=\"{reload: true}\" >View TSR</a></div>",
                    width: '*',
                    minWidth: '200'
                }
            );
        }

        vm.userOptions.appScopeProvider = vm;

        vm.getCheckOut = UserService.getCheckOut;

        vm.userOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortOwnedChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchOwnedParams.start = newPage;
                vm.searchOwnedParams.rows = pageSize;
                vm.getUserTrials();
            });
        };
        vm.userOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchOwnedParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS, allSearchParams).then(
                function (data) {
                    vm.userOptions.useExternalPagination = false;
                    vm.userOptions.useExternalSorting = false;
                    vm.userOptions.data = data['trials'];
                }
            );
        };

        /**** start copy for submitted */
        vm.gridTrialsSubmittedOptions = angular.copy(vm.userOptions);
        vm.gridTrialsSubmittedOptions.exporterCsvFilename = vm.userDetails.username + '-submitted-trials.csv';
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
            //user_id is undefined if no user was found to begin with
            if (vm.searchParams.user_id) {
                vm.gridTrialsSubmittedOptions.useExternalPagination = true;
                vm.gridTrialsSubmittedOptions.useExternalSorting = true;
                UserService.getUserTrialsSubmitted(vm.searchParams).then(function (data) {
                    vm.gridTrialsSubmittedOptions.data = data['trial_submissions'];
                    vm.gridTrialsSubmittedOptions.totalItems = data.total;
                }).catch(function (err) {
                    console.log('Get User Submitted Trials failed');
                });
            }
        };
        vm.getUserSubmittedTrials();
        /**** end copy for submitted */

        /**** start copy for participating */
        vm.gridTrialsParticipationOptions = angular.copy(vm.userOptions);
        vm.gridTrialsParticipationOptions.exporterCsvFilename = vm.userDetails.username + '-participation-trials.csv';

        vm.gridTrialsParticipationOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortSubmittedChangedCallBack);
            vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.getUserParticipationTrials();
            });
        };
        vm.gridTrialsParticipationOptions.exporterAllDataFn = function () {
            var allSearchParams = angular.copy(vm.searchParams);
            allSearchParams.start = null;
            allSearchParams.rows = null;
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_SUBMITTED_TRIALS, allSearchParams).then(
                function (data) {
                    vm.gridTrialsParticipationOptions.useExternalPagination = false;
                    vm.gridTrialsParticipationOptions.useExternalSorting = false;
                    vm.gridTrialsParticipationOptions.data = data['trial_submissions'];
                }
            );
        };

        vm.searchParticipatingParams = new TrialSearchParams;
        vm.searchParticipatingParams.type = 'participating';
        vm.searchParticipatingParams.org_id = vm.userDetails.organization_id
        vm.searchParticipatingParams.user_id = undefined;
        vm.getUserParticipationTrials = function () {
            vm.gridTrialsParticipationOptions.useExternalPagination = true;
            vm.gridTrialsParticipationOptions.useExternalSorting = true;
            UserService.getUserTrialsParticipation(vm.searchParticipatingParams).then(function (data) {
                vm.gridTrialsParticipationOptions.data = data['trial_submissions'];
                vm.gridTrialsParticipationOptions.totalItems = data.total;
            }).catch(function (err) {
                console.log('Get User Participation Trials failed');
            });
        };
        vm.getUserParticipationTrials();
        /**** end copy for participating */

        vm.userOptions.gridMenuCustomItems = new UserService.TransferTrialsGridMenuItems($scope, vm);

        vm.searchOwnedParams = new TrialSearchParams;
        vm.searchOwnedParams.type = 'own';
        vm.getUserTrials = function () {
            //user_id is undefined if no user was found to begin with
            if (vm.searchOwnedParams.user_id) {
                vm.userOptions.useExternalPagination = true;
                vm.userOptions.useExternalSorting = true;
                UserService.getUserTrialsSubmitted(vm.searchOwnedParams).then(function (data) {
                    vm.userOptions.data = data['trial_submissions'];
                    vm.userOptions.totalItems = data.total;
                }).catch(function (err) {
                    console.log('Get User Owned Trials failed');
                });
            }
        };
        vm.getUserTrials();

        vm.trialOwnershipRemoveIdArr = null;
        vm.confirmRemoveTrialOwnershipsPopUp = false;
        vm.confirmChangeFamilyPopUp = false;
        vm.confirmRemoveTrialsOwnerships = function (trialOwnershipIdArr) {
            vm.confirmRemoveTrialOwnershipsPopUp = true;
            vm.trialOwnershipRemoveIdArr = trialOwnershipIdArr;
        };
        vm.cancelRemoveTrialsOwnerships = function () {
            vm.confirmRemoveTrialOwnershipsPopUp = false;
            vm.confirmChangeFamilyPopUp = false;
            vm.updateAfterModalSave = false;
            vm.logUserOut = false;
        };
        vm.removeTrialsOwnerships = function () {

            if (vm.userRole === 'ROLE_SITE-SU') {
                //demote
                vm.userDetails.role = 'ROLE_TRIAL-SUBMITTER';
            }

            //if you are admin offer to transfer
            if (vm.userOptions.totalItems > 0 && vm.isCurrentUser && vm.userRole === 'ROLE_SITE-SU') {
                vm.chooseTransferTrials = true;
                vm.confirmChangeFamilyPopUp = false;
            } else {
                var trialOwnershipIdArr = vm.trialOwnershipRemoveIdArr;

                var searchParams = {user_id: vm.userDetails.id};
                if (trialOwnershipIdArr) {
                    searchParams['trial_ids'] = trialOwnershipIdArr;
                }
                UserService.endUserTrialsOwnership(searchParams).then(function (data) {
                    if (data.results === 'success') {
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
                vm.confirmChangeFamilyPopUp = false;
            }
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
            vm.userOptions.gridMenuCustomItems = new UserService.TransferTrialsGridMenuItems($scope, vm);
        });
    }
})();
