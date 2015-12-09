/**
 * created by wangg5 on Dec 8, 2015
 * PA - PA menu panel controller
 *
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa')
    .controller('paModuleMenuPanel', paModuleMenuPanel);

    paModuleMenuPanel.$inject = ['$scope', 'PATrialService', '$timeout'];

    function paModuleMenuPanel($scope, PATrialService, $timeout) {
        var vm = this;
        vm.trialId = '';

        activate();

        function activate() {
            getCachedTrialId();
        } //activate

        function getCachedTrialId() {
            $timeout(function() {
                vm.trialId = PATrialService.getCurrentTrialId();
            }, 500);
        }



        /*
        //get curUrlLink, e.g. '#/main/pa/trial/12/history'
        var curUrlLink = vm.curState.ncyBreadcrumbLink || '';
        var match = curUrlLink.match(/trial\/(\d+)/); //get the trialId, e.g. 12
        vm.trialId = match ? match[1] : '';
        */
    }
})();
