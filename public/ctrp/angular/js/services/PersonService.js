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
            source_context: "",
            source_id: "",
            source_status: "",
            prefix: "",
            suffix: "",
            email: "",
            phone: "",

            //for pagination and sorting
            sort: "",
            order: "",
            rows: 10,
            start: 1
            }; //initial Person Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 50,
            enableRowSelection: false,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'Nullify', displayName: 'Nullify', enableSorting: false, enableFiltering: false, width: '6%',
                    cellTemplate: '<div ng-if="row.isSelected"><input type="radio" name="nullify"></div>',
                    visible: false
                },
                {name: 'id', enableSorting: true, displayName: 'PO ID', width: '7%'},
                {name: 'fname', displayName: 'First Name', enableSorting: true, width: '8%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'lname', displayName: 'Last Name', enableSorting: true, width: '10%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.personDetail({personId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'source_context', displayName: 'Source Context', enableSorting: true, width: '7%'},
                {name: 'source_id', displayName: 'Source ID', enableSorting: true, width: '10%'},
                {name: 'source_status', displayName: 'Source Status', enableSorting: true, width: '10%'},
                {name: 'prefix', enableSorting: true, width: '6%'},
                {name: 'suffix', enableSorting: true, width: '6%'},
                {name: 'email', enableSorting: true,
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phone', enableSorting: true, width: '10%'}
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
            getPoAffStatuses : getPoAffStatuses
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
                $log.info('creating an person: ' + JSON.stringify(personObj));
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




    }


})();