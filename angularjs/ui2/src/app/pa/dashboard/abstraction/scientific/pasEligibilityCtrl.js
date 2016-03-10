/**
 * created by wangg5 on Feb 10, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasEligibilityCtrl', pasEligibilityCtrl);

    pasEligibilityCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout'];

    function pasEligibilityCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout) {
        var vm = this;
        vm.trialDetailObj = {};

        activate();
        function activate() {
            _getTrialDetailCopy();
        }

        function _getTrialDetailCopy() {
            vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            console.info('research cat name: ', vm.trialDetailObj.isInterventional);
        }

    } // pasEligibilityCtrl

})();
