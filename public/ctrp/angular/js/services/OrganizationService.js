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
            start: 1
            }; //initial Organization Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            rowHeight: 60,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,  //disabled for now
            columnDefs: [
                {name: 'id', enableSorting: true, displayName: 'PO ID', width: '10%'},
                {
                    name: 'name', enableSorting: true, width: '35%',
                    //this does not work for .id
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a href="angular#/main/organizations/{{row.entity.id}}">' +
//                    '<a ui-sref="main.orgDetail({orgId: \'{{row.entity.id}}\' })">' +   //this is preferred, but does not work now.
                    '{{row.entity.name}} </a></div>'
//                    '<a ui-sref="main.orgDetail({orgId : \'{{row.entity.id}}\' })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },

                {name: 'source_id', displayName: 'Source ID', enableSorting: true, width: '25%'},
                {name: 'city', enableSorting: true, width: '15%'},
                {name: 'state', enableSorting: true, width: '15%'}

            ]
        };

        var services = {
            getAllOrgs : getAllOrgs,
            getOrgById : getOrgById,
            upsertOrg : upsertOrg,
            searchOrgs : searchOrgs,
            getInitialOrgSearchParams : getInitialOrgSearchParams,
            getGridOptions : getGridOptions,
            a2zComparator : a2zComparator
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



        function getGridOptions() {
            return gridOptions;
        }


        /**
         * A-Z Comparator for sorting an array of JSON objects
         * by the 'name' field in each JSON object
         *
         */
        function a2zComparator() {
            var compare = function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            }

            return compare;
        } //a2zComparator

    }


})();