/**
 * Created by wangg5, June 27th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('submissionValidCtrl', submissionValidCtrl);

    submissionValidCtrl.$inject = ['$scope', '$timeout', 'trialPhaseArr', 'primaryPurposeArr',
    'PATrialService'];

    function submissionValidCtrl($scope, $timeout, trialPhaseArr, primaryPurposeArr,
        PATrialService) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.trialPhaseArr = trialPhaseArr;
        vm.primaryPurposeArr = primaryPurposeArr;

        // actions
        vm.validateSubmission = validateSubmission;
        vm.resetForm = resetForm;

        console.info('trialPhaseArr: ', trialPhaseArr);
        console.info('primaryPurposeArr: ', primaryPurposeArr);

        activate();
        function activate() {
            _getTrialDetailCopy();
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
        }

        function validateSubmission() {
            console.info('validating submission....');
        } // validateSubmission

        function resetForm() {
            _getTrialDetailCopy();
        } // resetForm
    } // trialEmailLogsCtrl

})();
