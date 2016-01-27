/**
 * Created by wangg5, January 25th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('regulatoryInfoHumanSafetyCtrl', regulatoryInfoHumanSafetyCtrl);

    regulatoryInfoHumanSafetyCtrl.$inject = ['$scope', 'PATrialService', 'TrialService',
        'boardApprovalStatuses', '_', '$timeout', 'toastr'];

    function regulatoryInfoHumanSafetyCtrl($scope, PATrialService, TrialService,
        boardApprovalStatuses, _, $timeout, toastr) {

        var vm = this;
        vm.boardAffiliationArray = [];
        vm.statuses = boardApprovalStatuses.statuses;
        vm.changeStatus = changeStatus;
        vm.updateHumanSafetyInfo = updateHumanSafetyInfo;
        vm.approvalNumRequired = false;
        vm.boardNameRequired = false;
        vm.boardAffRequired = false;

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
                changeStatus();
            }, 0);
        } // _getTrialDetailCopy

        function _watchAffiliationSelection() {
            $scope.$watchCollection(function() {return vm.boardAffiliationArray;},
                function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    console.log('affiliation newVal: ', newVal);
                    vm.trialDetailsObj.board_affiliation_id = newVal[0].id;
                    // vm.trialDetailsObj.board_name = newVal[0].name;
                    vm.trialDetailsObj.board_affiliated_org = newVal[0];
                }
            });
        } // watchAffiliationSelection

        /**
         * action triggered upon changing approval status
         * @return {Void}
         */
        function changeStatus() {
            var approvalStatus = _.findWhere(vm.statuses, {id: vm.trialDetailsObj.board_approval_status_id});
            // console.log('approval status: ', approvalStatus);
            var statusName = approvalStatus.name;
            // approval number is required if the status is 'Submitted, approved'
            vm.approvalNumRequired = statusName.toLowerCase().indexOf('approv') > -1;
            // board name is required unless status is 'Submission not required'
            vm.boardNameRequired = statusName.toLowerCase().indexOf('not required') === -1;
            // board affiliation is required when status is 'Submitted, approved' or 'Submitted, exempt'
            vm.boardAffRequired = statusName.toLowerCase().indexOf('exempt') > -1 ||
                                  statusName.toLowerCase().indexOf('approv') > -1;

        } // changeStatus

        function updateHumanSafetyInfo() {
            console.log('updating human safety info...');
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailsObj.id;
            outerTrial.trial = vm.trialDetailsObj;

            TrialService.upsertTrial(outerTrial).then(function(res) {
                vm.trialDetailsObj = res;
                vm.trialDetailsObj.lock_version = res.lock_version;

                PATrialService.setCurrentTrial(vm.trialDetailsObj); // update cache
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Human subject safety information has been updated', 'Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
                getTrialDetailCopy();
            });
        }

    } // regulatoryInfoHumanSafetyCtrl

})();
