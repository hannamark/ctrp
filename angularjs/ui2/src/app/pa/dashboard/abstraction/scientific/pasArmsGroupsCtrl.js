/**
 * Created by schintal, Mar 15, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasArmsGroupsCtrl', pasArmsGroupsCtrl);

    pasArmsGroupsCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj'];

    function pasArmsGroupsCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        console.log("trialDetailObj = " + JSON.stringify(trialDetailObj));

        vm.saveTrial = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                $scope.$emit('updatedInChildScope', {});
                vm.curTrial = response;
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        }//saveTrial

        function setAddMode() {
            vm.addEditMode = true;
        }


        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentArmsGroup = vm.curTrial.arms_groups[idx];
            console.log("In setEditModel vm.currentArmsGroup = " + JSON.stringify(vm.currentArmsGroup));
        }

    } //pasArmsGroupsCtrl

})();
