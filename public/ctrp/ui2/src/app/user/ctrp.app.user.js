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
        'ctrp.module.dataservice',
        'ctrp.module.underscoreWrapper',


        /* 3rd party */
        'ui.router',
        'ngMaterial',
        'toastr',
        'ui.bootstrap',
        'angularMoment'
    ]);

})();
