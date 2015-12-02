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

        activate();

        function activate() {
            $timeout(function() {
                getTrialDetail();
            }, 500);

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
                vm.trialDetailObj.pi.fullName = vm.trialDetailObj.pi.fname +
                    ' ' + vm.trialDetailObj.pi.mname ||'' + ' ' +
                    vm.trialDetailObj.pi.lname;

                getTrialStatus(12); //getstatus
            }).catch(function(error) {
                console.log('error in fetching trial detail object');
            }).finally(function() {
                console.log('completed the promise call');
                vm.loadingTrialDetail = false;
            });
        } //getTrialDetail


        /**
         * Promise call to get trial status object with the given id
         * @param  {[type]} trialStatusId [description]
         * @return {[type]}               [description]
         */
        function getTrialStatus(trialStatusId) {
            TrialService.getTrialStatusById(trialStatusId).then(function(statusObj) {
                console.log('received trial status obj: ', statusObj);
            });
        }

        /*
        console.log('in accordion, state.name: ', $state.current.name);
        console.log('in trial overview, from state name: ', $state.fromState);
        console.log('trialId in the url is: ', $stateParams.trialId);
        */
    };

})();
