/**
 * Created by wangg5 on 8/11/15.
 */


/**
 * Back to previous page
 */

(function() {

    'use strict';

    angular.module('ctrpApp')
        .directive('backButton', backButton);

    backButton.$inject = ['$window'];

    function backButton($window) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                element.bind('click', goBack);

                function goBack() {
                    $window.history.back();
                    scope.$apply();
                }
            }
        };

    } //backButton


})();