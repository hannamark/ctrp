/**
 * created by wangg5 on February 9, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.po')
    .directive('personSearch2', personSearch2);

    personSearch2.$inject = ['PersonService', 'Common', 'UserService', 'DateService',
    '$state', '$timeout', '_', 'OrgService', '$compile', 'MESSAGES'];

    function personSearch2(PersonService, Common, UserService, DateService,
                        $timeout,  _, OrgService, $compile, MESSAGES, $state) {
        return {
            restrict: 'E',
            scope: {
                showGrid: '=?',
                usedInModal: '=?',
                maxRowSelectable: '=?',
                curationMode: '=?',
                personSearchResults: '@personSearchResults',
                selectedPersonsArray: '@selectedPersonsArray'
            },
            templateUrl: 'app/po/person/directives/person_search2_template.html',
            link: linkFn,
            controller: personSearch2DirectiveController,
            controllerAs: 'personSearch2View'
        };

        function linkFn(scope, element, attrs) {

        } //linkFn

        function personSearch2DirectiveController($scope, UserService, DateService, OrgService, $state, _) {
            var vm = this;
            vm.name = 'Tony';
            vm.searchParams = PersonService.getInitialPersonSearchParams();
            console.log('searchParams: ', vm.searchParams);
            vm.sourceContextArr = [];
            vm.sourceStatusArr = [];
            vm.searchResults = []; // array of person
            var fromStateName = $state.fromState.name || '';
            vm.searchWarningMessage = '';
            console.log('fromStateName: ', fromStateName);

            vm.dateFormat = DateService.getFormats()[1];
            vm.dateOptions = DateService.getDateOptions();
            vm.startDateOpened = ''; //false;
            vm.endDateOpened = ''; // false;

            // ag-grid options
            vm.gridOptions = getGridOptions();
            console.log('vm.gridOptions: ', vm.gridOptions);

            // actions
            vm.typeAheadNameSearch = typeAheadNameSearch;
            vm.resetSearch = resetSearch;
            vm.searchPeople = searchPeople;

            activate();

            function activate() {
                _getPromisedData();
                // getGridOptions();
            }

            function _getPromisedData() {

                OrgService.getSourceContexts().then(function(data) {
                    vm.sourceContextArr = data.sort(Common.a2zComparator());
                });

                OrgService.getSourceStatuses().then(function(data) {
                    vm.sourceStatusArr = data.sort(Common.a2zComparator());
                });
            } // _getPromisedData

            function typeAheadNameSearch() {
                var wildcardOrgName = vm.searchParams.affiliated_org_name.indexOf('*') > -1 ? vm.searchParams.affiliated_org_name : '*' + vm.searchParams.affiliated_org_name + '*';
                return OrgService.searchOrgs({name: wildcardOrgName, source_context: "CTRP"}).then(function (res) {
                    var uniqueNames = [];
                    var orgNames = [];
                    orgNames = res.orgs.map(function (org) {
                        return org.name;
                    });

                    return uniqueNames = orgNames.filter(function (name) {
                        return uniqueNames.indexOf(name) === -1;
                    });
                });
            }

            function resetSearch() {
                vm.searchParams = PersonService.getInitialPersonSearchParams();
                // vm.gridOptions.data = [];
                // vm.gridOptions.totalItems = null;
                var excludedKeys = ['wc_search'];
                _.keys(vm.searchParams).forEach(function (key) {
                    if (excludedKeys.indexOf(key) === -1) {
                        //vm.searchParams[key] = '';
                        vm.searchParams[key] = angular.isArray(vm.searchParams[key]) ? [] : '';
                    }
                });
                vm.searchParams.wc_search = true;
                vm.searchWarningMessage = '';
            }; //resetSearch

            vm.rowFormatter = function( row ) {
                var isCTEPContext =row.entity.source_context  && row.entity.source_context.indexOf('CTEP') > -1;
                return isCTEPContext;
            };

            function searchPeople(newSearchFlag) {
                if (newSearchFlag === 'fromStart') {
                    vm.searchParams.start = 1;
                }

                vm.searchParams.date_range_arr = DateService.getDateRange(vm.searchParams.startDate, vm.searchParams.endDate);
                if (vm.searchParams.date_range_arr.length === 0) {
                    delete vm.searchParams.date_range_arr;
                }

                //Checking to see if any search parameter was entered. If not, it should throw a warning to the user to select atleast one parameter.
                // Right now, ignoring the alias parameter as it is set to true by default. To refactor and look at default parameters instead of hardcoding -- radhika
                var isEmptySearch = true;
                var excludedKeys = ['sort', 'order','rows','start','wc_search'];
                _.keys(vm.searchParams).forEach(function (key) {
                    if(excludedKeys.indexOf(key) === -1 && vm.searchParams[key] !== '')
                        isEmptySearch = false;
                });
                if(isEmptySearch && newSearchFlag === 'fromStart') {
                    vm.searchWarningMessage = "At least one selection value must be entered prior to running the search";
                    vm.warningMessage = ''; //hide the 0 rows message if no search parameter was supplied
                } else {
                    vm.searchWarningMessage = "";
                }

                if(!isEmptySearch) { //skip searching if empty search
                    vm.searching = true;
                    PersonService.searchPeople(vm.searchParams).then(function (data) {
                        // console.log('received data for person search: ' + JSON.stringify(data));
                        console.log('people search results: ', data.data);
                        vm.gridOptions.api.setRowData(data.data.people);
                        vm.gridOptions.api.refreshView();
                        vm.searchResults = data.data.people;
                        /*
                        if (vm.showGrid && data.data.people) {
                            // console.log("received person search results: " + JSON.stringify(data.data.people));
                            vm.gridOptions.data = data.data.people;
                            vm.gridOptions.totalItems = data.data.total;
                            //pin the selected rows, if any, at the top of the results
                            _.each(vm.selectedRows, function (curRow, idx) {
                                var ctrpId = curRow.entity.id;
                                var indexOfCurRowInGridData = Common.indexOfObjectInJsonArray(vm.gridOptions.data, 'id', ctrpId);
                                if (indexOfCurRowInGridData > -1) {
                                    vm.gridOptions.data.splice(indexOfCurRowInGridData, 1);
                                    vm.gridOptions.totalItems--;
                                }
                                vm.gridOptions.data.unshift(curRow.entity);
                                vm.gridOptions.totalItems++;

                            });
                            // vm.gridApi.grid.refresh();
                        }
                        */
                        // vm.$parent.personSearchResults = data.data; //{people: [], total, }
                    }).catch(function (err) {
                        console.log('search people failed');
                    }).finally(function() {
                        console.log('search finished');
                        vm.searching = false;
                    });
                }
            }; //searchPeople

            /*
            vm.fields = [
                {
                    key: 'fname',
                    type: 'input',
                    className: 'input-sm',
                    templateOptions: {
                        label: 'First Name'
                    }
                },
                {
                    key: 'lname',
                    type: 'input',
                    className: 'input-sm',
                    templateOptions: {
                        label: 'Last Name'
                    }
                },
            ];
            */

           function getGridOptions() {
               var colDefs = [
                   {headerName: '', width: 30, checkboxSelection: true,
                        suppressSorting: true, suppressMenu: true, pinned: true},
                   {headerName: 'CTRP ID', field: 'ctrp_id', width: 100, cellHeight: 20},
                   {headerName: 'CTEP ID', field: 'ctep_id', width: 100, cellHeight: 20}
                ];

               var options = {
                    columnDefs: getColumnDefs(),
                    rowData: [
                        {'ctrp_id': 1232, 'ctep_id': 321},
                        {'ctrp_id': 12322, 'ctep_id': 3212},
                    ],
                    rowSelection: 'multiple',
                    enableColResize: true,
                    enableSorting: true,
                    enableFilter: true,
                    groupHeaders: true,
                    rowHeight: 22,
                    onModelUpdated: onModelUpdated,
                    suppressRowClickSelection: true
                };
                // options.datasource = tableDataSource;
                return options;
           }

           function onModelUpdated() {
               console.info('on model updated triggered!');
           }

           function getColumnDefs() {
               var colDefs = [
                   {headerName: '', width: 30, checkboxSelection: true,
                        suppressSorting: true, suppressMenu: true, pinned: true},
                   {headerName: 'CTRP ID', field: 'ctrp_id', width: 100, cellHeight: 20},
                   {headerName: 'CTEP ID', field: 'ctep_id', width: 100, cellHeight: 20},
                   {headerName: 'First', field: 'fname', width: 100, cellHeight: 20},
                   {headerName: 'Last', field: 'lname', width: 100, cellHeight: 20},
                   {headerName: 'Source Context', field: 'source_context', width: 100, cellHeight: 20},
                   {headerName: 'Source Status', field: 'source_status', width: 100, cellHeight: 20},
                   {headerName: 'Source ID', field: 'source_id', width: 100, cellHeight: 20},
                   {headerName: 'Email', field: 'email', width: 140, cellHeight: 20},
                   {headerName: 'Phone', field: 'phone', width: 120, cellHeight: 20},
                   {headerName: 'Affiliated Orgs', field: 'ctep_id', width: 150, cellHeight: 20},
                   {headerName: 'Updated', field: 'updated_at', width: 130, cellHeight: 20},
                   {headerName: 'Prefix', field: 'prefix', width: 70, cellHeight: 20},
                   {headerName: 'Suffix', field: 'suffix', width: 70, cellHeight: 20},
                ];

               return colDefs;
           }

           var tableDataSource = {
               getRows: getRows,
               pageSize: vm.searchParams.rows,
               rowCount: 100,
               overflowSize: 100,
               maxConcurrentRequests: 3
           };

           function getRows(params) {
               params.startRow = (vm.searchParams.start - 1) * vm.searchParams.rows;
               params.endRow = vm.searchParams.start * vm.searchParams.rows;
               params.successCallback = function() {
                   console.info('success in getRows');
               }
               return params;
           }

        } // personSearch2DirectiveController

    }

})();
