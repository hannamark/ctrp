
/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialIdentificationCtrl', trialIdentificationCtrl);

    trialIdentificationCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES', '$timeout', '_'];

    function trialIdentificationCtrl($scope, TrialService, MESSAGES, $timeout, _) {
        var vm = this;
        vm.trialProcessingObj = {comment: '', priority: ''};
        vm.saveProcessingInfo = saveProcessingInfo;
        vm.resetView = resetView;
        vm.priorities = [
            {id: 1, name: 'High'},
            {id: 2, name: 'Normal'},
            {id: 3, name: 'Low'},
        ];

        activate();

        function activate() {
            getTrialDetailObj();
            _getProcessingInfo();
        }

        /**
         * Get trial detail object from parent scope
         */
        function getTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, _getProcessingInfo);
        }


        function _getProcessingInfo() {
            $timeout(function() {
                vm.trialProcessingObj = {
                    trialId: $scope.$parent.paTrialOverview.trialDetailObj.id,
                    priority: _.findWhere(vm.priorities, {name: $scope.$parent.paTrialOverview.trialDetailObj.process_priority}) || 'Normal',
                    comment: $scope.$parent.paTrialOverview.trialDetailObj.process_comment
                };
            }, 0);
        }

        /* implementations below */
        function saveProcessingInfo() {
            //console.log('processing info: ', vm.trialProcessingObj);

            var updatedTrial = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
            updatedTrial.process_priority = vm.trialProcessingObj.priority.name;
            updatedTrial.process_comment = vm.trialProcessingObj.comment;
            console.log('updated trial: ', updatedTrial);

            TrialService.upsertTrial(updatedTrial).then(function(res) {
                console.log('priority and commented updated: ', res);
            });
        }

        function resetView() {
            vm.trialProcessingObj.comment = $scope.$parent.paTrialOverview.trialDetailObj.comment || '';
            vm.trialProcessingObj.priority = $scope.$parent.paTrialOverview.trialDetailObj.priority || '';
        }

    } //trialIdentificationCtrl

})();
