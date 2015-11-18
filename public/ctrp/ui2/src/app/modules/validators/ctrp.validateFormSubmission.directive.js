
(function() {
  'use strict';
    angular.module('ctrp.module.validators')
            .directive('ctrpFormSubmission', ctrpFormSubmission);

            ctrpFormSubmission.$inject = ['$parse', '$log'];

            function ctrpFormSubmission($parse, $log) {

                var directiveObject = {
                    restrict: 'A',
                    require: ['ctrpFormSubmission', '?form'],
                    link: linkerFn,
                    controller: controllerFn
                };
                return directiveObject;

                function linkerFn(scope, element, attrs, controllers) {
                    var submitController = controllers[0];
                    var formController = controllers[1]; //get form controller
                    submitController.setFormController(formController);

                    scope.ctrpbtn = scope.ctrpbtn || {};
                    scope.ctrpbtn[attrs.name] = submitController;

                    element.bind('submit', function(event) {
                        submitController.setAttempted = formController.$submitted;
                        $log.info('form is submitted: ' + formController.$submitted);
                        if (!scope.$$phase) scope.$apply();

                        if (formController.$invalid || formController.$pristine) {
                            $log.error('form submission is not valid!');
                            return false;
                        } else {
                            var fn = $parse(attrs.ctrpFormSubmission);

                            /* execute the ctrpFormSubmission function */
                            scope.$apply(function() {
                                fn(scope, {$event: event});
                            });
                        }

                    });

                } //linkerFn

                function controllerFn($scope, $element, $attrs) {
                    this.attempted = false;
                    var formController = null;
                    this.setAttempted = function() {
                        this.attempted = true;
                    };

                    this.setFormController = function(controller) {
                        console.log('setting form controller!');
                        formController = controller;
                    };

                    this.needsAttention = function(fieldModelController) {
                        if (!formController) return false;
                        $log.info('needsAttention: ', fieldModelController); // fieldModelController.$viewValue;

                        if (fieldModelController) {
                            return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                        } else {
                            return formController && formController.$invalid && (formController.$dirty || this.attempted);
                        }
                    };
                } //controllerFn



            }



})();
