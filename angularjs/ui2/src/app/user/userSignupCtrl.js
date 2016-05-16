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

        vm.searchParams = OrgService.getInitialOrgSearchParams();

        vm.typeAheadNameSearch = function () {
            var wildcardOrgName = vm.searchParams.name.indexOf('*') > -1 ? vm.searchParams.name : '*' + vm.searchParams.name + '*';
            //search context: 'CTRP', to avoid duplicate names
            var queryObj = {
                name: wildcardOrgName,
                source_context: 'CTRP',
                source_status: 'Active'
            };

            return OrgService.searchOrgs(queryObj).then(function(res) {
                //remove duplicates
                var uniqueNames = [];
                var orgNames = [];
                
                orgNames = res.orgs.map(function (org) {
                    vm.userObj.local_user.organization_id = org.id;
                    vm.userObj.local_user.organization_name = org.name;
                    return org.name;
                });

                return uniqueNames = orgNames.filter(function (name) {
                    return uniqueNames.indexOf(name) === -1;
                });
            });
        }; //typeAheadNameSearch

        vm.updateUser = function () {
            UserService.upsertUserSignup(vm.userObj);
        };

        vm.reset = function () {
            vm.userObj = new UserObj();
        };
    }

})();
