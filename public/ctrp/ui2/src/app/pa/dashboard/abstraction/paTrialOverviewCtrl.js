/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams',
        '$scope', 'TrialService', '$timeout', 'URL_CONFIGS'];
    function paTrialOverviewCtrl($state, $stateParams,
            $scope, TrialService, $timeout, URL_CONFIGS) {

        var vm = this;
        vm.accordionOpen = true; //default open accordion
        vm.loadingTrialDetail = true;
        vm.trialDetailObj = {};
        console.log('trial overview controller id: ', $scope.$id);

        activate();

        function activate() {
            $timeout(function() {
                getTrialDetail();
            }, 1000);

        } //activate

        /**
         * Promise call to get the trial detail object
         * @return {[type]} [description]
         */
        function getTrialDetail() {
            var trialId = $stateParams.trialId || 1;
            TrialService.getTrialById(trialId).then(function(data) {
                console.log('received trial detail obj: ', data);
                vm.trialDetailObj = data;
                $scope.trialDetailObj = vm.trialDetailObj;
                var firstName = vm.trialDetailObj.pi.fname || '';
                var middleName = vm.trialDetailObj.pi.mname || '';
                var lastName = vm.trialDetailObj.pi.lname || '';
                vm.trialDetailObj.pi.fullName = firstName + ' ' + middleName + ' ' + lastName;
                // vm.trialDetailObj.pi.fullName = vm.trialDetailObj.pi.fname +
                //     ' ' + vm.trialDetailObj.pi.mname + ' ' +
                //     vm.trialDetailObj.pi.lname;
            }).catch(function(error) {
                console.log('error in fetching trial detail object');
            }).finally(function() {
                console.log('completed the promise call');
                vm.loadingTrialDetail = false;
            });
        } //getTrialDetail

    };

})();
