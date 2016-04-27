
/**
 * Created by dullam, February 12th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('trialHistoryCtrl', trialHistoryCtrl);

    trialHistoryCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr','AuditService','uiGridConstants','$uibModal','UserService','HOST','DateService'];

    function trialHistoryCtrl($scope, TrialService, MESSAGES,
                                     $timeout, _, PATrialService, toastr,AuditService,uiGridConstants,$uibModal,UserService,HOST,DateService) {
        var vm = this;
        vm.trialProcessingObj = {comment: '', priority: ''};
        vm.saveProcessingInfo = saveProcessingInfo;
        vm.resetView = resetView;
        vm.priorities = [
            {id: 1, name: 'High'},
            {id: 2, name: 'Normal'},
            {id: 3, name: 'Low'},
        ];

        vm.startDateOpened = false;
        vm.endDateOpened = false;
        vm.openCalendar = openCalendar;
        vm.submit = submit;
        vm.searchWarningMessage = '';
        vm.amendment_reasons_array = [];

        vm.updateParams = AuditService.getUpdateInitialSearchParams();
        //ui-grid plugin options
        vm.auditGridOptions = AuditService.getAuditsGridOptions();
        //vm.auditGridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        //vm.auditGridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;

        vm.updatesGridOptions = AuditService.getUpdatesGridOptions();


        vm.submissionsGridOptions = AuditService.getSubmissionsGridOptions();

        $scope.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download/';

        activate();

        function activate() {

            vm.auditGridOptions = AuditService.getAuditsGridOptions();
            vm.auditGridOptions.data =null;
            vm.auditGridOptions.totalItems = null;

            vm.updatesGridOptions = AuditService.getUpdatesGridOptions();
            vm.updatesGridOptions.data = null;
            vm.updatesGridOptions.totalItems = null;
            vm.updatesGridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
            vm.updatesGridOptions.enableHorizontalScrollbar  = uiGridConstants.scrollbars.WHEN_NEEDED;

            loadTrialUpdates();

            vm.submissionsGridOptions = AuditService.getSubmissionsGridOptions();
            vm.submissionsGridOptions.data = null;
            vm.submissionsGridOptions.totalItems = null;
            loadTrialSubmissions();


        }

        vm.updatesGridOptions.onRegisterApi = function(gridApi) {
            console.log("cbc");
            vm.gridApi = gridApi;

            gridApi.expandable.on.rowExpandedStateChanged($scope,function(row){


            });


            var cellTemplate = '<div \
  class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell" \
      ng-disabled="row.entity.subGridOptions.data.length == 0"> \
  <div \
    class="ui-grid-cell-contents"> \
    <i \
      ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" \
      ng-click="grid.api.expandable.toggleRowExpansion(row.entity)"> \
    </i> \
  </div> \
</div>';
            vm.gridApi.core.addRowHeaderColumn( { name: 'rowHeaderCol', displayName: '', width: 30, cellTemplate: cellTemplate} );

            //vm.updatesGridOptions.expandableRowHeight = row.entity.subGridOptions.data.length * 22;
                //console.log("@@@@@@@@@@"+ gridApi.rowData.);

                vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                vm.updateParams.start = newPage;
                vm.updateParams.rows = pageSize;
                loadTrialUpdates();
            });
        }; //gridOptions

        vm.updatesGridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
        vm.updatesGridOptions.enableHorizontalScrollbar  = uiGridConstants.scrollbars.WHEN_NEEDED;




        function loadTrialUpdates() {
            console.log("inside loads");
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;
            vm.trialHistoryObj = {trial_id: trialId, start: vm.updateParams.start, rows: vm.updateParams.rows};

            AuditService.getUpdates(vm.trialHistoryObj).then(function (data) {
                console.log('received search results ***: ' + JSON.stringify(data.trial_versions));
                var i =0
                for(i = 0; i < data.trial_versions.length; i++){
                    data.trial_versions[i].subGridOptions = {

                        data: data.trial_versions[i].friends
                    }
                }
               // if (data.trial_versions.length != 0) {
                    vm.updatesGridOptions.data = data.trial_versions;
                    vm.updatesGridOptions.totalItems = data.total;
                //}
            }).catch(function (err) {
                console.log('Getting trial updates failed');
            }).finally(function () {
                console.log('search finished');
            });
        }


        function loadTrialSubmissions() {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;
            vm.trialHistoryObj = {trial_id: trialId};

            AuditService.getSubmissions(vm.trialHistoryObj).then(function (data) {
                console.log('received search results: ' + JSON.stringify(data.trial_versions));
                vm.submissionsGridOptions.data = data.trial_versions;
                vm.submissionsGridOptions.totalItems = data.trial_versions["length"];
                vm.amendment_reasons_array = data.amendement_reasons;
                console.log("reasons" + JSON.stringify(vm.amendment_reasons_array));
            }).catch(function (err) {
                console.log('Getting trial submissions failed');
            }).finally(function () {
                console.log('search finished');
            });
        }


        /**
         * Get trial detail object from parent scope
         */
        function getTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, _getProcessingInfo);
        }


        function _getProcessingInfo() {
            $timeout(function () {
                var _defaultPriority = _.findWhere(vm.priorities, {name: $scope.$parent.paTrialOverview.trialDetailObj.process_priority}) || vm.trialProcessingObj.priority;
                vm.trialProcessingObj = {
                    trialId: $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId,
                    priority: _defaultPriority || 'Normal',
                    comment: $scope.$parent.paTrialOverview.trialDetailObj.process_comment || vm.trialProcessingObj.comment
                };
            }, 0);
        }

        /* implementations below */
        function saveProcessingInfo() {
            //console.log('processing info: ', vm.trialProcessingObj);
            var updatedTrial = PATrialService.getCurrentTrialFromCache();
            console.log('processing, lock_version: ' + updatedTrial.lock_version);
            //angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
            updatedTrial.process_priority = vm.trialProcessingObj.priority.name;
            updatedTrial.process_comment = vm.trialProcessingObj.comment;
            console.log('updated trial: ', updatedTrial);

            TrialService.upsertTrial(updatedTrial).then(function (res) {
                console.log('priority and commented updated: ', res);
                updatedTrial.lock_version = res.lock_version;
                PATrialService.setCurrentTrial(updatedTrial);
                $scope.$emit('updatedInChildScope', {});
                toastr.clear();
                toastr.success('Trial processing information has been recorded', 'Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            });
        }

        function resetView() {
            vm.trialProcessingObj.comment = $scope.$parent.paTrialOverview.trialDetailObj.comment || '';
            vm.trialProcessingObj.priority = $scope.$parent.paTrialOverview.trialDetailObj.priority || '';
        }


        function openCalendar($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'start_date') {
                vm.startDateOpened = !vm.startDateOpened;
            } else if (type === 'end_date') {
                vm.endDateOpened = !vm.endDateOpened;
            }
        }; //openCalendar




        function submit() {

            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;
            var startDate = vm.start_date;
            var endDate = vm.end_date;
            vm.trialHistoryObj = {trial_id: trialId, start_date: startDate, end_date: endDate};
            if (startDate != null && endDate != null) {
                vm.searchWarningMessage=''
                AuditService.getAudits(vm.trialHistoryObj).then(function (data) {
                    console.log('received search results: ' + JSON.stringify(data.trial_versions));
                    vm.auditGridOptions.data = data.trial_versions;
                    vm.auditGridOptions.totalItems = data.trial_versions["length"];
                }).catch(function (err) {
                    console.log('Getting audit trials failed');
                }).finally(function () {
                    console.log('search finished');
                    vm.searching = false;
                });
            }else{
                vm.searchWarningMessage='Start Date and End Date can not be null'
            }

            }

        $scope.buttonClick = function(value) {
            alert('Row: ' + value.submission_num);
        };

        $scope.editRow= function(grid, row,gridType) {

            console.log("**************"+JSON.stringify(vm.amendment_reasons_array));

            console.log(gridType);



            if(gridType == "updates") {
                $uibModal.open({
                    templateUrl: 'acknowledgeModal.html',
                    controller: ['$uibModalInstance', 'grid', 'row', UpdateModalInstanceController],
                    controllerAs: 'vm',
                    resolve: {
                        grid: function () { return grid; },
                        row: function () { return row; }
                    }


                });
            } else if(gridType == "submissions") {
                $uibModal.open({
                    templateUrl: 'submissionsModal.html',
                    controller: ['$uibModalInstance', 'grid', 'row','reasonsArr', SubmissionModalInstanceController],
                    controllerAs: 'vm',
                    resolve: {
                        grid: function () { return grid; },
                        row: function () { return row; },
                        reasonsArr: function () {return vm.amendment_reasons_array;}
                    }


                });

            }


        }

        /* @ngInject */
        function UpdateModalInstanceController($uibModalInstance, grid, row) {

            var vm = this;
            vm.entity = angular.copy(row.entity);
            vm.submission_num = row.entity.submission_num;
            vm.submission_date = DateService.convertISODateToLocaleDateStr(row.entity.submission_date);
            vm.acknowledgeUpdate = acknowledgeUpdate;

            function acknowledgeUpdate() {
                vm.entity.acknowledge ="Yes";
                vm.entity.acknowledge_date = new Date();
                vm.entity.acknowledged_by = UserService.getLoggedInUsername();

                var obj={'id':row.entity.id,
                    'acknowledge_comment':vm.entity.acknowledge_comment,
                    'acknowledge':vm.entity.acknowledge,
                    'acknowledge_date':vm.entity.acknowledge_date,
                    'acknowledged_by':vm.entity.acknowledged_by};

                var resStatus=null;
                AuditService.upsertSubmission(obj).then(function(response) {
                    resStatus = response.server_response.status;

                    if (response.server_response.status === 200) {
                        vm.entity.acknowledge_date = DateService.convertISODateToLocaleDateStr(vm.entity.acknowledge_date);
                        row.entity = angular.extend(row.entity, vm.entity);

                        toastr.clear();
                        toastr.success('Submission has been acknowledged', 'Operation Successful!', {
                            extendedTimeOut: 1000,
                            timeOut: 0
                        })

                    } else {
                        console.log("Error " + response.server_response.status);

                    }

                }).catch(function(err) {
                    console.log("error acknowledging trial submission ");
                }).finally(function() {
                    // TODO: change the visibility here
                    if (resStatus>210) {
                    }

                });

                $uibModalInstance.close(row.entity);


            }

        }

        /* @ngInject */
        function SubmissionModalInstanceController($uibModalInstance, grid, row,reasonsArr) {

            var vm = this;
            vm.entity = angular.copy(row.entity);
            vm.reasonArr = reasonsArr;
            vm.updateSubmission = updateSubmission;
            vm.amendmentDateOpened = false;
            vm.openCalendar = openCalendar;

            function openCalendar($event, type) {
                $event.preventDefault();
                $event.stopPropagation();

                if (type === 'amendment_date') {
                    vm.amendmentDateOpened = !vm.amendmentDateOpened;
                }
            }; //openCalendar


            function updateSubmission() {

                var obj={'id':row.entity.id,
                    'amendment_num':vm.entity.amendment_num,
                    'amendment_date':vm.entity.amendment_date,
                    'amendment_reason_id':vm.entity.amendment_reason_id};

                var resStatus=null;
                AuditService.upsertSubmission(obj).then(function(response) {
                    resStatus = response.server_response.status;

                    if (response.server_response.status === 200) {
                        vm.entity.submission_type_list=[];
                        vm.entity.submission_type_list.push("Amendment");
                        vm.entity.submission_type_list.push("Date:" + DateService.convertISODateToLocaleDateStr(vm.entity.amendment_date));
                        vm.entity.submission_type_list.push("Reason:" +vm.entity.amendment_reason_id);
                        vm.entity.submission_type_list.push("Number:" +vm.entity.amendment_num);
                        vm.entity.submission_type ="Amendment";

                        row.entity = angular.extend(row.entity.submission_type_list, vm.entity.submission_type_list);
                        row.entity = angular.extend(row.entity, vm.entity);



                        toastr.clear();
                        toastr.success('Submission has been acknowledged', 'Operation Successful!', {
                            extendedTimeOut: 1000,
                            timeOut: 0
                        })

                    } else {
                        console.log("Error " + response.server_response.status);

                    }

                }).catch(function(err) {
                    console.log("error acknowledging trial submission ");
                }).finally(function() {
                    // TODO: change the visibility here
                    if (resStatus>210) {
                    }

                });

                $uibModalInstance.close(row.entity);


            }




        }




    } //trialHistoryCtrl

})();
