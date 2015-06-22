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
            useExternalSorting: true,  //disabled for now
            columnDefs: [
                {name: 'id', enableSorting: true, displayName: 'ID', width: '8%'},
                {name: 'name', enableSorting: true, width: '37%',
                    //this does not work for .id
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a href="angular#/main/organizations/{{row.entity.id}}">' +
//                    '<a ui-sref="main.orgDetail({orgId: \'{{row.entity.id}}\' })">' +   //this is preferred, but does not work now.
                    '{{row.entity.name}} </a></div>'
//                    '<a ui-sref="main.orgDetail({orgId : \'{{row.entity.id}}\' })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },

                {name: 'identifier', enableSorting: true, width: '25%'},
                {name: 'city', enableSorting: true, width: '15%'},
                {name: 'state', enableSorting: true, width: '15%'}

            ],
            onRegisterApi: function(gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged($scope, vm.sortChangedCallBack)
                vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                    vm.searchParams.start = newPage;
                    vm.searchParams.rows = pageSize;
                    vm.searchParams.name = vm.searchParams.name || "*";
                    vm.searchOrgs();
                });
            }
        }; //gridOptions



        vm.searchOrgs = function() {
            if (isSearchParamsDirty(vm.searchParams)) {
                console.log("searching params: " + JSON.stringify(vm.searchParams));
                OrgService.searchOrgs(vm.searchParams).then(function (data) {
                    // console.log("received search results: " + JSON.stringify(data.data));
                    //vm.orgList = [];
                    vm.orgList = data.data.orgs;
                   // console.log("orgList: " + JSON.stringify(vm.orgList));
                    vm.gridOptions.data = prepareGridData(vm.orgList); //data.data.orgs;
                }).catch(function (err) {
                    console.log('search organizations failed');
                });
            } else {
                //if no search criteria, get all organizations by default
                getAllOrgs();
            }
        }; //searchOrgs



        //callback for sorting columns
        vm.sortChangedCallBack = function(grid, sortColumns) {
            //console.log("sortColumns = " + JSON.stringify(sortColumns));
            console.log("sortColumns.length = " + sortColumns.length);
//            console.log("sortColumns[0].name: " + sortColumns[0].name);
            console.log("vm.gridOptions.columnDefs[0].name: " + vm.gridOptions.columnDefs[0].name);
            if (sortColumns.length == 0) { // || sortColumns[0].name != vm.gridOptions.columnDefs[0].name
                console.log("in sorting, but getting all orgs");
                getAllOrgs();
            } else {
                console.log("uiGridConstants: " + JSON.stringify(sortColumns[0].sort));
                switch( sortColumns[0].sort.direction ) {
                    case uiGridConstants.ASC:
                        vm.searchParams.order = 'ASC';
                        break;
                    case uiGridConstants.DESC:
                        vm.searchParams.order == 'DESC';
                        break;
                    case undefined:
                        vm.searchParams.order = '';
                        break;
                }

                //do the search with the updated sorting
                vm.searchOrgs();
            }
        }; //sortChangedCallBack

        activate();


    /****************************** implementations **************************/

        function activate() {
            getAllOrgs();
        } //activate




        function getAllOrgs() {
            OrgService.getAllOrgs()
                .then(function(data) {
                    console.log('received organizations : ' + JSON.stringify(data));
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
            var excludedKeys = ["rows", "start", "total"];

            for (var i = 0; i < Object.keys(searchParams).length; i++) {
                var key = Object.keys(searchParams)[i];

                if (!!searchParams[key] && excludedKeys.indexOf(key) == -1) {
                    isDirty = true;
                    break;
                }
            }

            return isDirty;
        }


        /**
         *
         * @param dataArr
         * @returns {Array}
         */
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
