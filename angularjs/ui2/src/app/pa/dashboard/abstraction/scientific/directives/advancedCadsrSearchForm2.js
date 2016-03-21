
(function () {

    'use strict';

    angular.module('ctrp.app.pa')
        .directive('ctrpAdvancedCadsrSearchForm2', ctrpAdvancedCadsrSearchForm2);

    ctrpAdvancedCadsrSearchForm2.$inject = ['OrgService','CadsrService', 'GeoLocationService', 'Common', '$state',
        'MESSAGES', 'uiGridConstants', '_', 'toastr', '$compile', 'UserService','DateService'];

    function ctrpAdvancedCadsrSearchForm2(OrgService,   CadsrService, GeoLocationService, Common, $state,
                                        MESSAGES, uiGridConstants, _, toastr, $compile, UserService,DateService) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showGrid: '=?', //boolean, optional
                usedInModal: '=?', //boolean, option
                maxRowSelectable: '=', //int, required
                curationMode: '=?',
                orgSearchResults: '@orgSearchResults',
                selectedOrgsArray: '@selectedOrgsArray'
            },
            templateUrl: 'app/pa/dashboard/abstraction/scientific/directives/advancedCadsrSearchFormTemplate2.html',
            link: linkFn,
            controller: ctrpAdvancedCadsrSearchController
        };

        return directiveObj;

        /************************* implementations below *******************************/

        function linkFn(scope, element, attrs) {
            // $compile(element.contents())(scope);
        } //linkFn

        //_, $anchorScroll,
        function ctrpAdvancedCadsrSearchController($scope) {

            var fromStateName = $state.fromState.name || '';
            var curStateName = $state.$current.name || '';
            $scope.searchParams = CadsrService.getInitialCadsrSearchParams();
            $scope.searchParams.query_text="1";

            $scope.selectedRows = [];

            $scope.nullifiedId = '';
            $scope.warningMessage = '';
            $scope.curationShown = false;
            $scope.curationModeEnabled = false;
            $scope.searchWarningMessage = '';

            $scope.searching = false;



            $scope.maxRowSelectable = $scope.maxRowSelectable === 'undefined' ? Number.MAX_VALUE : $scope.maxRowSelectable;
            if ($scope.maxRowSelectable > 0) {
                $scope.curationModeEnabled = true;
            } else {
                $scope.curationModeEnabled = false;
            }
            //override the inferred curationModeEnabled if 'curationMode' attribute has been set in the directive
            $scope.curationModeEnabled = $scope.curationMode === 'undefined' ? $scope.curationModeEnabled : $scope.curationMode;
            $scope.usedInModal = $scope.usedInModal === 'undefined' ? false : $scope.usedInModal;
            $scope.showGrid = $scope.showGrid === 'undefined' ? false : $scope.showGrid;


            $scope.typeAheadNameSearch = function () {
                var wildcardOrgName = $scope.searchParams.name.indexOf('*') > -1 ? $scope.searchParams.name : '*' + $scope.searchParams.name + '*';
                //search context: 'CTRP', to avoid duplicate names
                var queryObj = {
                    name: wildcardOrgName,
                    source_context: 'CTRP',
                    source_status: 'Active'
                };
                //for trial-related org search, use only 'Active' source status
                if (curStateName.indexOf('trial') === -1) {
                    delete queryObj.source_status;
                }
                return OrgService.searchOrgs(queryObj).then(function(res) {
                    //remove duplicates
                    var uniqueNames = [];
                    var orgNames = [];
                    orgNames = res.orgs.map(function (org) {
                        return org.name;
                    });

                    return uniqueNames = orgNames.filter(function (name) {
                        return uniqueNames.indexOf(name) === -1;
                    });
                });
            }; //typeAheadNameSearch


            /* searchOrgs */
            $scope.searchCadsrs = function (newSearchFlag) {

                if (newSearchFlag === 'fromStart') {
                    $scope.searchParams.start = 1;
                }
                // console.log("In searchOrgs " + JSON.stringify($scope.searchParams));

                //Checking to see if any search parameter was entered. If not, it should throw a warning to the user to select atleast one parameter.
                // Right now, ignoring the alias parameter as it is set to true by default. To refactor and look at default parameters instead of hardcoding -- radhika
                var isEmptySearch = true;
                var ignoreKeys = ['rows', 'alias', 'start','wc_search'];

                _.keys($scope.searchParams).forEach(function (key) {

                    if(ignoreKeys.indexOf(key) === -1 && $scope.searchParams[key] != '')
                        isEmptySearch = false;
                });
                if(isEmptySearch && newSearchFlag === 'fromStart') {
                    $scope.searchWarningMessage = "At least one selection value must be entered prior to running the search";
                } else {
                    $scope.searchWarningMessage = "";
                }



                if(!isEmptySearch) {
                    $scope.searching = true;


                    CadsrService.searchCadsrs($scope.searchParams).then(function (data) {
                        if ($scope.showGrid && data.cadsr_markers) {
                            $scope.gridOptions.data = data.cadsr_markers;
                            $scope.gridOptions.totalItems = data.total;

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
                        }
                        $scope.$parent.orgSearchResults = data; //{orgs: [], total, }
                        // console.log($scope.$parent);

                    }).catch(function (error) {
                        console.log("error in retrieving orgs: " + JSON.stringify(error));
                    }).finally(function() {
                        console.log('search finished');
                        $scope.searching = false;
                    });
                }
            }; //searchOrgs


            /* resetSearch */
            $scope.resetSearch = function () {
                $scope.searchParams = OrgService.getInitialOrgSearchParams();
                var excludedKeys = ['alias','wc_search'];
                Object.keys($scope.searchParams).forEach(function (key) {

                    if (excludedKeys.indexOf(key) === -1) {
                        // $scope.searchParams[key] = '';
                        $scope.searchParams[key] = angular.isArray($scope.searchParams[key]) ? [] : '';
                    }

                });

                $scope.searchParams['alias'] = true;
                $scope.searchParams['wc_search'] = true;
                // $scope.searchOrgs();
                $scope.$parent.orgSearchResults = {};
                $scope.gridOptions.data = [];
                $scope.gridOptions.totalItems = null;
                $scope.searchWarningMessage = '';

                if (angular.isDefined($scope.$parent.orgSearchResults)) {
                    $scope.$parent.orgSearchResults = {};
                }
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    $scope.$parent.selectedOrgsArray = [];
                }
            }; //resetSearch




            $scope.rowFormatter = function( row ) {
                if (!$scope.usedInModal) {
                    var isCTEPContext = row.entity.source_context && row.entity.source_context.indexOf('CTEP') > -1;
                    return isCTEPContext;
                } else {
                    return false;
                }
            };



            activate();

            function activate() {
                prepareGidOptions();

                if (fromStateName != 'main.orgDetail') {
                    $scope.resetSearch();
                } else {
                   $scope.searchOrgs(); //refresh search results
                }
                hideHyperLinkInModal();
            }







            /**
             * callback function for sorting UI-Grid columns
             * @param grid
             * @param sortColumns
             */
            function sortChangedCallBack(grid, sortColumns) {

                if (sortColumns.length === 0) {
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
                        case 'undefined':
                            break;
                    }
                }

                //do the search with the updated sorting
                $scope.searchCadsrs();
            } //sortChangedCallBack


            /**
             * ****************DOUBLE CHECK this *****************
             *
             * callback function for selection rows
             * @param row
             */
            function rowSelectionCallBack(row) {


                if ($scope.maxRowSelectable > 0 && $scope.curationShown || $scope.usedInModal) {
                    if (row.isSelected) {

                        if ($scope.selectedRows.length < $scope.maxRowSelectable) {
                            $scope.selectedRows.unshift(row);
                            pushToParentScope(row.entity);
                        } else {
                            var deselectedRow = $scope.selectedRows.pop();
                            deselectedRow.isSelected = false;
                            $scope.nullifiedId = deselectedRow.entity.id === $scope.nullifiedId ? '' : $scope.nullifiedId;
                            $scope.selectedRows.unshift(row);
                            $scope.gridApi.grid.refresh(); //refresh grid

                            var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedOrgsArray, deselectedRow.entity);
                            $scope.$parent.selectedOrgsArray.splice(curRowSavedIndex, 1);
                            spliceInParentScope(curRowSavedIndex);
                            pushToParentScope(row.entity);
                        }
                    }
                    else {
                        //de-select the row
                        //remove it from the $scope.selectedRows, if exists
                        var needleIndex = -1;
                        _.each($scope.selectedRows, function (existingRow, idx) {
                            if (existingRow.entity.id === row.entity.id) {
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
                        var curRowSavedIndex = OrgService.indexOfOrganization($scope.$parent.selectedOrgsArray, row.entity);
                        $scope.$parent.selectedOrgsArray.splice(curRowSavedIndex, 1);
                        spliceInParentScope(curRowSavedIndex);
                    }
                } else {
                    row.isSelected = false; //do not show selection visually
                }
            } //rowSelectionCallBack


            /**
             * push row entity to the parent controller
             * @param entity
             */
            function pushToParentScope(entity) {
                if (angular.isDefined($scope.$parent.selectedOrgsArray)) {
                    $scope.$parent.selectedOrgsArray.push(entity);

                }
            }


            /**
             * Splice out the row entity from parent scope
             * @param entityIndex
             */
            function spliceInParentScope(entityIndex) {
                if (angular.isDefined($scope.$parent.selectedOrgsArray) && entityIndex > -1) {
                    $scope.$parent.selectedOrgsArray.splice(entityIndex, 1);
                }
            }


            /* prepare grid layout and data options */
            function prepareGidOptions() {
                $scope.gridOptions = CadsrService.getGridOptions();
                $scope.gridOptions.isRowSelectable = function (row) {
                    return true;
                };
                $scope.gridOptions.enableVerticalScrollbar = 2; //uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.enableHorizontalScrollbar = 2; //uiGridConstants.scrollbars.NEVER;
                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, sortChangedCallBack);
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

            } //prepareGridOptions



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


            function hideHyperLinkInModal() {
                $scope.$watch('usedInModal', function (newVal, oldVal) {
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
            } //hideHyperLinkInModal



        } //ctrpAdvancedOrgSearchController
    }

})();
