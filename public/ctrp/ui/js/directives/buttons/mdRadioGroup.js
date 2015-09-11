/**
 * Created by wangg5 on 9/11/15.
 */

(function() {


'use strict';

angular.module('ctrpApp').directive('mdRadioGroup', function() {
    return {
        restrict: 'E',
        link: function($scope, $el, $attrs) {
            $el.on('keypress', function(event){
                if(event.keyCode === 13) {
                    var form = angular.element(getClosest($el[0], 'form'));
                    form.triggerHandler('submit');
                }
                function getClosest(el, tag) {
                    tag = tag.toUpperCase();
                    do {
                        if (el.nodeName === tag) {
                            return el;
                        }
                    } while (el = el.parentNode);
                    return null;
                }
            })
        }
    }
});

})();