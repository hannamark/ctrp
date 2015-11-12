/**
 * Created by wangg5 on 7/22/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('headerNavigationCtrl', headerNavigationCtrl);

    headerNavigationCtrl.$inject = ['UserService', '$scope', 'Idle', 'Keepalive',
        '$modal', '$timeout', '$state', '_', 'Common', 'MESSAGES', '$rootScope'];

    function headerNavigationCtrl(UserService, $scope, Idle, Keepalive,
                                  $modal, $timeout, $state, _, Common, MESSAGES, $rootScope) {

        var vm = this;
        vm.signedIn = UserService.isLoggedIn();
        vm.username = UserService.getLoggedInUsername();
        vm.userRole = !!UserService.getUserRole() ? UserService.getUserRole().split("_")[1].toLowerCase() : '';
        vm.isCurationEnabled = UserService.isCurationModeEnabled();
        vm.isCurationModeSupported = UserService.isCurationSupported();
        vm.warning = null;
        vm.timedout = null;
        //vm.uiRouterState = $state;
        vm.currrentState = $state;
        vm.navbarIsActive = navbarIsActive;



        vm.toggleCurationMode = function() {
            console.log('toggling curation mode: ' + vm.isCurationEnabled);
            // vm.isCurationEnabled = !vm.isCurationEnabled;
            UserService.saveCurationMode(vm.isCurationEnabled);
            Common.broadcastMsg(MESSAGES.CURATION_MODE_CHANGED);
        };


        vm.logOut = function() {
            vm.signedIn = false;
            vm.username = '';
            vm.userRole = '';
            vm.isCurationEnabled = false;
            vm.isCurationModeSupported = false;
            UserService.logout();
        }; //logOut



        activate();


        /*********implementations below***********/
        function activate() {
            listenToLoginEvent();
            watchForInactivity();
            watchStateName();
        }


        function listenToLoginEvent() {
            $scope.$on('signedIn', function() {
                pullUserInfo();
            });

            $scope.$on('loggedOut', function() {
                console.log('logged out!!');
                pullUserInfo();
                // vm.signedIn = false;
            });
        } //listenToLoginEvent


        function pullUserInfo() {
            vm.signedIn = UserService.isLoggedIn();
            vm.username = UserService.getLoggedInUsername();
            vm.userRole = UserService.getUserRole().split("_")[1] || '';
            vm.userRole = !!vm.userRole ? vm.userRole.toLowerCase() : ''; //e.g. super
            vm.isCurationEnabled = UserService.isCurationModeEnabled();
            vm.isCurationModeSupported = UserService.isCurationSupported();
        } //pullUserInfo


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
                    // closeModals();
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



        /**
         * Highlight the navbar according to the current state name
         * @param stateNames
         * @returns {boolean}
         */
        function navbarIsActive(stateNames) {
            return stateNames.indexOf(vm.currrentState.current.name) > -1;
        }


        /**
         * watch current state name
         */
        function watchStateName() {
            $scope.$watch(function() {return vm.currrentState.current.name;},
                function(newVal, oldVal) {
                if (newVal !== oldVal) {
                  //  console.log('current state name: ' + vm.currrentState.current.name);
                }
            }, true);
        }


    };


})();
