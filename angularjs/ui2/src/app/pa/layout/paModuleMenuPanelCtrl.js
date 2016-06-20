/**
 * created by wangg5 on Dec 8, 2015
 * PA - PA menu panel controller
 *
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa')
    .controller('paModuleMenuPanel', paModuleMenuPanel);

    paModuleMenuPanel.$inject = ['$scope', 'MESSAGES', 'PATrialService', '_'];

    function paModuleMenuPanel($scope, MESSAGES, PATrialService, _) {
        var vm = this;
        var currentTrialDetailObj = {};
        var menuOpen = true;
        vm.nciTrialId = '';
        vm.trialGlobalOpen = true;
        vm.toggleGlobal = toggleGlobal;
        vm.informationSourceCode = ''; // IMP for import; PRO for protocol
        vm.curMilestoneCode = '';
        // milestone codes that trigger validation menus
        var MILESTONE_CODES_FOR_VALIDATION = ['SRD', 'VPS', 'VPC']; // "Submission Received Date" , "Validation Processing Start Date" or "Validation Processing Completed Date"
        // mile stone codes that DO not trigger abstraction menus
        var MILESTONE_CODES_FOR_ABSTRACTION_EXCEPT = ['LRD'].concat(MILESTONE_CODES_FOR_VALIDATION); // Late Rejection Date and VALIDATION codes
        vm.menuAccordions = {
            'trialOverviewOpen': true,
            'adminDataOpen': true,
            'scientificDataOpen': true,
            'completeOpen': true
        };

        activate();
        function activate() {

            //Listen to the update to the current trial detail object
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                currentTrialDetailObj = PATrialService.getCurrentTrialFromCache();
                vm.nciTrialId = currentTrialDetailObj.nci_id;
                vm.informationSourceCode = currentTrialDetailObj.internal_source.code;
                var milestones = _.map(currentTrialDetailObj.milestone_wrappers, function(msObj) {
                    return msObj.milestone; // {id: '', code: '', name: ''}
                });
                vm.curMilestoneCode = milestones.length > 0 ? milestones[0].code : ''; // get the current mile stone code
            });
        } //activate

        function toggleGlobal() {
            console.log('toggling, vm.trialGlobalOpen: ', vm.trialGlobalOpen);
            // vm.trialGlobalOpen = !vm.trialGlobalOpen;
            Object.keys(vm.menuAccordions).forEach(function(key) {
                vm.menuAccordions[key] = !vm.trialGlobalOpen;
            });
        }


        /*
        //get curUrlLink, e.g. '#/main/pa/trial/12/history'
        var curUrlLink = vm.curState.ncyBreadcrumbLink || '';
        var match = curUrlLink.match(/trial\/(\d+)/); //get the trialId, e.g. 12
        vm.trialId = match ? match[1] : '';
        */
    }
})();
