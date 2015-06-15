/**
 * Created by wangg5 on 6/1/15.
 */

(function() {
    'use strict';

    angular.module('Constants', [])
        .constant('HOST', 'http://localhost/')
        .constant('URL_CONFIGS', {
            'ORG_LIST' : 'http://localhost/ctrp/organizations.json',
            'AN_ORG' : 'http://localhost/ctrp/organizations/'
        });

})();