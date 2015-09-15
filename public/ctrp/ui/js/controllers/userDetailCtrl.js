/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', 'toastr', 'MESSAGES',
        '$scope', 'countryList', 'Common','$state', '$modal'];

    function userDetailCtrl(UserService,
                           $scope, countryList, $state, $modal) {
        var vm = this;
        activate();
        console.log("curuser is " + vm.curUser);

        /****************** implementations below ***************/
        function activate() {

            UserService.getUserByUsername().then(function (data) {
                console.log("received search results: " + JSON.stringify(data.data));
            }).catch(function (err) {
                console.log('getting user details failed');
            });
        }








    }


})();