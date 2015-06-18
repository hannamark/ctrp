/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'uiGridConstants', '$scope'];

    function organizationCtrl(OrgService, DTOptionsBuilder, DTColumnDefBuilder, uiGridConstants, $scope) {
        var vm = this;
        vm.orgList = [];
        vm.searchParams = OrgService.getInitialOrgSearchParams();
        activate();

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

        var paginationOptions = {
            pageNumber: 1,
            pageSize: 10,
            sort: null,
            total: null
        }; //paginationOptions

        vm.gridOptions = {
            enableColumnResizing: true,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: false,
            columnDefs: [
                {field: 'name', enableSorting: true},
                {field: 'identifier', enableSorting: true},
                {field: 'id', enableSorting: true, displayName: 'ID'},
                {field: 'state', enableSorting: true}
            ],
            onRegisterApi: function(gridApi) {
                vm.gridApi = gridApi;
                //vm.gridApi.core.onsortChanged...
                
                vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                    vm.searchParams.start = newPage;
                    vm.searchParams.rows = pageSize;
                    vm.searchOrgs();
                });
            }
        }; //gridOptions




        vm.searchOrgs = function() {
            OrgService.searchOrgs(vm.searchParams).then(function(data) {
             //   console.log("received search results: " + JSON.stringify(data.data));
                vm.orgList = [];
                vm.orgList = data.data.orgs;
                vm.gridOptions.data = prepareGridData(vm.orgList);
                vm.gridOptions.totalItems = data.data.total;
                console.log('vm.gridOptions.data = ' + JSON.stringify(vm.gridOptions.data));
                vm.gridOptions.paginationPageSize = data.data.rows;

            }).catch(function(err) {
                console.log('search organizations failed');
            });
        }; //searchOrgs





    /****************************** implementations **************************/

        function activate() {
            getAllOrgs();
        } //activate




        function getAllOrgs() {
            OrgService.getAllOrgs()
                .then(function(data) {
                // console.log('received organizations : ' + JSON.stringify(data));
                    vm.orgList = data.data;
                    vm.gridOptions.data = prepareGridData(vm.orgList);
                    vm.gridOptions.totalItems = vm.orgList.length;
                }).catch(function(err) {
                    console.log('failed to retrieve organizations');
                });
        } //getAllOrgs


        function prepareGridData(dataArr) {
            var results = [];
            angular.forEach(dataArr, function(item, index) {
                // vm.gridOptions.data.push(item);

                results.push({"name" : item.name,
                    "identifier": "no identifier",
                    "id": item.id, "state" : item.state_province});

            });

            return results;
        }

    }

})();