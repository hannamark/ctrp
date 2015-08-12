/**
 * Created by wangg5 on 7/2/15
 *
 * Improved PromiseService with $timeout and $resource
 * reference: https://developer.rackspace.com/blog/cancelling-ajax-requests-in-angularjs-applications/
 */



(function () {
    'use strict';

    angular.module('PromiseTimeoutModule', ['ngResource', 'toastr'])

        .service('PromiseTimeoutService', PromiseTimeoutService);

    PromiseTimeoutService.$inject = ['$q', '$resource', '$timeout', '$log', '$http', 'toastr'];

    function PromiseTimeoutService($q, $resource, $timeout, $log, $http, toastr) {

        /**
         * get data from service
         *
         * @param url
         * @returns {*}
         */
        this.getData = function (url) {
           // $log.info("getData called in PromiseWithTimeoutService.js");
            var deferred = $q.defer();

            $http.get(url).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                raiseErrorMessage(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }; //getData


        /**
         *
         * @param url
         * @param params: JSON object
         */
        this.postDataExpectObj = function (url, params) {
            var deferred = $q.defer();
            $http.post(url, params).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                raiseErrorMessage(error);
                deferred.reject(error);
            });
            return deferred.promise;
        };


        /**
         * Perform PUT request to update object
         *
         * @param url
         * @param params
         * @param configObj
         * @returns {*}
         */
        this.updateObj = function (url, params, configObj) {

            var deferred = $q.defer();
            $http.put(url, params, configObj).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                raiseErrorMessage(error);
                deferred.reject(error);
            });
            return deferred.promise;
        }; //updateObj


        /**
         *
         * @param url (e.g. http://localhost/ctrp/organizations/15.json)
         * @returns {HttpPromise}
         */
        this.deleteObjFromBackend = function (url) {
            return $http.delete(url);
        }; //deleteObjFromBackend


        /**
         * Raise error message for AJAX calls
         * @param error
         * @param deferred
         */
        function raiseErrorMessage(error) {
            var errorMsg = "Failed to retrieve data from service";
            if (error.status === 408) {
                errorMsg = "Retrieving data from service timed out";
            }
            toastr.error(errorMsg, 'Error');
            console.log("request has timed out");
        } //raiseErrorMessage


    } //PromiseTimeoutService

})();
