(function() {
    'use strict';

    angular.module('ctrp.module.dataservices', [
        'ctrp.module.constants',
        'ctrp.module.common',
        'ctrp.module.PromiseTimeoutService',
        'ctrp.module.PromiseService',
        'LocalCacheModule',
        'toastr',
        'ui.bootstrap',
        'ctrp.module.dateservice',
        'ctrp.module.underscoreWrapper',
        'ctrp.module.timeout',
        'angularMoment',
        'ngFileUpload'
    ]);

})();
