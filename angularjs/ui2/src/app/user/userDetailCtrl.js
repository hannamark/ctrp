/**
 * Created by schintal on 9/12/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userDetailCtrl', userDetailCtrl);

    userDetailCtrl.$inject = ['UserService', '$scope','toastr','OrgService','userDetailObj'];

    function userDetailCtrl(UserService, $scope, toastr, OrgService, userDetailObj) {
        var vm = this;
         console.log('curuser is ');
        vm.userDetails = userDetailObj;
        vm.selectedOrgsArray = [];
        vm.savedSelection = []; //save selected organizations

        vm.updateUser = function () {

            console.log('hello email changed ? ' +vm.userDetails.email);
            console.log('IN UPDATEUSER');
            var newUser = {};
            newUser.new = vm.userDetails.new || '';
            newUser.id = vm.userDetails.id || '';
            if(vm.selectedOrgsArray.length >0) {
                vm.userDetails.organization_id = vm.selectedOrgsArray[0].id;
            }
            newUser.user = vm.userDetails;
           //newUser.org_id=watch.org[o];

            if (vm.selectedOrgsArray[0] != null){
                console.log('orgs id is ' + vm.selectedOrgsArray[0].id);
            }
            console.log('newUser is: ' + JSON.stringify(newUser));
            UserService.upsertUser(newUser).then(function(response) {
                //toastr.success('Family ' + vm.newUser.username + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log('error in updating family ' + JSON.stringify(vm.userDetails));
            });




        }; // updatePerson


        /*UserService.getUserDetailsByUsername().then(function(details) {
            console.log('user details: ' + JSON.stringify(details));
            vm.userDetails = details;
        });*/


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
                });

            }
        }










    }


})();
