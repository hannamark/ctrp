(function() {
    'use strict';

    angular.module('ctrp.app.layout', [
        /* ctrp cross-app modules */
        'ctrp.module.timeout',
        'ctrp.module.dataservices',
        'ctrp.module.common',
        'ctrp.module.constants',
        'ctrp.module.underscoreWrapper',

        /* ctrp feature modules */
        'ctrp.app.routes'
    ]);

})();
