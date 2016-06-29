/**
 * Created by wangg5, June 27th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('submissionValidCtrl', submissionValidCtrl);

    submissionValidCtrl.$inject = ['$scope', '$timeout', 'trialPhaseArr', 'primaryPurposeArr',
    'PATrialService', '_', 'amendmentReasonObj'];

    function submissionValidCtrl($scope, $timeout, trialPhaseArr, primaryPurposeArr,
        PATrialService, _, amendmentReasonObj) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.disableBtn = false;
        vm.isOtherPrimaryPurpose = false;
        vm.isAmendmentSubmission = false; // TODO: submission_type_code in submissions array of objects
        vm.isOriginalSubmission = false; // TODO:
        // TODO: assign submissions to submissions_attributes if any 
        vm.trialPhaseArr = trialPhaseArr;
        vm.primaryPurposeArr = primaryPurposeArr;
        vm.amendReasonArr = amendmentReasonObj.data || [];

        // actions
        vm.validateSubmission = validateSubmission;
        vm.resetForm = resetForm;
        console.info('amendmentReasonArr: ', vm.amendReasonArr);
        console.info('amend_reason_id: ', vm.trialDetailObj.amendment_reason_id);

        activate();
        function activate() {
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
        }

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposeArr, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // reset to original data or empty
                    vm.trialDetailObj.primary_purpose_other = _resetValueForField('primary_purpose_other');
                }
            });
        } // _watchPrimaryPurpose

        /**
         * Get the value for the fieldName in the cached trial object
         * @param  {[type]} fieldName [description]
         * @return {String}  a String value that could be a blank String
         */
        function _resetValueForField(fieldName) {
            var cachedTrial = PATrialService.getCurrentTrialFromCache();
            var val = cachedTrial[fieldName] || '';
            return val;
        }

        function validateSubmission() {
            console.info('validating submission....');
        } // validateSubmission

        function resetForm() {
            _getTrialDetailCopy();
        } // resetForm
    } // trialEmailLogsCtrl

})();
