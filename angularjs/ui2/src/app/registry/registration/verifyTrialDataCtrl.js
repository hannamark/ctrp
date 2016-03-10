/**
 * Created by wus4 on 3/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('verifyTrialDataCtrl', verifyTrialDataCtrl);

    verifyTrialDataCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state', 'DateService'];

    function verifyTrialDataCtrl(trialDetailObj, TrialService, toastr, $state, DateService) {

        var vm = this;
        vm.curTrial = trialDetailObj;

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.verification_date = DateService.convertISODateToLocaleDateStr(new Date());
            vm.curTrial.edit_type = 'verify'

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    $state.go('main.verifyTrialData', {trialId: response.id} , {reload: true});
                    toastr.success('Trial data has been verified', 'Operation Successful!');
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                console.log("error in verifying trial data " + JSON.stringify(outerTrial));
            });
        }; // updateTrial

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

