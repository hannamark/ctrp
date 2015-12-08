/**
 * Created by wangg5 on 7/6/15.
 */

(function() {
    'use strict';
    angular.module('TimeoutHttpInterceptor', [])
        .factory('timeoutHttpInterceptorService', timeoutHttpInterceptorService);

    timeoutHttpInterceptorService.$inject = ['$rootScope', '$q', '$timeout', 'LocalCacheService', '$location'];

    function timeoutHttpInterceptorService($rootScope, $q, $timeout, LocalCacheService, $location) {
        var services = {
            request : request,
            response : response,
            responseError: responseError
        };

        return services;

        /********* implementations below ***********/


        function request(config) {
            config.timeout = 15000; //15 seconds timeout
            //var token = AuthTokenService.getToken();
            var token = LocalCacheService.getCacheWithKey("token");
            // console.log("Printing token")
            // console.log(token)
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        } //request


        /**
         * return the HTTP response through the interceptor, could inject something here
         *
         * @param response
         * @returns {*}
         */
        function response(response) {
            return response;
        } //response


        function responseError(rejection) {
            console.log("bad response");
            if (rejection.status === 403 || rejection.status === 401) {
                // UserService.logout(); //log out the user
                //redirect to login page
                // toastr.error('Access to the resources is not authorized', 'Error');
                console.log("error status code: " + rejection.status);
                $location.path("/main/sign_in");
            }
            // else if (rejection.status === 401) {
            //    //show error dialog
            //    console.log("401: Unauthorized");
            //    $location.path("/main/sign_in");
            //}

            return rejection;
        }
    }

})();