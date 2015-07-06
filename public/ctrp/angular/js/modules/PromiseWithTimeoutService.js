/**
 * Created by wangg5 on 7/2/15
 *
 * Improved PromiseService with $timeout and $resource
 * reference: https://developer.rackspace.com/blog/cancelling-ajax-requests-in-angularjs-applications/
 */



(function () {
    'use strict';

    angular.module('PromiseTimeoutServiceModule', ['ngResource', 'TimeoutHttpInterceptor', 'toastr'])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('timeoutHttpInterceptorService');
        }])

        .factory('PromiseWithTimeoutService', PromiseWithTimeoutService);

    PromiseWithTimeoutService.$inject = ['$q', '$resource', '$timeout', '$log'];

    function PromiseWithTimeoutService($q, $resource, $timeout, $log) {


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

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function(error) {
                console.log("received error: " + error.status);
                if (error.status === 408) {
                    //TODO: use toastr to raise error messages
                    console.log("request has timed out");
                    deferred.reject(error);
                }
            });

            return deferred.promise;
            // $http.get( url , { headers: { 'Cache-Control' : 'no-cache' } } );
            //return $http.get(url, {cache: false});
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
            var deferred = $q.defer();

            $http.post(url, params).success(function(data) {
                deferred.resolve(data);
            }).error(function(error) {
                if (error.status === 408) {
                    //TODO: use toastr to raise error messages
                    console.log("request has timedout");
                    deferred.reject(error);
                }
            });
            return deferred.promise;
           // return $http.post(url, params);
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


    } //PromiseWithTimeoutService

})();
