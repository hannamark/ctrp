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
        vm.userPrivileges = processUserPrivileges(UserService.getUserPrivileges());
        vm.userPrivilege = UserService.getPrivilege(); //'READONLY'; //default
        vm.warning = null;
        vm.timedout = null;
        $scope.uiRouterState = $state;


        vm.logOut = function() {
            vm.signedIn = false;
            vm.username = '';
            vm.userRole = '';
            vm.userPrivileges = [];
            vm.userPrivilege = '';
            UserService.logout();
        }; //logOut



        activate();


        /*********implementations below***********/
        function activate() {
            listenToLoginEvent();
            watchForInactivity();
            watchUserPrivilegeSelection();
        }


        function listenToLoginEvent() {
            $scope.$on('signedIn', function() {
                vm.signedIn = UserService.isLoggedIn();
                vm.username = UserService.getLoggedInUsername();
                vm.userRole = UserService.getUserRole().split("_")[1].toLowerCase();
                vm.userPrivileges = processUserPrivileges(UserService.getUserPrivileges());
                vm.userPrivilege = UserService.getPrivilege();
            });

            $scope.$on('loggedOut', function() {

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
         * Process the user privileges array that contains the privileges set to 'true'
         * @param userPrivilegesArr
         */
        function processUserPrivileges(userPrivilegesArr) {
            var processedPrivilegesArray = [];
            _.each(userPrivilegesArr, function(privilegeItem) {
                if (privilegeItem.enabled) {
                    processedPrivilegesArray.push(privilegeItem.type);
                }
            });

            return processedPrivilegesArray;
        }


        /**
         * Watch user privilege selections and broadcast notifications
         *
         */
        function watchUserPrivilegeSelection() {
            $scope.$watch(function() {return vm.userPrivilege;}, function(newVal, oldVal) {
                console.log('userPrivilege value: ' + newVal);
                UserService.setUserPrivilege(newVal);
                $rootScope.$broadcast(MESSAGES.PRIVILEGE_CHANGED);
                $scope.$emit(MESSAGES.PRIVILEGE_CHANGED);
            }, true);
        }



    };


})();