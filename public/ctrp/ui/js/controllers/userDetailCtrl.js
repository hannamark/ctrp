/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', '$scope'];

    function userDetailCtrl(UserService, $scope) {
        var vm = this;
         console.log("curuser is ");
        vm.userDetails = '';
        vm.selectedOrgsArray = [];

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