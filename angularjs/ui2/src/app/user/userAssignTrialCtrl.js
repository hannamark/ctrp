/**
 * Created by schintal on 9/20/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userAssignTrialCtrl', userAssignTrialCtrl);

    userAssignTrialCtrl.$inject = ['$scope', 'userDetailObj', 'TrialService', 'UserService'];

    function userAssignTrialCtrl($scope, userDetailObj, TrialService, UserService) {
        var vm = this;
        vm.curUser = userDetailObj;
        UserService.createTransferTrialsOwnership(vm);
        TrialService.createTransferTrialsOwnership(vm);
    }
})();
