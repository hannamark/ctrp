/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', 'PATrialService',
        '$mdToast', '$document', '$timeout', 'Common', 'MESSAGES',
        '$scope', 'TrialService', 'UserService'];
    function paTrialOverviewCtrl($state, $stateParams, PATrialService,
            $mdToast, $document, $timeout, Common, MESSAGES,
            $scope, TrialService, UserService) {

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
        vm.adminCheckoutBtnDisabled = false;
        vm.scientificCheckoutAllowed = false;
        vm.scientificCheckoutBtnDisabled = false;
        vm.curUser = UserService.currentUser();

        activate();

        function activate() {
            $timeout(function() {
                getTrialDetail();
                watchCheckoutButtons();
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
                console.log('checkout result: ', res.result);
                updateTrialDetailObj(res.result);
                showToastr(checkoutType + ' checkout was successful!', 'top right');
            });
        }

        function checkinTrial(checkinType) {
            PATrialService.checkinTrial(vm.trialId, checkinType).then(function(res) {
                console.log('checkin result: ', res.result);
                updateTrialDetailObj(res.result);
                showToastr(checkinType + ' checkin was successful!', 'top right')
            });
        }

        /**
         * Update the trial detail object for the checkout/in results
         * @param  {JSON} data [updated trial detail object with the checkout/in records]
         */
        function updateTrialDetailObj(data) {
            vm.trialDetailObj.admin_checkout = JSON.parse(data.admin_checkout);
            vm.trialDetailObj.scientific_checkout = JSON.parse(data.scientific_checkout);
            PATrialService.setCurrentTrial(vm.trialDetailObj); //cache the trial data
            Common.broadcastMsg(MESSAGES.TRIAL_DETAIL_SAVED);
            $scope.trialDetailObj = vm.trialDetailObj;
        }

        /**
         * Watcher for the checkout / checkin buttons,
         * watch for whether or not checkout/in is allowed, and
         * whether or not the buttons should be disabled (if the user is not the same as the one
         * who checked it out)
         * @return {Void}
         */
        function watchCheckoutButtons() {

            $scope.$watch(function() {return vm.trialDetailObj.admin_checkout;},
                function(newVal) {
                    vm.adminCheckoutAllowed = !newVal;

                    if (!!vm.trialDetailObj.admin_checkout) {
                        vm.adminCheckoutBtnDisabled = vm.curUser !== vm.trialDetailObj.admin_checkout.by;
                    }
                });

            $scope.$watch(function() {return vm.trialDetailObj.scientific_checkout;},
                function(newVal) {
                    vm.scientificCheckoutAllowed = !newVal;

                    if (!!vm.trialDetailObj.scientific_checkout) {
                        vm.scientificCheckoutBtnDisabled = vm.curUser !== vm.trialDetailObj.scientific_checkout.by;
                    }
                });
        } //watchCheckoutButtons


        /**
         * Throw a toaster for checkout and checkin operations
         * @param  {String} message  [toastr message]
         * @param  {String} position [where the toastr is displayed]
         * @return {Void}
         */
        function showToastr(message, position) {
            console.log('showing a toastr!');
            $mdToast.show({
            template: '<md-toast style="background-color: #6200EA"><span flex>' + message + '</span></md-toast>',
            parent: $document[0].querySelector('#checkoutORin_message'),
            hideDelay: 3000,
            position: position
          });
        } //showToastr

    };

})();
