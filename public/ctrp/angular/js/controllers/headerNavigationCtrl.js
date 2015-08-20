/**
 * Created by wangg5 on 7/22/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('headerNavigationCtrl', headerNavigationCtrl);

    headerNavigationCtrl.$inject = ['UserService', '$scope', 'Idle', 'Keepalive', '$modal', '$timeout'];

    function headerNavigationCtrl(UserService, $scope, Idle, Keepalive, $modal, $timeout) {

        var vm = this;
        vm.signedIn = UserService.isLoggedIn();
        vm.username = UserService.getLoggedInUsername();
        vm.warning = null;
        vm.timedout = null;


        vm.logOut = function() {
            vm.signedIn = false;
            UserService.logout();
        }; //logOut


        activate();



        /*********implementations below***********/
        function activate() {
            listenToLoginEvent();
            watchForInactivity();
        }





        function listenToLoginEvent() {
            $scope.$on('signedIn', function() {
                vm.signedIn = UserService.isLoggedIn();
                vm.username = UserService.getLoggedInUsername();
            });

            $scope.$on('loggedOut', function() {
                vm.signedIn = false;
                vm.username = '';
            });
        } //listenToLoginEvent


        /**
         * Observer for the vm.signedIn (boolean) status
         */
        function watchForInactivity() {
            $scope.$watch(function() {return vm.signedIn; }, function(curVal, preVal) {

                if (curVal == true) {
                    Idle.watch();
                    closeModals();
                    watchIdleEvents();
                } else {
                    Idle.unwatch();
                    closeModals();
                }
            });
        } //watchForInactivity



        /*** helper functions **/

        function closeModals() {
            if (vm.warning) {
                vm.warning.close('closed');
                vm.warning = null;
            }

            if (vm.timedout) {
                vm.timedout.close('closed');
                vm.timedout = null;
            }
        } //closeModals


        /**
         * Watch idle events for start, end, and timeout
         */
        function watchIdleEvents() {

            $scope.$on('IdleStart', function() {
               closeModals();
                vm.warning = $modal.open({
                    templateUrl: 'warning-dialog.html',
                    windowClass: 'modal-danger'
                });
            }); //IdleStart

            $scope.$on('IdleEnd', function() {
               closeModals();
            }); //IdleEnd


            $scope.$on('IdleTimeout', function() {
                closeModals();

                $timeout(function() {
                    vm.logOut();
                    vm.timedout = $modal.open({
                        templateUrl: 'timedout-dialog.html',
                        windowClass: 'modal-danger'
                    });

                }, 500);

            });
        } //watchIdleEvents



    };


})();