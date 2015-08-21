/**
 * Created by wus4 on 8/14/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('TrialService', TrialService);

    TrialService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_', 'Common', '$rootScope', 'PromiseTimeoutService'];

    function TrialService(URL_CONFIGS, MESSAGES, $log, _, Common, $rootScope, PromiseTimeoutService) {

        var initTrialSearchParams = {
            lead_protocol_id: "",
            official_title: "",

            //for pagination and sorting
            sort: "",
            order: "",
            rows: 10,
            start: 1
            }; //initial Trial Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 50,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            paginationPageSizes: [10, 25, 50, 100],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            columnDefs: [
                {name: 'lead_protocol_id', enableSorting: true, displayName: 'Lead Protocol ID', width: '100%'}
            ]
        };

        var services = {
            getAllTrials: getAllTrials,
            getTrialById: getTrialById,
            upsertTrial: upsertTrial,
            searchTrials: searchTrials,
            getInitialTrialSearchParams: getInitialTrialSearchParams,
            getGridOptions: getGridOptions,
            getPhases: getPhases,
            getResearchCategories: getResearchCategories,
            getPrimaryPurposes: getPrimaryPurposes,
            getSecondaryPurposes: getSecondaryPurposes,
            getResponsibleParties: getResponsibleParties,
            deleteTrial: deleteTrial
        };

        return services;



        /*********************** implementations *****************/

        function getAllTrials() {
            return PromiseService.getData(URL_CONFIGS.TRIAL_LIST);
        } //getAllTrials

        function getTrialById(trialId) {
            console.log("calling getTrialById in TrialService");
            //return PromiseService.getData(URL_CONFIGS.AN_TRIAL + trialId + '.json');
            return PromiseTimeoutService.getData(URL_CONFIGS.A_TRIAL + trialId + '.json');
        } //getTrialById

        /**
         * Update or insert a new trial
         *
         * @param trialObj
         * @returns {*}
         */
        function upsertTrial(trialObj) {
            if (trialObj.new) {
                //create a new trial
                $log.info('creating an trial: ' + JSON.stringify(trialObj));
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_LIST, trialObj);
            }

            //update an existing trial
            var configObj = {}; //empty config
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_TRIAL + trialObj.id + ".json", trialObj, configObj);
        } //upsertTrial

        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchTrials(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_TRIAL, searchParams);
            }
        } //searchTrials

        /**
         * get initial paramater object for trials search
         * @return initTrialSearchParams
         */
        function getInitialTrialSearchParams() {
            return initTrialSearchParams;
        } //getInitialTrialSearchParams

        function getGridOptions() {
            return gridOptions;
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

        function getPhases() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PHASES);
        }

        function getResearchCategories() {
            return PromiseTimeoutService.getData(URL_CONFIGS.RESEARCH_CATEGORIES);
        }

        function getPrimaryPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PRIMARY_PURPOSES);
        }

        function getSecondaryPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SECONDARY_PURPOSES);
        }

        function getResponsibleParties() {
            return PromiseTimeoutService.getData(URL_CONFIGS.RESPONSIBLE_PARTIES);
        }

        /**
         * delete an trial with the given trialId
         *
         * @param trialId
         * @returns {*}
         */
        function deleteTrial(trialId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.A_TRIAL + trialId + ".json");
        }
    }
})();