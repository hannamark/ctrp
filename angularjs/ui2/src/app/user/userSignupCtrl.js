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
            _.each( vm.selectedFunctionsObj[vm.userObj.user.domain], function( selected, func ) {
                if ( selected ) {
                    selectedArr.push(func);
                }
            });
            vm.userObj.user.selected_function = '';
        };

        vm.typeAheadNameSearch = function () {
            return OrgService.typeAheadOrgNameSearch(vm.userObj.user, vm.org_search_name);
        };
        
        vm.setTypeAheadOrg = function (searchObj) {
            var splitVal = searchObj.split('<span class="hide">');
            vm.org_search_name = splitVal[0];
            vm.userChosenOrg = JSON.parse(splitVal[1].split('</span>')[0].replace(/"null"/g, 'null'));
            vm.searchParams.organization_id = vm.userChosenOrg.id;
        };

        vm.removeOrgChoice = function () {
            vm.userChosenOrg = null;
            vm.org_search_name = vm.userObj.user.organization_id = undefined;
        };
        
        vm.updateUser = function () {
            UserService.upsertUserSignup(vm.userObj);
        };

        vm.reset = function () {
            vm.userObj = new UserObj();
        };
    }

})();
