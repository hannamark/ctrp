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

    ctrpAdvancedPersonSearchForm.$inject = ['PersonService', 'Common', '$location', 'UserService', 'DateService',
            'uiGridConstants', '$timeout', '_', 'toastr', '$anchorScroll', 'OrgService', '$compile', 'MESSAGES', '$state'];


    function ctrpAdvancedPersonSearchForm(PersonService, Common, $location, uiGridConstants, UserService, DateService,
                                          $timeout,  _, toastr, $anchorScroll, OrgService, $compile, MESSAGES, $state) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showGrid: '=?',  //boolean, optional; default to false
                usedInModal: '=?', //boolean, optional; default to false
                maxRowSelectable : '=', //int, optional; if not not set, use MAX_VALUE -> can select all results
                curationMode: '=?', // boolean, optional; default to false unless maxRowSelectable is set to > 0
                personSearchResults: '@personSearchResults',
                selectedPersonsArray: '@selectedPersonsArray',
            },
            templateUrl: '/ctrp/ui/js/directives/person/advancedPersonSearchFormTemplate.html',
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
        
        
        
        function advPersonSearchDirectiveController($scope, uiGridConstants, UserService, DateService, OrgService, $state) {

            var fromStateName = $state.fromState.name || '';
            $scope.maxRowSelectable = $scope.maxRowSelectable == 'undefined' ? Number.MAX_VALUE : $scope.maxRowSelectable ; //default to MAX_VALUE
            $scope.searchParams = PersonService.getInitialPersonSearchParams();
            $scope.sourceContextArr = []; //sourceContextObj;
            $scope.sourceStatusArr = []; //sourceStatusObj;
            $scope.nullifiedId = '';
            $scope.warningMessage = '';
            $scope.selectedRows = [];
            $scope.curationShown = false;
            $scope.curationModeEnabled = false;
            $scope.dateFormat = DateService.getFormats()[1];
            // console.log('dateFormat: ' + $scope.dateFormat);
            $scope.dateOptions = DateService.getDateOptions();
            $scope.startDateOpened = ''; //false;
            $scope.endDateOpened = ''; // false;
            $scope.searchWarningMessage = '';



            //$scope.maxRowSelectable = $scope.maxRowSelectable == undefined ? 0 : $scope.maxRowSelectable; //default to 0
            //default to curationMode eanbled to true if max row selectable is > 0
            if ($scope.maxRowSelectable > 0) {
                $scope.curationModeEnabled = true;
            } else {
                $scope.curationModeEnabled = false;
            }

            //override the inferred curationModeEnabled if 'curationMode' attribute has been set in the directive
            $scope.curationModeEnabled = $scope.curationMode == undefined ? $scope.curationModeEnabled : $scope.curationMode;
            $scope.usedInModal = $scope.usedInModal == undefined ? false : $scope.usedInModal;
            $scope.showGrid = $scope.showGrid == undefined ? false : $scope.showGrid;


            $scope.searchPeople = function () {
                $scope.searchParams.date_range_arr = DateService.getDateRange($scope.searchParams.startDate, $scope.searchParams.endDate);
                if ($scope.searchParams.date_range_arr.length == 0) {
                    delete $scope.searchParams.date_range_arr;
                }

                //Checking to see if any search parameter was entered. If not, it should throw a warning to the user to select atleast one parameter.
                // Right now, ignoring the alias parameter as it is set to true by default. To refactor and look at default parameters instead of hardcoding -- radhika
                var isEmptySearch = true;
                var excludedKeys = ['sort', 'order','rows','start'];
                Object.keys($scope.searchParams).forEach(function (key) {
                    if(excludedKeys.indexOf(key) == -1 && $scope.searchParams[key] != '')
                        isEmptySearch = false;
                });
                if(isEmptySearch) {
                    $scope.searchWarningMessage = "Atleast one selection value must be entered prior to running the search";
                    $scope.warningMessage = ''; //hide the 0 rows message if no search parameter was supplied
                }else
                    $scope.searchWarningMessage = "";

                if(!isEmptySearch) { //skip searching if empty search
                    PersonService.searchPeople($scope.searchParams).then(function (data) {
                        if ($scope.showGrid && data.data.people) {
                            // console.log("received person search results: " + JSON.stringify(data.data.people));
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
                }
            }; //searchPeople


            $scope.getDateRange = function(range) {
                var today = new Date();
                switch (range) {
                    case 'today':
                        $scope.searchParams.startDate = today;
                        $scope.searchParams.endDate = today;;
                        break;
                    case 'yesterday':
                        $scope.searchParams.startDate = moment().add(-1, 'days').toDate();
                        $scope.searchParams.endDate = moment().add(-1, 'days').toDate();
                        break;
                    case 'last7':
                        $scope.searchParams.startDate = moment().add(-7, 'days').toDate();
                        $scope.searchParams.endDate = moment().add(0, 'days').toDate();
                        break;
                    case 'last30':
                        $scope.searchParams.startDate = moment().add(-30, 'days').toDate();
                        $scope.searchParams.endDate = moment().add(0, 'days').toDate();
                        break;
                    case 'thisMonth':
                        $scope.searchParams.startDate = moment([today.getFullYear(), today.getMonth()]).toDate();
                        $scope.searchParams.endDate = today;
                        break;
                    case 'lastMonth':
                        $scope.searchParams.startDate = moment([today.getFullYear(), today.getMonth()-1]).toDate();
                        $scope.searchParams.endDate = moment(today).subtract(1, 'months').endOf('month').toDate();
                        break;
                    default:
                        $scope.searchParams.startDate = '';
                        $scope.searchParams.endDate = '';
                }
            };





            $scope.typeAheadNameSearch = function () {
                var wildcardOrgName = $scope.searchParams.affiliated_org_name.indexOf('*') > -1 ? $scope.searchParams.affiliated_org_name : '*' + $scope.searchParams.affiliated_org_name + '*';

                return OrgService.searchOrgs({name: wildcardOrgName, source_context: "CTRP"}).then(function (res) {
                    var uniqueNames = [];
                    var orgNames = [];
                    orgNames = res.orgs.map(function (org) {
                        return org.name;
                    });

                    return uniqueNames = orgNames.filter(function (name) {
                        if (uniqueNames.indexOf(name) == -1) {
                            // console.log("not containing: " + name);
                            return name;
                        }
                    });
                });
            }; //typeAheadOrgNameSearch



            $scope.resetSearch = function () {
                // $scope.states.length = 0;
                $scope.searchParams = PersonService.getInitialPersonSearchParams();
                $scope.gridOptions.data = [];
                $scope.gridOptions.totalItems = null;
                Object.keys($scope.searchParams).forEach(function (key) {
                    $scope.searchParams[key] = '';
                });

                $scope.searchWarningMessage = '';
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
                    // warning to user for nullifying active entity
                    $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active source status, nullification is not allowed';
                    $scope.nullifiedId = '';
                    console.log('cannot nullify this row, because it is active');
                } else {
                    $scope.warningMessage = '';
                    $scope.nullifiedId = rowEntity.id || '';
                }
            }; //nullifyEntity

            $scope.commitNullification = function() {
                console.log('tobeCurated: ' + JSON.stringify($scope.toBeCurated));
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

                if (fromStateName != 'main.personDetail') {
                    $scope.resetSearch();
                } else {
                    $scope.searchPeople(); //refresh the search results
                }

                watchReadinessOfCuration();
                hideHyperLinkInModal();
                watchUserPrivilegeSelection();
                watchPrivilegeSubRoutine();
                // $scope.searchPeople();

            } //activate


            /**
             * Hide hyper link on names in modal
             */
            function hideHyperLinkInModal() {
                $scope.$watch('usedInModal', function (newVal, oldVal) {
                    //find the organization name index in the column definitions
                    var firstNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'fname');
                    var middleNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'mname');
                    var lastNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'lname');

                    if (newVal) {
                        //unlink the name if used in modal
                        if (firstNameIndex > -1) {
                            $scope.gridOptions.columnDefs[firstNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';

                            $scope.gridOptions.columnDefs[middleNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';

                            $scope.gridOptions.columnDefs[lastNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                                'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';
                        }
                    } else {
                        $scope.gridOptions.columnDefs[firstNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';

                        $scope.gridOptions.columnDefs[middleNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';

                        $scope.gridOptions.columnDefs[lastNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                            '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';
                    }
                });
            } //hideHyperLinkInModal


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

                if ($scope.maxRowSelectable > 0 && $scope.curationShown || $scope.usedInModal) {
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
                            $scope.$parent.selectedPersonsArray.push(row.entity);
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
                }; //toggleCurationMode



                //watcher for $scope.curationShown
                $scope.$watch('curationShown', function(newVal, oldVal) {
                    $scope.gridOptions.columnDefs[0].visible = $scope.curationShown;

                    if (newVal) {
                        // $scope.selectedRows = [];
                        //clearSelectedRows();
                        $scope.nullifiedId = '';
                        $scope.warningMessage = '';
                    } else {
                        var lastRow = clearSelectedRows();
                        if (!!lastRow) {
                            $scope.nullifiedId = lastRow.entity.id == $scope.nullifiedId ? '' : $scope.nullifiedId;
                        }
                    }


                    //$scope.$parent.selectedPersonsArray = []; //$scope.selectedRows;
                    if (newVal != oldVal) {
                        $scope.gridApi.grid.refresh();
                    }
                }, true);


            } //prepareGridOptions


            /**
             * Open calendar
             * @param $event
             * @param type
             */
            $scope.openCalendar = function ($event, type) {
               // $event.preventDefault();
                //$event.stopPropagation();

                if (type == "end") {
                    $scope.endDateOpened = true;// !$scope.endDateOpened;
                } else {
                    $scope.startDateOpened = true;// !$scope.startDateOpened;
                }
            }; //openCalendar

            /*
            $scope.$watch('searchParams.endDate', function(newVal, oldVal) {
                console.log(JSON.stringify($scope.searchParams.endDate));
                console.log($scope.searchParams.endDate.getMonth());
                console.log(moment(newVal).format("YYYY-MM-DD HH:mm:ss"));
//                console.log($scope.searchParams.endDate.isBefore($scope.searchParams.startDate));
                console.log(DateService.getDateRange($scope.searchParams.startDate, $scope.searchParams.endDate));
            }, true);
            */



            /**
             * watch the readiness of curation submission, default max row selection: 2
             */
            function watchReadinessOfCuration() {
                $scope.$watch('nullifiedId', function(curVal, preVal) {
                    initCurationObj();
                    $scope.toBeCurated.id_to_be_nullified = $scope.nullifiedId;
                    if ($scope.selectedRows.length == $scope.maxRowSelectable && $scope.nullifiedId) {
                        _.each($scope.selectedRows, function (curRow) {
                            if (curRow.entity.id == $scope.nullifiedId) {
                                $scope.nullifiedPerson = curRow.entity.lname + ', ' + curRow.entity.fname + ' ( ' + curRow.entity.id + ' )';
                            } else {
                                $scope.toBeCurated['id_to_be_retained'] = curRow.entity.id;
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
                if (angular.isDefined($scope.$parent.selectedPersonsArray)) {
                    $scope.$parent.selectedPersonsArray = [];
                }

                return deselectedRow;
            }


            function watchUserPrivilegeSelection() {
                $scope.$on(MESSAGES.PRIVILEGE_CHANGED, function() {
                   // console.log('privilege: ' + userPrivilege);
                    watchPrivilegeSubRoutine();
                });
            }

            function watchPrivilegeSubRoutine() {
                var userPrivilege = UserService.getPrivilege();
                $scope.curationShown = userPrivilege == 'CURATOR' ? true : false;
            }

        } //advPersonSearchDirectiveController

    }


})();