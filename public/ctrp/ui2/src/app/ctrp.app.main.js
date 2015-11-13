(function() {
    'use strict';

    angular.module('ctrp.app.main', [
        /* ctrp cross-app modules */

        /* ctrp feature modules */
        'ctrp.app.po',
        'ctrp.app.routes'
    ]).run(function() {
        console.log('ctrp.app.main is running');
    });

})();
