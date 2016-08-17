(function() {
    'use strict';

    angular.module('ctrp.app.main', [
        /* ctrp 3rd-party modules */
        'toastr',
        /* ctrp cross-app modules */
        'ctrp.module.routes',
        /* ctrp feature modules */
        'ctrp.app.registry',
        'ctrp.app.pa',
        'ctrp.app.po',
        'ctrp.app.user',
        'ctrp.app.layout'
    ]).config(function(toastrConfig) {
      angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        timeOut: 3000,
        extendedTimeOut: 0
      });
}).run(function() {});
})();
