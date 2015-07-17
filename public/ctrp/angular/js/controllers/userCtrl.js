/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$state', '$timeout', 'LocalCacheService'];

    function userCtrl($scope, $http, $window, toastr, $state, $timeout, LocalCacheService) {
        var vm = this;

        //if (!!logOut) {
        //    $http.post('/ctrp/sign_out', {username: $window.sessionStorage.username}).success(function(res) {
        //        console.log("received response for logout: " + JSON.stringify(res));
        //        if (res.data.status == 200) {
        //            console.log("res status is 200");
        //            $timeout(function() {
        //                $window.sessionStorage.token = '';
        //                $window.sessionStorage.username = '';
        //                console.log("Token reset");
        //                toastr.success("You are logged out", "Logged out");
        //                $state.go('main.organizations');
        //            }, 1500);
        //        }
        //    }).error(function(err) {
        //        console.log("error in logging user out " + new Date());
        //    });
        //
        //}

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
                console.log("Received data in authenticate: " + JSON.stringify(data));
                //console.log('status: ' + data.status);
                console.log('data token: ' + data.data.token);

                if (data.status == 200) {
                    LocalCacheService.cacheItem("token", data.data.token);
                    LocalCacheService.cacheItem("username", vm.userObj.user.username);
                    toastr.success('Login is successful', 'Logged In!');
                    $timeout(function() {
                        $state.go('main.organizations')
                    }, 1500);
                } else {
                    toastr.error("Login failed", "Failed to Login");
                }

            }).catch(function(err) {
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


        vm.logOut = function() {
            var username = LocalCacheService.getCacheWithKey("username");
            console.log("username: " + username + " to be logged out...");
            LocalCacheService.removeItemFromCache("token");
            LocalCacheService.removeItemFromCache("username");

            $http.post('/ctrp/sign_out', {username: username}).success(function(res) {
                toastr.success("Successfully logged out", "Logged Out!");
                if (res.status == 200) {
                    console.log("logout response status is 200");
                }
                $timeout(function() {
                    $state.go('main.organizations');
                }, 1500);
            }).error(function(err) {
                toastr.error("Error in log out", "Error");
                console.log("error in logout");
            });
        }


    }


})();