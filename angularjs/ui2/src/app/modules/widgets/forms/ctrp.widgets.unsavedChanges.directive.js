/**
 * Created by aasheer1978 on 06/15/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        //.controller('unSavedChangesModalCtrl', unSavedChangesModalCtrl)
        .directive('unsavedChanges', unsavedChanges);

        //unSavedChangesModalCtrl.$inject = ['$scope', '$uibModalInstance'];
        unsavedChanges.$inject = ['$window', '$uibModal'];

        function unsavedChanges($window, $uibModal) {
            var directiveObject = {
                restrict: 'A',
                link: linkerFn
            };

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var formName;
                var formArray = element.find('form'); // For the case there are multiple forms on a single page

                if (!formArray.length) {
                    formName = attrs.name ? attrs.name : element.parent().prop('name');
                }

                $window.onbeforeunload = function(event) {
                    if (!formArray.length) {
                        if (formName && scope[formName].$dirty) {
                            return 'Are you sure you want to leave this page? You may have unsaved changes.';
                        }
                    } else {
                        // For multiple forms
                        var dirtyFlag = false;
                        var formItem;

                        for (var i = 0; i < formArray.length; i++) {
                            formItem = $(formArray[i]).prop('name');
                            if (scope[formItem].$dirty) {
                                dirtyFlag = true;
                            }
                        }

                        if (dirtyFlag) {
                            return 'Are you sure you want to leave this page? You may have unsaved changes.';
                        }
                    }
                };

                scope.$on('$stateChangeStart', function(event) {
                    if (!formArray.length) {
                        if (scope[formName].$dirty && !scope[formName].$submitted) {
                            if (!confirm('Are you sure you want to leave this page? You may have unsaved changes.')) {
                                event.preventDefault();
                            }
                        }
                    } else {
                        // For multiple forms
                        var formItem;
                        var dirtyFlag = false;

                        for (var i = 0; i < formArray.length; i++) {
                            formItem = $(formArray[i]).prop('name');
                            if (scope[formItem].$dirty && !scope[formItem].$submitted) {
                                dirtyFlag = true;
                            }
                        }

                        if (dirtyFlag) {
                            if (!confirm('Are you sure you want to leave this page? You may have unsaved changes.')) {
                                event.preventDefault();
                            }
                        }
                    }
                });
            }
        }
})();
