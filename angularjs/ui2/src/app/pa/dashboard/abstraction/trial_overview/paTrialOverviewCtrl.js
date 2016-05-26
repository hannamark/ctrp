/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl)
    .controller('checkinModalCtrl', checkinModalCtrl); // checkin modal controller

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', 'PATrialService',
        '$mdToast', '$document', '$timeout', 'Common', 'MESSAGES', 'researchCategories',
        '$scope', 'TrialService', 'UserService', 'curTrial', '_', 'PersonService', '$uibModal'];

    checkinModalCtrl.$inject = ['$scope', '$uibModalInstance', 'curTrialObj', 'trialStatusDict',
        'PATrialService', 'TrialService']; // checkin modal controller
    function paTrialOverviewCtrl($state, $stateParams, PATrialService,
            $mdToast, $document, $timeout, Common, MESSAGES, researchCategories,
            $scope, TrialService, UserService, curTrial, _, PersonService, $uibModal) {

        var vm = this;
        var curUserRole = UserService.getUserRole() || '';
        var researchCats = researchCategories;

        vm.accordionOpen = true; //default open accordion
        vm.loadingTrialDetail = true;
        console.log('curTrial: ', curTrial);
        vm.trialDetailObj = curTrial;
        vm.adminCheckoutObj = Common.jsonStrToObject(vm.trialDetailObj.admin_checkout);
        vm.scientificCheckoutObj = Common.jsonStrToObject(vm.trialDetailObj.scientific_checkout);

        vm.isPanelOpen = true;
        vm.togglePanelOpen = togglePanelOpen;
        vm.backToPATrialSearch = backToPATrialSearch;
        vm.trialId = $stateParams.trialId;
        vm.checkoutTrial = checkoutTrial;
        vm.checkinTrial = checkinTrial;
        vm.adminCheckoutAllowed = false;
        vm.adminCheckinAllowed = true;

        vm.adminCheckoutBtnDisabled = false;
        vm.scientificCheckoutAllowed = false;
        vm.scientificCheckinAllowed = true;
        vm.scientificCheckoutBtnDisabled = false;
        vm.curUser = UserService.currentUser();
        vm.submitter = {}; // container for the last submitter information
        vm.submitterPopOver = {
            submitter: vm.submitter,
            templateUrl: 'submitterPopOverTemplate.html',
            title: 'Last Trial Submitter'
        };

        vm.disableBtn = false;

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

        function _parseCheckoutinObjects(serverResponse, type) {
            vm.adminCheckoutObj = Common.jsonStrToObject(serverResponse.result.admin_checkout);
            vm.scientificCheckoutObj = Common.jsonStrToObject(serverResponse.result.scientific_checkout);
            Common.broadcastMsg(MESSAGES.TRIALS_CHECKOUT_IN_SIGNAL);
        }

        function checkoutTrial(checkoutType) {
            // To prevent multiple submissions before Ajax call is completed
            vm.disableBtn = true;

            PATrialService.checkoutTrial(vm.trialId, checkoutType).then(function(res) {
                var status = res.server_response.status;
                if (status >= 200 && status <= 210) {
                    var checkout_message = res.checkout_message || 'Checkout was not successful, other user may have checked it out ';
                    if (res.checkout_message !== null) {
                        updateTrialDetailObj(res.result);
                        _parseCheckoutinObjects(res, checkoutType);
                        showToastr(checkout_message, 'top right');
                    }
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        function checkinTrial(checkinType) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/_trial_checkin_modal.html',
                bindToController: true,
                backdrop: 'static', // do not close modal for click outside modal
                controller: 'checkinModalCtrl',
                controllerAs: 'checkinModalView',
                size: 'md',
                resolve: {
                    curTrialObj: vm.trialDetailObj,
                    trialStatusDict: TrialService.getTrialStatuses(),
                }
            });
            var modalOpened = true;
            vm.disableBtn = true;
            modalInstance.result.then(function(checkinComment) {
                console.info('modal closed, comment: ', checkinComment);
                if (angular.isDefined(checkinComment) && checkinComment.length > 0) {
                    _performTrialCheckin(checkinType, vm.trialDetailObj.id, checkinComment);
                }
            }, function() {
                vm.disableBtn = false;
            });
            modalOpened = false;
        }

        function _performTrialCheckin(checkinType, trialId, checkinComment) {
            vm.disableBtn = true;
            var commentText = 'experimental comment';
            PATrialService.checkinTrial(trialId, checkinType, checkinComment).then(function(res) {
                var checkin_message = res.checkin_message || 'Checkin was not successful, other user may have checked it in already ';
                var status = res.server_response.status;
                if (status >= 200 && status <= 210) {
                    // console.log('checkin result: ', res.result);
                    updateTrialDetailObj(res.result);
                    _parseCheckoutinObjects(res, checkinType);
                    showToastr(checkin_message, 'top right');
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        /**
         * Update the trial detail object for the checkout/in results
         * @param  {JSON} data [updated trial detail object with the checkout/in records]
         */
        function updateTrialDetailObj(data) {

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

            // check if the trial is registered or not (registered/reported or imported)
            var internalSourceObj = vm.trialDetailObj.internal_source; // if null, then it is imported
            vm.trialDetailObj.isImported = !!internalSourceObj ? (internalSourceObj.code !== 'REG') : true;

            // get research category name and determine its research category
            vm.trialDetailObj.researchCategoryName = _getResearchCategory(researchCats, vm.trialDetailObj.research_category_id);
            vm.trialDetailObj.isExpandedAccess = vm.trialDetailObj.researchCategoryName.indexOf('expand') > -1;
            vm.trialDetailObj.isInterventional = vm.trialDetailObj.researchCategoryName.indexOf('intervention') > -1;
            vm.trialDetailObj.isObservational = vm.trialDetailObj.researchCategoryName.indexOf('observation') > -1;
            vm.trialDetailObj.isAncillary = vm.trialDetailObj.researchCategoryName.indexOf('ancillary') > -1;

            // console.log('vm.submitterPopOver: ', vm.submitterPopOver);
            vm.trialDetailObj.lock_version = data.lock_version;
            vm.trialDetailObj.is_draft = ''
            vm.trialDetailObj.edit_type = vm.trialDetailObj.isImported ? 'imported_update' : '';
            PATrialService.setCurrentTrial(vm.trialDetailObj, 'checkoutin'); //cache the trial data
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
                    vm.adminCheckoutAllowed = (newVal === null); // boolean, if not null, do not allow checkout again
                    // trial is not editable if checkout is allowed (in checkedin state) or
                    // the curUserRole is Super or Admin
                    var checkedoutByUsername = !!newVal ? newVal.by : '';
                    vm.adminCheckinAllowed = !vm.adminCheckoutAllowed && (vm.curUser === checkedoutByUsername ||
                        curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ABSTRACTOR-SU' ||
                        curUserRole === 'ROLE_ADMIN');
                    _checkEditableStatus();

                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.adminCheckoutBtnDisabled = vm.curUser !== checkedoutByUsername &&
                        curUserRole !== 'ROLE_SUPER' && curUserRole !== 'ROLE_ABSTRACTOR' &&
                        curUserRole !== 'ROLE_ABSTRACTOR-SU' && curUserRole !== 'ROLE_ADMIN';
                    }
                });

            $scope.$watch(function() {return vm.scientificCheckoutObj;},
                function(newVal) {
                    vm.scientificCheckoutAllowed = (newVal === null); // if not null, do not allow checkout again
                    // trial is not editable if checkout is allowed (in checkedin state) or
                    // the curUserRole is Super or Admin
                    var checkedoutByUsername = !!newVal ? newVal.by : '';
                    vm.scientificCheckinAllowed = !vm.scientificCheckoutAllowed && (vm.curUser === checkedoutByUsername ||
                        curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ABSTRACTOR-SU' ||
                        curUserRole === 'ROLE_ADMIN');

                    _checkEditableStatus();
                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.scientificCheckoutBtnDisabled = vm.curUser !== checkedoutByUsername &&
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
            $mdToast.show({
            template: '<md-toast style="background-color: #6200EA"><span flex>' + message + '</span></md-toast>',
            parent: $document[0].querySelector('#checkoutORin_message'),
            hideDelay: 3000,
            position: position
          });
        } //showToastr

        function watchUpdatesInChildrenScope() {
            $scope.$on('updatedInChildScope', function() {
                // console.info('updatedInChildScope, getting current trial now!');
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                _checkEditableStatus();
                updateTrialDetailObj(vm.trialDetailObj);
            });
        }

        function _checkEditableStatus() {
            var overridingUserRoles = ['ROLE_SUPER', 'ROLE_ADMIN'];
            vm.trialDetailObj.pa_editable = vm.adminCheckinAllowed || _.contains(overridingUserRoles, curUserRole);
            vm.trialDetailObj.pa_sci_editable = vm.scientificCheckinAllowed || _.contains(overridingUserRoles, curUserRole);
        }

        /**
         * Find the research category name in the provided research category array
         * @param  {Array} researchCategoryArr array of JSON objects
         * @param  {Integer} researchCatId       e.g. vm.trialDetailObj.research_category_id
         * @return {String}                     research category name (lower case), could be empty if not found
         */
        function _getResearchCategory(researchCategoryArr, researchCatId) {
            var catObj = _.findWhere(researchCategoryArr, {id: researchCatId});
            var catName = !!catObj ? catObj.name : '';
            return catName.toLowerCase();
        }
    } // paTrialOverviewCtrl

    /**
     * Checkin modal controller
     */
    function checkinModalCtrl($scope, $uibModalInstance, curTrialObj, trialStatusDict,
            PATrialService, TrialService) {
        var viewModel = this;
        viewModel.curTrialObj = curTrialObj;
        viewModel.checkinComment = null;
        viewModel.isValidatingStatus = true;
        viewModel.isTrialStatusValid = true;
        viewModel.isAbstractionValid = true; // TODO:
        var annotatedTrialStatuses = PATrialService.annotateTrialStatusWithNameAndCode(curTrialObj.trial_status_wrappers, trialStatusDict);

        activate();
        function activate() {
            validateTrialStatuses(annotatedTrialStatuses);
        }
        viewModel.proceedCheckin = function() {
            $uibModalInstance.close(viewModel.checkinComment);
        };
        viewModel.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        viewModel.viewAbstractionValidation = function() {
            console.info('viewAbstractionValidation....');
            // TODO: redirect to viewAbstractionValidation page
        };

        function validateTrialStatuses(annotatedStatusArr) {
            viewModel.isValidatingStatus = true;
            TrialService.validateStatus({"statuses": annotatedStatusArr}).then(function(res) {
                if (res.validation_msgs && angular.isArray(res.validation_msgs) && res.validation_msgs.length > 0) {

                    res.validation_msgs.forEach(function(msg) {
                        if ((msg.errors && msg.errors.length > 0) ||
                                (msg.warnings && msg.warnings.length > 0)) {

                                    viewModel.isTrialStatusValid = false;
                                    return;
                            }
                    }); // forEach
                } else {
                    viewModel.isTrialStatusValid = true;
                }
            }).catch(function(err) {
                console.error('error in validating status: ', err);
            }).finally(function() {
                viewModel.isValidatingStatus = false;
            });
        }

    } // checkin modal controller

})();
