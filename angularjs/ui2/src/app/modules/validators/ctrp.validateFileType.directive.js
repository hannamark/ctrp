/**
 * Created by wus4 on 12/8/15.
 */

(function() {
    'use strict';
    angular.module('ctrp.module.validators')
        .directive('validateFileType', validateFileType);

    function validateFileType() {
        var directiveObj = {
            require: 'ngModel',
            link: linkerFn
        };

        return directiveObj;

        /***************** implementations below ****************/

        function linkerFn(scope, element, attrs, ctrl) {
            ctrl.$validators.validateFileType = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // Consider empty file to be valid
                    return true;
                }

                var extension = modelValue.name.split('.').pop();
                var allowedExtensions = attrs.validateFileType.split(',');
                if (allowedExtensions.indexOf(extension) > -1) {
                    // In allowed extension list
                    return true;
                } else {
                    return false;
                }
            };
        }
    }
})();
