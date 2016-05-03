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
        'MESSAGES', '_', '$timeout', 'Common', '$uibModal', 'interventionTypes', 'UserService','$location', '$anchorScroll'];

    pasInterventionLookupModalCtrl.$inject = ['$scope', '$uibModalInstance', 'PATrialService'];

    function pasInterventionCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, Common, $uibModal, interventionTypes, UserService, $location, $anchorScroll) {

            var vm = this;
            vm.interventionTypes = interventionTypes;
            console.info('interventionTypes: ', interventionTypes);
            vm.trialDetailObj = {};
            vm.showInterventionForm = false;
            vm.curInterventionObj = {};
            vm.deleteBtnDisabled = true;
            vm.isInterventionTypeListEnabled = false;
            vm.upsertBtnDisabled = true;
            vm.sortableListener = {};
            vm.sortableListener.stop = dragItemCallback;
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
                _getTrialDetailCopy();
                watchInterventionList();
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            }

            function addIntervention(addModeValue) {
                if (!(typeof addModeValue === 'undefined' || addModeValue === null)) {
                    vm.showInterventionForm = addModeValue;
                    $location.hash('section_top');
                    $anchorScroll();
                } else {
                    // console.info('showing intervention');
                    vm.showInterventionForm = true;
                    vm.upsertBtnDisabled = false;
                    vm.curInterventionObj = _newInterventionObj();
                }

                $scope.intervention_form.$setPristine();
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

                    updateInterventions(true);
                }
            }

            function _labelSortableIndex(interventionArr) {
                var reorderedArr = _.map(interventionArr, function(inter, idx) {
                    inter.index = idx;
                    return inter;
                });
                return reorderedArr;
            }

            function updateInterventions(showToastr) {
                console.info('interventions: ', vm.trialDetailObj.interventions);
                vm.trialDetailObj.interventions_attributes = _labelSortableIndex(vm.trialDetailObj.interventions);
                vm.deleteBtnDisabled = true;
                vm.upsertBtnDisabled = true;
                vm.deleteAll = false;
                PATrialService.updateTrial(vm.trialDetailObj).then(function(res) {
                    // console.info('res after upsert: ', res);
                    if (res.server_response.status === 200) {
                        vm.trialDetailObj = res;
                        PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                        $scope.$emit('updatedInChildScope', {});
                        if (showToastr) {
                            toastr.clear();
                            toastr.success('Intervention has been updated', 'Successful!', {
                                extendedTimeOut: 1000,
                                timeOut: 0
                            });
                        }
                        _getTrialDetailCopy();
                    }
                }).catch(function(err) {
                    console.error('trial upsert error: ', err);
                }).finally(function() {
                    console.info('hiding intervention form now!');
                    vm.curInterventionObj = null;
                    vm.showInterventionForm = false; // hide the form
                    // resetLookupForm();
                });
            }

            function editIntervention(index) {
                vm.showInterventionForm = true;
                vm.isInterventionTypeListEnabled = false;
                vm.upsertBtnDisabled = false;
                vm.curInterventionObj = angular.copy(vm.trialDetailObj.interventions[index]);
                vm.curInterventionObj.edit = true;
                vm.curInterventionObj.index = index;
            }

            function _newInterventionObj() {
                return {
                    name: null,
                    other_name: null,
                    description: null,
                    intervention_type_id: null, // for clinicaltrials.gov
                    trial_id: vm.trialDetailObj.id,
                    edit: false
                };
            }

            function resetLookupForm(form) {
                var curIndex = vm.curInterventionObj.index;
                if (curIndex !== undefined) {
                    editIntervention(curIndex);
                    return;
                }
                vm.curInterventionObj = _newInterventionObj();
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
                // console.info('deleting interventions');
                if (vm.trialDetailObj.interventions.length === 0) {
                    return;
                }
                updateInterventions(true);
            }

            function dragItemCallback(event, ui) {
                var item = ui.item.scope().item;
                var fromIndex = ui.item.sortable.index;
                var toIndex = ui.item.sortable.dropindex;
                updateInterventions(false); // update without showing toastr
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
                    console.info('selected intervention obj: ', selectedInterventionObj);
                    vm.curInterventionObj.name = selectedInterventionObj.preferred_name;
                    vm.curInterventionObj.other_name = selectedInterventionObj.synonyms;
                    vm.curInterventionObj.description = vm.curInterventionObj.description || selectedInterventionObj.description;
                    vm.curInterventionObj.intervention_type_id = selectedInterventionObj.intervention_type_id || '';
                    vm.isInterventionTypeListEnabled = vm.curInterventionObj.intervention_type_id === '' && isUserAllowedToSelectType;
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
        vm.selection = {"intervention_type_id": ''};

        vm.cancel = function() {
            $uibModalInstance.dismiss('canceled');
        };

        vm.confirmSelection = function() {
            var interventionName = vm.selection.preferred_name || '';
            // search ctrp interventions for same name, if exists, get its intervention type id for
            // trials to use
            PATrialService.searchCtrpInterventionsByName(interventionName).then(function(searchResponse) {
                console.info('searchResponse: ', searchResponse);
                var result = searchResponse.data;
                if (result !== null) {
                    vm.selection.intervention_type_id = result.intervention_type_id;
                    // vm.selection.intervention_type_ct_gov_id = result.intervention_type_ct_gov_id;
                }
                console.info('intervention search result: ', result);
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
