/**
 * Created by wangg5 on 10/5/15.
 */

(function() {
    'use strict';

        angular.module('ctrpApp.module.Validators')
            .directive('dateLaterThan', dateLaterThan)
            .directive('dateEarlierThan', dateEarlierThan);

    dateEarlierThan.$inject = ['$filter'];
    dateLaterThan.$inject = ['$filter'];

    function dateLaterThan($filter) {

        var directiveObj1 = {
            require: 'ngModel',
            link: linkerFn1
        };

        return directiveObj1;


        /***************** implementations below ****************/

        function linkerFn1(scope, element, attrs, ctrl) {

            var validateDateRange = function (inputValue) {
                var fromDate = $filter('date')(attrs.dateLaterThan, 'short');
                var toDate = $filter('date')(inputValue, 'short');
                var isValid = isValidDateRange(fromDate, toDate);
                ctrl.$setValidity('dateLaterThan', isValid);
                return inputValue;
            };

            ctrl.$parsers.unshift(validateDateRange);
            ctrl.$formatters.push(validateDateRange);
            attrs.$observe('dateLaterThan', function() {
                validateDateRange(ctrl.$viewValue);
            });

        } //linkerFn1

    } //dateLaterThan directive


    function dateEarlierThan($filter) {
        var directiveObj2 = {
            require: 'ngModel',
            link: linkerFn2
        };

        return directiveObj2;

        function linkerFn2(scope, element, attrs, ctrl) {

            var validateDateRange = function (inputValue) {
                var fromDate = $filter('date')(inputValue, 'short');
                var toDate = $filter('date')(attrs.dateLowerThan, 'short');
                var isValid = isValidDateRange(fromDate, toDate);
                ctrl.$setValidity('dateLowerThan', isValid);
                return inputValue;
            };

            ctrl.$parsers.unshift(validateDateRange);
            ctrl.$formatters.push(validateDateRange);
            attrs.$observe('dateLowerThan', function () {
                validateDateRange(ctrl.$viewValue);
            });

            /*
            function isValidDateRange2(fromDate, toDate) {
                if (fromDate == '' || toDate == '') {
                    return true;
                }

                if (isValidDate(fromDate) == false) {
                    return false;
                }

                if (isValidDate(toDate) == true) {
                    var days = dateDiff(fromDate, toDate);
                    console.log('in linker2, days: ' + days);
                    return days <= 0 ? true : false;
                }
            } //isValidDateRange
            */

        } //linkerFn1
    }


    /************* helper functions **************/

    function isValidDate(dateStr) {
        //console.log('isValidateDate ? : ' + isNaN(Date.parse(dateStr)));
        if (dateStr === undefined || isNaN(Date.parse(dateStr))) {
            return false;
        }
        return true;
    } //isValidDate

    function dateDiff(fromDate, toDate) {
        return Date.parse(toDate) - Date.parse(fromDate);
    } //dateDiff


    function isValidDateRange(fromDate, toDate) {
        if (fromDate == '' || toDate == '') {
            return true;
        }

        if (isValidDate(fromDate) == false) {
            return false;
        }

        if (isValidDate(toDate) == true) {
            var days = dateDiff(fromDate, toDate);
            return days < 0 ? false : true;
        }
    } //isValidDateRange


})();
