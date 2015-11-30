/**
 * wangg5 created 10/01/2015
 *
 * This directive watches for user roles and the global write mode to hide/show or disable/enable fields (or divs)
 *
 * Usage:
 *
 * To make a field visibly available to certain user_roles, the user roles should be delimited
 * by any delimiter of your choice. (e.g. restriction-field="ROLE_CURATOR")
 *
 * @Example 1:
 * make the following input field visible to ROLE_ADMIN and ROLE_SUPER, other user roles cannot see the field
 *
 * <input name="TestField1" restriction-field="ROLE_ADMIN, ROLE_SUPER" />
 *
 *
 *
 * @Example 2:
 * if no user role is specified (in the below example), the input field only disable/enable by listening to the
 * global write mode
 *
 * <input name="TestField2" restriction-field />
 *
 * @Example 3:
 * To make a field or element specific only to user roles and ignore the global readonly-write mode, use the flag
 * 'ignore-rw' with the restriction-field directive:
 * <div class="row" restriction-field="ROLE_CURATOR" ignore-rw>
 *
 * </div>
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
            //sanity check first
            if (attrs.restrictionField.trim() === '' && attrs.hasOwnProperty('ignoreRw')) {
                //alert for errors
                $log.error('The restriction-field directive must have user roles assigned when using the flag "ignore-rw"');
                var errorMsg = '<span class="help-inline"><strong>Error: </strong>the restriction-field needs user role(s) assigned with the ignore-rw flag </span>';
                element.html(errorMsg); //alert user for errors in using this directive with 'ignore-rw' flag
                $compile(element.contents())(scope);
                return;
            }

            var allowedUserRoles = attrs.restrictionField.trim().toLowerCase() || '';
            var curUserRole = UserService.getUserRole().toLowerCase() || '';
            var globalWriteModeEnabled = UserService.isCurationModeEnabled() || false;
            var isShownToCurrentUser = !allowedUserRoles ? true : allowedUserRoles.indexOf(curUserRole) > -1; //boolean

            if (attrs.hasOwnProperty('ignoreRw')) {
                //include user role only
                if (isShownToCurrentUser) {
                    element.show();
                } else {
                    element.hide();
                }
            } else {
                //include both globalWriteMode and user role
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
