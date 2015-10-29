/**
 * @author wangg5 created 10/01/2015
 *
 */

(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .directive('restrictionField', restrictionField);

  restrictionField.$inject = ['$log', '$compile', '$timeout', 'MESSAGES', 'UserService'];

  function restrictionField($log, $compile, $timeout, MESSAGES, UserService) {

      var directiveObj = {
          link: link,
          require: '?ngModel',
          restrict: 'A',
          replace: true
      };

      return directiveObj;


      function link(scope, element, attrs, ngModelCtrl) {
          watchRestrictionRules();
          scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
              watchRestrictionRules();
          });

          function watchRestrictionRules() {
            var allowedUserRoles = attrs.restrictionField.trim().toLowerCase() || '';
            var curUserRole = UserService.getUserRole().toLowerCase() || '';
            var globalWriteModeEnabled = UserService.isCurationModeEnabled() || false;
            var isShownToCurrentUser = !allowedUserRoles ? true : allowedUserRoles.indexOf(curUserRole) > -1; //boolean

            if (isShownToCurrentUser && globalWriteModeEnabled) {
              element.show();
              element.removeAttr('disabled');
            } else if (!isShownToCurrentUser) {
              element.hide();
            } else if (isShownToCurrentUser && !globalWriteModeEnabled) {
              if (isButton(element)) {
                element.hide(); //hide button if globalWriteModeEnabled is false
              } else {
                attrs.$set('disabled', 'disabled');
              }
            }
          } //watchRestrictionRules

      } //link


      /**
       * check if the element is a button
       * @param ele
       * @returns {boolean}
       */
      function isButton(ele) {
          if (ele && ele[0].outerHTML) {
              var buttonProperties = ['button', 'btn', 'submit', 'reset'];

              for (var i = 0; i < buttonProperties.length; i++) {
                  if (ele[0].outerHTML.indexOf(buttonProperties[i]) > -1) {
                      return true;
                  }
              }
          }

          return false;
      }




  } //restrictionField



})();
