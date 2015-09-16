/**
 * Created by schintal on 9/12/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', '$scope','toastr'];

    function userDetailCtrl(UserService, $scope,toastr) {
        var vm = this;
         console.log("curuser is ");
        vm.userDetails = '';
        vm.selectedOrgsArray = [];

        vm.updateUser = function () {

            console.log("hello email changed ? " +vm.userDetails.email);
            console.log('IN UPDATEUSER');
            var newUser = {};
            newUser.new = vm.userDetails.new || '';
            newUser.id = vm.userDetails.id || '';
            newUser.user = vm.userDetails;
           //newUser.org_id=watch.org[o];
            console.log("newFamily is: " + JSON.stringify(newUser));
            UserService.upsertUser(newUser).then(function(response) {
                toastr.success('Family ' + vm.curUser.username + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating family " + JSON.stringify(vm.userDetails));
            });




        }; // updatePerson


        UserService.getUserDetailsByUsername().then(function(details) {
            console.log('user details: ' + JSON.stringify(details));
            vm.userDetails = details;
        });

        $scope.$watch(function() {return vm.selectedOrgsArray;}, function(newVal) {
           console.log('selected org:' + JSON.stringify(vm.selectedOrgsArray));
        });


        activate();

        /****************** implementations below ***************/
        function activate() {


        }








    }


})();