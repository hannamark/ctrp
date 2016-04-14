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
            console.info('in intervention view!');
            var vm = this;
            vm.trialDetailObj = {};


            activate();
            function activate() {
                _getTrialDetailCopy();
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            }

    } // pasInterventionCtrl

})();
