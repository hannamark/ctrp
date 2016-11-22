/**
 * Created by wangg5 on 9/8/15.
 */

(function() {
    'use strict';

    angular.module('ctrp.app.layout')
        .controller('footerCtrl', footerCtrl);

    footerCtrl.$inject = ['UserService', '$scope'];

    function footerCtrl(UserService, $scope) {

        var vm = this;
        $scope.appVersion = UserService.getAppVersion() || '';
        $scope.$on('updatedAppVersion', function() {
            $scope.appVersion = UserService.getAppVersion() || '';
            //console.log('updated app version in footer: ' + vm.appVersion);
        });

        $scope.appRelMilestone = UserService.getAppRelMilestone() || '';
        $scope.$on('updatedAppRelMilestone', function() {
            $scope.appRelMilestone = UserService.getAppRelMilestone() || '';
            //console.log('updated app release milestone in footer: ' + vm.appRelMilestone);
        });

    } //footerCtrl

})();
