/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$state', '$timeout', 'logOut'];

    function userCtrl($scope, $http, $window, toastr, $state, $timeout, logOut) {
        var vm = this;

        if (!!logOut) {
            $http.post('/ctrp/sign_out', {username: $window.sessionStorage.username}).success(function(res) {
                console.log("received response for logout: " + JSON.stringify(res));
                if (res.data.status == 200) {
                    console.log("res status is 200");
                    $timeout(function() {
                        $window.sessionStorage.token = '';
                        $window.sessionStorage.username = '';
                        console.log("Token reset");
                        toastr.success("You are logged out", "Logged out");
                        $state.go('main.organizations');
                    }, 1500);
                }
            }).error(function(err) {
                console.log("error in logging user out " + new Date());
            });

        }

        vm.userObj = {
            "user": {
                username: '',
                password: ''
            },
            "type": vm.type
        };


        //
        vm.authenticate = function() {
            $http.post('sign_in', vm.userObj).then(function(data) {
                console.log("Received data: " + JSON.stringify(data));
                //console.log('status: ' + data.status);
                console.log('data token: ' + data.data.token);
                if (data.data.status == 200) {
                    $window.sessionStorage.username = vm.userObj.user.username;
                    $window.sessionStorage.token = data.data.token;
                    toastr.success('Login is successful', 'Logged In!'); //retrieve: vm.userObj.user.username
                    $timeout(function() {
                        $state.go('main.organizations')
                    }, 1500);
                } else {
                    toastr.error("Login failed", "Failed to Login");
                }

            }).cach(function(err) {
                console.log('error status: ' + err.status);
            }).finally(function(complete) {
                console.log('http call completed!');
            });

            /*
            userService.authenticate(vm).then(function(response) {
                toastr.success('User ' + vm.username + ' has logged in.', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in logging in " + JSON.stringify(vm));
            });
            */
        }; // authenticate


    }


})();