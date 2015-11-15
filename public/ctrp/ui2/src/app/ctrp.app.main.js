(function() {
    'use strict';

    angular.module('ctrp.app.main', [
        /* ctrp cross-app modules */
        'ctrp.module.routes',
        /* ctrp feature modules */
        'ctrp.app.pa',
        'ctrp.app.po',
        'ctrp.app.user',
        'ctrp.app.layout'
    ]).run(function() {
        console.log('ctrp.app.main is running');
    });

})();
