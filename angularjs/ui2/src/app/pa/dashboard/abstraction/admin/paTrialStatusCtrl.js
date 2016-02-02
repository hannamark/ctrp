/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialStatusCtrl', paTrialStatusCtrl);

    paTrialStatusCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'trialStatuses', 'Common'];

    function paTrialStatusCtrl($scope, _, PATrialService, TrialService,
        trialStatuses, Common) {
        var vm = this;
        vm.trialStatuses = trialStatuses.sort(Common.a2zComparator()); // array of trial statuses
        vm.statusObj = _initStatusObj();
        console.log('in paTrialStatusCtrl, trialStatuses: ', vm.trialStatuses);

        activate();

        function activate() {

        } // activate

        /**
         * Generate a new status object
         * @return {JSON} [fields: status_date, etc (see below)]
         */
        function _initStatusObj() {
            var statusObj = {
                status_date: '',
                trial_status_id: '',
                status_comment: '',
                why_stopped: '',
                _destroy: false
            };
            return statusObj;
        }
    } // paTrialStatusCtrl

})();
