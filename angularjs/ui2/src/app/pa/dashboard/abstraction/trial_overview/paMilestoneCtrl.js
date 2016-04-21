/**
 * Created by wus4 on 4/21/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paMilestoneCtrl', paMilestoneCtrl);

    paMilestoneCtrl.$inject = ['$scope', '$state', 'toastr', 'trialDetailObj', 'milestoneObj', 'TrialService', 'DateService'];

    function paMilestoneCtrl($scope, $state, toastr, trialDetailObj, milestoneObj, TrialService, DateService) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.addMode = false;
        vm.milestoneArr = milestoneObj;
        vm.milestone_date_opened = false;

        vm.setAddMode = function(mode) {
            vm.addMode = mode;
        };

        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == 'milestone_date') {
                vm.milestone_date_opened = !vm.milestone_date_opened;
            }
        }; //openCalendar

        vm.saveMilestone = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.milestone_wrappers_attributes = [];
            var milestoneWrapperObj = {};
            milestoneWrapperObj.milestone_id = vm.milestone_id;
            milestoneWrapperObj.milestone_date = vm.milestone_date;
            milestoneWrapperObj.comment = vm.comment;
            vm.curTrial.milestone_wrappers_attributes.push(milestoneWrapperObj);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    $state.go('main.pa.trialOverview.milestone', {}, {reload: true});
                    toastr.success('Milestone have been recorded', 'Operation Successful!');
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                console.log("Error in saving milestone " + JSON.stringify(outerTrial));
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    } //paMilestoneCtrl
})();
