/**
 * created by wangg5 on March 21, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAssociatedTrialCtrl', pasAssociatedTrialCtrl);

    pasAssociatedTrialCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'identifierTypes'];

    function pasAssociatedTrialCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, identifierTypes) {
            var vm = this;
            vm.identifierTypes = identifierTypes;
            vm.trialQueryObj = {identifierTypeId: '', trialIdentifier: ''}; // to be POSTed for search
            vm.foundTrialObj = _initFoundTrialObj();

            // actions
            vm.resetTrialLookupForm = resetTrialLookupForm;
            vm.associateThisTrial = associateThisTrial;
            vm.lookupTrial = lookupTrial;

            function lookupTrial() {
                if (vm.trialQueryObj.trialIdentifier.length === 0) {
                    return;
                }
                PATrialService.lookupTrial(vm.trialQueryObj.trialIdentifier)
                    .then(function(res) {
                    console.info('res in looking up trial', res);
                    vm.foundTrialObj.trial_id = res.id || null;
                    vm.foundTrialObj.trial_identifier = res.nct_id || res.nci_id;
                    vm.foundTrialObj.identifier_type_id = vm.trialQueryObj.identifierTypeId;
                    vm.foundTrialObj.official_title = res.official_title || '';
                    vm.foundTrialObj.researchCategory = res.research_category || null; // not to be persisted!
                    vm.foundTrialObj.errorMsg = !!res.error_msg ? res.error_msg : '';
                });
            } // lookupTrial

            function resetTrialLookupForm() {
                _initFoundTrialObj();
            }

            function _initFoundTrialObj() {
                return {
                    trial_identifier: '',
                    identifier_type_id: '',
                    trial_id: '',
                    official_title: ''
                };
            }

            function associateThisTrial(trialLookUpResult) {
                console.info('to associate with ', trialLookUpResult);
            } // associateThisTrial


        }

    })();
