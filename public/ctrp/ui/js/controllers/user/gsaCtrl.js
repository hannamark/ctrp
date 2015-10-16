/**
 * Created by schintal 10/15/2015
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('gsaCtrl', gsaCtrl);

    gsaCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$state','$sce',
         '$timeout', 'LocalCacheService', 'UserService'];

    function gsaCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout, LocalCacheService, UserService) {
        var vm = this;
        //console.log('received loginBulletin: ' + JSON.stringify(loginBulletin));

        vm.gsaData = "Hi";

        console.log('received gsa_data: ' + JSON.stringify(vm.gsaData));

        var userType = UserService.getUserType();
        console.log('userType: ' + JSON.stringify(userType));
        if (userType == "LocalUser") {
            vm.gsaData ="XYZ"
        } else {
            vm.gsaData = "ABC"
        }

        vm.accept = function() {
            console.log('ACCEPT');
            $state.go('main.defaultContent');
        };

        vm.reject = function() {
            console.log('REJECT');
            UserService.logout();
        };

    }


})();