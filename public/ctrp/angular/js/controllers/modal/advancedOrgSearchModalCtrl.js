/**
 * Created by wangg5 on 8/7/15.
 */


(function() {

    'use strict';

    angular.module('ctrpApp')
        .controller('advancedOrgSearchModalCtrl', advancedOrgSearchModalCtrl);

    advancedOrgSearchModalCtrl.$inject = ['$scope', '_'];

    function advancedOrgSearchModalCtrl($scope, _) {
        var vm = this;

        vm.foundOrgs = [];
        vm.selectedOrgs = [];
        vm.savedSelection = []; //save selected organizations
        vm.selectedOrgFilter = "";
        $scope.orgSearchResults = []; //for receiving feeds from org search form directive



        activate();

        function activate() {
            watchOrgSearchResults();
        }


        /******************/

        function watchSelectedOrgs() {
            $scope.$watch(function () {
                return vm.selectedOrgs;
            }, function (newVal, oldVal) {

                if (!!newVal) {
                    angular.forEach(newVal, function (org, idx) {
                        org = JSON.parse(org);

                        if (!isOrgSaved(vm.savedSelection, org)) {
                            vm.savedSelection.unshift(initSelectedOrg(org));
                        }
                    });
                } //if

            }, true);
        } //watchSelectedOrgs



        /**
         * Watch the organization search results from advanced search
         */
        function watchOrgSearchResults() {
            $scope.$watch('orgSearchResults', function(newVal, oldVal) {
                vm.foundOrgs.length = 0;
                _.each($scope.orgSearchResults, function(newOrg, idx) {
                    if (!isOrgSaved(vm.foundOrgs, newOrg)) {
                        vm.foundOrgs.unshift(newOrg);
                    }
                    // console.log("received newOrg: " + JSON.stringify(newOrg));

                });
            }, true);
        } //watchOrgSearchResults




        /**
         * Check if targetOrgsArr contains orgObj by checking the 'id' field
         *
         * @param targetOrgsArr
         * @param orgObj
         * @returns {boolean}
         */
        function isOrgSaved(targetOrgsArr, orgObj) {
            var exists = false;
            _.each(targetOrgsArr, function (org, idx) {
                if (org.id == orgObj.id) { //what if the user deletes the po_affiliation accidentally???
                    exists = true;  //exists and not targeted for destroy
                    return exists;
                }
            });
            return exists;
        } //isOrgSaved




        /**
         * Watch the organization search results from advanced search
         */
        function watchOrgSearchResults() {
            $scope.$watch('orgSearchResults', function(newVal, oldVal) {
                vm.foundOrgs.length = 0;
                _.each($scope.orgSearchResults, function(newOrg, idx) {
                    if (!isOrgSaved(vm.foundOrgs, newOrg)) {
                        vm.foundOrgs.unshift(newOrg);
                    }
                   // console.log("received newOrg: " + JSON.stringify(newOrg));

                });
            }, true);
        } //watchOrgSearchResults



    }


})();