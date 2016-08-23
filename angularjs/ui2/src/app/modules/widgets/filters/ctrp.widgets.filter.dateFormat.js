(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .filter('dateFormat', function() {
    return function(d, currentFormat, nFormat) {
        var curFormat = currentFormat ? currentFormat : 'YYYY-MM-DD';
        var newFormat = nFormat ? nFormat : 'DD-MMM-YYYY';
        var date;

        if (typeof d === 'object') {
            date = moment(d).format(newFormat);
        } else {
            date = moment(d, 'DD-MMM-YYYY', true).isValid() ? d : moment(d, curFormat).format(newFormat);
        }

        return date;
    };
  });
})();
