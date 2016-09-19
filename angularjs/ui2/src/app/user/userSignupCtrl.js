/**
 * Created by schintal 9/25/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userSignupCtrl', userSignupCtrl);

    userSignupCtrl.$inject = ['$scope', 'AppSettingsService', 'UserService', 'PromiseTimeoutService', 'OrgService', 'URL_CONFIGS', 'toastr', '$log', '$state'];

    function userSignupCtrl($scope, AppSettingsService, UserService, PromiseTimeoutService, OrgService, URL_CONFIGS, toastr, $log, $state) {
        var vm = this;

        $scope.signup_form = {};

        var UserObj = function () {
            return {
                'user': {
                    domain: '',
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    organization_id: '',
                    phone: '',
                    phone_ext: '',
                    user_type: 'LdapUser'
                },
                'type': vm.type
            };
        };

        vm.userObj = new UserObj();
        vm.timestamp = Date.now();

        vm.selectedUserFunctions = function () {
            var selectedArr = [];
            _.each(vm.selectedFunctionsObj[vm.userObj.user.domain], function (selected, func) {
                if (selected) {
                    selectedArr.push(func);
                }
            });
            vm.userObj.user.selected_function = '';
        };

        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.org_search_name);
        };

        vm.setSignUpTypeAheadOrg = function (searchObj) {
            var splitVal = searchObj.split('<span class="hide">');
            vm.org_search_name = splitVal[0];
            vm.userChosenOrg = JSON.parse(splitVal[1].split('</span>')[0].replace(/"null"/g, 'null'));
            vm.userObj.user.organization_id = vm.userChosenOrg.id;
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.org_search_name = vm.userObj.user.organization_id = undefined;
        };

        vm.exitSignUpForm = function () {
            vm.reset();
            vm.defaultSignUp = vm.NihSignUp = false;
        };

        vm.updateUser = function () {
            upsertUserSignup(vm.userObj);
        };

        vm.reset = function () {
            vm.userObj = new UserObj();
            vm.removeOrgChoice();
        };

        vm.validateUserName = function() {
            UserService.searchUsers({username: vm.userObj.user.username}).then(function (data) {
                if ( data.total >  0 ){
                    vm.newUserNameInvalid = true;
                } else {
                    vm.newUserNameInvalid = false;
                }
            }).catch(function (err) {
                console.log('Search Users failed: ' + err);
            });
        };

        var upsertUserSignup = function (userObj) {
            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.A_USER_SIGNUP, userObj).then(function (data) {
                if (data["server_response"] == 422 || data["server_response"]["status"] == 422) {
                    toastr.error('Sign Up failed', 'Login error', { timeOut: 0});
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            if (key !== 'server_response') {
                                toastr.error('SignUp error:', key + ' -> ' + data[key], { timeOut: 0});
                            }
                        }
                    }
                    $state.go('main.signup');
                } else {
                    toastr.success('Sign Up Success', 'You have been signed up');
                    vm.userObj = new UserObj();
                    vm.exitSignUpForm();
                    vm.signUpComplete = true;
                }
            }).catch(function (err) {
                $log.error('error in log in: ' + JSON.stringify(err));
            });
        };
    }
})();
