/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function organizationCtrl(OrgService, DTOptionsBuilder, DTColumnDefBuilder) {
        var vm = this;
        vm.searchParams = OrgService.getInitialOrgSearchParams();
        vm.pagingOptions = {start : 1, rows: 10, total: 0};
        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(10)
            .withLanguage({
                "sSearch": "Filter:"
            });

        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(5).notSortable()
        ];


        vm.orgList = [];
        vm.searchOrgs = function() {
            if (isSearchParamsDirty(vm.searchParams)) {
                OrgService.searchOrgs(vm.searchParams).then(function (data) {
                    // console.log("received search results: " + JSON.stringify(data.data));
                    vm.orgList = [];
                    vm.orgList = data.data.orgs;
                    console.log("orgList: " + JSON.stringify(vm.orgList));
                    vm.pagingOptions.start = data.data.start;
                    vm.pagingOptions.rows = data.data.rows;
                    vm.pagingOptions.total = data.data.total;
                }).catch(function (err) {
                    console.log('search organizations failed');
                });
            } else {
                //if no search criteria, get all organizations by default
                getAllOrgs();
            }
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


        /**
         * Check if the searchParams object has any search criteria
         *
         * @param searchParams JSON object
         * @returns {boolean}
         */
        function isSearchParamsDirty(searchParams) {
            var isDirty = false;
            var excludedKeys = ["sort", "rows", "start", "order", "total"];

            for (var i = 0; i < Object.keys(searchParams).length; i++) {
                var key = Object.keys(searchParams)[i];

                if (!!searchParams[key] && excludedKeys.indexOf(key) == -1) {
                    isDirty = true;
                    break;
                }
            }

            return isDirty;
        }

    }

})();