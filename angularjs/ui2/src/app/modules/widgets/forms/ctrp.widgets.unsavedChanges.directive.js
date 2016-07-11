/**
 * Created by aasheer1978 on 06/15/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        .controller('unSavedChangesModalCtrl', unSavedChangesModalCtrl)
        .directive('unsavedChanges', unsavedChanges);

        unSavedChangesModalCtrl.$inject = ['$scope', '$uibModalInstance'];
        unsavedChanges.$inject = ['$window', '$uibModal', '$parse'];

        function unsavedChanges($window, $uibModal, $parse) {
            var directiveObject = {
                restrict: 'A',
                link: linkerFn
            };

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var formName;
                var formArray = element.controller().formArray ? element.controller().formArray : null;
                var currentTabIndex = element.controller().tabIndex;
                var newTabIndex = 0;
                var element = element;

                setFormVars();

                attrs.$observe('unsavedTabIndex', function(newVal) {
                    var newIndex = parseInt(newVal, 10);
                    if (newIndex !== currentTabIndex) {
                        newTabIndex = newIndex;
                        evaluateTabForm();
                    }
                });

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
                            formItem = typeof formArray[i] === 'object' ? formArray[i].name : formArray[i];
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
                            formItem = typeof formArray[i] === 'object' ? formArray[i].name : formArray[i];
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

                function setFormVars() {
                    if (formArray && formArray.length) {
                        return;
                    }

                    formArray = element.find('form'); // For the case when there are multiple forms on a single page

                    if (!formArray.length) {
                        formName = attrs.name ? attrs.name : element.parent().prop('name');
                    }
                }

                function evaluateTabForm() {
                    var form = scope[formArray[currentTabIndex]];
                    var currentTab = element.find('md-tab-item.active');

                    if (form) {
                        if (form.$dirty) {
                            activateModal();
                            element.controller().tabIndex = currentTabIndex;
                        } else {
                            currentTabIndex = newTabIndex;
                            element.controller().tabIndex = newTabIndex;
                        }
                    }
                }

                function activateModal() {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/modules/widgets/forms/unsaved_changes_modal.html',
                        controller: 'unSavedChangesModalCtrl as unChgs',
                        size: 'md'
                    });

                    modalInstance.result.then(function() {
                        currentTabIndex = newTabIndex;
                        element.controller().tabIndex = newTabIndex;
                    });
                }
            }
        }


        function unSavedChangesModalCtrl($scope, $uibModalInstance) {
            var vm = this;

            vm.confirm = function() {
                $uibModalInstance.close('confirmed');
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss('canceled');
            };
        }
})();
