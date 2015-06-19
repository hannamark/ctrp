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
            if (isSearchParamsDirty(vm.searchParams)) {
                OrgService.searchOrgs(vm.searchParams).then(function (data) {
                    // console.log("received search results: " + JSON.stringify(data.data));
                    vm.orgList = [];
                    vm.orgList = data.data.orgs;
                    console.log("orgList: " + JSON.stringify(vm.orgList));
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
                    vm.gridOptions.data = prepareGridData(vm.orgList);
                    vm.gridOptions.totalItems = vm.orgList.length;
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
