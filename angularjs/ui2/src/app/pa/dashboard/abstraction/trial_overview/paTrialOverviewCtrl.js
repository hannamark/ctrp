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
        vm.adminCheckoutObj = JSON.parse(vm.trialDetailObj.admin_checkout);
        vm.scientificCheckoutObj = JSON.parse(vm.trialDetailObj.scientific_checkout);

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
        vm.submitter = {}; // container for the last submitter information
        vm.submitterPopOver = {
            submitter: vm.submitter,
            templateUrl: 'submitterPopOverTemplate.html',
            title: 'Last Trial Submitter'
        };

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
                console.log('checkout result: ', res.result);
                updateTrialDetailObj(res.result);
                vm.adminCheckoutObj = JSON.parse(res.result.admin_checkout);
                vm.scientificCheckoutObj = JSON.parse(res.result.scientific_checkout);
                showToastr(checkoutType + ' checkout was successful!', 'top right');
            });
        }

        function checkinTrial(checkinType) {
            PATrialService.checkinTrial(vm.trialId, checkinType).then(function(res) {
                console.log('checkin result: ', res.result);
                updateTrialDetailObj(res.result);
                vm.adminCheckoutObj = JSON.parse(res.result.admin_checkout); // null
                vm.scientificCheckoutObj = JSON.parse(res.result.scientific_checkout); // null
                // updateTrialDetailObj(res.result);
                showToastr(checkinType + ' checkin was successful!', 'top right')
            });
        }

        /**
         * Update the trial detail object for the checkout/in results
         * @param  {JSON} data [updated trial detail object with the checkout/in records]
         */
        function updateTrialDetailObj(data) {
            console.log('in updating trial detail obj, admin_checkout: ' + data.admin_checkout + ', scientific_checkout: ' + data.scientific_checkout);
            // vm.trialDetailObj.admin_checkout = JSON.parse(data.admin_checkout);
            // vm.trialDetailObj.scientific_checkout = JSON.parse(data.scientific_checkout);

            if (vm.trialDetailObj.pi && !vm.trialDetailObj.pi.fullName) {
                vm.trialDetailObj.pi.fullName = PersonService.extractFullName(vm.trialDetailObj.pi);
            }
            // sort the submissions by DESC submission_num
            vm.trialDetailObj.submissions = _.sortBy(vm.trialDetailObj.submissions, function(s) {
                return -s.submission_num; // DESC order
            });

            if (!vm.trialDetailObj.central_contacts) {
                vm.trialDetailObj.central_contacts = [].concat({});
            }

            // fill submitter's info:
            vm.submitterPopOver.submitter = vm.trialDetailObj.submitter || {};
            vm.submitterPopOver.submitter.organization = vm.trialDetailObj.submitters_organization || '';

            // console.log('vm.submitterPopOver: ', vm.submitterPopOver);
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

            $scope.$watch(function() {return vm.adminCheckoutObj;},
                function(newVal) {
                    var curUserRole = UserService.getUserRole() || '';
                    vm.adminCheckoutAllowed = (newVal === null); // boolean, if not null, do not allow checkout again
                    // trial is not editable if checkout is allowed (in checkedin state) or
                    // the curUserRole is Super or Admin
                    vm.trialDetailObj.pa_editable = !vm.adminCheckoutAllowed || !vm.scientificCheckoutAllowed || curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ADMIN';
                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.adminCheckoutBtnDisabled = vm.curUser !== vm.adminCheckoutObj.by &&
                        curUserRole !== 'ROLE_SUPER' && curUserRole !== 'ROLE_ABSTRACTOR' &&
                        curUserRole !== 'ROLE_ABSTRACTOR-SU' && curUserRole !== 'ROLE_ADMIN';
                    }
                });

            $scope.$watch(function() {return vm.scientificCheckoutObj;},
                function(newVal) {
                    vm.scientificCheckoutAllowed = (newVal === null); // if not null, do not allow checkout again
                    // trial is not editable if checkout is allowed (in checkedin state) or
                    // the curUserRole is Super or Admin
                    vm.trialDetailObj.pa_editable = !vm.adminCheckoutAllowed || !vm.scientificCheckoutAllowed || curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ADMIN';

                    if (!!newVal) {
                        var curUserRole = UserService.getUserRole() || '';
                        // ROLE_SUPER can override the checkout button
                        vm.scientificCheckoutBtnDisabled = vm.curUser !== vm.scientificCheckoutObj.by &&
                            curUserRole !== 'ROLE_SUPER' && curUserRole !== 'ROLE_ABSTRACTOR' &&
                            curUserRole !== 'ROLE_ABSTRACTOR-SU' && curUserRole !== 'ROLE_ADMIN';
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
