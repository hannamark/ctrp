/**
 * Created by wangg5 on 6/1/15.
 */

(function() {
    'use strict';

    angular.module('ctrp.module.constants', [])
        .constant('HOST', 'http://localhost') //TODO: to be replaced with production server url
        .constant('URL_CONFIGS', {
            //relative urls to the host
            'ORG_LIST': '/ctrp/organizations.json',
            'AN_ORG': '/ctrp/organizations/',
            'SEARCH_ORG': '/ctrp/organizations/search.json',
            'CURATE_ORG': '/ctrp/organizations/curate',
            'UNIQUE_ORG': '/ctrp/organizations/unique',
            'COUNTRY_LIST': '/ctrp/countries.json',
            'STATES_IN_COUNTRY': '/ctrp/states.json?country=',
            'SOURCE_CONTEXTS': '/ctrp/source_contexts.json',
            'SOURCE_STATUSES': '/ctrp/source_statuses.json',
            'A_USER': '/ctrp/users/',
            'A_USER_SIGNUP': '/ctrp/sign_up',
            'A_USER_CHANGEPASSWORD': '/ctrp/change_password',
            'USER_GSA': '/ctrp/users/gsa',
            'SEARCH_USER': '/ctrp/users/search.json',
            'USER_LIST': '/ctrp/users.json',
            'PERSON_LIST': '/ctrp/people.json',
            'A_PERSON': '/ctrp/people/',
            'CURATE_PERSON': '/ctrp/people/curate',
            'PO_AFF_STATUSES': '/ctrp/po_affiliation_statuses.json',
            'SEARCH_PERSON': '/ctrp/people/search.json',
            'UNIQUE_PERSON': '/ctrp/people/unique',
            'A_FAMILY': '/ctrp/families/',
            'FAMILY_LIST': '/ctrp/families.json',
            'SEARCH_FAMILY': '/ctrp/families/search.json',
            'FAMILY_STATUSES':'/ctrp/family_statuses.json',
            'FAMILY_TYPES':'/ctrp/family_types.json',
            'FAMILY_RELATIONSHIPS':'/ctrp/family_relationships.json',
            'UNIQUE_FAMILY': '/ctrp/families/unique',
            'TRIAL_LIST': '/ctrp/registry/trials.json',
            'A_TRIAL': '/ctrp/registry/trials/',
            'SEARCH_TRIAL': '/ctrp/registry/trials/search.json',
            'STUDY_SOURCES': '/ctrp/registry/study_sources.json',
            'PROTOCOL_ID_ORIGINS': '/ctrp/registry/protocol_id_origins.json',
            'PHASES': '/ctrp/registry/phases.json',
            'RESEARCH_CATEGORIES': '/ctrp/registry/research_categories.json',
            'PRIMARY_PURPOSES': '/ctrp/registry/primary_purposes.json',
            'SECONDARY_PURPOSES': '/ctrp/registry/secondary_purposes.json',
            'ACCRUAL_DISEASE_TERMS': '/ctrp/registry/accrual_disease_terms.json',
            'RESPONSIBLE_PARTIES': '/ctrp/registry/responsible_parties.json',
            'FUNDING_MECHANISMS': '/ctrp/registry/funding_mechanisms.json',
            'INSTITUTE_CODES': '/ctrp/registry/institute_codes.json',
            'NCI': '/ctrp/registry/nci.json',
            'TRIAL_STATUSES': '/ctrp/registry/trial_statuses.json',
            'HOLDER_TYPES': '/ctrp/registry/holder_types.json',
            'NIH': '/ctrp/registry/nih.json',
            'EXPANDED_ACCESS_TYPES': '/ctrp/registry/expanded_access_types.json',
            'TRIAL_DOCUMENT_LIST': '/ctrp/registry/trial_documents.json',

            //for comments
            'COMMENTS': {
              'COUNTS_FOR_INSTANCE': '/ctrp/instance/{:instance_uuid}/comments/count.json', //can have optional:field
              'FOR_INSTANCE': '/ctrp/instance/{:instance_uuid}/comments.json', //can have optional:field
              'WITH_ID': '/ctrp/comments/{:id}.json',  //GET, DELETE, and PATCH or PUT
              'CREATE': '/ctrp/comments.json'
            },
        })
        .constant('MESSAGES', {
            'STATES_AVAIL': 'states_or_provinces_available',
            'STATES_UNAVAIL': 'states_or_provinces_not_available',
            'PRIVILEGE_CHANGED': 'user_privilege_changed',
            'CURATION_MODE_CHANGED': 'curation_mode_changed'
        })
        .constant('DMZ_UTILS', {
            'APP_VERSION': '/ctrp/dmzutils/app_version.json',
            'APP_REL_MILESTONE': '/ctrp/dmzutils/app_rel_milestone.json',
            'LOGIN_BULLETIN': '/ctrp/dmzutils/login_bulletin.json'
        })
        .constant('PRIVILEGES', {
            //key mirrors value
            'READONLY': 'READONLY',
            'CURATOR': 'CURATOR'
        });

})();
