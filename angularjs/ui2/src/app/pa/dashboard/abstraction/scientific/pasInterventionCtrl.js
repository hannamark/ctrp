/**
 * created by wangg5 on Feb 10, 2016
 *         <ctrp-ncit-interventions-search max-row-selectable="1" ng-model="personSearchView.selection"></ctrp-ncit-interventions-search>
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasInterventionCtrl', pasInterventionCtrl)
        .controller('pasInterventionLookupModalCtrl',pasInterventionLookupModalCtrl);

    pasInterventionCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'Common', '$uibModal', 'interventionTypes', 'UserService'];

    pasInterventionLookupModalCtrl.$inject = ['$scope', '$uibModalInstance', 'PATrialService'];

    function pasInterventionCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, Common, $uibModal, interventionTypes, UserService) {

            var vm = this;
            vm.interventionTypesByCategory = {
                cancerGov: [],
                ctGov: []
            };
            var CANCER_GOV = 'cancer.gov';
            var CT_GOV = 'clinicaltrials.gov';
            vm.interventionTypes = interventionTypes;
            console.info('interventionTypes: ', interventionTypes);
            vm.trialDetailObj = {};
            vm.showInterventionForm = false;
            vm.curInterventionObj = {};
            vm.deleteBtnDisabled = true;

            vm.isCancerGovTypeListEnabled = false;
            vm.isCTGovTypeListEnabled = false;
            var curUserRole = UserService.getUserRole() || '';
            var isUserAllowedToSelectType = curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ABSTRACTOR-SU'; // only super userss are allowed

            // actions
            vm.addIntervention = addIntervention;
            vm.editIntervention = editIntervention;
            vm.upsertIntervention = upsertIntervention;
            vm.resetLookupForm = resetLookupForm;
            vm.flagAllInterventionsForDeletion = flagAllInterventionsForDeletion;
            vm.deleteInterventions = deleteInterventions;
            vm.openLookupModal = openLookupModal;

            activate();
            function activate() {
                _splitInterventionTypesByCat();
                _getTrialDetailCopy();
                watchInterventionList();
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            }

            /**
             * Split the intervention types array by their category names: cancer.gov or clinicaltrials.gov
             * into their respective container in the vm.interventionTypesByCategory
             * @return {Void}
             */
            function _splitInterventionTypesByCat() {
                _.each(interventionTypes, function(type, idex) {
                    if (type.category === CANCER_GOV) {
                        vm.interventionTypesByCategory.cancerGov.push(type);
                    } else if (type.category === CT_GOV) {
                        vm.interventionTypesByCategory.ctGov.push(type);
                    }
                });
                console.info('after split: ', vm.interventionTypesByCategory);
            }

            function addIntervention() {
                // console.info('showing intervention');
                vm.showInterventionForm = true;
                vm.curInterventionObj = _newInterventionObj();
            }

            function upsertIntervention(inventionObj) {

                if (angular.isDefined(inventionObj)) {

                    if (inventionObj.index !== undefined) {
                        // insert at index: index
                        vm.trialDetailObj.interventions[inventionObj.index] = angular.copy(inventionObj);
                    } else {
                        // unshift at index: 0
                        vm.trialDetailObj.interventions.unshift(angular.copy(inventionObj));
                    }

                    vm.trialDetailObj.interventions_attributes = vm.trialDetailObj.interventions;
                    PATrialService.updateTrial(vm.trialDetailObj).then(function(res) {
                        console.info('res after upsert: ', res);
                        if (res.server_response.status === 200) {
                            vm.trialDetailObj = res;
                            PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                            $scope.$emit('updatedInChildScope', {});
                            toastr.clear();
                            toastr.success('Trial design has been updated', 'Successful!', {
                                extendedTimeOut: 1000,
                                timeOut: 0
                            });
                            _getTrialDetailCopy();
                        }
                    }).catch(function(err) {
                        console.error('trial upsert error: ', err);
                    }).finally(function() {
                        vm.showInterventionForm = false; // hide the form
                        resetLookupForm();
                    });


                }
            }

            function editIntervention(index) {
                vm.showInterventionForm = true;
                vm.curInterventionObj = angular.copy(vm.trialDetailObj.interventions[index]);
                vm.curInterventionObj.edit = true;
                vm.curInterventionObj.index = index;
            }

            function _newInterventionObj() {
                return {
                    name: null,
                    other_name: null,
                    description: null,
                    intervention_type_cancer_gov_id: null, // for cancer.gov
                    intervention_type_ct_gov_id: null, // for clinicaltrials.gov
                    trial_id: vm.trialDetailObj.id,
                    edit: false
                };
            }

            function resetLookupForm(form) {
                vm.curInterventionObj = _newInterventionObj();
                console.info('resetting form: ', form);
            }

            function watchInterventionList() {
                $scope.$watch(function() {return vm.trialDetailObj.interventions;},
                    function(newVal, oldVal) {
                        if (angular.isDefined(newVal) && angular.isArray(newVal)) {
                            vm.deleteBtnDisabled = _.findIndex(newVal, {_destroy: true}) === -1;
                        }
                }, true);
            }

            function flagAllInterventionsForDeletion(booleanFlag) {
                _.each(vm.trialDetailObj.interventions, function(inter, idx) {
                    inter._destroy = booleanFlag;
                });
            }

            function deleteInterventions() {
                console.info('deleting interventions')
            }

            var modalOpened = false;
            function openLookupModal(size) {
                if (modalOpened) return;

                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: 'app/pa/dashboard/abstraction/scientific/_intervention_lookup_form.html',
                    controller: 'pasInterventionLookupModalCtrl as lookupModalView',
                    size: size,
                });
                modalOpened = true;

                modalInstance.result.then(function(selectedInterventionObj) {
                    // vm.selectedInterventionObj = selectedInterventionObj;
                    vm.curInterventionObj.name = selectedInterventionObj.preferred_name;
                    vm.curInterventionObj.other_name = selectedInterventionObj.synonyms;
                    vm.curInterventionObj.description = vm.curInterventionObj.description || selectedInterventionObj.description;

                    vm.curInterventionObj.intervention_type_cancer_gov_id = selectedInterventionObj.intervention_type_cancer_gov_id || '';
                    vm.isCancerGovTypeListEnabled = vm.curInterventionObj.intervention_type_cancer_gov_id === '' && isUserAllowedToSelectType;
                    vm.curInterventionObj.intervention_type_ct_gov_id = selectedInterventionObj.intervention_type_ct_gov_id || '';
                    vm.isCTGovTypeListEnabled = vm.curInterventionObj.intervention_type_ct_gov_id === '' && isUserAllowedToSelectType;
                    console.info('received vm.curInterventionObj: ', vm.curInterventionObj);
                }).catch(function(err) {
                    console.error('error in modal instance: ', err);
                }).finally(function() {
                    console.info('completed modal instance');
                    modalOpened = false;
                });
            } // openLookupModal
    } // pasInterventionCtrl


    function pasInterventionLookupModalCtrl($scope, $uibModalInstance, PATrialService) {
        var vm = this;
        vm.selection = '';

        vm.cancel = function() {
            $uibModalInstance.dismiss('canceled');
        };

        vm.confirmSelection = function() {
            var interventionName = vm.selection.preferred_name || '';
            // search ctrp interventions for same name, if exists, get its intervention type id for
            // trials to use
            PATrialService.searchCtrpInterventionsByName(interventionName).then(function(searchResponse) {
                // console.info('searchResponse: ', searchResponse);
                var result = searchResponse.data;
                if (result !== null) {
                    vm.selection.intervention_type_cancer_gov_id = result.intervention_type_cancer_gov_id;
                    vm.selection.intervention_type_ct_gov_id = result.intervention_type_ct_gov_id;
                }
                // vm.selection.intervention_type_cancer_gov_id = 13; // for test TODO: delete
                // vm.selection.intervention_type_ct_gov_id = 1; // for test TODO: delete
            }).catch(function(err) {
                console.error('error in search CTRP Interventions: ', err);
            }).finally(function() {
                $uibModalInstance.close(vm.selection);
            });
        };

        $scope.$watch(function() {return vm.selection;}, function(newVal) {
            // console.info('selection is: ', newVal);
            if (newVal !== '') {
                // $uibModalInstance.close(newVal);
            }
        });

    } // pasInterventionLookupModalCtrl

})();
