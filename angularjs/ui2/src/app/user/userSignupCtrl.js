/**
 * Created by schintal 9/25/2015
 */

(function () {
    'use strict';

    angular.module('ctrp.app.user')
        .controller('userSignupCtrl', userSignupCtrl);

    userSignupCtrl.$inject = ['$scope', '$http', '$window', 'toastr',
        '$sce', '$state', '$timeout', 'UserService', 'OrgService'];

    function userSignupCtrl($scope, $http, $window, toastr, $state, $sce, $timeout,  UserService, OrgService) {
        var vm = this;

        // { "local_user"=>{"username"=>"e", "email"=>"e@x.com", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]", "role"=>"ROLE_READONLY"}, "commit"=>"Sign up"}
        $scope.signup_form = {};

        vm.userObj = {
            'local_user': {
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
                organization: '',
                role: ''
            },
            'type': vm.type
        };

        vm.rolesArr = ['ROLE_RO', 'ROLE_SUPER', 'ROLE_ADMIN', 'ROLE_CURATOR', 'ROLE_ABSTRACTOR', 'ROLE_ABSTRACTOR-SU', 'ROLE_TRIAL-SUBMITTER', 'ROLE_ACCRUAL-SUBMITTER', 'ROLE_SITE-SU', 'ROLE_SERVICE-REST'];
        vm.searchParams = OrgService.getInitialOrgSearchParams();
        vm.masterCopy = angular.copy(vm.userObj);

        vm.typeAheadNameSearch = function () {
            var wildcardOrgName = vm.searchParams.name.indexOf('*') > -1 ? vm.searchParams.name : '*' + vm.searchParams.name + '*';
            //search context: 'CTRP', to avoid duplicate names
            var queryObj = {
                name: wildcardOrgName,
                source_context: 'CTRP',
                source_status: 'Active'
            };

            /*
            //for trial-related org search, use only 'Active' source status
            if (curStateName.indexOf('trial') === -1) {
                delete queryObj.source_status;
            }
            */
            return OrgService.searchOrgs(queryObj).then(function(res) {
                //remove duplicates
                var uniqueNames = [];
                var orgNames = [];
                orgNames = res.orgs.map(function (org) {
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

        vm.reset = function() {
            vm.userObj = angular.copy(vm.masterCopy);
        };
    }

})();
