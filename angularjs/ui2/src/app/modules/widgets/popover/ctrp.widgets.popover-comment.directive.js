/**
 * Created by wangg5 on 10/27/15.
 *
 */

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
    .directive('commentPopover', popoverComment);

    popoverComment.$inject = ['$timeout', '$compile', '$popover'];

    function popoverComment($timeout, $compile, $popover) {
        var defaultTemplateUrl = 'app/modules/widgets/popover/_default_popover_template.html';
        var directiveObj = {
            restrict: 'A',
            transclude: true,
            scope: {
                model: '=commentPopover', // comment field
                saveHandler: '&onSave',
                isDeleted: '@'
            },
            link: linkerFn
        };

        return directiveObj;

        function linkerFn(scope, element, attrs) {

            var popover = $popover(element, {
                title: 'Comment for the deletion',
                // contentTemplate: attrs.template || defaultTemplateUrl,
                templateUrl: attrs.template || defaultTemplateUrl,
                html: true,
                trigger: 'manual',
                placement: 'auto left',
                animation: 'am-flip-x',
                content: 'Please add your comment',
                autoClose: true,
                scope: scope
            });

            console.log('isDeleted? ', scope.$eval(attrs.isDeleted));

            // console.dir('popover obj: ', popover);
            element.bind('click', function() {
                 if (scope.$eval(attrs.isDeleted) === false) {
                    // show the popover only when the item is not deleted yet
                    // attrs.$observe?
                    popover.show();
                 }
            });

            scope.saveComment = saveComment;
            scope.cancelComment = cancelComment;

            function saveComment() {
                console.info('saving comment');
                scope.saveHandler({value: scope.model});
                popover.hide();
            }
            function cancelComment() {
                console.info('canceled comment');
                scope.model = null; // save null?
                popover.hide();
            }
        }
    }

})();
