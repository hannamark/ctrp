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

    backButton.$inject = ['$breadcrumb', '$state'];

    function backButton($breadcrumb, $state) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                element.bind('click', goBack);

                function goBack() {
                    //console.log('last state: ' + JSON.stringify($breadcrumb.getLastStep()));
                    //console.log('states chain: ' + JSON.stringify($breadcrumb.getStatesChain()));
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