/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'uiGridConstants', '$scope', '$state'];

    function organizationCtrl(OrgService, DTOptionsBuilder, DTColumnDefBuilder, uiGridConstants, $scope, $state) {
        var vm = this;
        vm.orgList = [];
        vm.searchParams = OrgService.getInitialOrgSearchParams();
        activate();

        //datatables plugin
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


        //ui-grid plugin
        vm.gridOptions = {
            enableColumnResizing: true,
            rowHeight: 60,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: false,  //disabled for now
            columnDefs: [
                {field: 'id', enableSorting: true, displayName: 'ID', width: '5%'},
                {field: 'name', enableSorting: true, width: '40%',
                    //this does not work for .id
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a href="angular#/main/organizations/{{row.entity.id}}">' +
//                    '<a ui-sref="main.orgDetail({orgId: \'{{row.entity.id}}\' })">' +   //this is preferred, but does not work now.
                    '{{row.entity.name}} </a></div>'
//                    '<a ui-sref="main.orgDetail({orgId : \'{{row.entity.id}}\' })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },

                {field: 'identifier', enableSorting: true, width: '25%'},
                {field: 'city', enableSorting: true, width: '15%'},
                {field: 'state', enableSorting: true, width: '15%'}

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


        $scope.getUrl = function(row) {
            console.log('row = ' + JSON.stringify(row));
            return $state.href('main.orgDetail', {orgId : row.entity.id});
        };


        vm.searchOrgs = function() {
            OrgService.searchOrgs(vm.searchParams).then(function(data) {
             //   console.log("received search results: " + JSON.stringify(data.data));
                vm.orgList = [];
                vm.orgList = data.data.orgs;
                vm.gridOptions.data.length = 0;
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

                var curId = item.id;
                var curName = '<a ui-sref="main.orgDetail({orgId : ' + curId +' })">' + item.name + '</a>';
                results.push({"name" : item.name,
                    "identifier": "",
                    "id": curId, "city" : item.city,
                    "state" : item.state_province
                });

            });

            return results;
        }

    }

})();