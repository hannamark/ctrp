/**
 * Created by wangg5, June 27th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('submissionValidCtrl', submissionValidCtrl);

    submissionValidCtrl.$inject = ['$scope', '$timeout', 'trialPhaseArr', 'primaryPurposeArr',
    'milestoneObj', 'userDetailObj', 'processingStatuses', 'PATrialService', '_', 'amendmentReasonObj',
    'toastr', '$popover', '$state'];

    function submissionValidCtrl($scope, $timeout, trialPhaseArr, primaryPurposeArr,
        milestoneObj, userDetailObj, processingStatuses, PATrialService, _, amendmentReasonObj,
        toastr, $popover, $state) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.disableBtn = false;
        vm.isOtherPrimaryPurpose = false;
        vm.isAmendmentSubmission = false;
        vm.isOriginalSubmission = false;
        vm.trialPhaseArr = trialPhaseArr;
        vm.primaryPurposeArr = primaryPurposeArr;
        $scope.rejectionReasonArr = ['Out of Scope', 'Duplicate', 'Other'];
        var subAcceptDateCode = 'SAC'; // code for Submission Accepted Date
        var subRejectDateCode = 'SRJ'; // code for Submission Rejection Date
        var acceptStatusCode = 'ACC';
        var rejectStatusCode = 'REJ';
        var popover = null;
        vm.amendReasonArr = amendmentReasonObj.data || [];

        // actions
        vm.acceptTrialValidation = acceptTrialValidation;
        // vm._rejectTrialValidation = _rejectTrialValidation;
        vm.confirmRejection = confirmRejection;
        vm.placeTrialOnHold = placeTrialOnHold;
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

        function confirmRejection(evt) {
            $scope.rejectionObj = {reason: null, comment: null};            
            popover = $popover(angular.element(evt.target), {
                title: 'Please Confirm Rejection',
                show: true,
                html: true,
                trigger: 'manual',
                placement: 'top',
                templateUrl: 'app/pa/dashboard/abstraction/trial_validation/_reject_trial_popover.tpl.html',
                animation: 'am-flip-x',
                content: '<strong>Rejection Reason:</strong>',
                autoClose: true,
                scope: $scope,
            });
            popover.event = evt;
        }
        // the following two $scope. functions
        // are used in the popover dialog window
        $scope.closePopover = function() {
            popover.hide();
        };
        $scope.confirmReject = function() {
            _rejectTrialValidation();
            popover.hide();
        };

        function placeTrialOnHold() {
            if (isFormValid(vm.trialDetailObj)) {
                saveValidation();
                $state.go('main.pa.trialOverview.onhold', {}, {reload: true});
            }
        }

        function _rejectTrialValidation() {
            if (isFormValid(vm.trialDetailObj)) {
                // concatenate the reason and comment in the popover confirm dialog
                var rejectionComment = $scope.rejectionObj.reason + ': ' + $scope.rejectionObj.comment;
                var milestone = _genMilestone(subRejectDateCode, vm.trialDetailObj.current_submission_id, rejectionComment); // TODO: get rejection reason from confirm popover!
                vm.trialDetailObj.milestone_wrappers_attributes.push(milestone);

                var processStatus = _genProcessingStatus(rejectStatusCode, vm.trialDetailObj.current_submission_id, vm.trialDetailObj.id);
                vm.trialDetailObj.processing_status_wrappers_attributes.push(processStatus);
                // TODO: send email for original and amendment type
                saveValidation(); // update the trial validation
            }
        }

        function acceptTrialValidation() {
            if (isFormValid(vm.trialDetailObj)) {
                var milestone = _genMilestone(subAcceptDateCode, vm.trialDetailObj.current_submission_id, null);
                vm.trialDetailObj.milestone_wrappers_attributes.push(milestone);

                var processStatus = _genProcessingStatus(acceptStatusCode, vm.trialDetailObj.current_submission_id, vm.trialDetailObj.id);
                vm.trialDetailObj.processing_status_wrappers_attributes.push(processStatus);
                // TODO: send email for original and amendment type
                saveValidation(); // update the trial validation
            }
        }

        var processingStatusesArr = processingStatuses; // from resolved promise
        function _genProcessingStatus(statusCode, curSubmissionId, trialId) {
            var statusObj = _.findWhere(processingStatusesArr, {code: statusCode});
            var processStatus = {
                status_date: new Date(),
                processing_status_id: statusObj.id || '',
                trial_id: trialId,
                submission_id: curSubmissionId,
            };
            if (!angular.isDefined(vm.trialDetailObj.processing_status_wrappers_attributes)) {
                vm.trialDetailObj.processing_status_wrappers_attributes = [];
            }

            return processStatus;
        }

        var milestoneArr = milestoneObj; // from resolved promise
        var curUser = userDetailObj; // from resolved promise
        function _genMilestone(milestoneCode, curSubmissionId, comment) {
            var milestoneObj = _.findWhere(milestoneArr, {code: milestoneCode});
            var milestone = {
                submission_id: curSubmissionId,
                milestone_id: !!milestoneObj ? milestoneObj.id : '',
                comment: comment || null,
                milestone_date: new Date(),
                created_by: curUser.last_name + ', ' + curUser.first_name // get full name
            };
            if (!angular.isDefined(vm.trialDetailObj.milestone_wrappers_attributes)) {
                vm.trialDetailObj.milestone_wrappers_attributes = [];
            }
            return milestone;
        }

        // check if the form is valid
        function isFormValid(trialObj) {
            // TODO: validate form here
            return true;
        }

        function _checkSubmissionType(trialObj) {
            if (!angular.isArray(trialObj.submissions)) {
                return;
            }
            // var latestSubNum = trialObj.submissions[trialObj.submissions.length-1].submission_num;
            var latestSubNum = trialObj.current_submission_num;
            vm.isAmendmentSubmission = _.findIndex(trialObj.submissions, {submission_num: latestSubNum, submission_type_code: 'AMD'}) > -1;
            vm.isOriginalSubmission = !vm.isAmendmentSubmission && _.findIndex(trialObj.submissions, {submission_num: latestSubNum, submission_type_code: 'ORI'}) > -1;
        }
    } // trialEmailLogsCtrl

})();
