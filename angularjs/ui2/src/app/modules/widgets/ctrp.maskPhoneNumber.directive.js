(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('maskPhoneNumber', maskPhoneNumber);

  function maskPhoneNumber() {
      var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, ctrl) {
          var ngModel = ctrl;

          /* */
          ngModel.$formatters.push(function(value) {
              var output = null;

              if (value) {

              }
          });

          /* */
          ngModel.$parsers.push(function(value) {
              var output = null;

              if (value) {

              }
          });
        }
      };

      return directive;
  }
}());
