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
            request : request
        };

        return services;

        /********* implementations below ***********/

        function request(config) {
            config.timeout = 2000;
            return config;
        }
    }

})();