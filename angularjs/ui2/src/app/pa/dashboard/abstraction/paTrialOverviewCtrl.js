/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', 'PATrialService',
        '$scope', 'TrialService', '$timeout', 'Common', 'MESSAGES'];
    function paTrialOverviewCtrl($state, $stateParams, PATrialService,
            $scope, TrialService, $timeout, Common, MESSAGES) {

        var vm = this;
        vm.accordionOpen = true; //default open accordion
        vm.loadingTrialDetail = true;
        vm.trialDetailObj = {};
        vm.isPanelOpen = true;
        vm.togglePanelOpen = togglePanelOpen;
        vm.backToPATrialSearch = backToPATrialSearch;
        vm.trialId = $stateParams.trialId;
        vm.checkoutTrial = checkoutTrial;
        vm.checkinTrial = checkinTrial;
        vm.adminCheckoutAllowed = false;
        vm.scientificCheckoutAllowed = false;

        activate();

        function activate() {
            $timeout(function() {
                getTrialDetail();
                watchCheckoutButton();
            }, 500);
        } //activate

        /**
         * Promise call to get the trial detail object
         * @return {[type]} [description]
         */
        function getTrialDetail() {
            TrialService.getTrialById(vm.trialId).then(function(data) {
                data.admin_checkout = JSON.parse(data.admin_checkout);
                data.scientific_checkout = JSON.parse(data.scientific_checkout);
                vm.trialDetailObj = data;
                delete vm.trialDetailObj.server_response;
                PATrialService.setCurrentTrial(vm.trialDetailObj); //cache the trial data
                Common.broadcastMsg(MESSAGES.TRIAL_DETAIL_SAVED);

                $scope.trialDetailObj = vm.trialDetailObj;
                var firstName = vm.trialDetailObj.pi.fname || '';
                var middleName = vm.trialDetailObj.pi.mname || '';
                var lastName = vm.trialDetailObj.pi.lname || '';
                vm.trialDetailObj.pi.fullName = firstName + ' ' + middleName + ' ' + lastName;

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


        function checkoutTrial(checkoutType) {
            PATrialService.checkoutTrial(vm.trialId, checkoutType).then(function(res) {
                console.log('checkout result: ', res.result[0]);
                saveTrialDetailObj(res.result[0]);
            });
        }

        function checkinTrial(checkinType) {
            PATrialService.checkinTrial(vm.trialId, checkinType).then(function(res) {
                console.log('checkin result: ', res.result[0]);
                saveTrialDetailObj(res.result[0]);
            });
        }

        /**
         * Update the trial detail object for the checkout/in results
         * @param  {JSON} data [updated trial detail object with the checkout/in records]
         */
        function saveTrialDetailObj(data) {
            vm.trialDetailObj.admin_checkout = JSON.parse(data.admin_checkout);
            vm.trialDetailObj.scientific_checkout = JSON.parse(data.scientific_checkout);
            PATrialService.setCurrentTrial(vm.trialDetailObj); //cache the trial data
            Common.broadcastMsg(MESSAGES.TRIAL_DETAIL_SAVED);
            $scope.trialDetailObj = vm.trialDetailObj;
        }

        function watchCheckoutButton() {
            $scope.$watch(function() {return vm.trialDetailObj.admin_checkout;},
                function(newVal) {
                    vm.adminCheckoutAllowed = !newVal;
                });

            $scope.$watch(function() {return vm.trialDetailObj.scientific_checkout;},
                function(newVal) {
                    vm.scientificCheckoutAllowed = !newVal;
                });
        }

    };

})();
