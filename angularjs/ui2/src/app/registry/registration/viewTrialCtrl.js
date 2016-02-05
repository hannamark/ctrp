/**
 * Created by wus4 on 2/3/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('viewTrialCtrl', viewTrialCtrl);

    viewTrialCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state', 'DateService'];

    function viewTrialCtrl(trialDetailObj, TrialService, toastr, $state, DateService) {

        var vm = this;
        vm.curTrial = trialDetailObj;

        activate();

        /****************************** implementations **************************/

        function activate() {
            convertDate();
        }

        function convertDate() {
            vm.curTrial.start_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.start_date);
            vm.curTrial.primary_comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.primary_comp_date);
            vm.curTrial.comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.comp_date);
            vm.curTrial.current_trial_status_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.current_trial_status_date);
        }
    }
})();

