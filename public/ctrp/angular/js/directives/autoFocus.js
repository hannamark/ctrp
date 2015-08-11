/**
 * Created by wangg5 on 8/11/15.
 */

/**
 * Custom directive for automatic focusing on an input upon loading a page
 *
 */

(function() {

    'use strict';

    angular.module('ctrpApp')
        .directive('autoFocus', focusInputOnLoad);

    focusInputOnLoad.$inject = [];

    function focusInputOnLoad() {
        var directoveObj = {
            restrict: 'A',
            link: {
                pre: function preLink(scope, element, attrs) {
                    // console.log('prelink function called');
                },
                post: function postLink(scope, element, attrs) {
                    // console.log('postLink called');
                    element[0].focus();
                }
            }
        };

        return directoveObj;
    }

})();