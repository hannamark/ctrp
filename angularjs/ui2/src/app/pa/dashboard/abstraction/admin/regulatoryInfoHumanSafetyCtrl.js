/**
 * Created by wangg5, January 25th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('regulatoryInfoHumanSafetyCtrl', regulatoryInfoHumanSafetyCtrl);

    regulatoryInfoHumanSafetyCtrl.$inject = ['$scope', 'PATrialService', 'boardApprovalStatuses',
        '_', '$timeout'];

    function regulatoryInfoHumanSafetyCtrl($scope, PATrialService, boardApprovalStatuses,
        _, $timeout) {
        var vm = this;
        vm.infoObj = {}; // human subject safety information object
        vm.boardAffiliationArray = [];
        vm.statuses = boardApprovalStatuses.statuses;

        activate();

        function activate() {
            _getTrialDetailCopy();
            _watchAffiliationSelection();
        }

        /**
         * get a data clone of the trial detail object from Local Cache
         * @return {Void}
         */
        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailsObj = PATrialService.getCurrentTrialFromCache();
            }, 0);
        } // _getTrialDetailCopy

        function _watchAffiliationSelection() {
            $scope.$watchCollection(function() {return vm.boardAffiliationArray;},
                function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    console.log('affiliation newVal: ', newVal);
                    vm.trialDetailsObj.board_affiliation_id = newVal[0].id;
                    vm.trialDetailsObj.board_name = newVal[0].name;
                    vm.trialDetailsObj.board_affiliated_org = newVal[0];
                }
            });
        } // watchAffiliationSelection

    } // regulatoryInfoHumanSafetyCtrl

})();
