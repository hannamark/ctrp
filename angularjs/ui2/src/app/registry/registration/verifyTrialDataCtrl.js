/**
 * Created by wus4 on 3/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('verifyTrialDataCtrl', verifyTrialDataCtrl);

    verifyTrialDataCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state', 'DateService', 'HOST'];

    function verifyTrialDataCtrl(trialDetailObj, TrialService, toastr, $state, DateService, HOST) {

        var vm = this;
        vm.curTrial = trialDetailObj;

        activate();

        /****************************** implementations **************************/

        function activate() {
            convertDate();
        }

        function convertDate() {
            vm.curTrial.verification_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.verification_date);
        }
    }
})();

