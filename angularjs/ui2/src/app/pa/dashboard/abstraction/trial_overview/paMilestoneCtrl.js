/**
 * Created by wus4 on 4/21/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paMilestoneCtrl', paMilestoneCtrl);

    paMilestoneCtrl.$inject = ['$scope', '$state', 'toastr', 'trialDetailObj', 'milestoneObj', 'TrialService', 'userDetailObj', 'DateService', 'PATrialService'];

    function paMilestoneCtrl($scope, $state, toastr, trialDetailObj, milestoneObj, TrialService, userDetailObj, DateService, PATrialService) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.curUser = userDetailObj;
        vm.addMode = false;
        vm.submission_num = vm.curTrial.current_submission_num;
        vm.milestoneArr = milestoneObj;
        vm.showRejectionReason = false;
        vm.validationErrors = [];

        vm.setAddMode = function (mode) {
            vm.addMode = mode;
            if (!mode) {
                $scope.milestone_form.$setPristine();
                vm.resetMilestone();
            }
        };

        vm.watchOption = function () {
            var rejectionOptions = vm.milestoneArr.filter(findRejectionOptions);
            for (var i = 0; i < rejectionOptions.length; i++) {
                if (rejectionOptions[i].id === vm.milestone_id) {
                    vm.showRejectionReason = true;
                    break;
                } else {
                    vm.showRejectionReason = false;
                    vm.rejection_reason = '';
                }
            }
        };

        vm.resetMilestone = function () {
            vm.milestone_id = null;
            vm.showRejectionReason = false;
            vm.rejection_reason = null;
            vm.comment = null;
        };

        vm.saveMilestone = function () {
            // Prevent multiple submissions
            vm.disableBtn = true;
            TrialService.validateMilestone({"id": vm.curTrial.id, "milestone_id": vm.milestone_id, "submission_id": vm.curTrial.current_submission_id}).then(function(response) {
                if (response.validation_msgs.errors.length > 0) {
                    vm.validationErrors = response.validation_msgs.errors;
                    vm.disableBtn = false;
                } else {
                    vm.validationErrors = [];

                    vm.curTrial.milestone_wrappers_attributes = [];
                    var milestoneWrapperObj = {};
                    milestoneWrapperObj.submission_id = vm.curTrial.current_submission_id;
                    milestoneWrapperObj.milestone_id = vm.milestone_id;
                    milestoneWrapperObj.comment = vm.comment;
                    if (vm.showRejectionReason) {
                        milestoneWrapperObj.comment = vm.rejection_reason + ': ' + milestoneWrapperObj.comment;
                    }
                    if (vm.curUser.first_name && vm.curUser.last_name) {
                        milestoneWrapperObj.created_by = vm.curUser.last_name + ', ' + vm.curUser.first_name;
                    }
                    vm.curTrial.milestone_wrappers_attributes.push(milestoneWrapperObj);

                    // An outer param wrapper is needed for nested attributes to work
                    var outerTrial = {};
                    outerTrial.id = vm.curTrial.id;
                    outerTrial.trial = vm.curTrial;

                    TrialService.upsertTrial(outerTrial).then(function (response) {
                        if (response.server_response.status < 300) {
                            // $state.go('main.pa.trialOverview.milestone', {}, {reload: true});
                            toastr.success('Milestone have been recorded', 'Operation Successful!');
                            PATrialService.setCurrentTrial(response); // cache the updated trial 
                            $scope.$emit('updatedInChildScope', {}); // signal for updates
                        } else {
                            // Enable buttons in case of backend error
                            vm.disableBtn = false;
                        }
                    }).catch(function (err) {
                        console.log("Error in saving milestone " + JSON.stringify(outerTrial));
                    });
                }
            }).catch(function (err) {
                console.log("Error in validating milestone: " + err);
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate () {
        }

        // Return true if the option is rejection option
        function findRejectionOptions (option) {
            if (option.code === 'SRJ' || option.code === 'LRD') {
                return true;
            } else {
                return false;
            }
        }
    } //paMilestoneCtrl
})();
