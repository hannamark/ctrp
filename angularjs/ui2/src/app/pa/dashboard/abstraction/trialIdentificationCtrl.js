
/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialIdentificationCtrl', trialIdentificationCtrl);

    trialIdentificationCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES'];

    function trialIdentificationCtrl($scope, TrialService, MESSAGES) {
        var vm = this;
        vm.trialProcessingObj = {};
        vm.saveProcessingInfo = saveProcessingInfo;
        vm.resetView = resetView;

        activate();

        function activate() {
            getTrialDetailObj();
        }

        /**
         * Get trial detail object from parent scope
         */
        function getTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                //get the processing info from parent scope
                vm.trialProcessingObj = {
                    trialId: $scope.$parent.paTrialOverview.trialDetailObj.id,
                    priority: $scope.$parent.paTrialOverview.trialDetailObj.process_priority || '2 - Normal',
                    comment: $scope.$parent.paTrialOverview.trialDetailObj.process_comment
                };
            });
        }

        /* implementations below */
        function saveProcessingInfo() {
            //console.log('processing info: ', vm.trialProcessingObj);

            var updatedTrial = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
            updatedTrial.process_priority = vm.trialProcessingObj.priority;
            updatedTrial.process_comment = vm.trialProcessingObj.comment;
            // updatedTrial.id = vm.trialProcessingObj.trialId;
            // updatedTrial.trial =

            TrialService.upsertTrial(updatedTrial).then(function(res) {
                console.log('priority and commented updated: ', res);
            });
        }

        function resetView() {
            vm.trialProcessingObj.comment = '';
            vm.trialProcessingObj.priority = '2 - Normal';
        }

    } //trialIdentificationCtrl

})();
