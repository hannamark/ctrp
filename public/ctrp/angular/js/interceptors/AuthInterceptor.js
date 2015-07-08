(function() {
    'use strict';
    angular.module('AuthService', [])
        .factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['$window'];
    //function AuthInterceptor(AuthTokenService) {
    function AuthInterceptor($window) {
        var methodObj = {
            request : request,
            response : response
        };
        return methodObj;
        /*************** implementations below ****************/
        function request(config) {
            //var token = AuthTokenService.getToken();
            var token = $window.sessionStorage.token;
            console.log("Printing token")
            console.log(token)
            if (token) {
// used by the policies in sails.js
                //config.headers.Authorization = 'Bearer ' + token;
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
    }
}());