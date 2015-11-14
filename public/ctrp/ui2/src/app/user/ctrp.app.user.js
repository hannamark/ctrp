(function() {
    'use strict';

    angular.module('ctrp.app.user', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',

        /* ctrp cross-app modules */
        'ctrp.module.constants',
        'ctrp.module.common',
        'LocalCacheModule',
        'ctrpApp.widgets',
        'ctrp.module.dataservice',
        'ctrp.module.underscoreWrapper',

        /* ctrp feature modules */
        'ctrp.app.routes',

        /* 3rd party */
        'toastr',
        'ui.bootstrap',
        'angularMoment'
    ]);

})();
