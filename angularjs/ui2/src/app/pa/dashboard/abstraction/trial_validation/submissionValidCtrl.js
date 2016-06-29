/**
 * Created by wangg5, June 27th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('submissionValidCtrl', submissionValidCtrl);

    submissionValidCtrl.$inject = ['$scope', '$timeout', 'trialPhaseArr', 'primaryPurposeArr',
    'PATrialService', '_', 'amendmentReasonObj', 'toastr'];

    function submissionValidCtrl($scope, $timeout, trialPhaseArr, primaryPurposeArr,
        PATrialService, _, amendmentReasonObj, toastr) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.disableBtn = false;
        vm.isOtherPrimaryPurpose = false;
        vm.isAmendmentSubmission = false;
        vm.isOriginalSubmission = false;
        vm.trialPhaseArr = trialPhaseArr;
        vm.primaryPurposeArr = primaryPurposeArr;
        vm.amendReasonArr = amendmentReasonObj.data || [];

        // actions
        vm.saveValidation = saveValidation;
        vm.resetForm = resetForm;

        activate();
        function activate() {
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _checkSubmissionType(vm.trialDetailObj);
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            // sort submissions by submission_num in 'ascending order' (1, 2, 3,...)
            vm.trialDetailObj.submissions = _.sortBy(vm.trialDetailObj.submissions, function(sub) {
                return sub.submission_num;
            });
        } // _getTrialDetailCopy

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposeArr, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // reset to original data or empty
                    vm.trialDetailObj.primary_purpose_other = _resetValueForField('primary_purpose_other');
                } else {
                    vm.isOtherPrimaryPurpose = false;
                    vm.trialDetailObj.primary_purpose_other = '';
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

        function saveValidation() {
            console.info('validating submission....');
            vm.trialDetailObj.submissions_attributes = vm.trialDetailObj.submissions; // for update
            vm.disableBtn = true;
            PATrialService.updateTrial(vm.trialDetailObj).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.trialDetailObj = res;
                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});
                    toastr.clear();
                    toastr.success('Submission validation has been updated', 'Successful!', {
                        extendedTimeOut: 1000,
                        timeOut: 0
                    });

                    _getTrialDetailCopy();
                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.sub_validation_form.$setPristine();
                    }, 1);
                }
            }).catch(function(err) {
                console.error('trial upsert error: ', err);
            }).finally(function() {
                vm.disableBtn = false;
            });
        } // saveValidation

        function resetForm() {
            _getTrialDetailCopy();
        } // resetForm

        function _checkSubmissionType(trialObj) {
            if (!angular.isArray(trialObj.submissions)) {
                return;
            }
            var latestSubNum = trialObj.submissions[trialObj.submissions.length-1].submission_num;
            vm.isAmendmentSubmission = _.findIndex(trialObj.submissions, {submission_num: latestSubNum, submission_type_code: 'AMD'}) > -1;
            vm.isOriginalSubmission = !vm.isAmendmentSubmission && _.findIndex(trialObj.submissions, {submission_num: latestSubNum, submission_type_code: 'ORI'}) > -1;
        }
    } // trialEmailLogsCtrl

})();
