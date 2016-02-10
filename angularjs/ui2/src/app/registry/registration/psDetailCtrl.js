/**
 * Created by wus4 on 2/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('psDetailCtrl', psDetailCtrl);

    psDetailCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state'];

    function psDetailCtrl(trialDetailObj, TrialService, toastr, $state) {

        var vm = this;
        vm.curTrial = trialDetailObj;

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    }
})();

