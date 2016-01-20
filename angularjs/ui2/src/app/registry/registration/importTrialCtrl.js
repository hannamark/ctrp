/**
 * Created by wus4 on 1/19/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('importTrialCtrl', importTrialCtrl);

    importTrialCtrl.$inject = ['TrialService'];

    function importTrialCtrl(TrialService) {

        var vm = this;

        vm.searchTrials = function() {
            TrialService.searchClinicalTrialsGov(vm.searchParams.nct_id).then(function(response) {

            }).catch(function(err) {
                console.log("Error in searching ClinicalTrials.gov: " + err);
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    }
})();

