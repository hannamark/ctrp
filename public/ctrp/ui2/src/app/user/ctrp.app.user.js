(function() {
    'use strict';

    angular.module('ctrp.app.user', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',

        /* ctrp cross-app modules */
        'ctrp.app.routes',
        'ctrp.module.constants',
        'ctrp.module.common',
        'LocalCacheModule',
        'ctrpApp.widgets',
        'ctrp.module.dataservices',
        'ctrp.module.underscoreWrapper',


        /* 3rd party */
        'ui.bootstrap',
        'ngMaterial',
        'toastr',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.scrollpoint',
        'ngFileUpload',
        'angularMoment'
    ]);

})();
