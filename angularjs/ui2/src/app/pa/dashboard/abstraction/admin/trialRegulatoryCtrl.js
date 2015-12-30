
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialRegFdaCtrl', trialRegFdaCtrl);

    trialRegFdaCtrl.$inject = ['TrialService', '$scope', 'toastr']//, 'trialDetailObj', 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialRegFdaCtrl(TrialService, $scope, toastr){ //, trialDetailObj, studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;


    } //trialNciCtrl

})();
