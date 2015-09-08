/**
 * Created by wangg5 on 9/8/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['UserService', '$scope'];

    function FooterCtrl(UserService, $scope) {

        var vm = this;
        $scope.appVersion = UserService.getAppVersion() || '';
        $scope.$on('updatedAppVersion', function() {
            $scope.appVersion = UserService.getAppVersion() || '';
            //console.log('updated app version in footer: ' + vm.appVersion);
        });

    } //FooterCtrl

})();