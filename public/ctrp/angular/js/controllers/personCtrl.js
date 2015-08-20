/**
 * Created by wus4 on 7/2/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personCtrl', personCtrl);

    personCtrl.$inject = ['PersonService', 'uiGridConstants', '$scope',
        'Common', 'sourceContextObj', 'sourceStatusObj', '_', 'toastr', '$location', '$anchorScroll'];

    function personCtrl(PersonService, uiGridConstants, $scope,
                        Common, sourceContextObj, sourceStatusObj, _, toastr, $location, $anchorScroll) {

        var vm = this;
        vm.searchParams = PersonService.getInitialPersonSearchParams();
        vm.sourceContextArr = sourceContextObj;
        vm.sourceContextArr.sort(Common.a2zComparator());
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        vm.nullifiedId = '';
        vm.warningMessage = false;

        vm.selectedRows = [];
        console.log('received sourceStatusArr: ' + JSON.stringify(vm.sourceStatusArr));


        vm.searchPeople = function () {
            // vm.searchParams.name = vm.searchParams.name || "*";
            //console.log("searching params: " + JSON.stringify(vm.searchParams));
            PersonService.searchPeople(vm.searchParams).then(function (data) {
                //  console.log("received search results: " + JSON.stringify(data.data));
                vm.gridOptions.data = data.data.people; //prepareGridData(data.data.orgs); //data.data.orgs;
                vm.gridOptions.totalItems = data.data.total;
                $location.hash('people_search_results');
                $anchorScroll();
            }).catch(function (err) {
                console.log('search people failed');
            });
        }; //searchPeople


        vm.resetSearch = function () {
            // vm.states.length = 0;
            vm.searchParams = PersonService.getInitialPersonSearchParams();
            vm.gridOptions.data.length = 0;
            vm.gridOptions.totalItems = null;
            Object.keys(vm.searchParams).forEach(function (key) {
                vm.searchParams[key] = '';
            });
        }; //resetSearch

        vm.curationShown = false;

        $scope.nullifyEntity = function (rowEntity) {
           // console.log("chosen to nullify the row: " + JSON.stringify(rowEntity));
            if (rowEntity.source_status && rowEntity.source_status.indexOf('Act') > -1) {
                //TODO: warning to user for nullifying active entity
                //cannot nullify Active entity (e.g. person)
                vm.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active source status, nullification is prohibited';
                vm.nullifiedId = '';
                console.log('cannot nullify this row, because it is active');
            } else {
                vm.warningMessage = false;
                vm.nullifiedId = rowEntity.id || '';
            }
        }; //nullifyEntity

        vm.commitNullification = function() {
            PersonService.curatePerson(vm.toBeCurated).then(function(res) {
                // console.log('successful in curation: res is: ' + JSON.stringify(res));
                initCurationObj()
                vm.searchPeople();
                toastr.success('Curation was successful', 'Curated!');
            }).catch(function(err) {
                toastr.error('There was an error in curation', 'Curation error');
                console.log('error in curation, err is: ' + JSON.stringify(err));
            });
        }; //commitNullification


        activate();

        /****************************** implementations **************************/

        function activate() {
            prepareGidOptions();
            watchReadinessOfCuration();
            // vm.searchPeople();

        } //activate


        /**
         * callback function for sorting UI-Grid columns
         * @param grid
         * @param sortColumns
         */
        function sortChangedCallBack(grid, sortColumns) {

            if (sortColumns.length == 0) {
                //console.log("removing sorting");
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

            if (!vm.curationShown) {
                //if not on curation mode, do not show row selection
                row.isSelected = vm.curationShown;
                vm.gridApi.grid.refresh();
                return;
            }

            if (row.isSelected) {

                //console.log('row is selected: ' + JSON.stringify(row.entity));
                if (vm.selectedRows.length < 2) {
                    vm.selectedRows.unshift(row);
                } else {
                    var deselectedRow = vm.selectedRows.pop();
                    deselectedRow.isSelected = false;
                    vm.nullifiedId = deselectedRow.entity.id === vm.nullifiedId ? '' : vm.nullifiedId;
                    vm.selectedRows.unshift(row);
                    vm.gridApi.grid.refresh(); //refresh grid
                }
            } else {
                //de-select the row
                //remove it from the vm.selectedRows, if exists
                var needleIndex = -1;
                _.each(vm.selectedRows, function (existingRow, idx) {
                    if (existingRow.entity.id == row.entity.id) {
                        needleIndex = idx;
                        return;
                    }
                });

                if (needleIndex > -1) {
                    var deselectedRowArr = vm.selectedRows.splice(needleIndex, 1);
                    deselectedRowArr[0].isSelected = false;
                    //reset the nullifiedId if the row is de-selected
                    vm.nullifiedId = deselectedRowArr[0].entity.id === vm.nullifiedId ? '' : vm.nullifiedId;
                    vm.curationReady = false;

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
            $scope.$watch(function () { return vm.curationShown; }, function (newVal, oldVal) {
                vm.gridOptions.columnDefs[0].visible = newVal;
                if (newVal == false) {
                    //purge the container for rows to be curated when not on curation mode
                    while (vm.selectedRows.length > 0) {
                        // vm.selectedRows.pop().isSelected = false;
                        var deselectedRow = vm.selectedRows.pop();
                        deselectedRow.isSelected = false;
                        vm.nullifiedId = deselectedRow.entity.id == vm.nullifiedId ? '' : vm.nullifiedId;
                    }
                } else {
                    // initializations for curation
                    vm.selectedRows = [];
                    vm.nullifiedId = '';
                    vm.warningMessage = false;
                }
                vm.gridApi.grid.refresh();
            }, true);

        } //prepareGridOptions



        /**
         * watch the readiness of curation submission
         */
        function watchReadinessOfCuration() {
            $scope.$watch(function() {return vm.nullifiedId;}, function(curVal, preVal) {
                initCurationObj();
                vm.toBeCurated.id_to_be_nullified = vm.nullifiedId;
                if (vm.selectedRows.length == 2 && vm.nullifiedId) {
                    _.each(vm.selectedRows, function (curRow) {
                        if (curRow.entity.id != vm.nullifiedId) {
                            vm.toBeCurated['id_to_be_retained'] = curRow.entity.id;
                            return;
                        }
                    });
                }

                if (vm.toBeCurated.id_to_be_nullified && vm.toBeCurated.id_to_be_retained) {
                    vm.curationReady = true;
                }
                // console.log('nullified object: ' + JSON.stringify(vm.toBeCurated));
                // console.log('curationReady: ' + vm.curationReady);
            }, true);
        } //watchReadinessOfCuration


        /**
         * initialize curation object and curation ready status
         */
        function initCurationObj() {
            vm.toBeCurated = {'id_to_be_nullified': '', 'id_to_be_retained': ''};
            vm.curationReady = false;
            return;
        } //initCurationObj


    }

})();
