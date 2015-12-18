
/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialNciCtrl', trialNciCtrl);

    trialNciCtrl.$inject = ['$scope','studySourceObj'];

    function trialNciCtrl($scope, studySourceObj) {
        var vm = this;
        vm.studySourceArr = studySourceObj;
        //vm.selectedSponsorArray = [];

        //if (vm.selectedSponsorArray.length > 0) {
       //     vm.curTrial.sponsor_id = vm.selectedSponsorArray[0].id;
       // } else {
       //     vm.curTrial.sponsor_id = null;
       // }

    } //trialNciCtrl

})();
