
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialRegFdaCtrl', trialRegFdaCtrl);

    trialRegFdaCtrl.$inject = ['TrialService', '$scope', 'toastr', 'trialDetailObj', 'responsiblePartyObj', 'countryList']//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialRegFdaCtrl(TrialService, $scope, toastr, trialDetailObj, responsiblePartyObj, countryList){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.responsiblePartyArr = responsiblePartyObj;
        vm.countryArr = countryList;
        vm.showInvestigator = false;
        vm.showInvSearchBtn = true;


        vm.updateTrial = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.selectedInvArray.length > 0) {
                vm.curTrial.investigator_id = vm.selectedInvArray[0].id;
            } else {
                vm.curTrial.investigator_id = null;
            }

            if (vm.selectedIaArray.length > 0) {
                vm.curTrial.investigator_aff_id = vm.selectedIaArray[0].id;
            } else {
                vm.curTrial.investigator_aff_id = null;
            }
        }

        vm.watchOption = function(type) {

            if (type == 'responsible_party') {
                var piOption = vm.responsiblePartyArr.filter(findPiOption);
                var siOption = vm.responsiblePartyArr.filter(findSiOption);
                if (piOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = false;
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedLoArray;
                } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = true;
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedSponsorArray;
                } else {
                    vm.showInvestigator = false;
                    vm.curTrial.investigator_title = '';
                    vm.selectedInvArray = [];
                    vm.selectedIaArray = [];
                }
            }

        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            
        }

        // Return true if the option is "Principal Investigator"
        function findPiOption(option) {
            if (option.code == 'PI') {
                return true;
            } else {
                return false;
            }
        }

        // Return true if the option is "Sponsor Investigator"
        function findSiOption(option) {
            if (option.code == 'SI') {
                return true;
            } else {
                return false;
            }
        }

    } //trialNciCtrl

})();
