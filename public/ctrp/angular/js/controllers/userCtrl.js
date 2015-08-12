/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http', '$window', 'toastr',
        '$state', '$timeout', 'LocalCacheService', 'UserService'];

    function userCtrl($scope, $http, $window, toastr, $state,
                      $timeout, LocalCacheService, UserService) {
        var vm = this;

        vm.userObj = {
            "user": {
                username: '',
                password: ''
            },
            "type": vm.type
        };


        //
        vm.authenticate = function() {
            return UserService.login(vm.userObj);
        }; // authenticate
    }


})();