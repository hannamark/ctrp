/**
 * Created by wangg5, May 6th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('checkoutHistoryCtrl', checkoutHistoryCtrl);

    checkoutHistoryCtrl.$inject = ['$scope', 'checkoutHistoryArr', '$filter', '_',
        '$timeout', 'MESSAGES', 'PATrialService', '$stateParams'];

    function checkoutHistoryCtrl($scope, checkoutHistoryArr, $filter, _,
            $timeout, MESSAGES, PATrialService, $stateParams) {
        var vm = this;
        var curTrialId = $stateParams.trialId;
        var pageSize = 20;
        vm.gridOptions = getGridOptions();
        vm.disableBtn = false;

        activate();
        function activate() {
            populateGrid(checkoutHistoryArr);
            listenToCheckouts();
        }

        function populateGrid(arrData) {
            $timeout(function() {
                delete arrData.server_response; // remove the field in the server response
                vm.checkoutHistoryArr = arrData; // update the cache
                createNewDatasource(vm.checkoutHistoryArr);
                // vm.gridOptions.api.setRowData(vm.checkoutHistoryArr);
                vm.gridOptions.api.refreshView();
                vm.gridOptions.api.sizeColumnsToFit();
            }, 0);
        }

        // grid listen to the checkin checkout event in trial overview
        function listenToCheckouts() {
            $scope.$on(MESSAGES.TRIALS_CHECKOUT_IN_SIGNAL, function(event, data) {
                event.preventDefault();
                vm.disableBtn = true;

                PATrialService.getTrialCheckoutHistory(curTrialId).then(function(data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        populateGrid(data);
                    }
                }).finally(function() {
                    vm.disableBtn = false;
                });
            });
        }


        function getGridOptions() {
            var options = {
                // rowData: vm.checkoutHistoryArr,
                rowModelType: 'pagination',
                columnDefs: getColumnDefs(),
                enableColResize: true,
                enableSorting: false,
                enableFilter: true,
                rowHeight: 30,
                angularCompileRows: true,
                suppressRowClickSelection: true,
                suppressSizeToFit: false,
            };

            return options;
        }

        function onPageSizeChanged(newPageSize) {
            console.info('newPageSize: ', newPageSize);
            pageSize = new Number(newPageSize);
            createNewDatasource(vm.checkoutHistoryArr);
        }

        function createNewDatasource(allRecords) {
            if (!allRecords) {
                return;
            }
            var dataSource = {
                pageSize: pageSize,
                getRows: function(params) {
                    var curPage = vm.checkoutHistoryArr.slice(params.startRow, params.endRow);
                    var lastRow = (allRecords.length <= params.endRow) ? allRecords.length : -1;
                    params.successCallback(curPage, lastRow);
                }
            };
            vm.gridOptions.api.setDatasource(dataSource);
        }


        function getColumnDefs() {
            var columns = [
                {headerName: 'Type', width: 90, field: 'abstraction_type', cellRenderer: _renderCellType},
                {headerName: 'Date/Time', width: 75, field: 'created_at', cellRenderer: _renderCellDate},
                {headerName: 'User', width: 60, field: 'username'},
                {headerName: 'Checkout/Checkin', width: 80, field: 'category', cellClassRules: {
                    'cellbg-red': function(params) {return params.value === 'Checkout'},
                    'cellbg-green': function(params) {return params.value === 'Checkin'}
                }, cellRenderer: _renderCheckoutIcon},
                {headerName: 'Check In Comment',field: 'checkin_comment', cellRenderer: _renderToolTip, suppressSizeToFit: false},
            ];

            return columns;
        }

        function _renderCheckoutIcon(params) {
            if (!angular.isDefined(params.value)) {
                return '';
            }
            var category = $filter('toProperCase')(params.value);
            var renderedText = category;
            if (category === 'Checkout') {
                renderedText += ' <i class="glyphicon glyphicon-log-out"></i>';
            } else if (category === 'Checkin') {
                renderedText += ' <i class="glyphicon glyphicon-log-in"></i>'
            }
            return '<span>' + renderedText + '</span>';
        }

        function _renderToolTip(params) {
            if (!angular.isDefined(params.value)) {
                return '';
            }
            return '<span uib-tooltip="' + params.value + '">' + params.value +'</span>';
        }

        function _renderCellType(params) {
            if (!angular.isDefined(params.value)) {
                return '';
            }

            var formattedType = 'Unknown';
            if (params.value.toLowerCase() === 'scientificadmin') {
                formattedType = 'Scientific, Administrative'
            } else if (params.value.toLowerCase().startsWith('admin')) {
                formattedType = 'Administrative';
            } else {
                formattedType = $filter('toProperCase')(params.value);
            }

            return formattedType;
        }

        function _renderCellDate(params) {
            return $filter('date')(params.value, 'dd-MMM-yyyy H:mm');
        }
    } // checkoutHistoryCtrl

})();
