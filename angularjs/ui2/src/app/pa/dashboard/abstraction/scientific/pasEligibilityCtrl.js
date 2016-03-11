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

        vm.prepareOtherCriterion = prepareOtherCriterion;
        vm.upsertOtherCriterion = upsertOtherCriterion;
        vm.deleteOtherCriterion = deleteOtherCriterion;
        vm.updateCriteria = updateCriteria;
        vm.resetForm = resetForm;
        vm.cancelEditOtherCriterion = cancelEditOtherCriterion;

        activate();
        function activate() {
            _getTrialDetailCopy();
            mockupData();
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
        }

        function resetForm() {
            _getTrialDetailCopy();
        }

        function updateCriteria() {
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
            vm.trialDetailObj.other_criteria(idx)._destroy = !vm.trialDetailObj.other_criteria(idx)._destroy;
        }

        /**
         * update or insert the otherCriterionObj
         * @param  {[type]} otherCriterionObj [description]
         * @return {[type]}                   [description]
         */
        function upsertOtherCriterion(otherCriterionObj) {
            console.info('adding: ', otherCriterionObj);
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
        }

        function mockupData() {
            for (var i = 0; i < 20; i++) {
                var obj = i % 2 === 0 ? newOtherCriterion('Inclusion') : newOtherCriterion('Exclusion');
                obj.criteria_desc = 'Test blah blah ' + i;
                vm.trialDetailObj.other_criteria.unshift(obj);
            }
        }

        function cancelEditOtherCriterion() {
            console.info('cancelling');
            vm.addOtherCriterionFormShown = false;
            vm.otherCriterion = newOtherCriterion('');
        }

    } // pasEligibilityCtrl

})();
