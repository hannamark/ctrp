/**
 * Created by wus4 on 5/9/16.
 */

(function () {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paOnholdCtrl', paOnholdCtrl);

    paOnholdCtrl.$inject = ['$scope', '$state', 'toastr', 'trialDetailObj', 'onholdReasonObj', 'TrialService'];

    function paOnholdCtrl($scope, $state, toastr, trialDetailObj, onholdReasonObj, TrialService) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.addMode = false;
        vm.onholdReasonArr = onholdReasonObj;

        vm.setAddMode = function (mode) {
            vm.addMode = mode;
        };

        vm.setEditMode = function (index) {
            vm.addMode = true;
            vm.onhold_id = vm.curTrial.onholds[index].id;
            vm.onhold_reason_id = vm.curTrial.onholds[index].onhold_reason.id;
            vm.onhold_desc = vm.curTrial.onholds[index].onhold_desc;
            vm.onhold_date = vm.curTrial.onholds[index].onhold_date;
            vm.offhold_date = vm.curTrial.onholds[index].offhold_date;
        };

        vm.saveOnhold = function () {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.onholds_attributes = [];
            var onholdObj = {};
            if (vm.onhold_id) {
                onholdObj.id = vm.onhold_id;
            }
            onholdObj.onhold_reason_id = vm.onhold_reason_id;
            onholdObj.onhold_desc = vm.onhold_desc;
            onholdObj.onhold_date = vm.onhold_date;
            onholdObj.offhold_date = vm.offhold_date;
            vm.curTrial.onholds_attributes.push(onholdObj);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function (response) {
                if (response.server_response.status < 300) {
                    $state.go('main.pa.trialOverview.onhold', {}, {reload: true});
                    toastr.success('On hold has been recorded', 'Operation Successful!');
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function (err) {
                console.log("Error in saving on hold " + JSON.stringify(outerTrial));
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    } //paMilestoneCtrl
})();
