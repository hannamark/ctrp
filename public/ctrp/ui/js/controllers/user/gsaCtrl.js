/**
 * Created by schintal 10/15/2015
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('gsaCtrl', gsaCtrl);

    gsaCtrl.$inject = ['$scope', '$http', '$window', 'toastr', '$sce',
        '$state', '$timeout', 'LocalCacheService', 'UserService'];

    function gsaCtrl($scope, $http, $window, toastr, $state, $sce,
                      $timeout, LocalCacheService, UserService) {
        var vm = this;
        //console.log('received loginBulletin: ' + JSON.stringify(loginBulletin));

        vm.gsa_data = {
            "accept": false,
            "reject": false,
            "gsa_text": "Hi"
        };

        console.log('received gsa_data: ' + JSON.stringify(vm.gsa_data));

        //
        vm.gsa_data = function() {
            return UserService.gsa(vm.gsa_data);
        }; // authenticate
    }


})();