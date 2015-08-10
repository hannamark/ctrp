/**
 * Created by wangg5 on 8/7/15.
 */


(function() {

    'use strict';

    angular.module('ctrpApp')
        .controller('advancedOrgSearchModalCtrl', advancedOrgSearchModalCtrl);

    advancedOrgSearchModalCtrl.$inject = ['$scope', '_', 'OrgService'];

    function advancedOrgSearchModalCtrl($scope, _, OrgService) {
        var vm = this;

        vm.foundOrgs = [];
        vm.selectedOrgs = [];
        $scope.orgSearchResults = []; //for receiving feeds from org search form directive





        activate();

        function activate() {
            watchOrgSearchResults();
        }


        /******************/






        /**
         * Watch the organization search results from advanced search
         */
        function watchOrgSearchResults() {
            $scope.$watch('orgSearchResults', function(newVal, oldVal) {
                vm.foundOrgs.length = 0;
                _.each($scope.orgSearchResults, function(newOrg, idx) {
                    if (!OrgService.isOrgSaved(vm.foundOrgs, newOrg)) {
                        vm.foundOrgs.unshift(newOrg);
                    }
                   // console.log("received newOrg: " + JSON.stringify(newOrg));

                });
            }, true);
        } //watchOrgSearchResults



    }


})();