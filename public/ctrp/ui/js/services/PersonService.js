/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('PersonService', PersonService);

    PersonService.$inject = ['PromiseService', 'URL_CONFIGS','$log', '$rootScope', 'PromiseTimeoutService'];

    function PersonService(PromiseService, URL_CONFIGS, $log, $rootScope, PromiseTimeoutService) {

        var initPersonSearchParams = {
            fname: "",
            mname: "",
            lname: "",
            //po_id: "",
            ctrp_id: "",
            source_context: "CTRP", //default
            source_id: "",
            source_status: "",
            prefix: "",
            suffix: "",
            email: "",
            phone: "",
            startDate: "",  //updated_at
            endDate: "",   //updated_at
            date_range_arr: [],

            //for pagination and sorting
            sort: "updated_at",
            order: "DESC",
            rows: 10,
            start: 1
            }; //initial Person Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 50,
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
                {name: 'id', enableSorting: true, displayName: 'CTRP ID', width: '7%'},
                {name: 'fname', displayName: 'First', enableSorting: true, width: '8%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'mname', displayName: 'Middle', enableSorting: true, width: '5%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'lname', displayName: 'Last', enableSorting: true, width: '6%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'source_context', displayName: 'Source Context', enableSorting: true, width: '7%'},
                {name: 'source_id', displayName: 'Source ID', enableSorting: true, width: '10%'},
                {name: 'source_status', displayName: 'Source Status', enableSorting: true, width: '5%'},
                {name: 'prefix', enableSorting: true, width: '6%'},
                {name: 'suffix', enableSorting: true, width: '4%'},
                {name: 'email', enableSorting: true, width: '10%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phone', enableSorting: true, width: '6%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'affiliated_orgs_first5', displayName:'Affiliated Orgs',cellTemplate:'<div ng-if="row.entity.affiliated_orgs_first5.length > 0"><master-directive button-label="Click to see" mod="row.entity.affiliated_orgs_first5"></master-directive></div>' +
                '<div class="text-center" ng-show="row.entity.affiliated_orgs_first5.length == 0">--</div>'},
                {name: 'updated_at', displayName: 'Last Updated', type: 'date', cellFilter: 'date: "dd-MMM-yyyy H:mm"', enableSorting: true, width: '14%'}
            ]
        };

        var services = {
            getAllPeople : getAllPeople,
            getPersonById : getPersonById,
            upsertPerson : upsertPerson,
            searchPeople : searchPeople,
            getInitialPersonSearchParams : getInitialPersonSearchParams,
            getGridOptions : getGridOptions,
            getSourceContexts : getSourceContexts,
            getSourceStatuses : getSourceStatuses,
            deletePerson : deletePerson,
            getPoAffStatuses : getPoAffStatuses,
            curatePerson : curatePerson
        };

        return services;



        /*********************** implementations *****************/

        function getAllPeople() {
            return PromiseService.getData(URL_CONFIGS.PERSON_LIST);
        } //getAllPeople


        function getPersonById(personId) {
            return PromiseService.getData(URL_CONFIGS.A_PERSON + personId + '.json');
        } //getPersonById


        /**
         * Update or insert a new person
         *
         * @param personObj
         * @returns {*}
         */
        function upsertPerson(personObj) {
            if (personObj.new) {
                //create a new person
                $log.info('creating n person: ' + JSON.stringify(personObj));
                return PromiseService.postDataExpectObj(URL_CONFIGS.PERSON_LIST, personObj);
            }

            //update an existing person
            var configObj = {}; //empty config
            return PromiseService.updateObj(URL_CONFIGS.A_PERSON + personObj.person.id + ".json", personObj, configObj);
        } //upsertPerson



        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * fname, lname, po_id, source_id, source_status, prefix, suffix, email, phone
         *
         * @returns Array of JSON objects
         */
        function searchPeople(searchParams) {
            if (!!searchParams) {
                return PromiseService.postDataExpectObj(URL_CONFIGS.SEARCH_PERSON, searchParams);
            }
        } //searchPeople




        /**
         * get initial paramater object for people search
         * @return initPersonSearchParams
         */
        function getInitialPersonSearchParams() {
            return initPersonSearchParams;
        } //getInitialPersonSearchParams



        function getGridOptions() {
            return gridOptions;
        }

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
            return PromiseService.getData(URL_CONFIGS.SOURCE_CONTEXTS);
        } //getSourceContexts

        /**
         * retrieve source statuses from backend service
         * @return {promise}
         */
        function getSourceStatuses() {
            return PromiseService.getData(URL_CONFIGS.SOURCE_STATUSES);
        } //getSourceStatuses


        /**
         * delete an person with the given personId
         *
         * @param personId
         * @returns {*}
         */
        function deletePerson(personId) {
            return PromiseService.deleteObjFromBackend(URL_CONFIGS.A_PERSON + personId + ".json");
        }


        /**
         * Retrieve PoAffiliationStatuses
         * @returns {*}
         */
        function getPoAffStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PO_AFF_STATUSES);
        }


        /**
         * Nullify a person and merge his/her association to the retained person
         *
         * @param curationObject, JSON object: {'id_to_be_nullified': '', 'id_to_be_retained': ''}
         */
        function curatePerson(curationObject) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.CURATE_PERSON, curationObject);
        }




    }


})();