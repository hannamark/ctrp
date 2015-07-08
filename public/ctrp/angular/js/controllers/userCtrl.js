/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http', '$window'];

    function userCtrl($scope, $http, $window) {
        var vm = this;
        vm.userObj = {
            "user": {
                username: vm.username,
                password: vm.password
            },
            "type": vm.type
        };


        //
        vm.authenticate = function() {
            $http.post('sign_in', vm.userObj).then(function(data) {
                console.log("Received data: " + JSON.stringify(data));
                //console.log('status: ' + data.status);
                console.log('data token: ' + data.data.token);
                $window.sessionStorage.token = data.data.token;
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