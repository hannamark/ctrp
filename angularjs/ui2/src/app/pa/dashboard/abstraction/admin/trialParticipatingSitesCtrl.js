
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialParticipatingSitesCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialParticipatingSitesCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES,trialDetailObj, studySourceObj, nciDivObj, nciProgObj) {



    } //trialParticipatingSitesCtrl

})();
