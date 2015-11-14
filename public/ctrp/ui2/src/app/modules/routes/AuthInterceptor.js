(function() {
    'use strict';
    angular.module('ctrp.module.routes')
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
        var errorCount = 0;
        return methodObj;


        /*************** implementations below ****************/

        function request(config) {
            config.timeout = 15000; //15 seconds timeout
            //var token = AuthTokenService.getToken();
            var token = LocalCacheService.getCacheWithKey("token"); //$window.localStorage.token;
            if (token) {
                var gsaFlag =  (LocalCacheService.getCacheWithKey("gsaFlag") || "Reject") + " ";
                console.log("gsaFlag = " + gsaFlag);
                config.headers.Authorization = gsaFlag + token;
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
            if(rejection.status == 401) {
              //if unauthorized, kick the user back to sign_in
              $injector.get('$state').go('main.sign_in');
              $injector.get('toastr').error('Access to the resources is not authorized', 'Please sign in to continue');
            }
            else if (rejection.status > 226 && errorCount < 2) {
                $injector.get('toastr').clear();
                $injector.get('toastr').error('Failed request', 'Error Code: ' + rejection.status);
                // $injector.get('UserService').logout();
                errorCount++;
            }

            return rejection;
        }
    }

}());
