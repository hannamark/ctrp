/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'PromiseTimeoutService', '$log',
        '$timeout', '$state', 'toastr', 'Common'];

    function UserService(LocalCacheService, PromiseTimeoutService, $log,
                         $timeout, $state, toastr, Common) {

        /**
         * Check if the the user/viewer is logged in by checking the
         * local cache for existence of both token and username
         * @returns {boolean}
         */
        this.isLoggedIn = function () {
            var token = LocalCacheService.getCacheWithKey('token');
            var username = LocalCacheService.getCacheWithKey('username');
            return !!token && !!username;
        }; //isLoggedIn


        this.login = function (userObj) {
            PromiseTimeoutService.postDataExpectObj('sign_in', userObj)
                .then(function (data) {
                    if (data.token) {
                        LocalCacheService.cacheItem("token", data.token);
                        LocalCacheService.cacheItem("username", userObj.user.username);
                        toastr.success('Login is successful', 'Logged In!');
                        Common.broadcastMsg("signedIn");

                        $timeout(function () {
                            $state.go('main.defaultContent')
                        }, 1500);
                    } else {
                        toastr.error('Login failed', 'Login error');
                    }

                }).catch(function (err) {
                    $log.error("error in log in: " + JSON.stringify(err));
                });
        }; //login


        /**
         * Log out user from backend as well as removing local cache
         */
        this.logout = function () {
            Common.broadcastMsg('loggedOut');
            var username = LocalCacheService.getCacheWithKey("username");
            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_out', {username: username, source: "Angular"})
                .then(function (data) {
                    if (data.success) {
                        LocalCacheService.removeItemFromCache("token");
                        LocalCacheService.removeItemFromCache("username");
                        toastr.success('Success', 'Successfully logged out');

                        $timeout(function() {
                            $state.go('main.sign_in');
                        }, 500);
                    }
                    $log.info("success in log out: " + JSON.stringify(data));
                }).catch(function (err) {
                    $log.error("error in logging out: " + JSON.stringify(err));
                });
        }; //logout


        /**
         * Get the logged in username from browser cache
         */
        this.getLoggedInUsername = function() {
            return LocalCacheService.getCacheWithKey('username') || '';
        }

    }


})();