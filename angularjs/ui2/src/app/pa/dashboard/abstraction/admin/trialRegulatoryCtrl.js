
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialRegFdaCtrl', trialRegFdaCtrl);

    trialRegFdaCtrl.$inject = ['TrialService', '$scope', 'toastr', 'trialDetailObj', 'responsiblePartyObj']//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialRegFdaCtrl(TrialService, $scope, toastr, trialDetailObj, responsiblePartyObj){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.responsiblePartyArr = responsiblePartyObj;
        
        vm.updateTrial = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.selectedInvArray.length > 0) {
                vm.curTrial.investigator_id = vm.selectedInvArray[0].id;
            } else {
                vm.curTrial.investigator_id = null;
            }

            if (vm.selectedIaArray.length > 0) {
                vm.curTrial.investigator_aff_id = vm.selectedIaArray[0].id;
            } else {
                vm.curTrial.investigator_aff_id = null;
            }
        }

    } //trialNciCtrl

})();
