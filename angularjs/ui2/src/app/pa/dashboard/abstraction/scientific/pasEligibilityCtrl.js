/**
 * created by wangg5 on Feb 10, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasEligibilityCtrl', pasEligibilityCtrl);

    pasEligibilityCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'genderList', 'ageUnits', 'samplingMethods'];

    function pasEligibilityCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, genderList, ageUnits, samplingMethods) {
        var vm = this;
        vm.trialDetailObj = {};
        vm.genderList = genderList;
        vm.ageUnits = ageUnits;
        delete samplingMethods.server_response;
        vm.samplingMethods = samplingMethods; // array
        vm.otherCriterion = {};
        vm.otherCriteriaPerPage = 10; // pagination
        vm.addOtherCriterionFormShown = false;
        vm.deleteAllOCCheckbox = false;

        vm.prepareOtherCriterion = prepareOtherCriterion;
        vm.upsertOtherCriterion = upsertOtherCriterion;
        vm.deleteOtherCriterion = deleteOtherCriterion;
        vm.updateCriteria = updateCriteria;
        vm.deleteAllOC = deleteAllOC;
        vm.editOtherCriterion = editOtherCriterion;
        vm.resetForm = resetForm;
        vm.cancelEditOtherCriterion = cancelEditOtherCriterion;
        vm.updateOtherCriteriaDesc = updateOtherCriteriaDesc;
        vm.updateOtherCriteriaType = updateOtherCriteriaType;

        activate();
        function activate() {
            _getTrialDetailCopy();
            watchOtherCriteriaDesc();
            // mockupData();
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
        }

        function resetForm() {
            _getTrialDetailCopy();
        }

        function updateCriteria() {
            vm.trialDetailObj.other_criteria_attributes = vm.trialDetailObj.other_criteria;
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailObj.id;
            outerTrial.trial = vm.trialDetailObj;
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            PATrialService.upsertTrial(outerTrial).then(function(res) {

                if (res.server_response.status === 200) {
                    vm.trialDetailObj = res;
                    vm.trialDetailObj.lock_version = res.lock_version;
                    vm.deleteAllOCCheckbox = false;

                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Eligibility Criteria has been updated', 'Successful!', {
                        extendedTimeOut: 1000,
                        timeOut: 0
                    });
                    _getTrialDetailCopy();
                }

            }).catch(function(err) {
                console.error('error in updating trial design: ', err);
            });
        }

        function prepareOtherCriterion(criterionType) {
            vm.addOtherCriterionFormShown = true;
            vm.otherCriterion = newOtherCriterion(criterionType);
        }

        /**
         * Generate a new criterion object
         * @param  {String} criterionType [inclusion or exclusion]
         * @return {JSON Object}  initialized other criterion object
         */
        function newOtherCriterion(criterionType) {
            return {
                id: undefined,
                criteria_type: criterionType,
                trial_id: vm.trialDetailObj.id,
                criteria_desc: '',
                edit: false,
                _destroy: false
            };
        }

        function deleteOtherCriterion(idx) {
            vm.trialDetailObj.other_criteria[idx]._destroy = !vm.trialDetailObj.other_criteria[idx]._destroy;
        }

        /**
         * Delete/Undelete all other criteria
         * @param booleanFlag {Boolean}
         * @return {Void}
         */
        function deleteAllOC(booleanFlag) {
            _.each(vm.trialDetailObj.other_criteria, function(oc, idx) {
                vm.trialDetailObj.other_criteria[idx]._destroy = booleanFlag;
            });
        }

        /**
         * update or insert the otherCriterionObj
         * @param  {[type]} otherCriterionObj [description]
         * @return {[type]}                   [description]
         */
        function upsertOtherCriterion(otherCriterionObj) {
            if (otherCriterionObj.criteria_desc.trim() === '') {
                return;
            }
            var confirmMsg = 'Click OK to add a duplicate Eligibility Criterion Description.  Click Cancel to abort';
            if (isOCDescDuplicate(otherCriterionObj.criteria_desc, vm.trialDetailObj.other_criteria) &&
                    !confirm(confirmMsg)) {
                    // if duplicate other criterion description and user cancels, return;
                    return;
            }
            otherCriterionObj._destroy = vm.deleteAllOCCheckbox; //
            if (otherCriterionObj.id === undefined) {
                vm.trialDetailObj.other_criteria.unshift(otherCriterionObj);
            } else {
                vm.trialDetailObj.other_criteria[otherCriterionObj.index] = otherCriterionObj;
            }
            cancelEditOtherCriterion();
        }

        /**
         * Edit other criterion
         * @param  {Integer} index [description]
         * @return {JSON object}  Other criterion object
         */
        function editOtherCriterion(index) {
            var obj = vm.trialDetailObj.other_criteria[index] || {};
            obj.edit = true;
            obj.index = index;
            vm.otherCriterion = obj;
            vm.addOtherCriterionFormShown = true;
        }

        function cancelEditOtherCriterion() {
            vm.addOtherCriterionFormShown = false;
            vm.otherCriterion = newOtherCriterion('');
        }

        function updateOtherCriteriaDesc(otherCriterionDesc, index) {
            if (otherCriterionDesc.length === 0) {
                return;
            }
            vm.trialDetailObj.other_criteria[index].criteria_desc = otherCriterionDesc;
        }

        function updateOtherCriteriaType(otherCriterionType, index) {
            vm.trialDetailObj.other_criteria[index].criteria_type = otherCriterionType;
        }

        /**
         * Check whether the Other Criterion description is duplicate
         * @param  {String}  otherCriterionDesc
         * @param  {Array of object}  otherCriteriaArr: an array of other criteria
         * @return {Boolean}
         */
        function isOCDescDuplicate(otherCriterionDesc, otherCriteriaArr) {
            return _.findIndex(otherCriteriaArr, {criteria_desc: otherCriterionDesc.trim()}) > -1;
        }

        /**
         * Watch the other_criteria array in the vm.trialDetailObj
         * @return {Void}
         */
        function watchOtherCriteriaDesc() {
            $scope.$watchCollection(function() {return vm.trialDetailObj.other_criteria;}, function(
                newVal, oldVal) {
                    // number of characters for other criterion description (cumulative)
                    vm.descCharsRemaining = 5000;
                    console.info('newVal for other_criteria', newVal);
                    if (angular.isArray(newVal) && newVal.length > 0) {
                        _.each(newVal, function(oc, idx) {
                            vm.descCharsRemaining -= oc.criteria_desc.length;
                        });
                    }
                });
        } // watchOtherCriteriaDesc

    } // pasEligibilityCtrl

})();
