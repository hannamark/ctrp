/**
 * Created by wus4 on 8/14/2015.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .controller('trialDetailCtrl', trialDetailCtrl);
    trialDetailCtrl.$inject = ['trialDetailObj', 'TrialService', 'DateService','$timeout','toastr', 'MESSAGES',
        '$scope', 'Common', '$state', '$modal'];
    function trialDetailCtrl(trialDetailObj, TrialService, DateService, $timeout, toastr, MESSAGES,
                              $scope, Common, $state, $modal) {
        var vm = this;
        vm.curTrial = trialDetailObj || {lead_protocol_id: ""}; //trialDetailObj.data;
        vm.curTrial = vm.curTrial.data || vm.curTrial;

        //update trial (vm.curTrial)
        vm.updateTrial = function() {
            TrialService.upsertTrial(vm.curTrial).then(function(response) {
                toastr.success('Trial ' + vm.curTrial.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(vm.curTrial));
            });
        }; // updatePerson

        activate()

        /****************** implementations below ***************/
        function activate() {
            appendNewTrialFlag();
        }

        /**
         * Append a 'new' key to the vm.curTrial to
         * indicate this is a new trial, not an trial
         * for editing/curating
         *
         */
        function appendNewTrialFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curTrial.new = true;  //
            }
        }
    }
})();