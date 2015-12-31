/**
 * Created by schintal 10/15/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('gsaModalCtrl', gsaModalCtrl);

    gsaModalCtrl.$inject = ['$state', '$sce', 'LocalCacheService',
                            'UserService', 'gsaObj', '$modalInstance', '$rootScope'];

    function gsaModalCtrl($state, $sce, LocalCacheService, UserService, gsaObj, $modalInstance, $rootScope) {
        var vm = this;
        vm.userType = UserService.getUserType();
        vm.accept = function() {
            console.log('ACCEPT');
            LocalCacheService.cacheItem('gsaFlag', 'Accept');
            $modalInstance.close();
            $state.go('main.defaultContent');

        };

        vm.reject = function() {
            console.log('REJECT');
            LocalCacheService.cacheItem('gsaFlag', 'Reject');
            $modalInstance.dismiss('cancel');
            UserService.logout();

            /* Notify user controller that GSA notice was rejected */
            $rootScope.$broadcast('gsaReject');
        };

        vm.renderGSAHtml = function() {
            var gsaText = gsaObj.gsa;
            gsaText = gsaText.replace(/(?:\r\n|\r|\n)/g, '<br />');
            return $sce.trustAsHtml(gsaText);
        };

    }

})();
