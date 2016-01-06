
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
        vm.addedAuthorities = [];

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

            if (vm.addedAuthorities.length > 0) {
                vm.curTrial.oversight_authorities_attributes = [];
                _.each(vm.addedAuthorities, function (authority) {
                    vm.curTrial.oversight_authorities_attributes.push(authority);
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;


            TrialService.upsertTrial(outerTrial).then(function(response) {
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });


        }


        // Add Oversight Authority to a temp array
        vm.addAuthority = function () {
            if (vm.authority_country && vm.authority_org) {
                var newAuthority = {};
                newAuthority.country = vm.authority_country;
                newAuthority.organization = vm.authority_org;
                newAuthority._destroy = false;
                vm.addedAuthorities.push(newAuthority);
                vm.toaNum++;
                vm.authority_country = null;
                vm.authority_org = null;
                vm.authorityOrgArr = [];
                vm.showAddAuthorityError = false;
            } else {
                vm.showAddAuthorityError = true;
            }
        };

        // If the responsible party is PI, the Investigator field changes with PI field
        $scope.$watch(function() {
            return vm.selectedPiArray;
        }, function(newValue, oldValue) {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedInvArray = vm.selectedPiArray;
            }
        });

        // If the responsible party is Sponsor Investigator, the Investigator Affiliation field changes with Sponsor field
        $scope.$watch(function() {
            return vm.selectedSponsorArray;
        }, function(newValue, oldValue) {
            var siOption = vm.responsiblePartyArr.filter(findSiOption);
            if (siOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedIaArray = vm.selectedSponsorArray;
            }
        });


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
            } else if (type == 'authority_country') {
                vm.authority_org = '';
                vm.authorityOrgArr = TrialService.getAuthorityOrgArr(vm.authority_country);
            }

        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendAuthorities();
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

        function appendAuthorities() {
            for (var i = 0; i < vm.curTrial.oversight_authorities.length; i++) {
                var authority = {};
                authority.id = vm.curTrial.oversight_authorities[i].id;
                authority.country = vm.curTrial.oversight_authorities[i].country;
                authority.organization = vm.curTrial.oversight_authorities[i].organization;
                authority._destroy = false;
                vm.addedAuthorities.push(authority);
                vm.toaNum++;
            }
        }


    } //trialNciCtrl

})();
