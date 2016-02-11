/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope',
        '$state', '$timeout', 'LocalCacheService', 'UserService', 'loginBulletin'];

    function userCtrl($scope, $state, $timeout, LocalCacheService, UserService, loginBulletin) {
        var vm = this;
        console.log('in user controller');
        //console.log('received loginBulletin: ' + JSON.stringify(loginBulletin));
        vm.loginBulletin = loginBulletin['login_bulletin'] || '';
        vm.processing = false;

        vm.userObj = {
            'user': {
                username: '',
                password: '',
                source: 'Angular'
            },
            'type': vm.type,
            'processing': vm.processing
        };

        /* Clears out sign-in form if user rejects GSA notice */
        $scope.$on('gsaReject', function(e, data) {
            vm.userObj.user.password = '';
            vm.userObj.user.username = '';
            vm.userObj.processing = false;
        });

        vm.authenticate = function() {
            return UserService.login(vm.userObj);
        }; // authenticate
    }
})();
