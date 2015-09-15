/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'PromiseTimeoutService', '$log',
        '$timeout', '$state', 'toastr', 'Common', 'DMZ_UTILS', 'PRIVILEGES', 'URL_CONFIGS'];

    function UserService(LocalCacheService, PromiseTimeoutService, $log,
                         $timeout, $state, toastr, Common, DMZ_UTILS, PRIVILEGES, URL_CONFIGS) {

        var appVersion = '';
        var appRelMilestone = '';

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
                   // console.log('successful login, data returned: ' + JSON.stringify(data));
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

        this.getUserByUsername=function() {
            console.log('123456***** ');
            return PromiseService.getData(URL_CONFIGS.A_USER + 'ctrpsuper' + '.json');
        } //getUserByName

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

        this.getAppRelMilestoneFromDMZ = function() {
            return PromiseTimeoutService.getData(DMZ_UTILS.APP_REL_MILESTONE);
        };

        this.setAppVersion = function(version) {
            _setAppVersion(version);
        };

        this.setAppRelMilestone = function(milestone) {
            _setAppRelMilestone(milestone);
        };

        this.getAppVersion = function() {
            return LocalCacheService.getCacheWithKey('app_version'); // || appVersion;
        };

        this.getAppRelMilestone = function() {
            return LocalCacheService.getCacheWithKey('app_rel_milestone'); // || appRelMilestone;
        };

        this.getLoginBulletin = function() {
            return PromiseTimeoutService.getData(DMZ_UTILS.LOGIN_BULLETIN);
        };


        /**
         *
         * @param privilege
         */
        this.setUserPrivilege = function(privilege) {
            var userCurrentPrivilege = PRIVILEGES.READONLY; //default privilege
            if (privilege) {
                userCurrentPrivilege = privilege;
            }
            LocalCacheService.cacheItem('current_privilege', userCurrentPrivilege);
        };


        /**
         * Get the current user's privilege
         * @returns {*|string}
         */
        this.getPrivilege = function() {
            return LocalCacheService.getCacheWithKey('current_privilege') || PRIVILEGES.READONLY;
        };




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

        function _setAppRelMilestone(milestone) {
            if (!milestone) {
                //if null or empty value
                appRelMilestone = '';
                LocalCacheService.removeItemFromCache("app_rel_milestone");
            } else {
                appRelMilestone = milestone;
                LocalCacheService.cacheItem("app_rel_milestone", milestone);
            }
            //notify listeners
            Common.broadcastMsg('updatedAppRelMilestone');
        }

    }


})();