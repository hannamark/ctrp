/**
 * Created by schintal 9/25/2015
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userSignupCtrl', userSignupCtrl);

    userSignupCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$sce',
        '$state', '$timeout', 'UserService'];

    function userSignupCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout,  UserService) {
        var vm = this;

        // { "local_user"=>{"username"=>"e", "email"=>"e@x.com", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]", "role"=>"ROLE_READONLY"}, "commit"=>"Sign up"}

        vm.userObj = {
            "local_user": {
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: ''
            },
            "type": vm.type
        };

        vm.updateUser = function () {
            //
            UserService.upsertUserSignup(vm.userObj).then(function (response) {
                //toastr.success('User ' + vm.userObj + ' has been recorded', 'Operation Successful!');
            }).catch(function (err) {
                console.log("Error in updating inserting new User " + JSON.stringify(vm.userObj));
            });
        }
    }

})();