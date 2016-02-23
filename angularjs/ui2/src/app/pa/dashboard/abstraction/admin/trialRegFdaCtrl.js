
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialRegFdaCtrl', trialRegFdaCtrl);

    trialRegFdaCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'responsiblePartyObj', 'countryList'];//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialRegFdaCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj, responsiblePartyObj, countryList){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.responsiblePartyArr = responsiblePartyObj;
        vm.countryArr = countryList;
        vm.showInvestigator = false;
        vm.showInvSearchBtn = true;
        vm.selectedLoArray = [];
        vm.selectedPiArray = [];
        vm.selectedSponsorArray = [];
        vm.selectedInvArray = [];
        vm.selectedIaArray = [];
        vm.selectedFsArray = [];
        vm.addedAuthorities = [];
        vm.indIdeNum = 0;
        vm.sponsor_id = null;
        vm.showSponsor = false;
        vm.sponsorName = "";
        for (var i = 0; i < responsiblePartyObj.length; i++) {
            if (responsiblePartyObj[i].code == "SPONSOR") {
                vm.sponsor_id = responsiblePartyObj[i].id;
            }
        }
        if (vm.curTrial.responsible_party_id == vm.sponsor_id) {
            vm.showSponsor = true;
        }
        if (vm.curTrial.sponsor){
            vm.sponsorName = vm.curTrial.sponsor.name;
        } else {
            vm.sponsorName = "";
        }

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        vm.updateTrial = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.selectedPiArray.length > 0) {
                vm.curTrial.pi_id = vm.selectedPiArray[0].id;
            } else {
                vm.curTrial.pi_id = null;
            }

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
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                vm.curTrial.responsible_party_id = response["responsible_party_id"];
                vm.curTrial.responsible_party = response["responsible_party"];
                vm.curTrial.investigator_aff_id = response["investigator_aff_id"];
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


        }

        // Delete the associations
        vm.toggleSelection = function (index, type) {
             if (type == 'authority') {
                if (index < vm.addedAuthorities.length) {
                    vm.addedAuthorities[index]._destroy = !vm.addedAuthorities[index]._destroy;
                    if (vm.addedAuthorities[index]._destroy) {
                        vm.toaNum--;
                    } else {
                        vm.toaNum++;
                    }
                }
            }
        };// toggleSelection


        // Add Oversight Authority to a temp array
        vm.addAuthority = function () {
            var errorMsg = TrialService.checkAuthority(vm.authority_country, vm.authority_org, vm.addedAuthorities);

            if (!errorMsg) {
                var newAuthority = {};
                newAuthority.country = vm.authority_country;
                newAuthority.organization = vm.authority_org;
                newAuthority._destroy = false;
                vm.addedAuthorities.push(newAuthority);
                vm.toaNum++;
                vm.authority_country = null;
                vm.authority_org = null;
                vm.authorityOrgArr = [];
                vm.addAuthorityError = '';
                vm.showAddAuthorityError = false;
            } else {
                vm.addAuthorityError = errorMsg;
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
                    vm.showSponsor = false;
                    //console.log("Setting Investigator title");
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedLoArray;
                } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = true;
                    vm.showSponsor = false;
                    //console.log("Setting Investigator title");
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedSponsorArray;
                } else {
                    // else Sponsor
                    if (vm.curTrial.responsible_party_id == vm.sponsor_id){
                        vm.showSponsor = true;
                    }
                    vm.showInvestigator = false;
                    vm.curTrial.investigator_title = '';
                    vm.selectedInvArray = [];
                    vm.selectedIaArray = [];
                }
            }  else if (type == 'authority_country') {
                vm.authority_org = '';
                vm.authorityOrgArr = TrialService.getAuthorityOrgArr(vm.authority_country);
            }
        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendAuthorities();
            displayPOs();
            rpFieldChange();
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
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy


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

        function rpFieldChange() {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            var siOption = vm.responsiblePartyArr.filter(findSiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.showInvestigator = true;
                vm.showInvSearchBtn = false;
            } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                vm.showInvestigator = true;
            }
        }

        function displayPOs() {
            if (vm.curTrial.lead_org_id) {
                $timeout( function(){ vm.selectedLoArray.push(vm.curTrial.lead_org); }, 1500);
            }

            if (vm.curTrial.pi_id) {
                $timeout( function(){ vm.selectedPiArray.push(vm.curTrial.pi); }, 1500);
            }

            if (vm.curTrial.sponsor_id) {
                $timeout( function(){ vm.selectedSponsorArray.push(vm.curTrial.sponsor); }, 1500);
            }

            if (vm.curTrial.investigator_id) {
                $timeout( function(){ vm.selectedInvArray.push(vm.curTrial.investigator); }, 1500);
            }

            if (vm.curTrial.investigator_aff_id) {
                $timeout( function(){ vm.selectedIaArray.push(vm.curTrial.investigator_aff); }, 1500);
            }
        }


    } //trialNciCtrl

})();
