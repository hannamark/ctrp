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

        vm.updateCriteria = updateCriteria;
        vm.resetForm = resetForm;

        activate();
        function activate() {
            _getTrialDetailCopy();
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

    } // pasEligibilityCtrl

})();
