/**
 * Created by schintal 10/15/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('gsaCtrl', gsaCtrl);

    gsaCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$state','$sce',
         '$timeout', 'LocalCacheService', 'UserService', 'gsaObj'];

    function gsaCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout, LocalCacheService, UserService, gsaObj) {
        var vm = this;
        //console.log('received loginBulletin: ' + JSON.stringify(loginBulletin));


        vm.gsa = gsaObj.gsa;
        vm.userType = UserService.getUserType();
        console.log('userType: ' + JSON.stringify(vm.userType));

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
