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
                var formName = attrs.name;

                window.onbeforeunload = function(event) {
                    if (scope[formName].$dirty) {
                        return 'Are you sure you want to leave this page? You may have unsaved changes.';
                    }
                };

                scope.$on('$stateChangeStart', function(event) {
                    if (scope[formName].$dirty && !scope[formName].$submitted) {
                        if (!confirm('Are you sure you want to leave this page? You may have unsaved changes.')) {
                            event.preventDefault();
                        }
                    }
                });
            }
        }
})();
