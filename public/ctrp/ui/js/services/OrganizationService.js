/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('OrgService', OrgService);

    OrgService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService'];

    function OrgService(URL_CONFIGS, MESSAGES, $log, _,
                        GeoLocationService, Common, $rootScope,
                        PromiseTimeoutService) {

        var statesOrProvinces = [];
        var initOrgSearchParams = {
            name : "",
            alias: true,
            // po_id : "",
            ctrp_id : "",
            source_context : "",
            source_id : "",
            source_status : "",
            family_name : "",
            address : "",
            address2 : "",
            city : "",
            state_province : "",
            country : "", //default country ? United States ?
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
            totalItems: null,
            rowHeight: 60,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            //enableRowSelection: false,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'Nullify', displayName: 'Nullify', enableSorting: false, enableFiltering: false, width: '6%',
                    cellTemplate: '<div ng-if="row.isSelected"><input type="radio" name="nullify" ng-click="grid.appScope.nullifyEntity(row.entity)"></div>',
                    visible: false
                },
                {name: 'ctrp_id', displayName: 'CTRP ID', enableSorting: true, width: '8%'},
                {
                    name: 'name', enableSorting: true, width: '25%',
                    //this does not work for .id
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                 //   '<a href="angular#/main/organizations/{{row.entity.id}}">' +
                 //   '<a ui-sref="main.orgDetail({orgId: row.entity.id })">' +   //this is preferred, but does not work now.
                 //   '{{row.entity.name}} ' +
                    '<a ui-sref="main.orgDetail({orgId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'

                },
                {name: 'ctep_id', displayName: 'CTEP ID', enableSorting: true, width: '8%'},
                {name: 'source_context', displayName: 'Source Context', enableSorting: true, width: '7%'},
                {name: 'source_id', displayName: 'Source ID', enableSorting: true, width: '10%'},
                {name: 'source_status', displayName: 'Source Status', enableSorting: true, width: '8%'},
                {name: 'aff_families_names', displayName: 'Families', enableSorting: true, width: '15%',height: '50%',
                    cellTemplate: '<div class="ngCellText" ng-repeat="fam in row.entity.aff_families_names">{{fam.Name}}</div>'
                },
                /* {name: 'aff_families_names', displayName: 'Families', enableSorting: true, width: '8%',
                   cellTemplate: '<button uib-popover="{{COL_FIELD CUSTOM_FILTERS}}" popover-placement="left" type="button" popover-trigger="mouseenter" class="btn btn-default">Family</button>',
               },*/
                {name: 'city', enableSorting: true, width: '10%'},
                {name: 'state_province', displayName: 'State', enableSorting: true, width: '9%'},
                {name: 'country', displayName: 'Country', enableSorting: true, width:'9%'},
                {name: 'postal_code', displayName: 'Postal Code', enableSorting: true, width:'8%'},
                {name: 'phone', enableSorting: true, width: '10%'},
                {name: 'email', enableSorting: true, width: '10%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },

                {name: 'created_by', displayName: 'Curator Name', enableSorting: true, width: '10%'},

                {name: 'created_at', displayName: 'Curator Date', type: 'date', cellFilter: 'date: "dd-MMM-yyyy H:mm"', enableSorting: true, width: '14%'}


            ]
        };

        var services = {
            getAllOrgs: getAllOrgs,
            getOrgById: getOrgById,
            upsertOrg: upsertOrg,
            searchOrgs: searchOrgs,
            getInitialOrgSearchParams: getInitialOrgSearchParams,
            getGridOptions: getGridOptions,
            watchCountrySelection: watchCountrySelection,
            getStatesOrProvinces: getStatesOrProvinces,
            getSourceContexts: getSourceContexts,
            getSourceStatuses: getSourceStatuses,
            deleteOrg: deleteOrg,
            indexOfOrganization: indexOfOrganization,
            preparePOAffiliationArr: preparePOAffiliationArr,
            initSelectedOrg: initSelectedOrg,
            curateOrg: curateOrg,
            findContextId: findContextId
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
         * retrieve source contexts from backend service
         * @return {promise}
         */
        function getSourceContexts() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SOURCE_CONTEXTS);
        } //getSourceContexts

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





        /**
         * Check if targetOrgsArr contains orgObj by checking the 'id' field
         *
         * @param targetOrgsArr
         * @param orgObj
         * @returns {Integer} index
         */
        function indexOfOrganization(targetOrgsArr, orgObj) {
            var index = -1;
            _.each(targetOrgsArr, function (org, idx) {
                if (org.id == orgObj.id) { //what if the user deletes the po_affiliation accidentally???
                    index = idx;
                    return;
                }
            });
            return index;
        } //indexOfOrganization


        /**
         * Clean up the organization by keeping the essential fields
         * (org_id, affiliate_status, effective_date, expiration_date)
         *
         *
         * @param savedSelectionArr
         * @returns {Array}
         */
        function preparePOAffiliationArr(savedSelectionArr) {
            var results = [];
            _.each(savedSelectionArr, function (org) {
                var cleanedOrg = {
                    "organization_id": org.id,
                    "po_affiliation_status_id": org.po_affiliation_status_id,
                    "effective_date": org.effective_date,
                    "expiration_date": org.expiration_date,
                    "id" : org.po_affiliation_id || '',
                    "lock_version": org.lock_version,
                    "_destroy" : org._destroy
                };
                results.push(cleanedOrg);
            });

            return results;
        } //preparePOAffiliationArr


        /**
         * Initialize the selected organization for its affiliation status, po_effective_date
         * po_expiration_date, etc
         *
         * @param org
         * @returns org
         */
        function initSelectedOrg(org) {
            org.po_affiliation_status_id = '';
            org.effective_date = new Date(); //today as the effective date
            org.expiration_date = "";
            org.opened_effective = false;
            org.opened_expiration = false;
            org._destroy = false;

            return org;
        } //initSelectedOrg

        /**
         * Nullify a Organization and merge his/her association to the retained Organizations
         *
         * @param curationObject, JSON object: {'id_to_be_nullified': '', 'id_to_be_retained': ''}
         */
        function curateOrg(curationObject) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CURATE_ORG, curationObject);
        }


        /**
         * From the array of context (array of JSON objects), locate the context id for the contextName
         *
         * @param ctrpContextArr
         * @param key, String
         * @param contextName, String (e.g. 'CTRP')
         * @returns {number}
         */
        function findContextId(ctrpContextArr, key, contextName) {
            var ctrpContextId = -1; //not found
            var needleIndex = Common.indexOfObjectInJsonArray(ctrpContextArr, key, contextName);
            if (needleIndex > -1) {
                ctrpContextId = ctrpContextArr[needleIndex].id || -1;
            }
            return ctrpContextId;
        }


    }


})();
