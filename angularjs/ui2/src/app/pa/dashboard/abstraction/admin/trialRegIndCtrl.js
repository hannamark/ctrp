
/**
 * Created by schintal, January 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialRegIndCtrl', trialRegIndCtrl);

    trialRegIndCtrl.$inject = ['TrialService', '$scope', 'toastr', 'trialDetailObj', 'nciObj', 'holderTypeObj']//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialRegIndCtrl(TrialService, $scope, toastr, trialDetailObj, nciObj, holderTypeObj){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.nciArr = nciObj;
        vm.grantorArr = [];
        vm.holderTypeArr = holderTypeObj;
        vm.nihNciArr = [];
       console.log('Trial ' + vm.holderTypeObj + ' has been recorded', 'Operation Successful!');


    } //trialRegIndCtrl

})();
