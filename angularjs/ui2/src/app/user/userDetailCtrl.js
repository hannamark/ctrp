/**
 * Created by schintal on 9/12/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService','toastr','OrgService','userDetailObj','MESSAGES','$scope','countryList','GeoLocationService'];

    function userDetailCtrl(UserService, toastr, OrgService, userDetailObj, MESSAGES, $scope, countryList) {
        var vm = this;
        console.log('persisted data for user is:', userDetailObj);

        $scope.userDetail_form = {};
        vm.userDetails = userDetailObj;

        vm.selectedOrgsArray = [];
        vm.savedSelection = []; //save selected organizations
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
        }

        vm.updateUser = function () {
            // Selected Orgs is required but not really a validated form field (it is wrapped in a directive)
            // So check selectedOrgs length and do nothing if array.length < 1
            if (!vm.selectedOrgsArray.length) {
                return;
            }

            console.log('vm.userDetails is:', vm.userDetails.user_status);
            var newUser = {};
            newUser.id = vm.userDetails.id || '';
            if(vm.selectedOrgsArray.length >0) {
                vm.userDetails.organization_id = vm.selectedOrgsArray[vm.selectedOrgsArray.length-1].id;
            }
            newUser.user = vm.userDetails;
            newUser.user.user_status_id = vm.userDetails.user_status.id;

            if (vm.selectedOrgsArray[0] != null){
                console.log('orgs id is ' + vm.selectedOrgsArray[0].id);
            }
            UserService.upsertUser(newUser).then(function(response) {
                toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
                vm.userDetails.username = response.username;
                vm.userDetails.email = response.email;
                vm.userDetails.role = response.role;
                vm.userDetails.first_name = response.first_name;
                vm.userDetails.last_name = response.last_name;
                vm.userDetails.middle_name = response.middle_name;
                vm.userDetails.street_address = response.street_address;
                vm.userDetails.city = response.city;
                vm.userDetails.state = response.state;
                vm.userDetails.zipcode = response.zipcode
                vm.userDetails.country = response.country;
                vm.userDetails.receive_email_notifications = response.receive_email_notifications;
                vm.userDetails.organization_id = response.organization_id;
            }).catch(function(err) {
                console.log('error in updating user ' + JSON.stringify(vm.userDetails));
            });
        }; // updatePerson

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumberPO(vm.userDetails.phone, vm.userDetails.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

        vm.reset = function() {
            vm.userDetails = angular.copy(userDetailObj);

            if (vm.selectedOrgsArray.length && vm.selectedOrgsArray[0]._destroy) {
                vm.selectedOrgsArray[0]._destroy = false;
            }
        };

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
