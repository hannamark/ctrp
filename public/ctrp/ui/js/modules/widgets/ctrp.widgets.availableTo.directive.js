/**
 * wangg5 created 10/01/2015
 *
 * Use this directive to hide/show an html element element to selected
 * user roles
 * For example, to make an input field show only to ROLE_SUPER and ROLE_CURATOR:
 * <input name="first_name" available-to="ROLE_SUPER, ROLE_CURATOR" />
 *
 * NOTE: be explicit on the user roles. The element won't be available to user roles not explicitly specified 
 *
 */

(function() {

  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('availableTo', availableTo);

  availableTo.$inject = ['UserService'];

  function availableTo(UserService) {
    var directive = {
      restrict: 'A',
      link: linkerFn,
      transclude: true
    };

    return directive;

    function linkerFn(scope, element, attrs) {

      attrs.$observe('availableTo', function(newVal) {
        //parse the string to array
        var allowedUserRoles = !newVal ? [] : stringToArray(newVal);
        var curUserRole = UserService.getUserRole() || '';

        if (allowedUserRoles.indexOf(curUserRole) > -1) {
            element.show();
        } else {
            element.hide();
        }
      }, true);
    }


    /* parse string (delimited) to array with the provided delimiter */
    function stringToArray(str, delimiter) {
      var results = [];
      // if not provided, use comma as default delimiter
      delimiter = !delimiter ? "," : delimiter;
      var tempArr = str.split(delimiter);
      results = tempArr.filter(function(item) {
        return item.trim(); //if not empty, return
      });

      return results;
    } //stringToArray


  } //availableTo

})();
