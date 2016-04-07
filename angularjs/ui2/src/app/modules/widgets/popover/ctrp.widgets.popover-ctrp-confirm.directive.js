/**
 * Created by wangg5 on 04/07/16.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('ctrpConfirm', ctrpConfirm);

    ctrpConfirm.$inject = ['$timeout', '$compile', '$parse', '$popover'];

    function ctrpConfirm($timeout, $compile, $parse, $popover) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_confirm.tpl.html';
        var directiveObj = {
            restrict: 'A',
            priority: 200,
            scope: {
                ngClick: '&ctrpClick'
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {
            console.info('in ctrpConfirm directive');

            var popover = $popover(element, {
                title: 'Please Confirm',
                // contentTemplate: attrs.template || defaultTemplateUrl,
                templateUrl: attrs.confirmTemplate || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'bottom',
                animation: 'am-flip-x',
                content: 'Please confirm this operation',
                autoClose: false,
                scope: scope
            });

            element.bind('click', function(event) {
                popover.event = event;
                if (!popover.$isShown) {
                    console.info('popover: ', popover);
                    popover.show();
                }
            });

            scope.$on('$destroy', cleanupPopover);
            scope.confirm = confirm;
            scope.cancel = cancel;

            function cancel() {
                popover.hide();
            }

            function confirm() {
                scope.ngClick(); // trigger the click action
                popover.hide();
                /*
                var buttonAction = $parse(attrs.ctrpClick);
                console.info('buttonAction: ', buttonAction);
                scope.$apply(function() {
                    buttonAction(scope, {$event: popover.event});
                });
                */
            }

            function cleanupPopover() {
                popover.destroy();
            }

        } // linkerFn
    }

})();
