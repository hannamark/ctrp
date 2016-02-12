/**
 * Created by wus4 on 2/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('psDetailCtrl', psDetailCtrl);

    psDetailCtrl.$inject = ['trialDetailObj', 'userDetailObj', 'TrialService', 'toastr', '$state'];

    function psDetailCtrl(trialDetailObj, userDetailObj, TrialService, toastr, $state) {

        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.curUser = userDetailObj;

        activate();

        /****************************** implementations **************************/

        function activate() {
        }
    }
})();

