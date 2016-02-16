
/**
 * Created by dullam, February 12th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('trialHistoryCtrl', trialHistoryCtrl);

    trialHistoryCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr','DateService','AuditService','uiGridConstants'];

    function trialHistoryCtrl($scope, TrialService, MESSAGES,
                                     $timeout, _, PATrialService, toastr,DateService,AuditService,uiGridConstants) {
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


        //ui-grid plugin options
        vm.gridOptions = AuditService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;


        activate();

        function activate() {
           // getTrialDetailObj();
            //_getProcessingInfo();
        }

        /**
         * Get trial detail object from parent scope
         */
        function getTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, _getProcessingInfo);
        }


        function _getProcessingInfo() {
            $timeout(function() {
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

            TrialService.upsertTrial(updatedTrial).then(function(res) {
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


        function openCalendar ($event, type) {
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
            console.log(startDate);
            vm.trialHistoryObj = {trial_id: trialId, start_date: startDate, end_date: endDate};

                AuditService.getAudits(vm.trialHistoryObj).then(function (data) {
                console.log('received search results: ' + JSON.stringify(data.trial_versions));
                vm.gridOptions.data = data.trial_versions;
                vm.gridOptions.totalItems = data.total;
                    console.log(data.total)
                    console.log(data.trial_versions.size)
            }).catch(function (err) {
                console.log('Getting audit trials failed');
            }).finally(function() {
                console.log('search finished');
                vm.searching = false;
            });
        }


    } //trialHistoryCtrl

})();
