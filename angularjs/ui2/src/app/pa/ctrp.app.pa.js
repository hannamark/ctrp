/**
 * PO section of the CTRP app
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa', [
        /* Angular modules */

        /* Cross-app modules */
        'ctrp.app.pa.dashboard',
        'ctrp.app.pa.search',
        'ctrp.module.routes',

        /* 3rd-party modules */
        'ui.select'
    ]);
})();
