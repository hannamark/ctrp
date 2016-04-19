
/**
 * Created by dullam, February 12th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('trialHistoryCtrl', trialHistoryCtrl);

    trialHistoryCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr','DateService','AuditService','uiGridConstants','$uibModal','UserService'];

    function trialHistoryCtrl($scope, TrialService, MESSAGES,
                                     $timeout, _, PATrialService, toastr,DateService,AuditService,uiGridConstants,$uibModal,UserService) {
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

        //ui-grid plugin options
        vm.auditGridOptions = AuditService.getAuditsGridOptions();
        //vm.auditGridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        //vm.auditGridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;

        vm.updatesGridOptions = AuditService.getUpdatesGridOptions();


        activate();

        function activate() {
            // getTrialDetailObj();
            //_getProcessingInfo();
            vm.auditGridOptions = AuditService.getAuditsGridOptions();
            vm.auditGridOptions.data =null;
            vm.auditGridOptions.totalItems = null;

            vm.updatesGridOptions = AuditService.getUpdatesGridOptions();
            vm.updatesGridOptions.data = null;
            vm.updatesGridOptions.totalItems = null;
            loadTrialUpdates();

        }

        function loadTrialUpdates() {
            var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;
            vm.trialHistoryObj = {trial_id: trialId};

            AuditService.getUpdates(vm.trialHistoryObj).then(function (data) {
                console.log('received search results: ' + JSON.stringify(data.trial_versions));
                var i =0
                for(i = 0; i < data.trial_versions.length; i++){
                    data.trial_versions[i].subGridOptions = {
                        columnDefs: [ {name:"Field", field:"field"}, {name:"old value", field:"old_value"},{name:"new value", field:"new_value"} ],
                        data: data.trial_versions[i].friends
                    }
                }

                vm.updatesGridOptions.data = data.trial_versions;
                vm.updatesGridOptions.totalItems = data.trial_versions["length"];
            }).catch(function (err) {
                console.log('Getting trial updates failed');
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

        $scope.editRow= function(grid, row) {

            $uibModal.open({
                template: '<div>'+
                          '<div class="modal-header">'+
                          '<h3 class="modal-title">Acknowledge Update</h3>'+
                          '</div>'+
                          '<div class="modal-body">'+
                          '<form >Comment: <input type="text" ng-model="vm.entity.acknowledge_comment"></form>'+
                          '</div>'+
                          '<div class="modal-footer">'+
                          '<button class="btn btn-success" ng-click="vm.save()">Acknowledge</button>'+
                          '<button class="btn btn-warning" ng-click="$close()">Cancel</button>'+
                          '</div>'+
                          '</div>',
                controller: ['$uibModalInstance', 'grid', 'row', ModalInstanceController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () { return grid; },
                    row: function () { return row; }
                }
            });
        }

        /* @ngInject */
        function ModalInstanceController($uibModalInstance, grid, row) {

            var vm = this;
            vm.entity = angular.copy(row.entity);


            vm.save = save;

            function save() {
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

                        row.entity = angular.extend(row.entity, vm.entity);

                        toastr.clear();
                        toastr.success('Submission has been acknowledged', 'Operation Successful!', {
                            extendedTimeOut: 1000,
                            timeOut: 0
                        })

                    } else {
                        console.log("error while trying to save  bio markers" + response.server_response.status);

                    }

                }).catch(function(err) {
                    console.log("error acknowledging trial submission ");
                }).finally(function() {
                    // TODO: change the visibility here
                    if (resStatus>210) {
                    }

                });

                console.log(vm.entity.acknowledge_comment);
                // Copy row values over
                $uibModalInstance.close(row.entity);


            }
        }




    } //trialHistoryCtrl

})();
