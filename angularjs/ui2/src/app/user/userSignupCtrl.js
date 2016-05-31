/**
 * Created by schintal 9/25/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userSignupCtrl', userSignupCtrl);

    userSignupCtrl.$inject = ['$scope', 'AppSettingsService', 'UserService', 'OrgService'];

    function userSignupCtrl($scope, AppSettingsService,  UserService, OrgService) {
        var vm = this;

        $scope.signup_form = {};

        var UserObj = function() {
            return {
                'local_user': {
                    domain: '',
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    organization_name: '',
                    organization_id: '',
                    selected_function: ''
                },
                'type': vm.type
            };
        };

        vm.userObj = new UserObj();
        
        AppSettingsService.getSettings({ setting: 'USER_DOMAINS', external: true}).then(function (response) {
            vm.domainsArr = response.data[0].settings.split('||');
            vm.selectedFunctionsObj = [];
            vm.selectAbleUserFunctions = [];
            angular.forEach(vm.domainsArr, function (domain) {
                AppSettingsService.getSettings({ setting: domain + '_USER_FUNCTIONS', external: true}).then(function (response) {
                    var functionsArr = response.data[0].settings.split('||');
                    vm.selectedFunctionsObj[domain] = {};
                    angular.forEach(functionsArr, function (func) {
                        vm.selectAbleUserFunctions[domain] = functionsArr.length;
                        vm.selectedFunctionsObj[domain][func] = vm.selectAbleUserFunctions[domain] > 1 ? false : true;
                    });
                }).catch(function (err) {
                    console.log("Error in retrieving " + domain + "_USER_FUNCTIONS " + err);
                });
            });
        }).catch(function (err) {
            console.log("Error in retrieving USER_DOMAINS " + err);
        });

        vm.selectedUserFunctions = function(){
            var selectedArr = [];
            _.each( vm.selectedFunctionsObj[vm.userObj.local_user.domain], function( selected, func ) {
                if ( selected ) {
                    selectedArr.push(func);
                }
            });
            vm.userObj.local_user.selected_function = '';
        };

        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.userObj.local_user, vm.searchParams.org_search_name)
        };

        vm.updateUser = function () {
            UserService.upsertUserSignup(vm.userObj);
        };

        vm.reset = function () {
            vm.userObj = new UserObj();
        };
    }

})();
