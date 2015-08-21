/**
 * Created by wangg5 on 8/21/15.
 */


(function () {

    'use strict';

    angular.module('ctrpApp')
        .directive('ctrpAdvancedPersonSearchForm', ctrpAdvancedPersonSearchForm);

    ctrpAdvancedPersonSearchForm.$inject = ['PersonService', 'Common', '$location',
            'uiGridConstants', '$timeout', '_', 'toastr', '$anchorScroll', 'OrgService', '$compile'];


    function ctrpAdvancedPersonSearchForm(PersonService, Common, $location, uiGridConstants,
                                          $timeout,  _, toastr, $anchorScroll, OrgService, $compile) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showgrid: '=',  //boolean
                //enablerowselection: '=',  //boolean
                maxRowSelectable : '=', //int
                isInModal: '=',  //boolean
                personSearchResults: '@personSearchResults',
                selectedPersonsArray: '@selectedPersonsArray',
            },
            templateUrl: '/ctrp/angular/js/directives/advancedPersonSearchFormTemplate.html',
            link: linkFn,
            controller: advPersonSearchDirectiveController
        };

        return directiveObj;
        
        
        function linkFn(scope, element, attrs) {

            //element.text('hello replaced text!');
            console.log('isUsedInModal: ' + attrs.isInModal);
            //pass to controller scope, but will require a timeout in controller - inconvenient
            // scope.isInModal = attrs.isInModal; //
            $compile(element.contents())(scope);
            
        } //linkFn
        
        
        
        function advPersonSearchDirectiveController($scope, $timeout, uiGridConstants, OrgService) {

            console.log('$scope.isInModal: ' + $scope.isInModal);
            console.log('maxRowSelectable: ' + $scope.maxRowSelectable);

            $scope.maxRowSelectable = $scope.maxRowSelectable || 0; //default to 0
            $scope.searchParams = PersonService.getInitialPersonSearchParams();
            $scope.sourceContextArr = []; //sourceContextObj;
            $scope.sourceContextArr.sort(Common.a2zComparator());
            $scope.sourceStatusArr = []; //sourceStatusObj;
            $scope.sourceStatusArr.sort(Common.a2zComparator());
            $scope.nullifiedId = '';
            $scope.warningMessage = false;

            $scope.selectedRows = [];
            console.log('received sourceStatusArr: ' + JSON.stringify($scope.sourceStatusArr));


            $scope.searchPeople = function () {
                // $scope.searchParams.name = $scope.searchParams.name || "*";
                //console.log("searching params: " + JSON.stringify($scope.searchParams));
                PersonService.searchPeople($scope.searchParams).then(function (data) {
                    //  console.log("received search results: " + JSON.stringify(data.data));
                    $scope.gridOptions.data = data.data.people;
                    $scope.gridOptions.totalItems = data.data.total;
                    //pin the selected rows, if any, at the top of the results
                    _.each($scope.selectedRows, function(curRow, idx) {
                        var ctrpId = curRow.entity.id;
                        var indexOfCurRowInGridData = Common.indexOfObjectInJsonArray($scope.gridOptions.data, 'id', ctrpId);
                        if (indexOfCurRowInGridData > -1) {
                            $scope.gridOptions.data.splice(indexOfCurRowInGridData, 1);
                            $scope.gridOptions.totalItems--;
                        }
                        $scope.gridOptions.data.unshift(curRow.entity);
                        $scope.gridOptions.totalItems++;

                    });
                    // $scope.gridApi.grid.refresh();
                    $location.hash('people_search_results');
                    $anchorScroll();
                }).catch(function (err) {
                    console.log('search people failed');
                });
            }; //searchPeople


            $scope.resetSearch = function () {
                // $scope.states.length = 0;
                $scope.searchParams = PersonService.getInitialPersonSearchParams();
                $scope.gridOptions.data.length = 0;
                $scope.gridOptions.totalItems = null;
                Object.keys($scope.searchParams).forEach(function (key) {
                    $scope.searchParams[key] = '';
                });
            }; //resetSearch

            $scope.curationShown = false;

            $scope.nullifyEntity = function (rowEntity) {
                // console.log("chosen to nullify the row: " + JSON.stringify(rowEntity));
                if (rowEntity.source_status && rowEntity.source_status.indexOf('Act') > -1) {
                    //TODO: warning to user for nullifying active entity
                    //cannot nullify Active entity (e.g. person)
                    $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active source status, nullification is not allowed';
                    $scope.nullifiedId = '';
                    console.log('cannot nullify this row, because it is active');
                } else {
                    $scope.warningMessage = false;
                    $scope.nullifiedId = rowEntity.id || '';
                }
            }; //nullifyEntity

            $scope.commitNullification = function() {

                PersonService.curatePerson($scope.toBeCurated).then(function(res) {
                    // console.log('successful in curation: res is: ' + JSON.stringify(res));
                    initCurationObj();
                    clearSelectedRows();
                    $scope.searchPeople();
                    toastr.success('Curation was successful', 'Curated!');
                }).catch(function(err) {
                    toastr.error('There was an error in curation', 'Curation error');
                    console.log('error in curation, err is: ' + JSON.stringify(err));
                });
            }; //commitNullification


            activate();

            /****************************** implementations **************************/

            function activate() {
                getPromisedData();
                prepareGidOptions();
                watchReadinessOfCuration();
                // $scope.searchPeople();

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
                    $scope.searchParams.sort = '';
                    $scope.searchParams.order = '';
                } else {
                    $scope.searchParams.sort = sortColumns[0].name; //sort the column
                    switch (sortColumns[0].sort.direction) {
                        case uiGridConstants.ASC:
                            $scope.searchParams.order = 'ASC';
                            break;
                        case uiGridConstants.DESC:
                            $scope.searchParams.order = 'DESC';
                            break;
                        case undefined:
                            break;
                    }
                }

                //do the search with the updated sorting
                $scope.searchPeople();
            }; //sortChangedCallBack


            /**
             * callback for handling row selection
             * @param row
             */
            function rowSelectionCallBack(row) {

                if (!$scope.curationShown) {
                    //if not on curation mode, do not show row selection
                    row.isSelected = $scope.curationShown;
                    $scope.gridApi.grid.refresh();
                    return;
                }

                if (row.isSelected) {

                    //console.log('row is selected: ' + JSON.stringify(row.entity));
                    if ($scope.selectedRows.length < $scope.maxRowSelectable) {
                        $scope.selectedRows.unshift(row);
                    } else {
                        var deselectedRow = $scope.selectedRows.pop();
                        deselectedRow.isSelected = false;
                        $scope.nullifiedId = deselectedRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                        $scope.selectedRows.unshift(row);
                        $scope.gridApi.grid.refresh(); //refresh grid
                    }
                } else {
                    //de-select the row
                    //remove it from the $scope.selectedRows, if exists
                    var needleIndex = -1;
                    _.each($scope.selectedRows, function (existingRow, idx) {
                        if (existingRow.entity.id == row.entity.id) {
                            needleIndex = idx;
                            return;
                        }
                    });

                    if (needleIndex > -1) {
                        var deselectedRowArr = $scope.selectedRows.splice(needleIndex, 1);
                        deselectedRowArr[0].isSelected = false;
                        //reset the nullifiedId if the row is de-selected
                        $scope.nullifiedId = deselectedRowArr[0].entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                        $scope.curationReady = false;

                    }
                }

            } //rowSelectionCallBack



            function getPromisedData() {

                OrgService.getSourceContexts().then(function(data) {
                   console.log('source context array: ' + JSON.stringify(data));
                    $scope.sourceContextArr = data.sort(Common.a2zComparator());
                });

                OrgService.getSourceStatuses().then(function(data) {
                   console.log('source status array: ' + JSON.stringify(data));
                    $scope.sourceStatusArr = data.sort(Common.a2zComparator());
                });


            } //getPromisedData



            /**
             * Watch the curation switch to turn on/off the curation choices
             */
            function prepareGidOptions() {
                //ui-grid plugin options
                $scope.gridOptions = PersonService.getGridOptions();
                $scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
                    $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.searchParams.start = newPage;
                        $scope.searchParams.rows = pageSize;
                        $scope.searchPeople();
                    });

                    $scope.gridApi.selection.on.rowSelectionChanged($scope, rowSelectionCallBack);
                    $scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                        _.each(rows, function (row, index) {
                            rowSelectionCallBack(row);
                        });

                    }); //rowSelectionChangedBatch

                }; //gridOptions

                //watch the curation switch button to turn on/off the curation choices
                $scope.$watch('curationShown', function (newVal, oldVal) {
                    $scope.gridOptions.columnDefs[0].visible = newVal;
                    if (newVal == false) {
                        //purge the container for rows to be curated when not on curation mode
                        var lastRow = clearSelectedRows();
                        if (!!lastRow) {
                            $scope.nullifiedId = lastRow.entity.id == $scope.nullifiedId ? '' : $scope.nullifiedId;
                        }

                    } else {
                        // initializations for curation
                        $scope.selectedRows = [];
                        $scope.nullifiedId = '';
                        $scope.warningMessage = false;
                    }
                    $scope.gridApi.grid.refresh();
                }, true);

            } //prepareGridOptions



            /**
             * watch the readiness of curation submission
             */
            function watchReadinessOfCuration() {
                $scope.$watch('nullifiedId', function(curVal, preVal) {
                    initCurationObj();
                    $scope.toBeCurated.id_to_be_nullified = $scope.nullifiedId;
                    if ($scope.selectedRows.length == 2 && $scope.nullifiedId) {
                        _.each($scope.selectedRows, function (curRow) {
                            if (curRow.entity.id != $scope.nullifiedId) {
                                $scope.toBeCurated['id_to_be_retained'] = curRow.entity.id;
                                return;
                            }
                        });
                    }

                    if ($scope.toBeCurated.id_to_be_nullified && $scope.toBeCurated.id_to_be_retained) {
                        $scope.curationReady = true;
                    }
                    // console.log('nullified object: ' + JSON.stringify($scope.toBeCurated));
                    // console.log('curationReady: ' + $scope.curationReady);
                }, true);
            } //watchReadinessOfCuration


            /**
             * initialize curation object and curation ready status
             */
            function initCurationObj() {
                $scope.toBeCurated = {'id_to_be_nullified': '', 'id_to_be_retained': ''};
                $scope.curationReady = false;
                return;
            } //initCurationObj


            /**
             * clear up the selectedRows array,
             * @returns {*} the last row being cleared, empty array
             */
            function clearSelectedRows() {
                var deselectedRow = null;
                while ($scope.selectedRows.length > 0) {
                    deselectedRow = $scope.selectedRows.shift();
                    deselectedRow.isSelected = false;
                }

                return deselectedRow;
            }

        } //advPersonSearchDirectiveController

    }


})();