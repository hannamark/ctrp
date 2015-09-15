/**
 * Created by wangg5 on 9/9/15.
 */

(function() {

    'use strict';

    angular.module('ctrpApp')
        .directive('ctrpClickOnce', ctrpClickOnce);

    ctrpClickOnce.$inject = ['$timeout'];

    function ctrpClickOnce($timeout) {
        var directoveObj = {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    $timeout(function() {
                        if (attrs.ctrpClickOnce) {
                            element.html(attrs.ctrpClickOnce);
                        }
                        element.attr('disabled', true);
                    })
                });
            } //link
        };

        return directoveObj;
    }

})();