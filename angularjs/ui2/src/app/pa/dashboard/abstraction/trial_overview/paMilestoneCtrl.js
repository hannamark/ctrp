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

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    } //paMilestoneCtrl
})();
