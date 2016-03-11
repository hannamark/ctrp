/**
 * Created by schintal, Mar 02, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDescriptionCtrl', pasTrialDescriptionCtrl);

    pasTrialDescriptionCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj'];

    function pasTrialDescriptionCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;

        vm.reload = function() {
            console.log("RELOAD");
            $state.go($state.$current, null, { reload: true });
        };

        vm.saveTrialDescription = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;


            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status === 200) {
                    vm.curTrial = response;
                    vm.curTrial.lock_version = response.lock_version || '';
                }
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log('error in updating trial ' + JSON.stringify(outerTrial));
            });

        }//saveTrial



    } //pasTrialDescriptionCtrl

})();
