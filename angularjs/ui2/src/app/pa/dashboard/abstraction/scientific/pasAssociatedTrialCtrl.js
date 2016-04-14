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
            vm.trialDetailObj = {};
            vm.trialDetailObj.associated_trials = [];
            vm.lookupBtnDisabled = false;
            vm.showLookupForm = false;
            vm.deleteAllAssoCheckbox = false;
            vm.deleteBtnDisabled = true; // delete associated trials

            // actions
            vm.resetTrialLookupForm = resetTrialLookupForm;
            vm.associateTrial = associateTrial;
            vm.lookupTrial = lookupTrial;
            vm.showTrialLookupForm = showTrialLookupForm;
            vm.closeLookupForm = closeLookupForm;
            vm.deleteTrialAssociations = deleteTrialAssociations;
            // vm.resetAssociations = _getTrialDetailCopy;
            vm.deleteAllAssociations = deleteAllAssociations;

            activate();
            function activate() {
                _getTrialDetailCopy();
                vm.foundTrialObj = _initFoundTrialObj();
                watchDeletionCheckbox();
            }

            function lookupTrial() {
                if (!vm.trialQueryObj.identifierTypeId || !vm.trialQueryObj.trialIdentifier || vm.trialQueryObj.trialIdentifier.trim().length === 0) {
                    return;
                }
                var selectedIdentifier = _.findWhere(vm.identifierTypes, {id: vm.trialQueryObj.identifierTypeId});
                if (!selectedIdentifier || !vm.trialQueryObj.trialIdentifier.startsWith(selectedIdentifier.name)) {
                    vm.foundTrialObj.errorMsg = 'Trial identifier must match its identifier type';
                    return;
                }

                vm.lookupBtnDisabled = true;
                vm.associationErrorMsg = '';
                PATrialService.lookupTrial(vm.trialQueryObj.trialIdentifier.trim())
                    .then(function(res) {
                    // console.info('res in looking up trial', res);
                    vm.foundTrialObj.trial_identifier = res.nct_id || res.nci_id;
                    console.log('foundTrialObj.associated_trial_id: ', res.id);
                    vm.foundTrialObj.associated_trial_id = res.id || ''; // for hyperlink only
                    vm.foundTrialObj.identifierTypeStr = _.findWhere(vm.identifierTypes, {id: vm.trialQueryObj.identifierTypeId}).name; // not to be persisted
                    vm.foundTrialObj.identifier_type_id = vm.trialQueryObj.identifierTypeId;
                    vm.foundTrialObj.official_title = res.official_title || '';
                    vm.foundTrialObj.researchCategory = res.research_category || null; // not to be persisted!
                    vm.foundTrialObj.research_category_name = res.research_category;
                    vm.foundTrialObj.errorMsg = res.error_msg || '';
                }).catch(function(err) {
                    console.error('err in looking up the trial: ', vm.trialQueryObj);
                }).finally(function() {
                    vm.lookupBtnDisabled = false;
                });
            } // lookupTrial

            function resetTrialLookupForm(form) {
                vm.trialQueryObj = {identifierTypeId: 1, trialIdentifier: 'NCI-'};
                vm.foundTrialObj = _initFoundTrialObj();
                // TODO: reset form to $pristine, etc.
            }

            function _initFoundTrialObj() {
                return {
                    trial_identifier: '',
                    identifier_type_id: '',
                    trial_id: vm.trialDetailObj.id, // parent trial id, associated trials are its children
                    official_title: '',
                    _destroy: false
                };
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                vm.trialDetailObj.associated_trials = _.map(vm.trialDetailObj.associated_trials, function(trial) {
                    trial.identifierTypeStr = _.findWhere(vm.identifierTypes, {id: trial.identifier_type_id}).name;
                    trial.researchCategory = ''; // TODO:
                    return trial;
                });
            }

            function showTrialLookupForm(form) {
                vm.showLookupForm = true;
                resetTrialLookupForm(form);
                // form.trial_identifier.$error = null;
                // form.identifier_type.$error = null;
            }

            function closeLookupForm() {
                vm.showLookupForm = false;
            }

            /**
             * Add the trial to the trial associations array
             * @param  {Object}  trialLookUpResult [description]
             * @return {Void}                   [description]
             */
            vm.associateTrialBtnDisabled = false;
            function associateTrial(trialLookUpResult) {
                if (_.findIndex(vm.trialDetailObj.associated_trials, {trial_identifier: trialLookUpResult.trial_identifier}) > -1) {
                        vm.associationErrorMsg = 'Error: Trial association already exists';
                    // no duplicate
                    return;
                }
                vm.associateTrialBtnDisabled = true; // disable the button
                PATrialService.associateTrial(trialLookUpResult).then(function(res) {
                    if (res.server_response.status === 201) {
                        delete res.server_response;
                        console.info('id: ', trialLookUpResult.associated_trial_id);
                        res.associated_trial_id = trialLookUpResult.associated_trial_id; // res.id;
                        vm.trialDetailObj.associated_trials.unshift(res);
                        closeLookupForm();
                    }
                    toastr.clear();
                    toastr.success('Record Created.', 'Operation Successful!', {
                        extendedTimeOut: 1000,
                        timeOut: 0
                    });
                    vm.deleteAllAssoCheckbox = false;
                }).catch(function(err) {
                    console.error('error in associating the trial: ', err);
                }).finally(function(done) {
                    vm.associateTrialBtnDisabled = false;
                });

            } // associateTrial

            function deleteAllAssociations(booleanFlag) {
                _.each(vm.trialDetailObj.associated_trials, function(trial, idx) {
                    vm.trialDetailObj.associated_trials[idx]._destroy = booleanFlag;
                });
            }

            function watchDeletionCheckbox() {
                $scope.$watch(function() {return vm.trialDetailObj.associated_trials;},
                    function(newVal, oldVal) {
                        if (angular.isDefined(newVal) && angular.isArray(newVal)) {
                            vm.deleteBtnDisabled = _.findIndex(newVal, {_destroy: true}) === -1;
                        }
                }, true);
            }

            /**
             * Update associated trials at the backend
             * @return {Void}
             */

            function deleteTrialAssociations() {
                console.info('deleteTrialAssociations');
                if (vm.trialDetailObj.associated_trials.length === 0) {
                    return;
                }
                vm.trialDetailObj.associated_trials_attributes = vm.trialDetailObj.associated_trials;
                var outerTrial = {};
                outerTrial.new = false;
                outerTrial.id = vm.trialDetailObj.id;
                outerTrial.trial = vm.trialDetailObj;
                outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
                vm.deleteBtnDisabled = true;
                PATrialService.upsertTrial(outerTrial).then(function(res) {
                    if (res.server_response.status === 200) {
                        vm.trialDetailObj = res;
                        vm.trialDetailObj.lock_version = res.lock_version;
                        PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                        $scope.$emit('updatedInChildScope', {});
                        vm.deleteAllAssoCheckbox = false;

                        toastr.clear();
                        toastr.success('Record(s) deleted.', 'Operation Successful!', {
                            extendedTimeOut: 1000,
                            timeOut: 0
                        });
                        _getTrialDetailCopy();
                    }
                }).catch(function(err) {
                    console.error('trial association error: ', err);
                }).finally(function() {
                    console.info('trial associations have been updated');
                    vm.deleteBtnDisabled = true;
                });
            }
        }

    })();
