/**
 * Created by wus4 on 4/21/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paMilestoneCtrl', paMilestoneCtrl);

    paMilestoneCtrl.$inject = ['$scope', '$state', 'toastr', 'trialDetailObj', 'milestoneObj', 'TrialService'];

    function paMilestoneCtrl($scope, $state, toastr, trialDetailObj, milestoneObj, TrialService) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.addMode = false;
        vm.milestoneArr = milestoneObj;

        vm.setAddMode = function(mode) {
            vm.addMode = mode;
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    } //paMilestoneCtrl
})();
