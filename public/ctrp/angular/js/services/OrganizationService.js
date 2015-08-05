/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('OrgService', OrgService);

    OrgService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService'];

    function OrgService(URL_CONFIGS, MESSAGES, $log,
                        GeoLocationService, Common, $rootScope,
                        PromiseTimeoutService) {

        var statesOrProvinces = [];
        var initOrgSearchParams = {
            name : "",
            alias: true,
            po_id : "",
            source_id : "",
            source_status : "",
            family_name : "",
            address : "",
            address2 : "",
            city : "",
            state_province : "",
            country : "United States", //default country
            email : "",
            postal_code : "",
            phone: "",

            //for pagination and sorting
            sort: "",
            order: "",
            rows: 10,
            start: 1
            }; //initial Organization Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            rowHeight: 50,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'id', enableSorting: true, displayName: 'PO ID', width: '7%'},
                {
                    name: 'name', enableSorting: true, width: '20%',
                    //this does not work for .id
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                 //   '<a href="angular#/main/organizations/{{row.entity.id}}">' +
                 //   '<a ui-sref="main.orgDetail({orgId: row.entity.id })">' +   //this is preferred, but does not work now.
                 //   '{{row.entity.name}} ' +
                    '<a ui-sref="main.orgDetail({orgId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'

                },

                {name: 'source_id', displayName: 'Source ID', enableSorting: true, width: '10%'},
                {name: 'source_status', displayName: 'Source Status', enableSorting: true, width: '13%'},
                {name: 'city', enableSorting: true, width: '10%'},
                {name: 'state_province', displayName: 'State', enableSorting: true, width: '12%'},
                {name: 'email', enableSorting: true, width: '18%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phone', enableSorting: true, width: '10%'}

            ]
        };

        var services = {
            getAllOrgs : getAllOrgs,
            getOrgById : getOrgById,
            upsertOrg : upsertOrg,
            searchOrgs : searchOrgs,
            getInitialOrgSearchParams : getInitialOrgSearchParams,
            getGridOptions : getGridOptions,
            watchCountrySelection : watchCountrySelection,
            getStatesOrProvinces : getStatesOrProvinces,
            getSourceStatuses : getSourceStatuses,
            deleteOrg : deleteOrg
        };

        return services;



        /*********************** implementations *****************/

        function getAllOrgs() {
            return PromiseService.getData(URL_CONFIGS.ORG_LIST);
        } //getAllOrgs


        function getOrgById(orgId) {
            console.log("calling getOrgById in OrgService");
            //return PromiseService.getData(URL_CONFIGS.AN_ORG + orgId + '.json');
            return PromiseTimeoutService.getData(URL_CONFIGS.AN_ORG + orgId + '.json');
        } //getOrgById


        /**
         * Update or insert a new organization
         *
         * @param orgObj
         * @returns {*}
         */
        function upsertOrg(orgObj) {
            if (orgObj.new) {
                //create a new org
                $log.info('creating an organization: ' + JSON.stringify(orgObj));
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ORG_LIST, orgObj);
            }

            //update an existing organization
            var configObj = {}; //empty config
            return PromiseTimeoutService.updateObj(URL_CONFIGS.AN_ORG + orgObj.id + ".json", orgObj, configObj);
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
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_ORG, searchParams);
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
         * Return a watcher for the selected country name
         * @returns {Function}
         */
        function watchCountrySelection() {
            return function(countryName) {
                if (countryName) {

                   // console.log("countryName: " + countryName + ", calling GeoLocationService");
                    GeoLocationService.getStateListInCountry(countryName)
                        .then(function (response) {
                            statesOrProvinces = response;

                            //states or provinces are not available
                            if (statesOrProvinces.length == 0) {
                                broadcastMsg(MESSAGES.STATES_UNAVAIL, 'states or provinces are not available');
                                return;
                            }
                            statesOrProvinces.sort(Common.a2zComparator());
                            broadcastMsg(MESSAGES.STATES_AVAIL, 'come get your states or provinces');
                        }).catch(function (err) {
                            $log.info("error in retrieving states for country: " + countryName);
                        });
                } else {
                    //countryName is not set
                    broadcastMsg(MESSAGES.STATES_UNAVAIL, 'states or provinces are not available');
                }
            };
        } //watchCountrySelection



        /**
         *
         * @returns {Array}, sorted A-Z
         */
        function getStatesOrProvinces() {
            return statesOrProvinces;
        }



        /**
         * A helper function:
         * Use $rootScope to broadcast messages
         * @param msgCode
         * @param msgContent
         */
        function broadcastMsg(msgCode, msgContent) {
            $rootScope.$broadcast(msgCode, {content: msgContent});
        } //broadcastMsg


        /**
         * retrieve source statuses from backend service
         * @return {promise}
         */
        function getSourceStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SOURCE_STATUSES);
        } //getSourceStatuses


        /**
         * delete an organization with the given orgId
         *
         * @param orgId
         * @returns {*}
         */
        function deleteOrg(orgId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.AN_ORG + orgId + ".json");
        }




    }


})();