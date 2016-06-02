/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userAssignTrialCtrl', userAssignTrialCtrl);

    userAssignTrialCtrl.$inject = ['$scope', 'userDetailObj', 'TrialService', 'UserService', 'FamilyService'];

    function userAssignTrialCtrl($scope, userDetailObj, TrialService, UserService, FamilyService) {
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
            console.log('family search people failed');
        });

        vm.getFamilyTrialsUsers = function () {
            if (vm.family_id) {
                UserService.createTransferTrialsOwnership(vm);
                TrialService.createTransferTrialsOwnership(vm);
            }
        };
    }
})();
