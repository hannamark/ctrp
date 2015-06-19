/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('OrgService', OrgService);

    OrgService.$inject = ['PromiseService', 'URL_CONFIGS', '$log'];

    function OrgService(PromiseService, URL_CONFIGS, $log) {

        var initOrgSearchParams = {
            name : "",
            po_id : "",
            source_id : "",
            source_status : "",
            family_name : "",
            address : "",
            address2 : "",
            city : "",
            state_province : "",
            country : "",
            email : "",
            postal_code : "",

            //for pagination and sorting
            sort: "",
            order: "",
            rows: 10,
            start: 1,
            total: ""
            }; //initial Organization Search Parameters

        var services = {
            getAllOrgs : getAllOrgs,
            getOrgById : getOrgById,
            upsertOrg : upsertOrg,
            searchOrgs : searchOrgs,
            getInitialOrgSearchParams : getInitialOrgSearchParams
        };

        return services;



        /*********************** implementations *****************/

        function getAllOrgs() {
            return PromiseService.getData(URL_CONFIGS.ORG_LIST);
        } //getAllOrgs


        function getOrgById(orgId) {
            return PromiseService.getData(URL_CONFIGS.AN_ORG + orgId + '.json');
        } //getOrgById


        /**
         * Update or insert a new organization
         *
         * @param orgObj
         * @returns {*}
         */
        function upsertOrg(orgObj) {
            if (!!orgObj.id) {
                var configObj = {}; //empty config
                return PromiseService.updateObj(URL_CONFIGS.AN_ORG + orgObj.id + ".json", orgObj, configObj);
            }

            //create a new org
            $log.info('creating an organization: ' + JSON.stringify(orgObj));
            return PromiseService.postDataExpectObj(URL_CONFIGS.ORG_LIST, orgObj);

        } //upsertOrg


        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchOrgs(searchParams) {
            if (!!searchParams) {
                return PromiseService.postDataExpectObj(URL_CONFIGS.SEARCH_ORG, searchParams);
            }
        } //searchOrgs


        /**
         * get initial paramater object for organizations search
         * @return initOrgSearchParams
         */
        function getInitialOrgSearchParams() {
            return initOrgSearchParams;
        } //getInitialOrgSearchParams

    }


})();