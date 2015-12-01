(function() {
  'use strict';

  angular.module('ctrpApp.widgets',[
    //angular modules
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',

    //third-party modules
    'angularMoment',
    'angularUtils.directives.dirPagination',

    //ctrp modules
    //'ctrpApp',
    'ctrp.module.dataservices',
    'ctrp.module.common',
    'ctrp.module.constants',
    'ctrp.module.PromiseTimeoutService'
  ]);

})();
