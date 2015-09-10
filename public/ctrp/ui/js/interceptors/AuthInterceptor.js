(function() {
    'use strict';
    angular.module('ctrpApp')
        .factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['$window', '$timeout', 'LocalCacheService', '$location', '$injector'];
    //function AuthInterceptor(AuthTokenService) {
    function AuthInterceptor($window, $timeout, LocalCacheService, $location, $injector) {

        //var uService = $injector.get('UserService');
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
            console.log("bad response status: " + rejection.status);
            if (rejection.status > 226) {
                $injector.get('toastr').clear();
                $injector.get('toastr').error('Access to the resources is not authorized', 'Error Code: ' + rejection.status);
                // $injector.get('UserService').logout();
                console.log("error status code: " + rejection.status);
                //redirect to login page
                $injector.get('$state').go('main.sign_in');
                /*
                var i = 0;
                while (i < 5) {

                }
                */
            }

            return rejection;
        }
    }

}());