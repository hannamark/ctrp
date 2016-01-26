
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialNciCtrl', trialNciCtrl);

    trialCollaboratorsCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialCollaboratorsCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES,trialDetailObj, studySourceObj, nciDivObj, nciProgObj) {



    } //trialCollaboratorsCtrl

})();
