/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrp.module.dataservices')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'PromiseTimeoutService', '$log', '$uibModal',
        '$timeout', '$state', 'toastr', 'Common', 'DMZ_UTILS', 'PRIVILEGES', 'URL_CONFIGS'];

    function UserService(LocalCacheService, PromiseTimeoutService, $log, $uibModal,
                         $timeout, $state, toastr, Common, DMZ_UTILS, PRIVILEGES, URL_CONFIGS) {

        var appVersion = '';
        var appRelMilestone = '';

        // Initial User Search Parameters
        var initUserSearchParams = {
            username: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            phone: '',
            approved: '',
            // affiliated_org_name: '',

            //for pagination and sorting
            sort: 'updated_at',
            order: 'DESC',
            rows: 10,
            start: 1
        }; //initial User Search Parameters


        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            //enableRowSelection: false,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            enableVerticalScrollbar: 2,
            enableHorizontalScrollbar: 2,
            columnDefs: [
                {
                    name: 'username',
                    enableSorting: true,
                    displayName: 'Username',
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid"' +
                        ' title="{{COL_FIELD}}">' +
                        ' <a ui-sref="main.userDetail({username : row.entity.username })">' +
                        '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'first_name',
                    displayName: 'First',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'middle_name',
                    displayName: 'Middle',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'last_name',
                    displayName: 'Last',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.userDetail({username : row.entity.username })">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {
                    name: 'email',
                    displayName: 'Email',
                    enableSorting: true,
                    minWidth: '150',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {
                    name: 'phone',
                    displayName: 'Phone',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {
                    name: 'approved',
                    displayName: 'Approval',
                    enableSorting: true,
                    minWidth: '100',
                    width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                }
            ]
        };


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


        this.getUserType = function () {
            return LocalCacheService.getCacheWithKey('user_type');
        };

        this.getWriteModesArr = function() {
            return LocalCacheService.getCacheWithKey('write_modes');
        };

        this.login = function (userObj) {
            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_in', userObj)
                .then(function (data) {
                    console.log('successful login, data returned: ' + JSON.stringify(data));
                    if (data.token) {
                        LocalCacheService.cacheItem('token', data.token);
                        LocalCacheService.cacheItem('username', userObj.user.username);
                        _setAppVersion(data.app_version);
                        // LocalCacheService.cacheItem('app_version', data.application_version);
                        LocalCacheService.cacheItem('user_role', data.role); //e.g. ROLE_SUPER
                        LocalCacheService.cacheItem('user_type', data.user_type); //e.g. LocalUser
                        //array of write_modes for each area (e.g. pa or po)
                        LocalCacheService.cacheItem('write_modes', data.privileges || []);
                        LocalCacheService.cacheItem('curation_enabled', false); //default: curation mode is off/false
                        toastr.success('Login is successful', 'Logged In!');
                        Common.broadcastMsg('signedIn');

                        $timeout(function () {
                            openGsaModal();
                           // $state.go('main.gsa');
                        }, 500);
                    } else {
                        toastr.error('Login failed', 'Login error');
                    }
                }).catch(function (err) {
                    $log.error('error in log in: ' + JSON.stringify(err));
                });
        }; //login


        /**
         * Log out user from backend as well as removing local cache
         */
        this.logout = function () {

            var username = LocalCacheService.getCacheWithKey('username');
            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_out', {username: username, source: 'Angular'})
                .then(function (data) {
                    if (data.success) {
                        LocalCacheService.clearAllCache();
                        Common.broadcastMsg('loggedOut');
                        toastr.success('Success', 'Successfully logged out');

                        $timeout(function () {
                            $state.go('main.sign_in');
                        }, 200);
                    }
                    $log.info('success in log out: ' + JSON.stringify(data));
                }).catch(function (err) {
                    $log.error('error in logging out: ' + JSON.stringify(err));
                });
        }; //logout


        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * username, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        this.searchUsers = function (searchParams) {
            //toastr.success('Success', 'Successful in UserService, searchUsers');
            console.log('User searchparams: ' + JSON.stringify(searchParams));
            // if (!!searchParams) {
            // toastr.success('Success', 'Successful in UserService, searchUsers');
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, searchParams);
            // console.log('User List: ' + JSON.stringify(user_list));
            return user_list;
            // }
        }; //searchUsers

        /**
         * get initial paramater object for people search
         * @return initUserSearchParams
         */
        this.getInitialUserSearchParams = function () {
            return initUserSearchParams;
        }; //getInitialUserSearchParams


        this.getGridOptions = function () {
            return gridOptions;
        };


        /**
         * Get the logged in username from browser cache
         */
        this.getLoggedInUsername = function () {
            return LocalCacheService.getCacheWithKey('username') || '';
        };

        this.getUserDetailsByUsername = function (username) {
            var username2 = LocalCacheService.getCacheWithKey('username');
            return PromiseTimeoutService.getData(URL_CONFIGS.A_USER + username2 + '.json');
        }; //getUserByName


        /**
         * Get the user role of the logged in user
         * @returns {*|string}
         */
        this.getUserRole = function () {
            return LocalCacheService.getCacheWithKey('user_role') || '';
        };


        this.getAppVersion = function () {
            return LocalCacheService.getCacheWithKey('app_version') || '';
        };


        /**
         * Get the app version from DMZ utils when the user has not been authenticated
         * @returns {*} Promise
         */
        this.getAppVerFromDMZ = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.APP_VERSION);
        };

        this.getAppRelMilestoneFromDMZ = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.APP_REL_MILESTONE);
        };

        this.setAppVersion = function (version) {
            _setAppVersion(version);
        };

        this.setAppRelMilestone = function (milestone) {
            _setAppRelMilestone(milestone);
        };

        this.getAppVersion = function () {
            return LocalCacheService.getCacheWithKey('app_version'); // || appVersion;
        };

        this.getAppRelMilestone = function () {
            return LocalCacheService.getCacheWithKey('app_rel_milestone'); // || appRelMilestone;
        };

        this.getLoginBulletin = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.LOGIN_BULLETIN);
        };

        this.getGsa = function () {
            return PromiseTimeoutService.getData(URL_CONFIGS.USER_GSA);
        };

        this.upsertUser = function (userObj) {
            //update an existing user
            var configObj = {}; //empty config
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_USER + userObj.username + '.json', userObj, configObj);
        }; //upsertUser

        this.upsertUserSignup = function (userObj) {
            //update an existing user
            var configObj = {}; //empty config
            console.log('userObj = ' + JSON.stringify(userObj));

            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_SIGNUP, userObj)
                .then(function (data) {
                    console.log('login, data returned: ' + JSON.stringify(data["server_response"]));
                    if (data["server_response"] == 422 || data["server_response"]["status"] == 422) {
                        toastr.error('Sign Up failed', 'Login error');
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (key != "server_response") {
                                    toastr.error("SignUp error:", key + " -> " + data[key]);
                                }
                            }
                        }
                        $state.go('main.signup');
                    } else {
                        toastr.success('Sign Up Success', 'You have been signed up');
                        $state.go('main.welcome_signup');
                    }
                }).catch(function (err) {
                    $log.error('error in log in: ' + JSON.stringify(err));
                });

        }; //upsertUserSignup

        this.upsertUserChangePassword = function (userObj) {
            //update an existing user
            var configObj = {}; //empty config
            console.log('upsertUserChangePassword userObj = ' + JSON.stringify(userObj));
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_CHANGEPASSWORD, userObj, configObj);
        }; //upsertUserChangePassword


        /**
         * Check if the curation mode is supported for the user role
         *
         */
        this.isCurationSupported = function () {
            return LocalCacheService.getCacheWithKey('write_modes');
        };


        /**
         * Getter for curation_enabled
         *
         * @returns {*|boolean}
         */
        this.isCurationModeEnabled = function () {
            return LocalCacheService.getCacheWithKey('curation_enabled') || false;
        };


        /**
         * given a sectionName (e.g. 'po'), check if allows global write mode For
         * the sectionName
         * @param  {String} sectionName [description]
         * @return {boolean}
         */
        this.isWriteModeSupportedForSection = function(sectionName) {
            var completeSectionNameKey = sectionName + '_write_mode';
            var queryObj = {};
            queryObj[completeSectionNameKey] = true; //only look for 'true'
            var writeModesArray = LocalCacheService.getCacheWithKey('write_modes');
            var objIndex = _.findIndex(writeModesArray, queryObj);
            if (objIndex == -1) {
                return false;
            }

            var writeModeObj = writeModesArray[objIndex];
            // var writeModeObj = _.findWhere(writeModesArray, queryObj);
            // console.log('found the writeModeObj', writeModeObj);
            return writeModeObj[completeSectionNameKey];
        }


        /**
         * Set curation_enabled to true
         * @params curationMode, boolean
         */
        this.saveCurationMode = function (curationMode) {
            LocalCacheService.cacheItem('curation_enabled', curationMode);
        };


        /******* helper functions *********/

        function _setAppVersion(version) {
            if (!version) {
                //if null or empty value
                appVersion = '';
                LocalCacheService.removeItemFromCache('app_version');
            } else {
                appVersion = version;
                LocalCacheService.cacheItem('app_version', version);
            }
            //notify listeners
            Common.broadcastMsg('updatedAppVersion');
        }

        function _setAppRelMilestone(milestone) {
            if (!milestone) {
                //if null or empty value
                appRelMilestone = '';
                LocalCacheService.removeItemFromCache('app_rel_milestone');
            } else {
                appRelMilestone = milestone;
                LocalCacheService.cacheItem('app_rel_milestone', milestone);
            }
            //notify listeners
            Common.broadcastMsg('updatedAppRelMilestone');
        }

        function openGsaModal() {
            console.log('1 st openning modal instance???');

            (function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/user/gsa.html',
                    controller: 'gsaModalCtrl as gsaView',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        UserService: 'UserService',
                        gsaObj: function (UserService) {
                            return UserService.getGsa();
                        },
                    }

                });


                modalInstance.result.then(function () {
                    console.log('modal closed, TODO redirect');
                });
            })();


        }
    }


})();
