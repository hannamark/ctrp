/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', 'toastr', 'MESSAGES',
        '$scope', 'countryList', 'Common','$state', '$modal', 'LocalCacheService'];

    function userDetailCtrl(UserService,
                           $scope, countryList, $state, $modal, LocalCacheService) {
        var vm = this;
        // console.log("curuser is " + vm.curUser);
        // var username =  LocalCacheService.getCacheWithKey('username');
        vm.userDetails = '';

        UserService.getUserDetailsByUsername().then(function(details) {
            console.log('user details: ' + JSON.stringify(details));
            vm.userDetails = details.data;
        });


        activate();

        /****************** implementations below ***************/
        function activate() {


        }








    }


})();