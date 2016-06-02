/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userAssignTrialCtrl', userAssignTrialCtrl);

    userAssignTrialCtrl.$inject = ['PromiseTimeoutService', '$scope', 'userDetailObj', 'TrialService', 'UserService', 'FamilyService', 'URL_CONFIGS'];

    function userAssignTrialCtrl(PromiseTimeoutService, $scope, userDetailObj, TrialService, UserService, FamilyService, URL_CONFIGS) {
        var vm = this;
        vm.curUser = userDetailObj;
        vm.familySearchParams = FamilyService.getInitialFamilySearchParams();
        vm.familySearchParams.name = '*';
        FamilyService.searchFamilies(vm.familySearchParams).then(function (data) {
            if (data.data) {
                vm.families = data.data.families;
                if(vm.curUser.org_families && vm.curUser.org_families[0]) {
                    vm.family_id = vm.curUser.org_families[0].id;
                    vm.getFamilyTrialsUsers();
                }
            }
        }).catch(function (err) {
            console.log('family search people failed: ' + err);
        });

        vm.getFamilyTrialsUsers = function () {
            if (vm.family_id) {
                UserService.createTransferTrialsOwnership(vm);
                TrialService.createTransferTrialsOwnership(vm);
            }
        };

        vm.resetAll = function () {
            vm.userOptions.reset();
            vm.trialOptions.reset();
        };
        vm.save = function () {
            if (vm.userOptions.selectedItems.length && vm.trialOptions.selectedItems.length) {
                var searchParams = {
                    user_ids: _.chain(vm.userOptions.selectedItems).pluck('id').value(),
                    trial_ids: _.chain(vm.trialOptions.selectedItems).pluck('id').value()
                };
                PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS_ADD, searchParams).then(function (data) {
                    if(data.results === 'success') {
                        vm.resetAll();
                    }
                });
            }
        }
    }
})();
