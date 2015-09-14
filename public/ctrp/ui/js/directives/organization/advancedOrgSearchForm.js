/**
 * *******************************************************************************************
 * This directive is obsolete as of 9/10/2015, which is superseded by advancedOrgSearchForm2 *
 * *******************************************************************************************
 *
 * Created by wangg5 on 8/6/15.
 *
 * Reusable advanced organization search form,
 *
 * Feeds the organization search results to the container scope with the variable
 * name 'orgSearchResults' *
 *
 */
(function () {

    'use strict';

    angular.module('ctrpApp')
        .directive('ctrpAdvancedOrgSearchForm', ctrpAdvancedOrgSearchForm);

    ctrpAdvancedOrgSearchForm.$inject = ['OrgService', 'GeoLocationService', 'Common', '$location',
        'MESSAGES', 'uiGridConstants', '$timeout', '_', 'toastr','$anchorScroll', '$compile', '$log'];

    function ctrpAdvancedOrgSearchForm(OrgService, GeoLocationService, Common, $location, $log,
                                       MESSAGES, uiGridConstants, $timeout, _, toastr, $anchorScroll, $compile) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showgrid: '=',  //boolean
                enablerowselection: '=',  //boolean
                usedinmodal: '=',  //boolean
                orgSearchResults: '@orgSearchResults',
                selectedOrgsArray: '@selectedOrgsArray',
            },
            templateUrl: '/ctrp/ui/js/directives/organization/advancedOrgSearchFormTemplate.html',
            link: linkFn,
            controller: orgSearchController
        };

        return directiveObj;

        //$scope.selectedRows = [];

        /**************** implementations below ******************/

        function linkFn(scope, element, attrs, controller) {
            // element.text('this is the advanced search form');
            console.log('showgrid: ' + scope.showgrid);
            console.log('enablerowselection: ' + scope.enablerowselection);
            // scope.enablerowselection = attrs.enablerowselection || false;
            // $compile(element.contents())(scope);

        } //linkFn


        function orgSearchController($scope, $log) {
            $log.warn('ctrpAdvancedOrgSearchForm has been deprecated, please use ctrpAdvancedOrgSearchForm2');
            $scope.searchParams = OrgService.getInitialOrgSearchParams();
            $scope.watchCountrySelection = OrgService.watchCountrySelection();
            $scope.curationShown = false;
            $scope.selectedRows=[];
            $scope.nullifiedId = '';
            $scope.warningMessage = false;
            activate();

            function activate() {
                getPromisedData();
                listenToStatesProvinces();
                prepareGidOptions();
                watchCurationShown();
                watchReadinessOfCuration();
            } //activate

            //ui-grid plugin options
            //$scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
            //$scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
            //$scope.enablerowselection = false;

           /*
           //watch the curation switch button to turn on/off the curation choices
            */


            $scope.$watch('usedinmodal', function (newVal, oldVal) {
                // $scope.resetSearch();
                //find the organization name index in the column definitions
                var orgNameIndex = Common.indexOfObjectInJsonArray($scope.gridOptions.columnDefs, 'name', 'name');
                if (newVal) {
                    //unlink the name if used in modal
                    if (orgNameIndex > -1) {
                        $scope.gridOptions.columnDefs[orgNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" ' +
                            'title="{{COL_FIELD}}">{{COL_FIELD CUSTOM_FILTERS}}</div>';
                    }
                } else {
                    // $scope.gridOptions = OrgService.getGridOptions();
                    $scope.gridOptions.columnDefs[orgNameIndex].cellTemplate = '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                        '<a ui-sref="main.orgDetail({orgId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>';
                   //make visible if it is not in modal and curator mode is off.

                }
            });
            function prepareGidOptions() {
                $scope.gridOptions = OrgService.getGridOptions();
                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
                    $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        $scope.searchParams.start = newPage;
                        $scope.searchParams.rows = pageSize;
                        $scope.searchOrgs();
                    });

                    gridApi.selection.on.rowSelectionChanged($scope, rowSelectionCallBack);
                    gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                        _.each(rows, function (row, index) {
                            rowSelectionCallBack(row);
                        });
                    });
                }; //gridOptions

            }

            $scope.resetSearch = function () {
                // $scope.states.length = 0;
                $scope.searchParams = OrgService.getInitialOrgSearchParams();
                Object.keys($scope.searchParams).forEach(function(key, index) {
                    if (key != 'alias') {
                        $scope.searchParams[key] = '';
                    } else {
                        $scope.searchParams['alias'] = true;
                    }
                });
                // $scope.searchOrgs();
                $scope.$parent.orgSearchResults = {};
                $scope.gridOptions.data = [];
                $scope.gridOptions.totalItems = null;
            }; //resetSearch


            function getPromisedData() {
                //get source contexts
                OrgService.getSourceContexts().then(function (contexts) {
                    //console.log("received contexts: " + JSON.stringify(contexts));
                    contexts.sort(Common.a2zComparator());
                    $scope.sourceContexts = contexts;
                });

                //get source statuses
                OrgService.getSourceStatuses().then(function (statuses) {
                    //console.log("received statuses: " + JSON.stringify(statuses));
                    statuses.sort(Common.a2zComparator());
                    $scope.sourceStatuses = statuses;
                });

                //get countries
                GeoLocationService.getCountryList().then(function (countries) {
                    // countries.sort(Common.a2zComparator());
                    $scope.countries = countries;
                });
            } //getPromisedData


            /**
             * Listen to the message for availability of states or provinces
             * for the selected country
             */
            function listenToStatesProvinces() {
                $scope.watchCountrySelection($scope.searchParams.country);

                //country change triggers searchOrgs() function
                $scope.$watch('searchParams.country', function (newVal, oldVal) {
                    if (oldVal != newVal) {
                        $scope.searchOrgs();
                    }
                }, true);

                $scope.$on(MESSAGES.STATES_AVAIL, function () {
                    //console.log("states available for country: " + $scope.searchParams.country);
                    $scope.states = OrgService.getStatesOrProvinces();
                });

                $scope.$on(MESSAGES.STATES_UNAVAIL, function () {
                    $scope.states = [];
                });
            }  //listenToStatesProvinces


            /**
             * callback function for sorting UI-Grid columns
             * @param grid
             * @param sortColumns
             */
            function sortChangedCallBack(grid, sortColumns) {

                if (sortColumns.length == 0) {
                    console.log("removing sorting");
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
                $scope.searchOrgs();
            }; //sortChangedCallBack


            function rowSelectionCallBack(row) {
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    if (row.isSelected) {
                        $scope.$parent.selectedOrgsArray.push(row.entity);
                    } else {
                        var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedOrgsArray, row.entity);
                        $scope.$parent.selectedOrgsArray.splice(curRowSavedIndex, 1);
                    }
                }


                /*
                if (!$scope.curationShown) {
                    //if not on curation mode, do not show row selection
                    row.isSelected = $scope.curationShown;
                    $scope.gridApi.grid.refresh();
                    return;
                }
                */


                if (!$scope.curationShown && !$scope.usedinmodal) {
                                      //if not on curation mode, do not show row selection
                                     row.isSelected = $scope.curationShown;
                                     $scope.gridApi.grid.refresh();
                                        return;
                }

                if (!$scope.curationShown && $scope.usedinmodal) {
                    //if not on curation mode, do not show row selection
                    row.isSelected = true;
                    $scope.gridApi.grid.refresh();
                    return;
                }

                if (row.isSelected) {

                    //console.log('row is selected: ' + JSON.stringify(row.entity));
                    if ($scope.selectedRows.length < 2) {
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
                    //remove it from the vm.selectedRows, if exists
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


            $scope.searchOrgs = function () {
                OrgService.searchOrgs($scope.searchParams).then(function (data) {
                    // console.log("received data for org search: " + JSON.stringify(data));
                    if ($scope.showgrid && data.orgs) {
                        $scope.gridOptions.data = data.orgs;
                        $scope.gridOptions.totalItems = data.total;
                        $scope.gridHeight = $scope.gridOptions.rowHeight * (data.orgs.length + 1);

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


                        $location.hash('org_search_results');
                        $anchorScroll();
                    }
                    $scope.$parent.orgSearchResults = data; //{orgs: [], total, }
                    // console.log($scope.$parent);

                }).catch(function (error) {
                    console.log("error in retrieving orgs: " + JSON.stringify(error));
                });
            }; //searchOrgs


            $scope.nullifyEntity = function (rowEntity) {
                // console.log("chosen to nullify the row: " + JSON.stringify(rowEntity));
                var isActive = rowEntity.source_status && rowEntity.source_status.indexOf('Act') > -1;
                var isNullified = rowEntity.source_status && rowEntity.source_status.indexOf('Nul') > -1;
                if (isNullified || isActive) {
                    //TODO: warning to user for nullifying active entity
                    //cannot nullify Active entity (e.g. person)
                    if(isActive)
                    $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' has an Active source status, nullification is prohibited';
                    else
                        $scope.warningMessage = 'The PO ID: ' + rowEntity.id + ' was nullified already, nullification is prohibited';
                    $scope.nullifiedId = '';
                    console.log('cannot nullify this row, because it is active');
                } else {
                    $scope.warningMessage = false;
                    $scope.nullifiedId = rowEntity.id || '';
                }
            }; //nullifyEntity

           $scope.commitNullification = function() {

                OrgService.curateOrg($scope.toBeCurated).then(function(res) {
                    // console.log('successful in curation: res is: ' + JSON.stringify(res));
                    initCurationObj()
                    $scope.searchOrgs();
                    toastr.success('Curation was successful', 'Curated!');
                }).catch(function(err) {
                    toastr.error('There was an error in curation', 'Curation error');
                    console.log('error in curation, err is: ' + JSON.stringify(err));
                });

            }; //commitNullification

            $scope.toggleCustom = function() {
                $scope.curationShown = !$scope.curationShown;
            };


            /**
             * Watch curationShown for dynamically adjusting the ui-grid
             */
            function watchCurationShown() {
                $scope.$watch('curationShown', function(newVal) {

                   $scope.gridOptions.columnDefs[0].visible = newVal;
                   if (newVal) {
                       //purge the container for rows to be curated when not on curation mode
                       while ($scope.selectedRows.length > 0) {
                           //alert('len '+$scope.selectedRows.length);
                           // vm.selectedRows.pop().isSelected = false;
                           var deselectedRow = $scope.selectedRows.pop();
                           deselectedRow.isSelected = false;
                           $scope.nullifiedId = deselectedRow.entity.id == $scope.nullifiedId ? '' : $scope.nullifiedId;
                       }
                   } else {
                       // initializations for curation
                       $scope.selectedRows = [];
                       $scope.nullifiedId = '';
                       $scope.warningMessage = false;
                   }
                   $scope.gridApi.grid.refresh();
                });
            }


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
                    // console.log('nullified object: ' + JSON.stringify(vm.toBeCurated));
                    // console.log('curationReady: ' + vm.curationReady);
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
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    $scope.$parent.selectedOrgsArray = [];
                }

                return deselectedRow;
            }



        } //orgSearchController


    } //ctrpAdvancedOrgSearchForm


})();