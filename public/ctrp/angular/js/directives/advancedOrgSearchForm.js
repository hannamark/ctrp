/**
 * Created by wangg5 on 8/6/15.
 */


/**
 * Reusable advanced organization search form
 */
(function() {

    'use strict';

    angular.module('ctrpApp')
        .directive('advancedOrgSearchForm', advancedOrgSearchForm);

    advancedOrgSearchForm.$inject = ['OrgService', 'GeoLocationService', 'Common', 'MESSAGES', 'uiGridConstants'];

    function advancedOrgSearchForm(OrgService, GeoLocationService, Common, MESSAGES, uiGridConstants) {

        var directiveObj = {
            restrict : 'EA',
            scope: {
               // sourceStatuses: '=',
               // countries: '='
                UseGrid: '='
            },
            templateUrl: '/ctrp/angular/js/directives/advancedOrgSearchFormTemplate.html',
            link: linkFn,
            controller: orgSearchController
        };

        return directiveObj;


        /**************** implementations below ******************/

        function linkFn(scope, element, attr, controller) {
            // element.text('this is the advanced search form');
            console.log('useGrid: ' + scope.UseGrid)

        } //linkFn


        function orgSearchController($scope) {
            $scope.name = "tony wang";
            $scope.searchParams = OrgService.getInitialOrgSearchParams();
            $scope.watchCountrySelection = OrgService.watchCountrySelection();
            console.log("running the controller in the form directive");

            activate();

            function activate() {
                getPromisedData();
                listenToStatesProvinces();
            } //activate

            //ui-grid plugin options
            $scope.gridOptions = OrgService.getGridOptions();
            //$scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
            //$scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
            $scope.gridOptions.onRegisterApi = function(gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, sortChangedCallBack)
                $scope.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
                    $scope.searchParams.start = newPage;
                    $scope.searchParams.rows = pageSize;
                    $scope.searchOrgs();
                });
            }; //gridOptions

            $scope.searchOrgs = function() {
                // $scope.searchParams.name = $scope.searchParams.name || "*";
                //console.log("searching params: " + JSON.stringify($scope.searchParams));
                OrgService.searchOrgs($scope.searchParams).then(function (data) {
                    // console.log("received search results: " + JSON.stringify(data));
                    $scope.gridOptions.data = data.orgs; //prepareGridData(data.data.orgs); //data.data.orgs;
                    $scope.gridOptions.totalItems = data.total;
                    $scope.gridHeight = $scope.gridOptions.rowHeight * ($scope.gridOptions.data.length + 1);

                    // $scope.$parent.gridOptions = $scope.gridOptions;
                    // $scope.$parent.gridHeight = $scope.gridHeight;
                }).catch(function (err) {
                    console.log('search organizations failed');
                });
            }; //searchOrgs


            $scope.resetSearch = function() {
                // $scope.states.length = 0;
                $scope.searchParams = OrgService.getInitialOrgSearchParams();
                $scope.searchOrgs();
            }; //resetSearch




            function getPromisedData () {
                //get source statuses
                OrgService.getSourceStatuses().then(function (statuses) {
                    //console.log("received statuses: " + JSON.stringify(statuses));
                    statuses.sort(Common.a2zComparator());
                    $scope.sourceStatuses = statuses;
                });

                //get countries
                GeoLocationService.getCountryList().then(function (countries) {
                    countries.sort(Common.a2zComparator());
                    $scope.countries = countries;
                });
            } //getPromisedData


            
            
            /**
             * Listen to the message for availability of states or provinces
             * for the selected country
             */
            function listenToStatesProvinces() {
                $scope.watchCountrySelection($scope.searchParams.country);

                $scope.$on(MESSAGES.STATES_AVAIL, function() {
                    //console.log("states available for country: " + $scope.searchParams.country);
                    $scope.states = OrgService.getStatesOrProvinces();
                });

                $scope.$on(MESSAGES.STATES_UNAVAIL, function() {
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
                    switch( sortColumns[0].sort.direction ) {
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
            

        } //orgSearchController


    } //advancedOrgSearchForm


})();