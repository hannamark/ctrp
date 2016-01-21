/**
 * Created by wus4 on 1/19/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('importTrialCtrl', importTrialCtrl);

    importTrialCtrl.$inject = ['TrialService'];

    function importTrialCtrl(TrialService) {

        var vm = this;
        vm.nct_id = '';
        vm.status = '';
        vm.official_title = '';

        vm.searchTrials = function() {
            TrialService.searchClinicalTrialsGov(vm.searchParams.nct_id).then(function(response) {
                vm.nct_id = response.nct_id;
                vm.status = response.status;
                vm.official_title = response.official_title;
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

