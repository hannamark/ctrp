/**
 * Created by schintal 10/15/2015
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('gsaModalCtrl', gsaModalCtrl);

    gsaModalCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$state','$sce',
         '$timeout', 'LocalCacheService', 'UserService', 'gsaObj', '$modalInstance'];

    function gsaModalCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout, LocalCacheService, UserService, gsaObj, $modalInstance) {
        var vm = this;
        //console.log('received loginBulletin: ' + JSON.stringify(loginBulletin));

        console.log("In Child Modal");

        vm.gsa = gsaObj.gsa;
        vm.userType = UserService.getUserType();
        console.log('userType: ' + JSON.stringify(vm.userType));

        console.log('gsa: ' + JSON.stringify(vm.gsa));

        vm.accept = function() {
            console.log('ACCEPT');
            LocalCacheService.cacheItem("gsaFlag", "Accept");
            $modalInstance.close();
            $state.go('main.defaultContent');

        };

        vm.reject = function() {
            console.log('REJECT');
            LocalCacheService.cacheItem("gsaFlag", "Reject");
            $modalInstance.dismiss('cancel');
            UserService.logout();
        };
        
    }


})();