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
            vm.trialDetailObj = {};
            vm.trialDetailObj.associated_trials = [];
            vm.lookupBtnDisabled = false;
            vm.showLookupForm = false;

            // actions
            vm.resetTrialLookupForm = resetTrialLookupForm;
            vm.associateTrial = associateTrial;
            vm.lookupTrial = lookupTrial;
            vm.showTrialLookupForm = showTrialLookupForm;
            vm.closeLookupForm = closeLookupForm;
            vm.updateTrialAssociations = updateTrialAssociations;
            vm.resetAssociations = _getTrialDetailCopy

            activate();
            function activate() {
                _getTrialDetailCopy();
            }

            function lookupTrial() {
                if (vm.trialQueryObj.trialIdentifier.trim().length === 0) {
                    return;
                }
                vm.lookupBtnDisabled = true;
                PATrialService.lookupTrial(vm.trialQueryObj.trialIdentifier.trim())
                    .then(function(res) {
                    console.info('res in looking up trial', res);
                    vm.foundTrialObj.trial_id = res.id || null;
                    vm.foundTrialObj.trial_identifier = res.nct_id || res.nci_id;
                    vm.foundTrialObj.identifierTypeStr = _.findWhere(vm.identifierTypes, {id: vm.trialQueryObj.identifierTypeId}).name; // not to be persisted
                    vm.foundTrialObj.identifier_type_id = vm.trialQueryObj.identifierTypeId;
                    vm.foundTrialObj.official_title = res.official_title || '';
                    vm.foundTrialObj.researchCategory = res.research_category || null; // not to be persisted!
                    vm.foundTrialObj.errorMsg = !!res.error_msg ? res.error_msg : '';
                }).catch(function(err) {
                    console.error('err in looking up the trial: ', vm.trialQueryObj);
                }).finally(function() {
                    vm.lookupBtnDisabled = false;
                });
            } // lookupTrial

            function resetTrialLookupForm(form) {
                form.$valid = true;
                form.$pristine = true;
                // form.trial_identifier.$error = null;
                // form.identifier_type.$error = null;
                vm.trialQueryObj = {identifierTypeId: '', trialIdentifier: ''};
                vm.foundTrialObj = _initFoundTrialObj();
            }

            function _initFoundTrialObj() {
                return {
                    trial_identifier: '',
                    identifier_type_id: '',
                    trial_id: '',
                    official_title: '',
                    _destroy: false
                };
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                console.info('trialDetailObj.associated_trials: ', vm.trialDetailObj.associated_trials);
            }

            function showTrialLookupForm() {
                vm.showLookupForm = true;
            }

            function closeLookupForm() {
                vm.showLookupForm = false;
            }

            /**
             * Add the trial to the trial associations array
             * @param  {Object}  trialLookUpResult [description]
             * @return {Void}                   [description]
             */
            function associateTrial(trialLookUpResult) {
                if (_.findIndex(vm.trialDetailObj.associated_trials, {trial_identifier: trialLookUpResult.trial_identifier}) > -1) {
                        vm.associationErrorMsg = 'Error: Trial association already exists'
                    // no duplicate
                    return;
                }
                vm.trialDetailObj.associated_trials.unshift(angular.copy(trialLookUpResult));
            } // associateTrial

            /**
             * Update associated trials at the backend
             * @return {Void}
             */
            function updateTrialAssociations() {
                vm.trialDetailObj.associated_trials_attributes = vm.trialDetailObj.associated_trials;
                var curTrialIdentifierTypeId = null; // use the first one that is not null
                var curTrialIdentifier = null;
                if (!!vm.trialDetailObj.nci_id) {
                    curTrialIdentifierTypeId = _.findWhere(vm.identifierTypes, {name: 'CTRP'}).id;
                    curTrialIdentifier = vm.trialDetailObj.nci_id;
                } else if (!!vm.trialDetailObj.nct_trial_id) {
                    curTrialIdentifierTypeId = _.findWhere(vm.identifierTypes, {name: 'NCT'}).id;
                    curTrialIdentifier = vm.trialDetailObj.nct_trial_id;
                }

                _.each(vm.trialDetailObj.associated_trials, function(trial) {
                    // create the trial association mirror
                    var associatedTrialB = {
                        trial_id: trial.trial_id,
                        trial_identifier: curTrialIdentifier,
                        identifier_type_id: curTrialIdentifierTypeId,
                        official_title: vm.trialDetailObj.official_title
                    };
                    vm.trialDetailObj.associated_trials_attributes.push(associatedTrialB);
                });

                var outerTrial = {};
                outerTrial.new = false;
                outerTrial.id = vm.trialDetailObj.id;
                outerTrial.trial = vm.trialDetailObj;
                outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

                PATrialService.upsertTrial(outerTrial).then(function(res) {
                    if (res.server_response.status === 200) {
                        vm.trialDetailObj = res;
                        vm.trialDetailObj.lock_version = res.lock_version;
                        PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                        $scope.$emit('updatedInChildScope', {});

                        toastr.clear();
                        toastr.success('Trial Associations have been updated', 'Successful!', {
                            extendedTimeOut: 1000,
                            timeOut: 0
                        });
                        _getTrialDetailCopy();
                    }
                }).catch(function(err) {
                    console.error('trial association error: ', err);
                }).finally(function() {
                    console.info('trial associations have been updated');
                });

            }


        }

    })();
