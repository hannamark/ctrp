/**
 * created by wangg5 on Dec 8, 2015
 * PA - PA menu panel controller
 *
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa')
    .controller('paModuleMenuPanel', paModuleMenuPanel);

    paModuleMenuPanel.$inject = ['$scope', 'MESSAGES', 'PATrialService'];

    function paModuleMenuPanel($scope, MESSAGES, PATrialService) {
        var vm = this;
        var currentTrialDetailObj = {};
        vm.nciTrialId = '';
        vm.menuAccordions = {
            "trialOverviewOpen": true,
            "adminDataOpen": true,
            "scientificDataOpen": true,
            "completeOpen": true
        };

        activate();

        function activate() {

            //Listen to the update to the current trial detail object
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                currentTrialDetailObj = PATrialService.getCurrentTrialFromCache();
                vm.nciTrialId = currentTrialDetailObj.nci_id;
                console.log('nciTrialId: ', vm.nciTrialId);
            });
        } //activate


        /*
        //get curUrlLink, e.g. '#/main/pa/trial/12/history'
        var curUrlLink = vm.curState.ncyBreadcrumbLink || '';
        var match = curUrlLink.match(/trial\/(\d+)/); //get the trialId, e.g. 12
        vm.trialId = match ? match[1] : '';
        */
    }
})();
