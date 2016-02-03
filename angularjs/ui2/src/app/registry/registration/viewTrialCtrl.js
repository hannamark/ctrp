/**
 * Created by wus4 on 2/3/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('viewTrialCtrl', viewTrialCtrl);

    viewTrialCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state'];

    function viewTrialCtrl(trialDetailObj, TrialService, toastr, $state) {

        var vm = this;
        vm.curTrial = trialDetailObj;

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    }
})();

