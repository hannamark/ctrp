/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('familyCtrl', familyCtrl);

    familyCtrl.$inject = ['FamilyService', 'uiGridConstants', '$scope', '$rootScope','Common','familyStatusObj','familyTypeObj','$modal'];

    function familyCtrl(FamilyService, uiGridConstants, $scope, $rootScope,Common,familyStatusObj,familyTypeObj,$modal) {

        var vm = this;

        vm.searchParams = FamilyService.getInitialFamilySearchParams();

        vm.familyStatusArr = familyStatusObj.data;
        vm.familyStatusArr.sort(Common.a2zComparator());
        vm.familyTypeArr = familyTypeObj.data;
        vm.familyTypeArr.sort(Common.a2zComparator());
        vm.gridScope=vm;

        $scope.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'display_aff_orgs.html',
            title: 'Family Memberships'

        };

        $scope.showOrgs = function(family_id){

            var modalInstance = $modal.open({
                animation:    true,
                templateUrl: 'display_aff_orgs.html',
                controller:  'ModalInstanceFamilyMembersCtrl as vm',
                resolve: {
                    familyId: function() {
                        return family_id;
                    }
                }
            });


            modalInstance.result.then(function () {
            //console.log("about to delete the familyDetail " + vm.curFamily.id);
                //$state.go('main.families');
            }, function () {
                console.log("operation canceled")
            });
        };

        //ui-grid plugin options
        vm.gridOptions = FamilyService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.onRegisterApi = function(gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
            vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                vm.searchParams.start = newPage;
                vm.searchParams.rows = pageSize;
                vm.searchFamilies();
            });
        }; //gridOptions


        vm.searchFamilies = function() {
            // vm.searchParams.name = vm.searchParams.name || "*";
            //console.log("searching params: " + JSON.stringify(vm.searchParams));
            FamilyService.searchFamilies(vm.searchParams).then(function (data) {
                console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.data = data.data.families; //prepareGridData(data.data.orgs); //data.data.orgs;

                console.log("vm grid: " + JSON.stringify(vm.gridOptions.data));

                console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.totalItems = data.data.total;
            }).catch(function (err) {
                console.log('search people failed');
            });
        }; //searchPeople


        vm.resetSearch = function() {
            // vm.states.length = 0;
            vm.searchParams = FamilyService.getInitialFamilySearchParams();
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;

            Object.keys(vm.searchParams).forEach(function(key, index) {
                vm.searchParams[key] = '';
            });
        }; //resetSearch

        activate();

        /****************************** implementations **************************/

        function activate() {
            // vm.searchFamilies();
            // updateSearchResultsUponParamsChanges();
        } //activate

        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {
//            console.log("sortColumns.length = " + sortColumns.length);
//            console.log("sortColumns[0].name: " + sortColumns[0].name);
//            console.log("vm.gridOptions.columnDefs[0].name: " + vm.gridOptions.columnDefs[0].name);
            if (sortColumns.length == 0) {
                console.log("removing sorting");
                //remove sorting
                vm.searchParams.sort = '';
                vm.searchParams.order = '';
            } else {
                vm.searchParams.sort = sortColumns[0].name; //sort the column
                switch( sortColumns[0].sort.direction ) {
                    case uiGridConstants.ASC:
                        vm.searchParams.order = 'ASC';
                        break;
                    case uiGridConstants.DESC:
                        vm.searchParams.order = 'DESC';
                        break;
                    case undefined:
                        break;
                }
            }

            //do the search with the updated sorting
            vm.searchFamilies();
        }; //sortChangedCallBack

    }

})();
