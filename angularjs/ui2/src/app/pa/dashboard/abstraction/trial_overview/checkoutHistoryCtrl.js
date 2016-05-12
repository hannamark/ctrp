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
        delete checkoutHistoryArr.server_response;
        var curTrialId = $stateParams.trialId;
        console.info('history: ', checkoutHistoryArr);
        vm.checkoutHistoryArr = checkoutHistoryArr;
        vm.gridOptions = getGridOptions();

        activate();
        function activate() {
            resizeGrid();
            listenToCheckouts();
        }

        function resizeGrid() {
            $timeout(function() {
                vm.gridOptions.api.sizeColumnsToFit();
            }, 0);
        }

        // grid listen to the checkin checkout event in trial overview
        function listenToCheckouts() {
            $scope.$on(MESSAGES.TRIALS_CHECKOUT_IN_SIGNAL, function(event, data) {
                event.preventDefault();
                PATrialService.getTrialCheckoutHistory(curTrialId).then(function(data) {
                    delete data.server_response;
                    vm.gridOptions.api.setRowData(data); // update grid
                    vm.gridOptions.api.refreshView();
                    vm.gridOptions.api.sizeColumnsToFit();
                });
            });
        }

        function getGridOptions() {
            var options = {
                rowData: checkoutHistoryArr,
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
