(function() {
  'use strict';

    angular.module('ctrpApp.widgets')
        .directive('maskPhoneNumber', maskPhoneNumber);

    function maskPhoneNumber() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkerFn
        };

        return directive;

        function linkerFn(scope, element, attributes, controller) {
            var elem = element,
                countryElement = element.closest('form').find('#country'),
                countryVal = null,
                ctrl = controller;


            countryElement.on('change', function(e) {
                countryVal = $(this).val();
                applyMask();
            });

            elem.on('keyup', function(e) {
                ctrl.$modelValue = applyMask();
            });

            ctrl.$formatters.push(function(value) {
                var output = null;

                if (countryVal && value) {
                    output = applyMask();
                    return output;
                }
            });

            function applyMask() {
                var phoneNum = ctrl.$modelValue;
                var countryCode;

                if (countryVal) {
                    countryCode = countryToCountryCode(countryVal);
                }

                return formatLocal(countryCode, phoneNum);
            }
      }
  }
}());
