(function() {
    'use strict';

    angular.module('ctrp.app.user', [
        /* ctrp cross-app modules */
        'ctrp.module.constants',
        'ctrp.module.common',
        'LocalCacheModule',
        'toastr',
        'ui.bootstrap',
        'ctrp.module.dataservice',
        'ctrp.module.underscoreWrapper',
        'angularMoment',

        /* ctrp feature modules */
        'ctrp.app.routes',

    ]);

})();
