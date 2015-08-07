/**
 * Created by wangg5 on 8/6/15.
 */


/**
 * Reusable advanced organization search form
 */
(function() {

    'use strict';

    angular.module('ctrpApp')
        .directive('ctrpAdvancedOrgSearchForm', ctrpAdvancedOrgSearchForm);

    ctrpAdvancedOrgSearchForm.$inject = ['OrgService', 'GeoLocationService', 'Common',
        'MESSAGES', 'uiGridConstants', '$timeout'];

    function ctrpAdvancedOrgSearchForm(OrgService, GeoLocationService, Common,
                                       MESSAGES, uiGridConstants, $timeout) {

        var directiveObj = {
            restrict : 'E',
            scope: {
                showgrid: '='
            },
            templateUrl: '/ctrp/angular/js/directives/advancedOrgSearchFormTemplate.html',
            link: linkFn,
            controller: orgSearchController
        };

        return directiveObj;


        /**************** implementations below ******************/

        function linkFn(scope, element, attr, controller) {
            // element.text('this is the advanced search form');
            console.log('showgrid: ' + scope.showgrid)

        } //linkFn


        function orgSearchController($scope) {
            $scope.searchParams = OrgService.getInitialOrgSearchParams();
            $scope.watchCountrySelection = OrgService.watchCountrySelection();
            //console.log("running the controller in the form directive, showgrid: " + $scope.showgrid);

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

            $scope.resetSearch = function() {
                // $scope.states.length = 0;
                $scope.searchParams = OrgService.getInitialOrgSearchParams();
                // $scope.searchOrgs();
                $scope.$parent.orgSearchResults = [];
                $scope.gridOptions.data = [];
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

                //country change triggers searchOrgs() function
                $scope.$watch('searchParams.country', function(newVal, oldVal) {
                    $scope.searchOrgs();
                }, true);

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



            var orgsPromise = '';
            $scope.searchOrgs = function () {
                if (orgsPromise) {
                    $timeout.cancel(orgsPromise);
                }

                orgsPromise = $timeout(function () {
                        OrgService.searchOrgs($scope.searchParams).then(function (data) {

                            if ($scope.showgrid && data.orgs) {
                                $scope.gridOptions.data = data.orgs; //prepareGridData(data.data.orgs); //data.data.orgs;
                                $scope.gridOptions.totalItems = data.total;
                                $scope.gridHeight = $scope.gridOptions.rowHeight * (data.orgs.length + 1);
                                // $scope.$parent.gridOptions = $scope.gridOptions;
                                // $scope.$parent.gridHeight = $scope.gridHeight;
                            }
                            $scope.$parent.orgSearchResults = data.org; //array
                        }).catch(function (error) {
                            console.log("error in retrieving orgs: " + JSON.stringify(error));
                        });
                }, 250); //250 ms
            }; //searchOrgs
            

        } //orgSearchController


    } //ctrpAdvancedOrgSearchForm


})();