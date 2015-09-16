/**
 * Created by wus4 on 8/14/2015.
 */

(function () {
    'use strict';

    angular.module('ctrpApp').controller('trialDetailCtrl', trialDetailCtrl);

    trialDetailCtrl.$inject = ['trialDetailObj', 'TrialService', 'DateService','$timeout','toastr', 'MESSAGES', '$scope',
        'Common', '$state', '$modal', 'protocolIdOriginObj', 'phaseObj', 'researchCategoryObj', 'primaryPurposeObj',
        'secondaryPurposeObj', 'responsiblePartyObj', 'fundingMechanismObj', 'instituteCodeObj', 'nciObj', 'trialStatusObj',
        'holderTypeObj', 'expandedAccessTypeObj', 'countryList'];

    function trialDetailCtrl(trialDetailObj, TrialService, DateService, $timeout, toastr, MESSAGES, $scope,
                             Common, $state, $modal, protocolIdOriginObj, phaseObj, researchCategoryObj, primaryPurposeObj,
                             secondaryPurposeObj, responsiblePartyObj, fundingMechanismObj, instituteCodeObj, nciObj, trialStatusObj,
                             holderTypeObj, expandedAccessTypeObj, countryList) {
        var vm = this;
        vm.curTrial = trialDetailObj || {official_title: ""}; //trialDetailObj.data;
        vm.curTrial = vm.curTrial.data || vm.curTrial;
        vm.accordions = [true, true, true, true, true, true, true, true, true, true, true];
        vm.collapsed = false;
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
        vm.grantorArr = [];
        vm.holderTypeArr = holderTypeObj;
        vm.nihNciArr = [];
        vm.expandedAccessTypeArr = expandedAccessTypeObj;
        vm.countryArr = countryList;
        vm.authorityOrgArr = [];
        vm.status_date_opened = false;
        vm.start_date_opened = false;
        vm.primary_comp_date_opened = false;
        vm.comp_date_opened = false;
        vm.addedOtherIds = [];
        vm.addedFses = [];
        vm.addedGrants = [];
        vm.addedStatuses = [];
        vm.addedIndIdes = [];
        vm.selectedLoArray = [];
        vm.selectedPiArray = [];
        vm.selectedSponsorArray = [];
        vm.selectedInvArray = [];
        vm.selectedFsArray = [];
        vm.showPrimaryPurposeOther = false;
        vm.showSecondaryPurposeOther = false;
        vm.showInvestigator = false;
        vm.showInvSearchBtn = true;
        vm.curTrial.pilot = 'No';
        vm.curTrial.grant_question = 'Yes';
        vm.otherDocNum = 1;

        //update trial (vm.curTrial)
        vm.updateTrial = function() {
            if (vm.selectedLoArray.length > 0) {
                vm.curTrial.lead_org_id = vm.selectedLoArray[0].id
            }

            if (vm.selectedPiArray.length > 0) {
                vm.curTrial.pi_id = vm.selectedPiArray[0].id;
            }

            if (vm.selectedSponsorArray.length > 0) {
                vm.curTrial.sponsor_id = vm.selectedSponsorArray[0].id;
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

            if (vm.addedFses.length > 0) {
                vm.curTrial.trial_funding_sources_attributes = [];
                _.each(vm.addedFses, function (fs) {
                    vm.curTrial.trial_funding_sources_attributes.push(fs);
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

            if (vm.addedIndIdes.length > 0) {
                vm.curTrial.ind_ides_attributes = [];
                _.each(vm.addedIndIdes, function (indIde) {
                    vm.curTrial.ind_ides_attributes.push(indIde);
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                uploadDocuments(response.id);
                toastr.success('Trial ' + vm.curTrial.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });
        }; // updatePerson

        vm.collapseAccordion = function() {
            vm.accordions = [false, false, false, false, false, false, false, false, false, false, false];
            vm.collapsed = true;
        };

        vm.expandAccordion = function() {
            vm.accordions = [true, true, true, true, true, true, true, true, true, true, true];
            vm.collapsed = false;
        };

        // Delete the trial status
        vm.toggleSelection = function (index, type) {
            if (type == 'other_id') {
                if (index < vm.addedOtherIds.length) {
                    vm.addedOtherIds[index]._destroy = !vm.addedOtherIds[index]._destroy;
                }
            } else if (type == 'funding_source') {
                if (index < vm.addedFses.length) {
                    vm.addedFses[index]._destroy = !vm.addedFses[index]._destroy;
                }
            } else if (type == 'grant') {
                if (index < vm.addedGrants.length) {
                    vm.addedGrants[index]._destroy = !vm.addedGrants[index]._destroy;
                }
            } else if (type == 'trial_status') {
                if (index < vm.addedStatuses.length) {
                    vm.addedStatuses[index]._destroy = !vm.addedStatuses[index]._destroy;
                }
            } else if (type == 'ind_ide') {
                if (index < vm.addedIndIdes.length) {
                    vm.addedIndIdes[index]._destroy = !vm.addedIndIdes[index]._destroy;
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
            if (vm.protocol_id_origin_id && vm.protocol_id) {
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
            } else {
                alert('Please select a Protocol ID Origin and enter a Protocol ID');
            }
        };

        // Add grant to a temp array
        vm.addGrant = function () {
            if (vm.funding_mechanism && vm.institute_code && vm.serial_number && vm.nci) {
                var newGrant = {};
                newGrant.funding_mechanism = vm.funding_mechanism;
                newGrant.institute_code = vm.institute_code;
                newGrant.serial_number = vm.serial_number;
                newGrant.nci = vm.nci;
                newGrant._destroy = false;
                vm.addedGrants.push(newGrant);
            } else {
                alert('Please select a Funding Mechanism, Institute Code, enter a Serial Number and select a NCI Division/Program Code');
            }
        };

        // Add trial status to a temp array
        vm.addStatus = function () {
            if (vm.status_date && vm.trial_status_id) {
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
            } else {
                alert('Please provide a Status Date and select a Status');
            }
        };

        // Add IND/IDE to a temp array
        vm.addIndIde = function () {
            if (vm.ind_ide_type && vm.ind_ide_number && vm.grantor && vm.holder_type_id) {
                var newIndIde = {};
                newIndIde.ind_ide_type = vm.ind_ide_type;
                newIndIde.ind_ide_number = vm.ind_ide_number;
                newIndIde.grantor = vm.grantor;
                newIndIde.holder_type_id = vm.holder_type_id;
                // For displaying name in the table
                _.each(vm.holderTypeArr, function (holderType) {
                    if (holderType.id == vm.holder_type_id) {
                        newIndIde.holder_type_name = holderType.name;
                    }
                });
                newIndIde.nih_nci = vm.nih_nci;
                newIndIde.expanded_access = vm.expanded_access;
                newIndIde.expanded_access_type_id = vm.expanded_access_type_id;
                // For displaying name in the table
                _.each(vm.expandedAccessTypeArr, function (expandedAccessType) {
                    if (expandedAccessType.id == vm.expanded_access_type_id) {
                        newIndIde.expanded_access_type_name = expandedAccessType.name;
                    }
                });
                newIndIde.exempt = vm.exempt;
                newIndIde._destroy = false;
                vm.addedIndIdes.push(newIndIde);
            } else {
                alert('Please select an IND/IDE Type, enter an IND/IDE Number, select an IND/IDE Grantor and IND/IDE Holder Type');
            }
        };

        // Add Founding Source to a temp array
        $scope.$watch(function() {
            return vm.selectedFsArray.length;
        }, function(newValue, oldValue) {
            if (newValue == oldValue + 1) {
                var newFs = {};
                newFs.organization_id = vm.selectedFsArray[vm.selectedFsArray.length - 1].id;
                newFs.organization_name = vm.selectedFsArray[vm.selectedFsArray.length - 1].name;
                newFs._destroy = false;
                vm.addedFses.push(newFs);
            }
        });

        // If the responsible party is PI, the Investigator field changes with PI field
        $scope.$watch(function() {
            return vm.selectedPiArray;
        }, function(newValue, oldValue) {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedInvArray = vm.selectedPiArray;
            }
        });

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
                var piOption = vm.responsiblePartyArr.filter(findPiOption);
                var siOption = vm.responsiblePartyArr.filter(findSiOption);
                if (piOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = false;
                    // Copy the value from Principal Investigator
                    vm.selectedInvArray = vm.selectedPiArray;
                } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = true;
                    vm.selectedInvArray = [];
                } else {
                    vm.showInvestigator = false;
                    vm.selectedInvArray = [];
                }
            } else if (type == 'ind_ide_type') {
                vm.grantor = '';
                if (vm.ind_ide_type == 'IND') {
                    vm.grantorArr = ['CDER', 'CBER'];
                } else if (vm.ind_ide_type == 'IDE') {
                    vm.grantorArr = ['CDRH', 'CBER'];
                } else {
                    vm.grantorArr = [];
                }
            } else if (type == 'holder_type') {
                vm.nih_nci = '';
                var nciOption = vm.holderTypeArr.filter(findNciOption);
                var nihOption = vm.holderTypeArr.filter(findNihOption);
                if (nciOption[0].id == vm.holder_type_id) {
                    TrialService.getNci().then(function (response) {
                        vm.nihNciArr = response;
                    }).catch(function (err) {
                        console.log("Error in retrieving NCI Division/Program code.");
                    });
                } else if (nihOption[0].id == vm.holder_type_id) {
                    TrialService.getNih().then(function (response) {
                        vm.nihNciArr = response;
                    }).catch(function (err) {
                        console.log("Error in retrieving NIH Institution code.");
                    });
                } else {
                    vm.nihNciArr = [];
                }
            } else if (type == 'authority_country') {
                vm.curTrial.authority_org = '';
                vm.authorityOrgArr = TrialService.getAuthorityOrgArr(vm.curTrial.authority_country);
            }
        };

        // Transfer a number to an array
        vm.getNumArr = function(num) {
            return new Array(num);
        };

        // Add an other document
        vm.addOtherDoc = function() {
            vm.otherDocNum++;
        };

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendNewTrialFlag();
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

        // Return true if the option is "Other"
        function findOtherOption(option) {
            if (option.code == 'OTH') {
                return true;
            } else {
                return false;
            }
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

        function findNciOption(option) {
            if (option.code == 'NCI') {
                return true;
            } else {
                return false;
            }
        }

        function findNihOption(option) {
            if (option.code == 'NIH') {
                return true;
            } else {
                return false;
            }
        }

        function uploadDocuments(trialId) {
            if (vm.protocol_document) {
                TrialService.uploadDocument(trialId, 'Protocol Document', '', vm.protocol_document);
            }
            if (vm.irb_approval) {
                TrialService.uploadDocument(trialId, 'IRB Approval', '', vm.irb_approval);
            }
            if (vm.participating_sites) {
                TrialService.uploadDocument(trialId, 'List of Participating Sites', '', vm.participating_sites);
            }
            if (vm.informed_consent) {
                TrialService.uploadDocument(trialId, 'Informed Consent', '', vm.informed_consent);
            }
            for (var key in vm.other_documents) {
                TrialService.uploadDocument(trialId, 'Other Document', vm.other_document_subtypes[key], vm.other_documents[key]);
            }
        }
    }
})();