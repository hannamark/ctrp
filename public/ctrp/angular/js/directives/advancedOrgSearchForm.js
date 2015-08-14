/**
 * Created by wangg5 on 8/6/15.
 */


/**
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
        'MESSAGES', 'uiGridConstants', '$timeout', '_', '$anchorScroll', '$compile'];

    function ctrpAdvancedOrgSearchForm(OrgService, GeoLocationService, Common, $location,
                                       MESSAGES, uiGridConstants, $timeout, _, $anchorScroll, $compile) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showgrid: '=',  //boolean
                enablerowselection: '=',  //boolean
                usedinmodal: '=',  //boolean
                orgSearchResults: '@orgSearchResults',
                selectedOrgsArray: '@selectedOrgsArray',
            },
            templateUrl: '/ctrp/angular/js/directives/advancedOrgSearchFormTemplate.html',
            link: linkFn,
            controller: orgSearchController
        };

        return directiveObj;


        /**************** implementations below ******************/

        function linkFn(scope, element, attrs, controller) {
            // element.text('this is the advanced search form');
            console.log('showgrid: ' + scope.showgrid);
            console.log('enablerowselection: ' + scope.enablerowselection);
            // scope.enablerowselection = attrs.enablerowselection || false;
            $compile(element.contents())(scope);

        } //linkFn


        function orgSearchController($scope) {
            $scope.searchParams = OrgService.getInitialOrgSearchParams();
            $scope.watchCountrySelection = OrgService.watchCountrySelection();

            activate();

            function activate() {
                getPromisedData();
                listenToStatesProvinces();
            } //activate

            //ui-grid plugin options
            $scope.gridOptions = OrgService.getGridOptions();
            //$scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
            //$scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
            //$scope.enablerowselection = false;

            $scope.$watch('usedinmodal', function (newVal, oldVal) {
                console.log('usedinmodal: ' + newVal);
                $scope.resetSearch();

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
                }
            });

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
            } //rowSelectionCallBack


            $scope.searchOrgs = function () {
                OrgService.searchOrgs($scope.searchParams).then(function (data) {
                    // console.log("received data for org search: " + JSON.stringify(data));
                    if ($scope.showgrid && data.orgs) {
                        $scope.gridOptions.data = data.orgs;
                        $scope.gridOptions.totalItems = data.total;
                        $scope.gridHeight = $scope.gridOptions.rowHeight * (data.orgs.length + 1);
                        $location.hash('org_search_results');
                        $anchorScroll();
                    }
                    $scope.$parent.orgSearchResults = data; //{orgs: [], total, }
                    // console.log($scope.$parent);

                }).catch(function (error) {
                    console.log("error in retrieving orgs: " + JSON.stringify(error));
                });
            }; //searchOrgs


        } //orgSearchController


    } //ctrpAdvancedOrgSearchForm


})();