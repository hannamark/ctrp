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
        /*
        'ctrp.module.constants',
        'ctrp.module.common',
        'ctrp.module.PromiseTimeoutService',
        'ctrp.module.PromiseService',
        'ctrp.module.dateservice',
        'ctrp.module.underscoreWrapper',
        'ctrp.module.timeout',
        'LocalCacheModule',
        'ctrpApp.widgets',
        'ctrpForm',
        'ctrp.module.dataservices'
        */

        /* 3rd-party modules */
        'ui.router',
        'ui.bootstrap',
        'ngMaterial',
        'toastr',
        'ncy-angular-breadcrumb',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.scrollpoint',
        //'ngFileUpload',
        'angularMoment',

    ]);
})();
