/**
 * Created by wangg5 on 6/1/15.
 */

(function() {
    'use strict';

    angular.module('Constants', [])
        .constant('HOST', 'http://localhost/')
        .constant('URL_CONFIGS', {
            //relative urls to the host
            'ORG_LIST' : '/ctrp/organizations.json',
            'AN_ORG' : '/ctrp/organizations/',
            'SEARCH_ORG' : '/ctrp/organizations/search.json',
            'COUNTRY_LIST' : '/ctrp/countries.json',
            'STATES_IN_COUNTRY' : '/ctrp/states.json?country='
        });

})();