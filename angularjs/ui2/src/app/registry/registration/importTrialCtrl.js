/**
 * Created by wus4 on 1/19/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('importTrialCtrl', importTrialCtrl);

    importTrialCtrl.$inject = ['TrialService', 'toastr', '$state'];

    function importTrialCtrl(TrialService, toastr, $state) {

        var vm = this;
        vm.nct_id = '';
        vm.status = '';
        vm.official_title = '';
        vm.error_msg = '';
        vm.disableBtn = false;

        vm.searchTrials = function() {
            if (vm.searchParams && vm.searchParams.nct_id) {
                TrialService.searchClinicalTrialsGov(vm.searchParams.nct_id).then(function (response) {
                    vm.nct_id = response.nct_id;
                    vm.status = response.status;
                    vm.official_title = response.official_title;
                    vm.error_msg = response.error_msg;
                }).catch(function (err) {
                    console.log("Error in searching ClinicalTrials.gov: " + err);
                });
            }
        };

        vm.importTrial = function() {
            vm.disableBtn = true;
            TrialService.importClinicalTrialsGov(vm.nct_id).then(function (response) {
                if (response.server_response.status < 300) {
                    toastr.success('Trial has been imported', 'Operation Successful!');
                    $state.go('main.importTrial', null, {reload: true});
                } else {
                    vm.disableBtn = false;
                }
            }).catch(function (err) {
                console.log("Error in importing from ClinicalTrials.gov: " + err);
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    }
})();

