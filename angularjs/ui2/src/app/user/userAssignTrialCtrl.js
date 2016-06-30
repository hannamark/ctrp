/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userAssignTrialCtrl', userAssignTrialCtrl);

    userAssignTrialCtrl.$inject = ['PromiseTimeoutService', '$scope', 'toastr', 'userDetailObj', 'TrialService', 'OrgService', 'UserService', 'FamilyService', 'URL_CONFIGS'];

    function userAssignTrialCtrl(PromiseTimeoutService, $scope, toastr, userDetailObj, TrialService, OrgService, UserService, FamilyService, URL_CONFIGS) {
        var vm = this;
        vm.curUser = userDetailObj;
        if((vm.curUser.org_families && vm.curUser.org_families[0]) || vm.curUser.role === 'ROLE_ADMIN') {
            vm.familySearchParams = FamilyService.getInitialFamilySearchParams();
            vm.familySearchParams.name = '*';
            FamilyService.searchFamilies(vm.familySearchParams).then(function (data) {
                if (data.data) {
                    vm.families = data.data.families;
                    if(vm.curUser.org_families[0] && vm.curUser.org_families[0].id) {
                        vm.family_id = vm.curUser.org_families[0].id;
                        vm.family_name = vm.curUser.org_families[0].name;
                        vm.getFamilyTrialsUsers();
                    }
                }
            }).catch(function (err) {
                console.log('family search people failed: ' + err);
            });
        }
        if(!(vm.curUser.org_families && vm.curUser.org_families[0]) || vm.curUser.role === 'ROLE_ADMIN') {
            vm.orgSearchParams = OrgService.getInitialOrgSearchParams();
            vm.orgSearchParams.name = '*';
            vm.orgSearchParams.no_family = true;
            OrgService.searchOrgs(vm.orgSearchParams).then(function (data) {
                if (data.orgs) {
                    vm.no_family_orgs = data.orgs;
                    if(vm.curUser.organization && vm.curUser.organization.id) {
                        vm.organization_id = vm.curUser.organization.id;
                        vm.organization_name = vm.curUser.organization.name;
                        vm.getFamilyTrialsUsers();
                    }
                }
            }).catch(function (err) {
                console.log('organization search people failed: ' + err);
            });
        }

        vm.getFamilyTrialsUsers = function () {
            if (vm.family_id || vm.organization_id) {
                UserService.createTransferTrialsOwnership(vm);
                TrialService.createTransferTrialsOwnership(vm);
                vm.showSelects = vm.family_id || vm.organization_id;
            }
        };

        vm.resetAll = function () {
            vm.userOptions.reset();
            vm.trialOptions.reset();
        };
        vm.validateAssignment = function () {
            vm.showErrors = false;
            if (vm.trialOptions.selectedItems.length === 0 || vm.userOptions.selectedItems.length === 0) {
                vm.showErrors = true;
            }
        };
        vm.save = function () {
            if (vm.userOptions.selectedItems.length && vm.trialOptions.selectedItems.length) {
                var searchParams = {
                    user_ids: _.chain(vm.userOptions.selectedItems).pluck('id').value(),
                    trial_ids: _.chain(vm.trialOptions.selectedItems).pluck('id').value()
                };
                PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS_ADD, searchParams).then(function (data) {
                    if(data.results === 'success') {
                        toastr.success('Trial Ownership(s) Created', 'Success!');
                        vm.resetAll();
                    }
                });
            }
        };
        vm.removeTrialsOwnerships = function () {
            if (vm.userOptions.selectedItems.length && vm.trialOptions.selectedItems.length) {
                var searchParams = {
                    user_ids: _.chain(vm.userOptions.selectedItems).pluck('id').value(),
                    trial_ids: _.chain(vm.trialOptions.selectedItems).pluck('id').value()
                };
                UserService.endUserTrialsOwnership(searchParams).then(function (data) {
                    if (data.results === 'success') {
                        toastr.success('Trial Ownership Removed', 'Success!');
                        vm.resetAll();
                    }
                });
            }
        };
    }
})();
