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
            vm.trialQueryObj = {identifierType: '', trialIdentifier: ''}; // to be POSTed for search
            vm.foundTrialObj = _initFoundTrialObj();

            // actions
            vm.resetTrialLookupForm = resetTrialLookupForm;
            vm.associateThisTrial = associateThisTrial;


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
