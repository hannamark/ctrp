/**
 * Created by aasheer1978 on 09/08/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        //.controller('ctrpHintModalCtrl', ctrpHintModalCtrl)
        .directive('ctrpHint', ctrpHint);

        //ctrpHintModalCtrl.$inject = ['$scope', '$uibModalInstance'];
        ctrpHint.$inject = ['$window', '$uibModal', '$popover', '$timeout'];

        function ctrpHint($window, $uibModal, $popover, $timeout) {

            var directiveObject = {
                restrict: 'A',
                link: linkerFn
            };

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var hintFields = element.find('input, select, textarea'); //array of fields that need to be checked on change
                var addButton = element.find('.btn-add');
                var popover = $popover(addButton, {
                    title: 'Hint',
                    templateUrl: 'app/modules/widgets/popover/_default_popover_hint.tpl.html',
                    html: true,
                    trigger: 'manual',
                    placement: 'right',
                    animation: 'am-flip-x',
                    scope: scope,
                    viewport: 'body'
                });

                hintFields.on('change keyup', function(e) {
                    if (checkHintFields()) {
                        var event = e;
                        if (!popover.$isShown) {
                            popover.show();

                            /*
                                Popover rendering causes current input to blur.
                                Code below focuses back on target input field
                            */
                            $timeout(function() {
                                event.target.focus();
                            }, 1);
                        }
                    } else {
                        cancel();
                    }
                });

                /* Removes hint after Add button has been clicked */
                addButton.on('click', function(e) {
                    cancel();
                });

                scope.cancel = cancel;

                // If any field has a value, hint should be displayed
                function checkHintFields() {
                    var hintFlag = false;

                    _.each(hintFields, function(field) {
                        if (field.value) {
                            hintFlag = true;
                        }
                    });

                    return hintFlag;
                }

                function cancel() {
                    popover.hide();
                }

            }
        }
})();
