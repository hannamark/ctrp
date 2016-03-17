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
        vm.statusArr = ['In Review', 'Active', 'Inactive', 'Deleted'];
        vm.rolesArr = ['ROLE_RO', 'ROLE_SUPER', 'ROLE_ADMIN', 'ROLE_CURATOR', 'ROLE_ABSTRACTOR', 'ROLE_ABSTRACTOR-SU', 'ROLE_TRIAL-SUBMITTER', 'ROLE_ACCRUAL-SUBMITTER', 'ROLE_SITE-SU', 'ROLE_SERVICE-REST'];

        vm.updateUser = function () {

            console.log('hello email changed ? ' +vm.userDetails.email);
            console.log('IN UPDATEUSER');
            var newUser = {};
            newUser.new = vm.userDetails.new || '';
            newUser.id = vm.userDetails.id || '';
            if(vm.selectedOrgsArray.length >0) {
                /* Only updates using the first item in the org. array */
                if (vm.selectedOrgsArray[0]._destroy) {
                    vm.userDetails.organization_id = null;
                } else {
                    vm.userDetails.organization_id = vm.selectedOrgsArray[0].id;
                }
            }
            newUser.user = vm.userDetails;
           //newUser.org_id=watch.org[o];

            if (vm.selectedOrgsArray[0] != null){
                console.log('orgs id is ' + vm.selectedOrgsArray[0].id);
            }
            console.log('newUser is: ' + JSON.stringify(newUser));
            UserService.upsertUser(newUser).then(function(response) {
                toastr.success('User with username: ' + response.username + ' has been updated', 'Operation Successful!');
                console.log('response is:', response);
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

        /*UserService.getUserDetailsByUsername().then(function(details) {
            console.log('user details: ' + JSON.stringify(details));
            vm.userDetails = details;
        });*/

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumberPO(vm.userDetails.phone, vm.userDetails.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

        //delete the affiliated organization from table view
        vm.toggleSelection = function (index) {
            if (index < vm.selectedOrgsArray.length) {
                vm.selectedOrgsArray[index]._destroy = !vm.selectedOrgsArray[index]._destroy;
               // vm.savedSelection.splice(index, 1);
            }
        };// toggleSelection

        vm.reset = function() {
            vm.userDetails = angular.copy(userDetailObj);
        };

        $scope.$watch(function() {return vm.selectedOrgsArray;}, function(newVal) {
           console.log('selected org:' + JSON.stringify(vm.selectedOrgsArray));
        });

        activate();

        /****************** implementations below ***************/
        function activate() {

            if(vm.userDetails.organization_id != null) {
                var org_id= vm.userDetails.organization_id;
                //var org_name =vm.userDetails.organization_name;
                OrgService.getOrgById(vm.userDetails.organization_id).then(function(organization) {
                    var curOrg = {'id' : vm.userDetails.organization_id, 'name': organization.name};
                    //var org_name = organization.name;
                    //var org_name = vm.userDetails.organization_name;
                    vm.savedSelection.push(curOrg);
                    vm.selectedOrgsArray = angular.copy(vm.savedSelection);
                });
            }

            listenToStatesProvinces();
        }

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
