/**
 * Created by wangg5 on 8/21/15.
 *
 * Directive component for showing advanced person search form
 *
 * Usage example: show the results in the ui-grid, allows max row slection to 2, and curationMode is false
 *
 * @show-grid, @curation-mode are optional, defaulted to false
 * @max-row-seletable is required (integer), if not set explicitly --> it is defaulted to 0
 *
 * <div class="row">
 *   <ctrp-advanced-person-search-form show-grid="true" max-row-selectable="2" curation-mode="false"></ctrp-advanced-person-search-form>
 *  </div>
 *
 ***********************************************************************************************************************
 * If the container scope of this directive needs to access the person search results and/or the selected persons,     *
 * initialize personSearchResults to JSON object {} and selectedPersonsArray to array [] in the container scope, e.g.  *
 *                                                                                                                     *
 * $scope.personSearchResults = {};                                                                                    *
 * $scope.selectedPersonsArray = [];                                                                                   *
 *                                                                                                                     *
 * *********************************************************************************************************************
 *
 *
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
                showGrid: '=?',  //boolean, optional; default to false
                maxRowSelectable : '=', //int, required!
                curationMode: '=?', // boolean, optional; default to false unless maxRowSelectable is set to > 0
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
            // console.log('isUsedInModal: ' + attrs.isInModal);
            // console.log('curationMode enabled: ' + attrs.curationModeEnabled)
            //pass to controller scope, but will require a timeout in controller - inconvenient
            // scope.isInModal = attrs.isInModal; //
            $compile(element.contents())(scope);
            
        } //linkFn
        
        
        
        function advPersonSearchDirectiveController($scope) {

            console.log('showGrid: ' + $scope.showGrid);

            $scope.maxRowSelectable = $scope.maxRowSelectable || 0; //default to 0
            $scope.searchParams = PersonService.getInitialPersonSearchParams();
            $scope.sourceContextArr = []; //sourceContextObj;
            $scope.sourceContextArr.sort(Common.a2zComparator());
            $scope.sourceStatusArr = []; //sourceStatusObj;
            $scope.sourceStatusArr.sort(Common.a2zComparator());
            $scope.nullifiedId = '';
            $scope.warningMessage = false;
            $scope.selectedRows = [];
            $scope.curationShown = false;
            $scope.curationModeEnabled = false;

            $scope.maxRowSelectable = $scope.maxRowSelectable == undefined ? 0 : $scope.maxRowSelectable; //default to 0
            //default to curationMode eanbled to true if max row selectable is > 0
            if ($scope.maxRowSelectable > 0) {
                $scope.curationModeEnabled = true;
            }

            console.log('maxRowSelectable: ' + $scope.maxRowSelectable);

            //override the inferred curationModeEnabled if 'curationMode' attribute has been set in the directive
            $scope.curationModeEnabled = $scope.curationMode == undefined ? $scope.curationModeEnabled : $scope.curationMode;
            $scope.showGrid = $scope.showGrid == undefined ? false : $scope.showGrid;


            $scope.searchPeople = function () {
                // $scope.searchParams.name = $scope.searchParams.name || "*";
                //console.log("searching params: " + JSON.stringify($scope.searchParams));
                PersonService.searchPeople($scope.searchParams).then(function (data) {
                    if ($scope.showGrid && data.data.people) {
                        //  console.log("received search results: " + JSON.stringify(data.data));
                        $scope.gridOptions.data = data.data.people;
                        $scope.gridOptions.totalItems = data.data.total;
                        //pin the selected rows, if any, at the top of the results
                        _.each($scope.selectedRows, function (curRow, idx) {
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
                    }
                    $scope.$parent.personSearchResults = data.data; //{people: [], total, }
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

                if (angular.isDefined($scope.$parent.personSearchResults)) {
                    $scope.$parent.personSearchResults = {};
                }
                if (angular.isDefined($scope.$parent.selectedPersonsArray)) {
                    $scope.$parent.selectedPersonsArray = [];
                }
            }; //resetSearch


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

                if ($scope.maxRowSelectable && $scope.maxRowSelectable > 0) {
                    //TODO: logic for selecting/deselecting rows visually, and control the selectedRows array
                    if (row.isSelected) {
                        //console.log('row is selected: ' + JSON.stringify(row.entity));
                        if ($scope.selectedRows.length < $scope.maxRowSelectable) {
                            $scope.selectedRows.unshift(row);
                            $scope.$parent.selectedPersonsArray.push(row.entity);
                        } else {
                            var deselectedRow = $scope.selectedRows.pop();
                            deselectedRow.isSelected = false;
                            $scope.nullifiedId = deselectedRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                            $scope.selectedRows.unshift(row);
                            $scope.gridApi.grid.refresh(); //refresh grid

                            var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedPersonsArray, deselectedRow.entity);
                            $scope.$parent.selectedPersonsArray.splice(curRowSavedIndex, 1);
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
                        var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedPersonsArray, row.entity);
                        $scope.$parent.selectedPersonsArray.splice(curRowSavedIndex, 1);
                    }
                } else {
                    row.isSelected = false; //do not show selection visually
                }

            } //rowSelectionCallBack



            function getPromisedData() {

                OrgService.getSourceContexts().then(function(data) {
                    $scope.sourceContextArr = data.sort(Common.a2zComparator());
                });

                OrgService.getSourceStatuses().then(function(data) {
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


                /**
                 * toggle the curation mode (on/off)
                 */
                $scope.toggleCurationMode = function() {
                    $scope.curationShown = !$scope.curationShown;
                    $scope.gridOptions.columnDefs[0].visible = $scope.curationShown;

                    if ($scope.curationShown == false) {
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
                     $scope.$parent.selectedPersonsArray = []; //$scope.selectedRows;
                    $scope.gridApi.grid.refresh();
                }; //toggleCurationMode


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
                //TODO: clear the $parent's scope data

                return deselectedRow;
            }

        } //advPersonSearchDirectiveController

    }


})();