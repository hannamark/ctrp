/**
 * Created by aasheer1978 on 06/15/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        .controller('unSavedChangesModalCtrl', unSavedChangesModalCtrl)
        .directive('unsavedChanges', unsavedChanges);

        unSavedChangesModalCtrl.$inject = ['$scope', '$uibModalInstance'];
        unsavedChanges.$inject = ['$window', '$uibModal'];

        function unsavedChanges($window, $uibModal) {
            var directiveObject = {
                restrict: 'A',
                link: linkerFn
            };

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var formName = attrs.name;

                $window.onbeforeunload = function() {
                    var modalOpened = false;

                    if (scope[formName].$dirty) {
                        if (modalOpened) return; //prevent modal open twice in single click

                        activateModal();
                        modalOpened = true;
                    }
                };

                scope.$on('$stateChangeStart', function(event) {
                    if (scope[formName].$dirty) {
                        if (true) {
                            event.preventDefault();
                        }
                    }
                });

                function activateModal() {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'app/pa/dashboard/abstraction/scientific/directives/advanced_cadsr_search_form_modal2.html',
                        controller: 'unSavedChangesModalCtrl as unChgs',
                        size: 'md'
                    });
                }
            }
        }

        function unSavedChangesModalCtrl($scope, $uibModalInstance) {
            var vm = this;

            vm.confirm = function() {

            };

            vm.cancel = function() {
                $uibModalInstance.close();
            };
        }
})();
