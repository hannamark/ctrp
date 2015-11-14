/**
 * PO section of the CTRP app
 */

(function() {
    'use strict';
    angular.module('ctrp.app.po', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',

        /* Cross-app modules */
        'ctrp.app.routes',
        'ctrp.module.constants',
        'ctrp.module.common',
        'ctrp.module.underscoreWrapper',
        'LocalCacheModule',
        'ctrpApp.widgets',
        'ctrp.module.dataservices',

        /* 3rd-party modules */
        'ui.bootstrap',
        'ngMaterial',
        'toastr',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.scrollpoint',
        'ngFileUpload',
        'angularMoment',
        'ncy-angular-breadcrumb'
    ]);
})();
