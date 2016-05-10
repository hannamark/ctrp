/**
 * Created by wangg5, May 6th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('checkoutHistoryCtrl', checkoutHistoryCtrl);

    checkoutHistoryCtrl.$inject = ['$scope', 'checkoutHistoryArr', '$filter', '_'];

    function checkoutHistoryCtrl($scope, checkoutHistoryArr, $filter, _) {
        var vm = this;
        console.info('history: ', checkoutHistoryArr);
        vm.gridOptions = getGridOptions();

        // TODO: grid listen to the checkin checkout event in trial overview

        function getGridOptions() {
            var options = {
                rowData: checkoutHistoryArr,
                rowModelType: 'pagination',
                columnDefs: getColumnDefs(),
                enableColResize: true,
                enableSorting: false,
                enableFilter: true,
                rowHeight: 25,
                angularCompileRows: true,
                suppressRowClickSelection: true
            };

            return options;
        }

        function getColumnDefs() {
            var columns = [
                {headerName: 'Type', width: 200, field: 'abstraction_type', cellRenderer: _renderCellType},
                {headerName: 'Date/Time', width: 150, field: 'created_at', cellRenderer: _renderCellDate},
                {headerName: 'User', width: 150, field: 'username'},
                {headerName: 'Checkout/Checkin', width: 160, field: 'category', cellClassRules: {
                    'cellbg-red': function(params) {return params.value === 'Checkout'},
                    'cellbg-green': function(params) {return params.value === 'Checkin'}
                }, cellRenderer: _renderCheckoutIcon},
                {headerName: 'Check In Comment', width: 370, field: 'checkin_comment', cellRenderer: _renderToolTip},
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
            return '<span title="Tooltip">' + params.value +'</span>';
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
