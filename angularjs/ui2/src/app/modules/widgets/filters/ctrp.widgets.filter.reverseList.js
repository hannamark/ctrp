(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .filter('reverse', function() {
    return function(list) {
      if (angular.isDefined(list) && list.length > 0) {
        return list.slice().reverse();
      }
      return list;
    };

  });

})();
