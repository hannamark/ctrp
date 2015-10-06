/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('familyCtrl', familyCtrl);

    familyCtrl.$inject = ['FamilyService', 'uiGridConstants', '$scope', '$rootScope',
        'Common','familyStatusObj','familyTypeObj','$modal', '$location', '$anchorScroll'];

    function familyCtrl(FamilyService, uiGridConstants, $scope, $rootScope,
                        Common,familyStatusObj,familyTypeObj,$modal, $location, $anchorScroll) {

        var vm = this;

        vm.searchParams = FamilyService.getInitialFamilySearchParams();

        vm.familyStatusArr = familyStatusObj.data;
        vm.familyStatusArr.sort(Common.a2zComparator());
        vm.familyTypeArr = familyTypeObj.data;
        vm.familyTypeArr.sort(Common.a2zComparator());
        vm.gridScope=vm;
        $scope.searchWarningMessage = '';

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


            //Checking to see if any search parameter was entered. If not, it should throw a warning to the user to select atleast one parameter.
            // Right now, ignoring the alias parameter as it is set to true by default. To refactor and look at default parameters instead of hardcoding -- radhika
            var isEmptySearch = true;
            var excludedKeys = ['sort', 'order', 'rows', 'start'];
            Object.keys(vm.searchParams).forEach(function (key) {
                if (excludedKeys.indexOf(key) == -1 && vm.searchParams[key] != '')
                    isEmptySearch = false;
            });

            if (isEmptySearch)
                $scope.searchWarningMessage = "Atleast one selection value must be entered prior to running the search";
            else
                $scope.searchWarningMessage = "";

            console.log("search params are  " + JSON.stringify(vm.searchParams));
            console.log("isEmptySearch is " + isEmptySearch);

            // vm.searchParams.name = vm.searchParams.name || "*";
            //console.log("searching params: " + JSON.stringify(vm.searchParams));
            if (!isEmptySearch) { //skip searching if no search parameters supplied by user
                FamilyService.searchFamilies(vm.searchParams).then(function (data) {
                    console.log("received search results: " + JSON.stringify(data.data));
                    vm.gridOptions.data = data.data.families; //prepareGridData(data.data.orgs); //data.data.orgs;

                    //console.log("vm grid: " + JSON.stringify(vm.gridOptions.data));
                    //console.log("received search results: " + JSON.stringify(data.data));
                    vm.gridOptions.totalItems = data.data.total;

                    $location.hash('family_search_results');
                    $anchorScroll();
                }).catch(function (err) {
                    console.log('search people failed');
                });
            }
        }; //searchPeople


        vm.resetSearch = function() {
            // vm.states.length = 0;
            vm.searchParams = FamilyService.getInitialFamilySearchParams();
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;
            $scope.searchWarningMessage = '';

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
