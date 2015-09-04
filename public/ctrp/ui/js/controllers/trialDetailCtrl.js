/**
 * Created by wus4 on 8/14/2015.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .controller('trialDetailCtrl', trialDetailCtrl);
    trialDetailCtrl.$inject = ['trialDetailObj', 'TrialService', 'DateService','$timeout','toastr', 'MESSAGES',
        '$scope', 'Common', '$state', '$modal', 'protocolIdOriginObj', 'phaseObj', 'researchCategoryObj', 'primaryPurposeObj',
        'secondaryPurposeObj', 'responsiblePartyObj', 'fundingMechanismObj', 'instituteCodeObj', 'nciObj', 'trialStatusObj', 'countryList'];
    function trialDetailCtrl(trialDetailObj, TrialService, DateService, $timeout, toastr, MESSAGES,
                             $scope, Common, $state, $modal, protocolIdOriginObj, phaseObj, researchCategoryObj, primaryPurposeObj,
                             secondaryPurposeObj, responsiblePartyObj, fundingMechanismObj, instituteCodeObj, nciObj, trialStatusObj, countryList) {
        var vm = this;
        vm.accordion1 = true;
        vm.accordion2 = true;
        vm.accordion3 = true;
        vm.accordion4 = true;
        vm.accordion5 = true;
        vm.accordion6 = true;
        vm.accordion7 = true;
        vm.accordion8 = true;
        vm.curTrial = trialDetailObj || {lead_protocol_id: ""}; //trialDetailObj.data;
        vm.curTrial = vm.curTrial.data || vm.curTrial;
        vm.protocolIdOriginArr = protocolIdOriginObj;
        vm.phaseArr = phaseObj;
        vm.researchCategoryArr = researchCategoryObj;
        vm.primaryPurposeArr = primaryPurposeObj;
        vm.secondaryPurposeArr = secondaryPurposeObj;
        vm.responsiblePartyArr = responsiblePartyObj;
        vm.fundingMechanismArr = fundingMechanismObj;
        vm.instituteCodeArr = instituteCodeObj;
        vm.nciArr = nciObj;
        vm.trialStatusArr = trialStatusObj;
        vm.countryArr = countryList;
        vm.authorityOrgArr = [];
        vm.status_date_opened = false;
        vm.start_date_opened = false;
        vm.primary_comp_date_opened = false;
        vm.comp_date_opened = false;
        vm.addedOtherIds = [];
        vm.addedGrants = [];
        vm.addedStatuses = [];
        vm.selectedPiArray = [];
        vm.selectedInvArray = [];
        vm.showPrimaryPurposeOther = false;
        vm.showSecondaryPurposeOther = false;
        vm.showInvestigator = false;
        vm.curTrial.pilot = 'No';
        vm.curTrial.grant_question = 'Yes';

        //update trial (vm.curTrial)
        vm.updateTrial = function() {
            if (vm.selectedPiArray.length > 0) {
                vm.curTrial.pi_id = vm.selectedPiArray[0].id;
            }

            if (vm.selectedInvArray.length > 0) {
                vm.curTrial.investigator_id = vm.selectedInvArray[0].id;
            }

            // Construct nested attributes
            if (vm.addedOtherIds.length > 0) {
                vm.curTrial.other_ids_attributes = [];
                _.each(vm.addedOtherIds, function (otherId) {
                    vm.curTrial.other_ids_attributes.push(otherId);
                });
            }

            if (vm.addedGrants.length > 0) {
                vm.curTrial.grants_attributes = [];
                _.each(vm.addedGrants, function (grant) {
                    vm.curTrial.grants_attributes.push(grant);
                });
            }

            if (vm.addedStatuses.length > 0) {
                vm.curTrial.trial_status_wrappers_attributes = [];
                _.each(vm.addedStatuses, function (status) {
                    vm.curTrial.trial_status_wrappers_attributes.push(status);
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                toastr.success('Trial ' + vm.curTrial.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });
        }; // updatePerson

        // Delete the trial status
        vm.toggleSelection = function (index, type) {
            if (type == 'other_id') {
                if (index < vm.addedOtherIds.length) {
                    vm.addedOtherIds[index]._destroy = !vm.addedOtherIds[index]._destroy;
                }
            } else if (type == 'grant') {
                if (index < vm.addedGrants.length) {
                    vm.addedGrants[index]._destroy = !vm.addedGrants[index]._destroy;
                }
            } else if (type == 'trial_status') {
                if (index < vm.addedStatuses.length) {
                    vm.addedStatuses[index]._destroy = !vm.addedStatuses[index]._destroy;
                }
            }
        };// toggleSelection

        vm.dateFormat = DateService.getFormats()[0]; // January 20, 2015
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == 'status_date') {
                vm.status_date_opened = !vm.status_date_opened;
            } else if (type == 'start_date') {
                vm.start_date_opened = !vm.start_date_opened;
            } else if (type == 'primary_comp_date') {
                vm.primary_comp_date_opened = !vm.primary_comp_date_opened;
            } else if (type == 'comp_date') {
                vm.comp_date_opened = !vm.comp_date_opened;
            }
        }; //openCalendar

        // Add other ID to a temp array
        vm.addOtherId = function () {
            var newId = {};
            newId.protocol_id_origin_id = vm.protocol_id_origin_id;
            // For displaying other ID origin name in the table
            _.each(vm.protocolIdOriginArr, function (origin) {
                if (origin.id == vm.protocol_id_origin_id) {
                    newId.protocol_id_origin_name = origin.name;
                }
            });
            newId.protocol_id = vm.protocol_id;
            newId._destroy = false;
            vm.addedOtherIds.push(newId);
        };

        // Add grant to a temp array
        vm.addGrant = function () {
            var newGrant = {};
            newGrant.funding_mechanism = vm.funding_mechanism;
            newGrant.institute_code = vm.institute_code;
            newGrant.serial_number = vm.serial_number;
            newGrant.nci = vm.nci;
            newGrant._destroy = false;
            vm.addedGrants.push(newGrant);
        };

        // Add trial status to a temp array
        vm.addStatus = function () {
            var newStatus = {};
            newStatus.status_date = vm.status_date ? DateService.convertISODateToLocaleDateStr(vm.status_date) : '';
            newStatus.trial_status_id = vm.trial_status_id;
            // For displaying status name in the table
            _.each(vm.trialStatusArr, function (status) {
                if (status.id == vm.trial_status_id) {
                    newStatus.trial_status_name = status.name;
                }
            });
            newStatus.why_stopped = vm.why_stopped;
            newStatus._destroy = false;
            vm.addedStatuses.push(newStatus);
        };

        vm.watchOption = function(type) {
            if (type == 'primary_purpose') {
                var otherObj = vm.primaryPurposeArr.filter(findOtherOption);
                if (otherObj[0].id == vm.curTrial.primary_purpose_id) {
                    vm.showPrimaryPurposeOther = true;
                } else {
                    vm.showPrimaryPurposeOther = false;
                    vm.curTrial.primary_purpose_other = '';
                }
            } else if (type == 'secondary_purpose') {
                var otherObj = vm.secondaryPurposeArr.filter(findOtherOption);
                if (otherObj[0].id == vm.curTrial.secondary_purpose_id) {
                    vm.showSecondaryPurposeOther = true;
                } else {
                    vm.showSecondaryPurposeOther = false;
                    vm.curTrial.secondary_purpose_other = '';
                }
            } else if (type == 'responsible_party') {
                var invOptions = vm.responsiblePartyArr.filter(findInvestigatorOption);
                for (var i = 0; i < invOptions.length; i++) {
                    if (invOptions[i].id == vm.curTrial.responsible_party_id) {
                        vm.showInvestigator = true;
                        break;
                    } else {
                        vm.showInvestigator = false;
                        vm.selectedInvArray = [];
                    }
                }
            } else if (type == 'authority_country') {
                vm.authorityOrgArr = TrialService.getAuthorityOrgArr(vm.curTrial.authority_country);
            }
        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendNewTrialFlag();
            prepareModal();
        }

        /**
         * Append a 'new' key to the vm.curTrial to
         * indicate this is a new trial, not an trial
         * for editing/curating
         *
         */
        function appendNewTrialFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curTrial.new = true;  //
            }
        }

        function prepareModal() {
            vm.searchOrg = function(size, type) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/ctrp/ui/partials/modals/advanced_org_search_form_modal.html',
                    controller: 'advancedOrgSearchModalCtrl as orgSearchModalView',
                    size: size
                });

                modalInstance.result.then(function (selectedOrg) {
                    if (type == 'lead') {
                        vm.selectedLeadOrg = selectedOrg[0];
                        vm.curTrial.lead_org_id = selectedOrg[0].id;
                    }
                }, function () {
                    console.log("operation canceled");
                });
            }
        } //prepareModal

        // Return true if the option is "Other"
        function findOtherOption(option) {
            if (option.code == 'OTH') {
                return true;
            } else {
                return false;
            }
        }

        // Return true if the option is "Principal Investigator" or "Sponsor Investigator"
        function findInvestigatorOption(option) {
            if (option.code == 'PI' || option.code == 'SI') {
                return true;
            } else {
                return false;
            }
        }
    }
})();