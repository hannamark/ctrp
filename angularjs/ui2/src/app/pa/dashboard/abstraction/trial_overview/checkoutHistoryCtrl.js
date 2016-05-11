/**
 * Created by wangg5, May 6th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('checkoutHistoryCtrl', checkoutHistoryCtrl);

    checkoutHistoryCtrl.$inject = ['$scope', 'checkoutHistoryArr', '$filter', '_', '$timeout'];

    function checkoutHistoryCtrl($scope, checkoutHistoryArr, $filter, _, $timeout) {
        var vm = this;
        delete checkoutHistoryArr.server_response;
        console.info('history: ', checkoutHistoryArr);
        vm.checkoutHistoryArr = checkoutHistoryArr;
        vm.gridOptions = getGridOptions();
        /*
        $timeout(function() {
            vm.gridOptions.api.setRowData(vm.checkoutHistoryArr);
        }, 100);
        */
        // TODO: grid listen to the checkin checkout event in trial overview

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
                suppressRowClickSelection: true
            };

            return options;
        }

        function getColumnDefs() {
            var columns = [
                {headerName: 'Type', field: 'abstraction_type', cellRenderer: _renderCellType},
                {headerName: 'Date/Time', field: 'created_at', cellRenderer: _renderCellDate},
                {headerName: 'User', field: 'username'},
                {headerName: 'Checkout/Checkin', field: 'category', cellClassRules: {
                    'cellbg-red': function(params) {return params.value === 'Checkout'},
                    'cellbg-green': function(params) {return params.value === 'Checkin'}
                }, cellRenderer: _renderCheckoutIcon},
                {headerName: 'Check In Comment',field: 'checkin_comment', cellRenderer: _renderToolTip},
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
