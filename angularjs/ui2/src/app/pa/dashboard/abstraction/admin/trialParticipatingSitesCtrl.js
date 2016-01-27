
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialParticipatingSitesCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialParticipatingSitesCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES,trialDetailObj, studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;


            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //PATrialService.setCurrentTrial(vm.curTrial); // update to cache
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

        /****************** implementations below ***************/
        function activate() {
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
