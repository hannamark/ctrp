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
            'SOURCE_CONTEXTS' : '/ctrp/source_contexts.json',
            'SOURCE_STATUSES' : '/ctrp/source_statuses.json',
            'PERSON_LIST': '/ctrp/people.json',
            'A_PERSON': '/ctrp/people/',
            'CURATE_PERSON' : '/ctrp/people/curate',
            'PO_AFF_STATUSES' : '/ctrp/po_affiliation_statuses.json',
            'SEARCH_PERSON': '/ctrp/people/search.json',
            'A_FAMILY': '/ctrp/families/',
            'FAMILY_LIST': '/ctrp/families.json',
            'SEARCH_FAMILY': '/ctrp/families/search.json',
            'FAMILY_STATUSES':'/ctrp/family_statuses.json',
            'FAMILY_TYPES':'/ctrp/family_types.json',
            'FAMILY_RELATIONSHIPS' :'/ctrp/family_relationships.json'
        })
        .constant('MESSAGES', {
           'STATES_AVAIL' : 'states_or_provinces_available',
            'STATES_UNAVAIL' : 'states_or_provinces_not_available'
        });

})();