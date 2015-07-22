/**
 * Created by wangg5 on 7/22/15.
 */


/**
 * A wrapper module for the underscore library
 *
 */
(function() {
    'use strict';

    angular.module('CTRPUnderscoreModule', [])
        .factory('_', ['$window', function($window) {
            return $window._;
        }]);

})();