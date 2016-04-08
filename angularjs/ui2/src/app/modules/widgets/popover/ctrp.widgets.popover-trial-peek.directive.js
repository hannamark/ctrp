/**
 * Created by wangg5 on 04/07/16.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('ctrpTrialPeek', ctrpTrialPeek);

    ctrpTrialPeek.$inject = ['$timeout', '$compile', '$popover'];

    function ctrpTrialPeek($timeout, $compile, $popover) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_trial_peek.tpl.html';
        var directiveObj = {
            restrict: 'A',
            priority: 100,
            scope: {
                trialIdentifier: '=' // trial identifier, e.g. NCI-2009-01258/NCT01534637
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {
            console.info('in linkerFn of peek, identifier: ', scope.trialIdentifier);
            var popover = $popover(element, {
                title: 'Trial Information',
                templateUrl: attrs.peekTemplate || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'auto top',
                animation: 'am-flip-x',
                content: 'Trial information',
                autoClose: true,
                scope: scope
            });

            element.bind('click', function(event) {
                event.preventDefault();
                if (popover.$isShown) {
                    popover.hide();
                } else {
                    // resolve promise of fetching trial
                    scope.trialName = 'hello world!'
                    popover.show();
                }
            });

            scope.$on('$destroy', function() {popover.destroy();}); // clean up
        }
    }

})();
