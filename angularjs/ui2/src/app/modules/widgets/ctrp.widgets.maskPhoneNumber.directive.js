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
            var elem= element,
                ctrl = controller;

            elem.on('keyup', function(e) {
                ctrl.$modelValue = applyMask(ctrl.$modelValue);
            });

            ctrl.$formatters.push(function(value) {
                var output = null;

                if (value) {
                    output = applyMask(value);
                }

                return output;
            });

            function applyMask(value) {
                return formatLocal('US', value);
            }
      }
  }
}());
