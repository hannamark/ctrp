/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'PromiseTimeoutService', '$log',
        '$timeout', '$state', 'toastr', 'Common', 'DMZ_UTILS'];

    function UserService(LocalCacheService, PromiseTimeoutService, $log,
                         $timeout, $state, toastr, Common, DMZ_UTILS) {

        var appVersion = '';
        var currentUserPrivilege = '';

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
                    console.log('successful login, data returned: ' + JSON.stringify(data));
                    if (data.token) {
                        LocalCacheService.cacheItem("token", data.token);
                        LocalCacheService.cacheItem("username", userObj.user.username);
                        _setAppVersion(data.application_version);
                        // LocalCacheService.cacheItem("app_version", data.application_version);
                        LocalCacheService.cacheItem("user_role", data.role);

                        //var dummyPrivileges = [{type: "READONLY", enabled: true}, {type: "SITE_ADMIN", enabled: true}];
                        LocalCacheService.cacheItem("privileges", data.privileges);
                        toastr.success('Login is successful', 'Logged In!');
                        Common.broadcastMsg("signedIn");

                        $timeout(function () {
                            $state.go('main.defaultContent')
                        }, 1000);
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
                        LocalCacheService.clearAllCache();
                        toastr.success('Success', 'Successfully logged out');

                        $timeout(function() {
                            $state.go('main.sign_in');
                        }, 200);
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

        /**
         * Get the user role of the logged in user
         * @returns {*|string}
         */
        this.getUserRole = function() {
            return LocalCacheService.getCacheWithKey('user_role') || '';
        };


        /**
         * Get the user privileges from localStorage of the browser
         * @returns {*|Array}
         */
        this.getUserPrivileges = function() {
            return LocalCacheService.getCacheWithKey('privileges') || [];
        };


        this.getAppVersion = function() {
            return LocalCacheService.getCacheWithKey('app_version') || '';
        };


        /**
         * Get the app version from DMZ utils when the user has not been authenticated
         * @returns {*} Promise
         */
        this.getAppVerFromDMZ = function() {
            return PromiseTimeoutService.getData(DMZ_UTILS.APP_VERSION);
        };


        this.setAppVersion = function(version) {
            _setAppVersion(version);
        };


        this.getAppVersion = function() {
            return LocalCacheService.getCacheWithKey('app_version'); // || appVersion;
        };

        this.getLoginBulletin = function() {
            return PromiseTimeoutService.getData(DMZ_UTILS.LOGIN_BULLETIN);
        };

        /*
        this.setUserPrivilege = function(privilege) {
            if (privilege) {
                userPrivilege = privilege;
                LocalCacheService.cacheItem('current_privilege', privilege);
            }
        };


        this.getUserPrivilege = function() {
            userPrivilege = LocalCacheService.getCacheWithKey('current_privilege');

            return userPrivilege || '';
        };
        */



        /******* helper functions *********/

        function _setAppVersion(version) {
            if (!version) {
                //if null or empty value
                appVersion = '';
                LocalCacheService.removeItemFromCache("app_version");
            } else {
                appVersion = version;
                LocalCacheService.cacheItem("app_version", version);
            }
            //notify listeners
            Common.broadcastMsg('updatedAppVersion');
        }


    }


})();