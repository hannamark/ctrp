

(function () {
    'use strict';

    angular.module('ctrp.app.pa')
        .controller('pamTrialCtrl', pamTrialCtrl);

    pamTrialCtrl.$inject = ['UserService', 'toastr', 'PromiseTimeoutService', 'uiGridConstants', 'userDetailObj','MESSAGES', '$rootScope', '$scope', '$filter', 'URL_CONFIGS'];

    function pamTrialCtrl(UserService, toastr, PromiseTimeoutService, uiGridConstants, userDetailObj, MESSAGES, $rootScope, $scope, $filter, URL_CONFIGS) {
        var vm = this;

        vm.userDetails = userDetailObj;
        vm.isCurationEnabled = UserService.isCurationModeEnabled();
        vm.userDetailsOrig = angular.copy(userDetailObj);
        vm.selectedOrgsArray = [];
        vm.savedSelection = [];
        vm.states = [];
        vm.userRole = UserService.getUserRole();
        vm.isCurrentUser = UserService.getCurrentUserId() === vm.userDetailsOrig.id;
        $rootScope.$broadcast('isWriteModeSupported', vm.userDetailsOrig.write_access);


        /**** TRIALS *****/
        // Initial Search Parameters
        var TrialSearchParams = function (){
            return {
                sort: 'nci_id',
                order: 'desc',
                rows: 50,
                start: 1
            }
        };


        vm.chooseTransferTrials = false;
        vm.showTransferTrialsModal = false;
        vm.showAddTrialsModal = false;

        vm.export_row_type = "visible";
        vm.export_column_type = "visible";
        vm.searchParams = new TrialSearchParams;
        vm.viewCount = vm.searchParams.start + vm.searchParams.rows - 1;
        vm.gridTrialsSubmittedOptions = {
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
                    '<a ui-sref="main.pa.trialOverview.trialIdentification({trialId : row.entity.trial_id })">{{COL_FIELD}}</a></div>',
                    width: '180'
                },
                {
                    name: 'submission_type_label',
                    displayName: 'Submission Type',
                    enableSorting: true,
                    width: '*',
                    minWidth: '150'
                },
                {
                    name: 'submission_received_date',
                    displayName: 'Submitted On',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '150'
                },
                {
                    name: 'expected_abstraction_completion_date',
                    displayName: 'Expected Abstraction Completion Date',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    minWidth: '200',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true,
                    enableHiding: false,
                    cellTemplate: '<i class="ui-grid-datepicker"><i class="glyphicon glyphicon-edit"></i><input  readonly="true"  show-button-bar="true" ' +
                    'datepicker-append-to-body="false" ng-model="row.entity.expected_abstraction_completion_date" close-text="Close" show-weeks="false" ' +
                    'ng-change="grid.appScope.dateModifyFlag(row.entity)" ng-disabled="grid.appScope.isCurationEnabled?false:true" ng-click="opened = true;" uib-datepicker-popup="MM/dd/yyyy" is-open="opened" ' +
                    'datepicker-options="grid.appScope.dateOptions" datepicker-append-to-body="true" type="text" /></div>',
                    cellFilter: 'date',
                    cellClass: function () {
                        return 'text-left';
                    },
                    filter: {
                        placeholder: 'date',
                        condition: uiGridConstants.filter.CONTAINS
                    },
                    sortable : false
                },
                {
                    name: 'submission_acceptance_date',
                    displayName: 'Accepted',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'onhold_date',
                    displayName: 'Current On-Hold Date',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'administrative_processing_completed_date',
                    displayName: 'Admin Abstraction Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'administrative_qc_completed_date',
                    displayName: 'Admin QC Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'scientific_processing_completed_date',
                    displayName: 'Scientific Abstraction Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'scientific_qc_completed_date',
                    displayName: 'Scientific QC Completed',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'admin_checkout',
                    displayName: 'Checked Out By',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'trial_summary_report_ready_date',
                    displayName: 'Ready for TSR',
                    enableSorting: true,
                    cellFilter: 'date:\'MM/dd/yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'business_days_since_submitted',
                    displayName: 'Business Days Since Submitted',
                    enableSorting: false,
                    width: '*',
                    minWidth: '200'
                }
            ],
            enableRowHeaderSelection : true,
            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: vm.userDetails.username + '-Submitted-trials.csv',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [0, 0, 0, 0]},
            exporterPdfTableHeaderStyle: {fontSize: 12, bold: true},
            exporterPdfHeader: {margin: [40, 10, 40, 40], text: 'PAM Trials :', style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
                return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString() + ' - from a total of ' + vm.gridTrialsSubmittedOptions.totalItems + ' trials.', style: 'footerStyle', margin: [40, 10, 40, 40] };
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
        vm.gridTrialsSubmittedOptions.appScopeProvider = vm;

        vm.dateModifyFlag = function (row) {
            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SUBMISSION_EXPECT_COMPLETE, {
                id:                                     row.id,
                expected_abstraction_completion_date:   $filter('date')(row.expected_abstraction_completion_date,'MMM dd, yyyy')
            }).then(function (data) {
                if(data.id) {
                    toastr.success('Expected Abstraction Completion Date has been updated', 'Operation Successful!');
                }
            }).catch(function (err) {
                console.log('Expected Abstraction Completion Date Update failed: ' + err);
            });
            
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
            vm.gridTrialsSubmittedOptions.useExternalPagination = true;
            vm.gridTrialsSubmittedOptions.useExternalSorting = true;
            UserService.getUserTrialsSubmitted(vm.searchParams).then(function (data) {
                vm.gridTrialsSubmittedOptions.data = data['trial_submissions'];
                vm.gridTrialsSubmittedOptions.totalItems = data.total;
            }).catch(function (err) {
                console.log('Get User Submitted Trials failed');
            });
        };
        vm.getUserSubmittedTrials();

        /****************** implementations below ***************/


        $scope.$on(vm.redirectToAllUsers, function () {
            vm.states = [];
        });

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
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
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
        });
    }
})();
