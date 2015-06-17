/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService'];

    function organizationCtrl(OrgService) {
        var vm = this;
        vm.searchParams = OrgService.getInitialOrgSearchParams();
        vm.pagingOptions = {start : 1, rows: 10, total: 0};
        vm.orgList = [];
        vm.searchOrgs = function() {
            OrgService.searchOrgs(vm.searchParams).then(function(data) {
               // console.log("received search results: " + JSON.stringify(data.data));
                vm.orgList = [];
                vm.orgList = data.data.orgs;
                console.log("orgList: " + JSON.stringify(vm.orgList));
                vm.pagingOptions.start = data.data.start;
                vm.pagingOptions.rows = data.data.rows;
                vm.pagingOptions.total = data.data.total;
            }).catch(function(err) {
                console.log('search organizations failed');
            });
        }; //searchOrgs

        activate();



    /****************************** implementations **************************/

        function activate() {
            getAllOrgs();
        } //activate




        function getAllOrgs() {
            OrgService.getAllOrgs()
                .then(function(data) {
                // console.log('received organizations : ' + JSON.stringify(data));
                    vm.orgList = data.data;
                }).catch(function(err) {
                    console.log('failed to retrieve organizations');
                });
        } //getAllOrgs

    }

})();