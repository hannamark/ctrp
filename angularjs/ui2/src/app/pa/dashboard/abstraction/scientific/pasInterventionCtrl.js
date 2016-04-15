/**
 * created by wangg5 on Feb 10, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasInterventionCtrl', pasInterventionCtrl);

    pasInterventionCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'Common'];

    function pasInterventionCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, Common) {

            var vm = this;
            vm.trialDetailObj = {};
            vm.showInterventionForm = false;
            vm.curInterventionObj = {};
            vm.selectedInterventionObj = {preferred_name: ''};
            vm.deleteBtnDisabled = true;

            // actions
            vm.addIntervention = addIntervention;
            vm.editIntervention = editIntervention;
            vm.upsertIntervention = upsertIntervention;
            vm.resetLookupForm = resetLookupForm;
            vm.flagAllInterventionsForDeletion = flagAllInterventionsForDeletion;
            vm.deleteInterventions = deleteInterventions;

            activate();
            function activate() {
                _getTrialDetailCopy();
                watchInterventionList();
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            }

            function addIntervention() {
                console.info('showing intervention');
                vm.showInterventionForm = true;
                vm.curInterventionObj = _newInterventionObj();
            }

            function upsertIntervention(inventionObj) {
                if (angular.isDefined(inventionObj)) {
                    if (inventionObj.index !== undefined) {
                        // insert at index: index
                    } else {
                        // unshift at index: 0
                    }
                    // TODO: persist to backend
                    vm.showInterventionForm = false; // hide the form
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
                    intervention_type_id: null,
                    trial_id: null,
                    edit: false
                };
            }

            function resetLookupForm(form) {
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


    } // pasInterventionCtrl

})();
