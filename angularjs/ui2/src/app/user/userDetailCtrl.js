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
        vm.statusArr = UserService.getStatusArray();
        vm.rolesArr = UserService.getRolesArray();

        vm.checkUserStatus = function() {
            if (!vm.userDetails.user_status.id) {
                vm.userDetails.user_status.id = null;
            }
            console.log('status is: ', vm.userDetails.user_status);
        };

        vm.updateUser = function () {
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
        
        AppSettingsService.getSettings('USER_DOMAINS', true).then(function (response) {
            vm.domainArr = response.data[0].settings.split('||');
        }).catch(function (err) {
            console.log("Error in retrieving USER_DOMAINS.");
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
