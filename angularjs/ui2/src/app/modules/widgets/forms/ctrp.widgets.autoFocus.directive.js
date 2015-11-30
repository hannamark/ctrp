/**
 * created by wangg5 November 16, 2015
 *
 * Auto focus on the input field
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
      .directive('autoFocus', focusInputOnLoad);

        focusInputOnLoad.$inject = [];

        function focusInputOnLoad() {
            var directoveObj = {
                restrict: 'A',
                link: {
                    pre: function preLink(scope, element, attrs) {
                    },
                    post: function postLink(scope, element, attrs) {
                        element[0].focus();
                    }
                }
            };

            return directoveObj;
        } //focusInputOnLoad

  })();
