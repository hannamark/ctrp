/**
 * Created by wus4 on 7/2/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personCtrl', personCtrl);

    personCtrl.$inject = ['PersonService', 'uiGridConstants', '$scope',
        'Common', 'sourceContextObj', 'sourceStatusObj', '_'];

    function personCtrl(PersonService, uiGridConstants, $scope, Common, sourceContextObj, sourceStatusObj, _) {

        var vm = this;
        vm.searchParams = PersonService.getInitialPersonSearchParams();
        vm.sourceContextArr = sourceContextObj;
        vm.sourceContextArr.sort(Common.a2zComparator());
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());


        vm.searchPeople = function () {
            // vm.searchParams.name = vm.searchParams.name || "*";
            //console.log("searching params: " + JSON.stringify(vm.searchParams));
            PersonService.searchPeople(vm.searchParams).then(function (data) {
                //  console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.data = data.data.people; //prepareGridData(data.data.orgs); //data.data.orgs;
                vm.gridOptions.totalItems = data.data.total;
            }).catch(function (err) {
                console.log('search people failed');
            });
        }; //searchPeople


        vm.resetSearch = function () {
            // vm.states.length = 0;
            vm.searchParams = PersonService.getInitialPersonSearchParams();
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;
            Object.keys(vm.searchParams).forEach(function (key, index) {
                vm.searchParams[key] = '';
            });
        }; //resetSearch

        vm.curationShown = false;
        vm.entitiesToBeCurated = [];
       // var firstColumn = vm.gridOptions.columnDefs[0];




        activate();

        /****************************** implementations **************************/

        function activate() {
            prepareGidOptions();
            // vm.searchPeople();
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
                switch (sortColumns[0].sort.direction) {
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
            vm.searchPeople();
        }; //sortChangedCallBack


        /**
         * callback for handling row selection
         * @param row
         */
        function rowSelectionCallBack(row) {
            if (row.isSelected) {
                //  + JSON.stringify(row.entity);
                console.log('row is selected: ' + JSON.stringify(row.entity));
                if (vm.entitiesToBeCurated.length < 2) {
                    vm.entitiesToBeCurated.push(row);
                } else {
                    vm.entitiesToBeCurated.pop().isSelected = false;
                    vm.entitiesToBeCurated.unshift(row);
                    vm.gridApi.grid.refresh(); //refresh grid
                }
            } else {
                //de-select the row
                //remove it from the vm.entitiesToBeCurated, if exists
                var needleIndex = -1;
                _.each(vm.entitiesToBeCurated, function(existingRow, idx) {
                    if (existingRow.entity.id == row.entity.id) {
                        needleIndex = idx;
                        return;
                    }
                });

                if (needleIndex > -1) {
                    vm.entitiesToBeCurated.splice(needleIndex, 1);
                }
            }

        } //rowSelectionCallBack


        /**
         * Watch the curation switch to turn on/off the curation choices
         */
        function prepareGidOptions() {
            //ui-grid plugin options
            vm.gridOptions = PersonService.getGridOptions();
            vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
            vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
            vm.gridOptions.onRegisterApi = function (gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
                vm.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    vm.searchParams.start = newPage;
                    vm.searchParams.rows = pageSize;
                    vm.searchPeople();
                });

                vm.gridApi.selection.on.rowSelectionChanged($scope, rowSelectionCallBack);
                vm.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {

                    _.each(rows, function (row, index) {
                        rowSelectionCallBack(row);
                    });

                }); //rowSelectionChangedBatch

            }; //gridOptions

            //watch the curation switch button to turn on/off the curation choices
            $scope.$watch(function() {return vm.curationShown;}, function(newVal, oldVal) {
                vm.gridOptions.columnDefs[0].visible = newVal;
                if (newVal == false) {
                    while (vm.entitiesToBeCurated.length > 0) {
                        vm.entitiesToBeCurated.pop().isSelected = false;
                    }
                }
                vm.gridApi.grid.refresh();
            }, true);

        } //prepareGridOptions




    }

})();
