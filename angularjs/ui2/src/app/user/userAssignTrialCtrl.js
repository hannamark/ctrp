/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userAssignTrialCtrl', userAssignTrialCtrl);

    userAssignTrialCtrl.$inject = ['PromiseTimeoutService', 'toastr', 'userDetailObj', 'TrialService', 'OrgService', 'UserService', 'FamilyService', 'URL_CONFIGS'];

    function userAssignTrialCtrl(PromiseTimeoutService, toastr, userDetailObj, TrialService, OrgService, UserService, FamilyService, URL_CONFIGS) {
        var vm = this;
        vm.curUser = userDetailObj;

        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.org_search_name, 'no_family');
        };

        vm.setTypeAheadOrg = function (searchObj) {
            var splitVal = searchObj.split('<span class="hide">');
            vm.org_search_name = splitVal[0];
            vm.userChosenOrg = JSON.parse(splitVal[1].split('</span>')[0].replace(/"null"/g, 'null'));
            vm.organization_id = vm.userChosenOrg.id;
            vm.family_id = undefined;
            vm.getFamilyTrialsUsers();
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.organization_id = vm.org_search_name = undefined;
            vm.showSelects = vm.family_id || vm.organization_id;
        };

        vm.getFamilyTrialsUsers = function () {
            if (vm.family_id || vm.organization_id) {
                UserService.createTransferTrialsOwnership(vm);
                TrialService.createTransferTrialsOwnership(vm);
                vm.showSelects = vm.family_id || vm.organization_id;
            }
            if (!vm.organization_id) {
                vm.removeOrgChoice();
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

        if(!(vm.curUser.org_families && vm.curUser.org_families[0])) {

            if(vm.curUser.organization && vm.curUser.organization.id) {
                vm.organization_id = vm.curUser.organization.id;
                vm.organization_name = vm.curUser.organization.name;
                vm.getFamilyTrialsUsers();
            }
        }

        if((vm.curUser.org_families && vm.curUser.org_families[0]) || vm.curUser.role === 'ROLE_ADMIN') {
            vm.familySearchParams = FamilyService.getInitialFamilySearchParams();
            vm.familySearchParams.name = '*';
            vm.familySearchParams.rows = undefined;
            vm.familySearchParams.allrows = true;
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
    }
})();
