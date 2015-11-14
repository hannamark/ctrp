/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$sce',
        '$state', '$timeout', 'LocalCacheService', 'UserService', 'loginBulletin'];

    function userCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout, LocalCacheService, UserService, loginBulletin) {
        var vm = this;
        console.log('in user controller');
        //console.log('received loginBulletin: ' + JSON.stringify(loginBulletin));
        vm.loginBulletin = loginBulletin['login_bulletin'] || '';

        vm.userObj = {
            "user": {
                username: '',
                password: '',
                source: 'Angular'
            },
            "type": vm.type
        };

        console.log("vm="+JSON.stringify(vm));
        //
        vm.authenticate = function() {
            return UserService.login(vm.userObj);
        }; // authenticate
    }


})();
