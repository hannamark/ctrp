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

        vm.userObj = {
            'local_user': {
                domain: '',
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
                organization_id: '',
                selected_functions: []
            },
            'type': vm.type
        };
        
        AppSettingsService.getSettings('USER_DOMAINS', true).then(function (response) {
            vm.domainsArr = response.data[0].settings.split('||');
            vm.selectedFunctionsObj = [];
            vm.selectAbleUserFunctions = [];
            angular.forEach(vm.domainsArr, function (domain) {
                AppSettingsService.getSettings(domain + '_USER_FUNCTIONS', true).then(function (response) {
                    var functionsArr = response.data[0].settings.split('||');
                    vm.selectedFunctionsObj[domain] = {};
                    angular.forEach(functionsArr, function (func) {
                        vm.selectAbleUserFunctions[domain] = functionsArr.length;
                        vm.selectedFunctionsObj[domain][func] = vm.selectAbleUserFunctions[domain] > 1 ? false : true;
                    });
                }).catch(function (err) {
                    console.log("Error in retrieving " + domain + "_USER_FUNCTIONS.");
                });
            });
        }).catch(function (err) {
            console.log("Error in retrieving USER_DOMAINS.");
        });

        vm.selectedUserFunctions = function(){
            var selectedArr = [];
            _.each( vm.selectedFunctionsObj[vm.userObj.local_user.domain], function( selected, func ) {
                if ( selected ) {
                    selectedArr.push(func);
                }
            });
            vm.userObj.local_user.selected_functions = selectedArr;
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
                    return org.name;
                });

                return uniqueNames = orgNames.filter(function (name) {
                    return uniqueNames.indexOf(name) === -1;
                });
            });
        }; //typeAheadNameSearch

        vm.updateUser = function () {
            //
            UserService.upsertUserSignup(vm.userObj);

            /**
            UserService.upsertUserSignup(vm.userObj).then(function (response) {
                toastr.success('User ' +JSON.stringify(vm.userObj) + ' has been recorded', 'Operation Successful!');
                console.log("Added User" + JSON.stringify(vm.userObj));

            }).catch(function (err) {
                console.log("Error in updating inserting new User " + JSON.stringify(vm.userObj));
            });

**/
        };
    }

})();
