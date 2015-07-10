(function() {
    'use strict';
    angular.module('ctrpApp')
        .factory('AuthInterceptor', AuthInterceptor);
    AuthInterceptor.$inject = ['$window', '$timeout'];
    //function AuthInterceptor(AuthTokenService) {
    function AuthInterceptor($window, $timeout) {
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
            console.log("Printing response");
            console.log(JSON.stringify(response));

            //$timeout(function() {
               // console.log("access denied!");
                //toastr.error("You need to log in", "Access Denied");
                //$state.go('main.sign_in');
            //}, 2000);
            return response;
        } //response

    }
}());