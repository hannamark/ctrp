/**
 * Created by aasheer1978 on 06/15/2016
*/

(function() {
    'use strict';
    angular.module('ctrpApp.widgets')
        .controller('unSavedChangesModalCtrl', unSavedChangesModalCtrl)
        .directive('unsavedChanges', unsavedChanges);

        unSavedChangesModalCtrl.$inject = ['$scope', '$uibModalInstance', 'saveRequired'];
        unsavedChanges.$inject = ['$window', '$uibModal', '$parse'];

        function unsavedChanges($window, $uibModal, $parse) {
            var directiveObject = {
                restrict: 'A',
                link: linkerFn,
                scope: {
                    ngConfirm: '&unsavedCallback'
                }
            };

            return directiveObject;

            function linkerFn(scope, element, attrs) {
                var formName;
                var formArray = element.controller().formArray ? element.controller().formArray : null; // Passed in when pages have multiple tabs
                var currentTabIndex = element.controller().tabIndex;
                var newTabIndex = 0;
                var element = element;
                //var confirmationCallback = $parse(attrs.unSavedCallback);

                setFormVars();

                /* For pages with multiple tabs, checks when page is in Add/Edit mode */
                attrs.$observe('unsavedTabIndex', function(newVal) {
                    var newIndex = parseInt(newVal, 10);
                    if (newIndex !== currentTabIndex) {
                        newTabIndex = newIndex;
                        evaluateTabForm();
                    }
                });

                $window.onbeforeunload = function(event) {
                    if (!formArray.length) {
                        if (formName && scope.$parent[formName].$dirty) {
                            return 'Are you sure you want to leave this page? You may have unsaved changes.';
                        }
                    } else {
                        // For multiple forms
                        var dirtyFlag = false;
                        var formItem;

                        for (var i = 0; i < formArray.length; i++) {
                            formItem = typeof formArray[i] === 'object' ? formArray[i].name : formArray[i];
                            if (scope.$parent[formItem].$dirty) {
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
                        if (scope.$parent[formName].$dirty && !scope.$parent[formName].$submitted) {
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
                            if (scope.$parent[formItem].$dirty && !scope.$parent[formItem].$submitted) {
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
                    /* formArray already defined (true when pages have multiple tabs) */
                    if (formArray && formArray.length) {
                        return;
                    }

                    /* For the case when there are multiple forms on a single page */
                    formArray = element.find('form');

                    /* Single form */
                    if (!formArray.length) {
                        formName = attrs.name ? attrs.name : element.parent().prop('name');
                    }
                }

                /* Checks form on current tab, when user is attempting to move to another tab */
                function evaluateTabForm() {
                    var form = scope.$parent[formArray[currentTabIndex]];

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
                    var isSaveRequired = element.find('md-tab-item.md-active > span').hasClass('save-required');

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/modules/widgets/forms/unsaved_changes_modal.html',
                        controller: 'unSavedChangesModalCtrl as unChgs',
                        size: 'md',
                        resolve: {
                            saveRequired: function () {
                                return isSaveRequired;
                            }
                        }
                    });

                    modalInstance.result.then(function(result) {
                        if (result === 'Confirm') {
                            scope.ngConfirm();
                            currentTabIndex = newTabIndex;
                            element.controller().tabIndex = newTabIndex;
                        }
                    });
                }
            }
        }


        function unSavedChangesModalCtrl($scope, $uibModalInstance, isSaveRequired) {
            var vm = this;

            vm.message = '';
            vm.confirmButtonText = '';
            vm.isSaveRequired = isSaveRequired;

            if (vm.isSaveRequired) {
                vm.message = 'You have unsaved changes in this form. The form requires items to be saved before moving to another tab. Please save the form before moving to another tab.';
                vm.confirmButtonText = 'Ok';
            } else {
                vm.message = 'You have unsaved changes in this form. Any unsaved changes will be lost if you leave the form without saving. Are you sure you want to move to another tab without saving changes?';
                vm.confirmButtonText = 'Confirm';
            }

            vm.confirm = function() {
                if (vm.isSaveRequired) {
                    $uibModalInstance.close('Ok');
                } else {
                    $uibModalInstance.close('Confirm');
                }
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss('canceled');
            };
        }
})();
