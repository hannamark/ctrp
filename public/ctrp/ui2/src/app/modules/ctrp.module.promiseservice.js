/**
 * Created by wangg5 on 6/1/15.
 * This is Obsolete, use PromiseWithTimeoutService instead
 */



(function () {
    'use strict';
    angular.module('ctrp.module.PromiseService',
    ['ngResource', 'ctrp.module.constants', 'ctrp.module.authInterceptor'])
    .config(httpInterceptorConfig)
    .factory('PromiseService', PromiseService);

    httpInterceptorConfig.$inject = ['$httpProvider'];
    function httpInterceptorConfig($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    } //httpInterceptorConfig

    PromiseService.$inject = ['$http', '$q', '$resource', '$timeout', '$log', 'HOST'];

    function PromiseService($http, $q, $resource, $timeout, $log, HOST) {

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
            url = HOST + url;
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
            url = HOST + url;
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
            url = HOST + url;
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
            url = HOST + url;
            return $http.put(url, params, configObj);
        }


        /**
         *
         * @param url (e.g. http://localhost/ctrp/organizations/15.json)
         * @returns {HttpPromise}
         */
        function deleteObjFromBackend(url) {
            url = HOST + url;
            return $http.delete(url);
        }

    }

})();
