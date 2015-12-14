/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', 'PATrialService',
        '$scope', 'TrialService', '$timeout', 'URL_CONFIGS', 'Common', 'MESSAGES'];
    function paTrialOverviewCtrl($state, $stateParams, PATrialService,
            $scope, TrialService, $timeout, URL_CONFIGS, Common, MESSAGES) {

        var vm = this;
        vm.accordionOpen = true; //default open accordion
        vm.loadingTrialDetail = true;
        vm.trialDetailObj = {};
        vm.isPanelOpen = true;
        vm.togglePanelOpen = togglePanelOpen;
        vm.backToPATrialSearch = backToPATrialSearch;
        vm.trialId = $stateParams.trialId;
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
            TrialService.getTrialById(vm.trialId).then(function(data) {
                PATrialService.setCurrentTrial(data); //cache the trial data
                Common.broadcastMsg(MESSAGES.TRIAL_DETAIL_SAVED);
                vm.trialDetailObj = data;
                $scope.trialDetailObj = vm.trialDetailObj;
                var firstName = vm.trialDetailObj.pi.fname || '';
                var middleName = vm.trialDetailObj.pi.mname || '';
                var lastName = vm.trialDetailObj.pi.lname || '';
                vm.trialDetailObj.pi.fullName = firstName + ' ' + middleName + ' ' + lastName;

                delete vm.trialDetailObj.server_response;
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


        function togglePanelOpen() {
            vm.isPanelOpen = !vm.isPanelOpen;
        } //togglePanelOpen

        function backToPATrialSearch() {
            $state.go('main.paTrialSearch');
        } //backToPATrialSearch

    };

})();
