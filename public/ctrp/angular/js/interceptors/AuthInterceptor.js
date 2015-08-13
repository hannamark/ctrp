(function() {
    'use strict';
    angular.module('ctrpApp')
        .factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['$window', '$timeout', 'LocalCacheService', '$location'];
    //function AuthInterceptor(AuthTokenService) {
    function AuthInterceptor($window, $timeout, LocalCacheService, $location) {
        var methodObj = {
            request: request,
            response: response,
            responseError: responseError
        };
        return methodObj;
        /*************** implementations below ****************/
        function request(config) {
            config.timeout = 15000; //15 seconds timeout
            //var token = AuthTokenService.getToken();
            var token = LocalCacheService.getCacheWithKey("token"); //$window.localStorage.token;
           // console.log("Printing token")
           // console.log(token)
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
          //  console.log("Printing response");
          //  console.log(JSON.stringify(response));

            //$timeout(function() {
            // console.log("access denied!");
            //toastr.error("You need to log in", "Access Denied");
            //$state.go('main.sign_in');
            //}, 2000);
            return response;
        } //response


        function responseError(rejection) {
            console.log("bad response");
            if (rejection.status === 403) {
                //show error dialog
                console.log("403: Forbidden");
                $location.path("/main/error403");
            }
            if (rejection.status === 401) {
                //show error dialog
                console.log("401: Unauthorized");
                $location.path("/main/sign_in");
            }
            return rejection;
        }
    }

}());