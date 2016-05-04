/**
 * Created by schintal on 9/12/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService','toastr','OrgService','userDetailObj','MESSAGES','$scope','countryList','GeoLocationService', 'AppSettingsService'];

    function userDetailCtrl(UserService, toastr, OrgService, userDetailObj, MESSAGES, $scope, countryList, GeoLocationService, AppSettingsService) {
        var vm = this;

        $scope.userDetail_form = {};
        vm.userDetails = userDetailObj;
        vm.userDetailsOrig = angular.copy(userDetailObj);
        vm.selectedOrgsArray = [];
        vm.savedSelection = [];
        vm.states = [];
        vm.countriesArr = countryList;
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.userRole = UserService.getUserRole();

        vm.updateUser = function () {
            console.log("Error in retrieving details:",vm.userDetails);
            if(vm.selectedOrgsArray.length >0) {
                vm.userDetails.organization_id = vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].id;
            }

            UserService.upsertUser(vm.userDetails).then(function(response) {
                toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
            }).catch(function(err) {
                console.log('error in updating user ' + JSON.stringify(vm.userDetails));
            });
        };

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumberPO(vm.userDetails.phone, vm.userDetails.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

        vm.reset = function() {
            vm.userDetails = angular.copy(vm.userDetailsOrig);
        };

        vm.userRequestAdmin = function(params) {
            UserService.userRequestAdmin(params);
        };
        
        AppSettingsService.getSettings({ setting: 'USER_DOMAINS'}).then(function (response) {
            vm.domainArr = response.data[0].settings.split('||');
        }).catch(function (err) {
            vm.domainArr = [];
            console.log("Error in retrieving USER_DOMAINS " + err);
        });

        AppSettingsService.getSettings({ setting: 'USER_ROLES'}).then(function (response) {
            vm.rolesArr = JSON.parse(response.data[0].settings);
        }).catch(function (err) {
            vm.rolesArr = [];
            console.log("Error in retrieving USER_ROLES " + err);
        });

        AppSettingsService.getSettings({ setting: 'USER_STATUSES', json_path: 'users/user_statuses'}).then(function (response) {
            vm.statusArr = response.data;
        }).catch(function (err) {
            vm.statusArr = [];
            console.log("Error in retrieving USER_STATUSES " + err);
        });

        /****************** implementations below ***************/
        var activate = function() {
            if(vm.userDetails.organization_id != null) {
                OrgService.getOrgById(vm.userDetails.organization_id).then(function(organization) {
                    var curOrg = {'id' : vm.userDetails.organization_id, 'name': organization.name};
                    vm.savedSelection.push(curOrg);
                    vm.selectedOrgsArray = angular.copy(vm.savedSelection);
                });
            }
            listenToStatesProvinces();
        }();

        /**
         * Listen to the message for availability of states or provinces
         * for the selected country
         */
        function listenToStatesProvinces() {
            if (vm.userDetails.country) {
                vm.watchCountrySelection(vm.userDetails.country);
            } else {
                vm.userDetails.country = 'United States'; //default country
                vm.watchCountrySelection(vm.userDetails.country);
            }

            $scope.$on(MESSAGES.STATES_AVAIL, function () {
                vm.states = OrgService.getStatesOrProvinces();
            });

            $scope.$on(MESSAGES.STATES_UNAVAIL, function () {
                vm.states = [];
            })


        } //listenToStatesProvinces
    }
})();
