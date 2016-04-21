/**
 * Created by wus4 on 4/21/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paMilestoneCtrl', paMilestoneCtrl);

    paMilestoneCtrl.$inject = ['$scope', '$state', 'toastr', 'trialDetailObj', 'TrialService'];

    function paMilestoneCtrl($scope, $state, toastr, trialDetailObj, TrialService) {
        var vm = this;
        vm.curTrial = trialDetailObj;

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    } //paMilestoneCtrl
})();
