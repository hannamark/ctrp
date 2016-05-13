/**
 * Created by wangg5 on 7/22/15.
 */

(function () {
    'use strict';
    angular.module('ctrp.module.dataservices')
        .service('UserService', UserService);

    UserService.$inject = ['LocalCacheService', 'PromiseTimeoutService', '$log', '$uibModal',
        '$timeout', '$state', 'toastr', 'Common', 'DMZ_UTILS', 'URL_CONFIGS'];

    function UserService(LocalCacheService, PromiseTimeoutService, $log, $uibModal,
                         $timeout, $state, toastr, Common, DMZ_UTILS, URL_CONFIGS) {

        var service = this;
        var appVersion = '';
        var appRelMilestone = '';
        var orgUsers = [];
        
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
            userObj.processing = true;

            PromiseTimeoutService.postDataExpectObj('/ctrp/sign_in', userObj)
                .then(function (data) {
                    if (data.token) {
                        LocalCacheService.cacheItem('token', data.token);
                        LocalCacheService.cacheItem('username', userObj.user.username);
                        LocalCacheService.cacheItem('user_id', data.user_id);
                        _setAppVersion(data.app_version);
                        LocalCacheService.cacheItem('user_role', data.role);
                        LocalCacheService.cacheItem('user_type', data.user_type);
                        //array of write_modes for each area (e.g. pa or po)
                        LocalCacheService.cacheItem('write_modes', data.privileges || []);
                        LocalCacheService.cacheItem('curation_enabled', false);
                        toastr.success('Login is successful', 'Logged In!');
                        Common.broadcastMsg('signedIn');

                        $timeout(function () {
                            openGsaModal();
                        }, 500);
                    } else {
                        toastr.error('Login failed', 'Login error');
                        userObj.processing = false;
                    }
                }).catch(function (err) {
                    $log.error('error in log in: ' + JSON.stringify(err));
                });
        }; //login


        /**
         * Log out user from backend as well as removing local cache
         */
        this.logout = function () {
            var self = this;

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
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, searchParams);
            return user_list;
        }; //searchUsers


        /**
         * Get the logged in username from browser cache
         */
        this.getLoggedInUsername = function () {
            return LocalCacheService.getCacheWithKey('username') || '';
        };

        this.getCurrentUserId = function() {
            return LocalCacheService.getCacheWithKey('user_id') || null;
        };

        /**
         * This is to replace the *getLoggedInUsername* method
         * @return {[type]} [description]
         */
        this.currentUser = function () {
            return LocalCacheService.getCacheWithKey('username') || '';
        };

        this.getUserDetailsByUsername = function (username) {
            return PromiseTimeoutService.getData(URL_CONFIGS.A_USER + username + '.json');
        }; //getUserByName

        this.getCurrentUserDetails = function () {
            var username = LocalCacheService.getCacheWithKey('username');
            return PromiseTimeoutService.getData(URL_CONFIGS.A_USER + username + '.json');
        };

        this.userRequestAdmin = function (params) {
            PromiseTimeoutService.postDataExpectObj('/ctrp/users/request_admin/' + params.username, params)
                .then(function (data) {
                    if(data[0].success) {
                        toastr.success('Success', 'Your Request for Admin Access has been sent.');
                    } else {
                        toastr.error('Your Request for Admin Access has NOT been sent. Please try again later.', 'Error');
                    }
                });
        };

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
            return LocalCacheService.getCacheWithKey('app_version');
        };

        this.getAppRelMilestone = function () {
            return LocalCacheService.getCacheWithKey('app_rel_milestone');
        };

        this.getLoginBulletin = function () {
            return PromiseTimeoutService.getData(DMZ_UTILS.LOGIN_BULLETIN);
        };

        this.getGsa = function () {
            return PromiseTimeoutService.getData(URL_CONFIGS.USER_GSA);
        };

        this.upsertUser = function (userObj) {
            //update an existing user
            var configObj = {};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_USER + userObj.username + '.json', userObj, configObj);
        };

        this.getUserTrials = function (searchParams) {
            var user_list = PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS, searchParams);
            return user_list;
        }; //searchUsers

        this.upsertUserSignup = function (userObj) {
            //update an existing user
            var configObj = {};

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

            return objIndex > -1;
        };


        /**
         * Set curation_enabled to true
         * @params curationMode, boolean
         */
        this.saveCurationMode = function (curationMode) {
            LocalCacheService.cacheItem('curation_enabled', curationMode);
        };

        this.getAllOrgUsers = this.getAllOrgUsers || PromiseTimeoutService.postDataExpectObj('/ctrp/users/search.json');

        var _createTransferUserSelect = function (controller, trialIdArr) {
            if (controller.showAllTrialsModal === false) {
                controller.showAllTrialsModal = true;
            }
            service.getAllOrgUsers.then(function (data) {

                controller.userOptions = {
                    title: '',
                    filterPlaceHolder: 'Start typing to filter the users below.',
                    labelAll: 'Unselected Users',
                    labelSelected: 'Selected Users',
                    helpMessage: ' Click on names to transfer users between selected and unselected.',
                    orderProperty: 'name',
                    resetItems: [],
                    items: [],
                    selectedItems: [],
                    openModal: controller.showAllTrialsModal,
                    close: function () {
                        controller.showAllTrialsModal = false;
                    },
                    reset: function () {
                        controller.userOptions.items = angular.copy(controller.userOptions.resetItems);
                        controller.userOptions.selectedItems = [];
                    },
                    save: function () {
                        controller.showAllTrialsModal = false;
                    }
                };
                _.each(data.users, function (user) {
                    controller.userOptions.items.push({
                        'id': user.id,
                        'name': user.last_name + ', ' + user.first_name + ' (' + user.email + ')'
                    });
                });
                controller.userOptions.resetItems = angular.copy(controller.userOptions.items);
            });
        };
        this.TransferTrialsGridMenuItems = function (scope, controller, trial_id) {
            var menuArr =
                [
                    {
                        title: 'Transfer Trial Ownership for All Trials',
                        order: 1,
                        action: function (){
                            _createTransferUserSelect(controller, _.chain(controller.gridOptions.data).pluck(trial_id).value());
                        }
                    },
                    {
                        title: 'Transfer Ownership for Selected Trials',
                        order: 2,
                        action: function (){
                            _createTransferUserSelect(controller, _.chain(controller.gridApi.selection.getSelectedRows()).pluck(trial_id).value());
                        }
                    },
                    {
                        title: 'Remove Ownership of All Trials',
                        order: 3,
                        action: function ($event) {
                            scope.showAllTrialsModal = true;
                            console.log("Send userid, orgid")
                        }
                    },
                    {
                        title: 'Remove Ownership of Selected Trials',
                        order: 4,
                        action: function ($event) {
                            scope.showSelectedTrialsModal = true;
                            console.log("Send ownership id")
                        }
                    }
                ];
            if (controller.userDetails) {
                menuArr.push(
                    {
                        title: 'Add Trials',
                        order: 4,
                        action: function ($event) {
                            scope.showSelectedTrialsModal = true;
                            console.log("Send ownership id")
                        }
                    });
            }
            return service.isCurationModeEnabled() ? menuArr : [];
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
                        }
                    }

                });

                modalInstance.result.then(function () {
                    console.log('modal closed, TODO redirect');
                });
            })();


        }
    }


})();
