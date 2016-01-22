/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', 'PATrialService',
        '$mdToast', '$document', '$timeout', 'Common', 'MESSAGES',
        '$scope', 'TrialService', 'UserService', 'curTrial', '_', 'PersonService'];
    function paTrialOverviewCtrl($state, $stateParams, PATrialService,
            $mdToast, $document, $timeout, Common, MESSAGES,
            $scope, TrialService, UserService, curTrial, _, PersonService) {

        var vm = this;
        vm.accordionOpen = true; //default open accordion
        vm.loadingTrialDetail = true;
        console.log('curTrial: ', curTrial);
        vm.trialDetailObj = curTrial;
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
            updateTrialDetailObj(vm.trialDetailObj);
            watchCheckoutButtons();
            watchUpdatesInChildrenScope();
        } //activate

        function togglePanelOpen() {
            vm.isPanelOpen = !vm.isPanelOpen;
        } //togglePanelOpen

        function backToPATrialSearch() {
            $state.go('main.paTrialSearch');
        } //backToPATrialSearch

        function checkoutTrial(checkoutType) {
            PATrialService.checkoutTrial(vm.trialId, checkoutType).then(function(res) {
                // console.log('checkout result: ', res.result);
                updateTrialDetailObj(res.result);
                showToastr(checkoutType + ' checkout was successful!', 'top right');
            });
        }

        function checkinTrial(checkinType) {
            PATrialService.checkinTrial(vm.trialId, checkinType).then(function(res) {
                // console.log('checkin result: ', res.result);
                updateTrialDetailObj(res.result);
                showToastr(checkinType + ' checkin was successful!', 'top right')
            });
        }

        /**
         * Update the trial detail object for the checkout/in results
         * @param  {JSON} data [updated trial detail object with the checkout/in records]
         */
        function updateTrialDetailObj(data) {
            console.log('in updating trial detail obj, admin_checkout: ' + data.admin_checkout + ', scientific_checkout: ' + data.scientific_checkout);
            vm.trialDetailObj.admin_checkout = JSON.parse(data.admin_checkout);
            vm.trialDetailObj.scientific_checkout = JSON.parse(data.scientific_checkout);

            if (!vm.trialDetailObj.pi.fullName) {
                vm.trialDetailObj.pi.fullName = PersonService.extractFullName(vm.trialDetailObj.pi);
            }
            // sort the submissions by DESC submission_num
            vm.trialDetailObj.submissions = _.sortBy(vm.trialDetailObj.submissions, function(s) {
                return -s.submission_num; // DESC order
            });

            if (!vm.trialDetailObj.central_contacts) {
                vm.trialDetailObj.central_contacts = [].concat({});
            }

            if (!!data.admin_checkout || !!data.scientific_checkout) {
                vm.trialDetailObj.pa_editable = true;
            } else {
                vm.trialDetailObj.pa_editable = false;
            }

            vm.trialDetailObj.lock_version = data.lock_version;
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
                    vm.adminCheckoutAllowed = (newVal === null); // boolean, if not null, do not allow checkout again

                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.adminCheckoutBtnDisabled = vm.curUser !== vm.trialDetailObj.admin_checkout.by &&
                            UserService.getUserRole() !== 'ROLE_SUPER' && UserService.getUserRole() != "ROLE_ABSTRACTOR";
                    }
                });

            $scope.$watch(function() {return vm.trialDetailObj.scientific_checkout;},
                function(newVal) {
                    vm.scientificCheckoutAllowed = (newVal === null); // if not null, do not allow checkout again

                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.scientificCheckoutBtnDisabled = vm.curUser !== vm.trialDetailObj.scientific_checkout.by &&
                            UserService.getUserRole() !== 'ROLE_SUPER' && UserService.getUserRole() != "ROLE_ABSTRACTOR";;
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

        function watchUpdatesInChildrenScope() {
            $scope.$on('updatedInChildScope', function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            });
        }

        function _getUpdatedTrialDetailObj() {
            TrialService.getTrialById(vm.trialDetailObj.id).then(function(res) {
                console.log('updated trialDetail obj: ', res);
            });
        }
    }

})();
