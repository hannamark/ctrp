/**
 * Created by wangg5 on 6/1/15.
 */



(function () {
    'use strict';
    angular.module('PromiseServiceModule', ['ngResource'])
        .factory('PromiseService', PromiseService);

    PromiseService.$inject = ['$http', '$q', '$resource', '$timeout', '$log'];

    function PromiseService($http, $q, $resource, $timeout, $log) {

        var services = {
            getData: getData,
            getDataV2: getDataV2,
            postDataExpectObj: postDataExpectObj,
            updateObj: updateObj,
            deleteObjFromBackend : deleteObjFromBackend
        };

        return services;


        /************** implementations below ************************/

        function getData(url) {
            var deferred = $q.defer();
            // $http.get( url , { headers: { 'Cache-Control' : 'no-cache' } } );
            return $http.get(url, {cache: false});
        }


        /**
         * Experimental only - for getting data with credentials
         *
         * @param url
         * @returns promise
         */
        function getDataV2(url) {
            return $http({
                url: url,
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }


        /**
         *
         * @param url
         * @param params: JSON object
         */
        function postDataExpectObj(url, params) {
            return $http.post(url, params);
        }


        /**
         * Perform PUT request to update object
         *
         * @param url
         * @param params
         * @param configObj
         * @returns {*}
         */
        function updateObj(url, params, configObj) {
            return $http.put(url, params, configObj);
        }


        /**
         *
         * @param url (e.g. http://localhost/ctrp/organizations/15.json)
         * @returns {HttpPromise}
         */
        function deleteObjFromBackend(url) {
            return $http.delete(url);
        }








    }

})();
