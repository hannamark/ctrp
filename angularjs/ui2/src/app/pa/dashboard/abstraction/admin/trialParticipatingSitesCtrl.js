
/**
 * Created by schintal, Jan 31, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialParticipatingSitesCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj'];

    function trialParticipatingSitesCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj) {

        var vm = this;
        vm.curTrial = trialDetailObj;
        console.log("trialDetailObj = " + JSON.stringify(trialDetailObj));
        console.log("pa_editable = " + JSON.stringify(trialDetailObj["pa_editable"]));
        console.log("participating_sites_list = " + JSON.stringify(trialDetailObj["participating_sites_list"]));

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;


            //console.log("outertrial IN SAVE! " + JSON.stringify(outerTrial));


            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        } // updateTrial

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        /****************** implementations below ***************/
        function activate() {
            appendCollaborators();
            getTrialDetailCopy();
            watchTrialDetailObj();
        }

        /**
         * Get trial detail object from parent scope
         */
        function watchTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                getTrialDetailCopy();
            });
        } //watchTrialDetailObj

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy

    } //trialParticipatingSitesCtrl

})();
