/**
 * Created by wus4 on 7/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('FamilyService', FamilyService);

    FamilyService.$inject = ['PromiseService', 'URL_CONFIGS','$log', '$rootScope'];

    function FamilyService(PromiseService, URL_CONFIGS, $log, $rootScope) {

        var initFamilySearchParams = {
            name: "",
            id: "",
            family_status:"",
            family_type:"",
            //for pagination and sorting
            sort: "",
            order: "",
            rows: 10,
            start: 1
        }; //initial Family Search Parameters

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
                {name: 'id', enableSorting: true, displayName: 'Family ID', width: '7%'},
                {name: 'name', enableSorting: true, width: '20%%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.familyDetail({familyId : row.entity.id })">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'family_status', displayName: 'Family Status', enableSorting: true, width: '10%'},
                {name: 'family_type', displayName: 'Family Type', enableSorting: true, width: '10%'},
                { name: 'aff_orgs',cellTemplate:'<button class="btn primary"  ng-mouseover="grid.appScope.showOrgs(row.entity.id)">Show Organizations</button>' }
                /*{name:'aff_orgs',displayName: 'Family Memeberships',
                    cellTemplate:'<button ng-bind="row.entity.id" popover-placement="right"  Popover-animation="true" popover-trigger="mouseenter" popover-template="grid.appScope.dynamicPopover.templateUrl" popover-title="{{grid.appScope.dynamicPopover.title}}" type="button" class="btn btn-default">Show Orgs</button>'}

                /*{name:'aff' ,displayName:'Family Members',
                cellTemplate:'<div> <span grid.appScope.custom-popover popover-html="Some Popover Text" popover-placement="right" popover-label="Label"></span>'}*/
            ]
        };

        var services = {
            getAllFamilies : getAllFamilies,
            getFamilyById : getFamilyById,
            upsertFamily : upsertFamily,
            searchFamilies : searchFamilies,
            getInitialFamilySearchParams : getInitialFamilySearchParams,
            getGridOptions : getGridOptions,
            deleteFamily : deleteFamily,
            getFamilyStatuses : getFamilyStatuses,
            getFamilyTypes : getFamilyTypes,
            getFamilyRelationships :getFamilyRelationships,
            getAffiliatedOrgsByFamilyId :getAffiliatedOrgsByFamilyId
        };

        return services;



        /*********************** implementations *****************/
        function sample() {
            var scope = angular.element(document.getElementById('container')).scope();
            scope.$apply(function(){
                scope.msg = scope.msg + ' I am the newly addded message from the outside of the controller.';
            })
            alert(scope.returnHello());
        }

        function getAllFamilies() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_LIST);
        } //getAllPeople


        function getFamilyById(familyId) {
            return PromiseService.getData(URL_CONFIGS.A_FAMILY + familyId + '.json');
        } //getFamilyById

        function getAffiliatedOrgsByFamilyId(familyId) {
            return PromiseService.getData(URL_CONFIGS.A_FAMILY + familyId + '/get_orgs.json');
        }
        /**
         * Update or insert a new family
         *
         * @param familyObj
         * @returns {*}
         */
        function upsertFamily(familyObj) {
            if (familyObj.new) {
                //create a new family
                $log.info('creating a family: ' + JSON.stringify(familyObj));
                return PromiseService.postDataExpectObj(URL_CONFIGS.FAMILY_LIST, familyObj);
            }

            //update an existing family
            var configObj = {}; //empty config
            return PromiseService.updateObj(URL_CONFIGS.A_FAMILY + familyObj.id + ".json", familyObj, configObj);
        } //upsertfamily




        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchFamilies(searchParams) {
            if (!!searchParams) {
                return PromiseService.postDataExpectObj(URL_CONFIGS.SEARCH_FAMILY, searchParams);
            }
        } //searchPeople




        /**
         * get initial paramater object for people search
         * @return initFamilySearchParams
         */
        function getInitialFamilySearchParams() {
            return initFamilySearchParams;
        } //getInitialFamilySearchParams



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
         * retrieve family statuses from backend service
         * @return {promise}
         */
        function getFamilyStatuses() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_STATUSES);
        } //getFamilyStatuses

        /**
         * retrieve family types from backend service
         * @return {promise}
         */
        function getFamilyTypes() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_TYPES);
        } //getFamilyStatuses

        function getFamilyRelationships() {
            return PromiseService.getData(URL_CONFIGS.FAMILY_RELATIONSHIPS);
        }

        /**
         * delete an family with the given familyId
         *
         * @param familyId
         * @returns {*}
         */
        function deleteFamily(familyId) {
            return PromiseService.deleteObjFromBackend(URL_CONFIGS.A_FAMILY + familyId + ".json");
        }




    }


})();