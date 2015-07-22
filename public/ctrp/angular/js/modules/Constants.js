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
            'STATES_IN_COUNTRY' : '/ctrp/states.json?country=',
            'SOURCE_STATUSES' : '/ctrp/source_statuses.json',
            'PERSON_LIST': '/ctrp/people.json',
            'A_PERSON': '/ctrp/people/',
            'SEARCH_PERSON': '/ctrp/people/search.json',
            'PO_AFF_STATUSES' : '/ctrp/po_affiliation_statuses.json'
        })
        .constant('MESSAGES', {
           'STATES_AVAIL' : 'states_or_provinces_available',
            'STATES_UNAVAIL' : 'states_or_provinces_not_available'
        });

})();