
/**
 * Created by wangg5 on 9/9/15.
 */

(function() {

    'use strict';

    angular.module('ctrpApp.widgets')
        .directive('backButton', backButton);

    backButton.$inject = ['$breadcrumb', '$state'];

    function backButton($breadcrumb, $state) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                element.bind('click', goBack);

                function goBack() {
                    var lastState = $breadcrumb.getStatesChain(); //array
                    lastState = lastState[lastState.length - 1] || '';
                    lastState = lastState.ncyBreadcrumb || '';
                    console.log('going back to last state: ' + lastState.parent);
                    $state.transitionTo(lastState.parent);
                }
            }
        };

    } //backButton

})();
