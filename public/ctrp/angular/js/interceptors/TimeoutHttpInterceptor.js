/**
 * Created by wangg5 on 7/6/15.
 */

(function() {
    'use strict';
    angular.module('TimeoutHttpInterceptor', [])
        .factory('timeoutHttpInterceptorService', timeoutHttpInterceptorService);

    timeoutHttpInterceptorService.$inject = ['$rootScope', '$q'];

    function timeoutHttpInterceptorService($rootScope, $q) {
        var services = {
            request : request,
            response : response
        };

        return services;

        /********* implementations below ***********/

        function request(config) {
            config.timeout = 15000; //15 seconds timeout
            return config;
        } //request


        function response(res) {
            console.log("status code of the http response: " + res.status);
            return res;
        } //response
    }

})();