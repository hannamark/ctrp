(function() {
    'use strict';
    angular.module('ctrp.module.authInterceptor', ['LocalCacheModule'])
        .factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['LocalCacheService', '$injector'];
    //function AuthInterceptor(AuthTokenService) {
    function AuthInterceptor(LocalCacheService, $injector) {

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
            var token = LocalCacheService.getCacheWithKey('token');
            //console.log('token is: ' + token);
            if (token) {
                var gsaFlag =  (LocalCacheService.getCacheWithKey('gsaFlag') || 'Reject') + ' ';
                //console.log('gsaFlag = ' + gsaFlag);
                config.headers.Authorization = gsaFlag + token;
            }
            return config;
        } //request


        /**
         * return the HTTP response through the interceptor, could inject something here
         *
         * @param res
         * @returns {*}
         */
        function response(res) {
            return res;
        } //response


        function responseError(rejection) {
            if(rejection.status === 401) {
              //if unauthenticated or unauthorized, kick the user back to sign_in
              $injector.get('$state').go('main.sign_in');
              $injector.get('toastr').error('Access to the resources is not authorized', 'Please sign in to continue');
            }
            else if (rejection.status > 226 && errorCount < 2) {
                $injector.get('toastr').clear();
                var errorMsg = 'Failed request, Error Code: ' + rejection.status;
                errorMsg += !!rejection.error ? ' Reason: ' + rejection.error : '';
                $injector.get('toastr').error(errorMsg);
                // $injector.get('UserService').logout();
                errorCount++;
            }

            return rejection;
        }
    }

}());
