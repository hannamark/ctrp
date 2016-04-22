
(function() {
  'use strict';
    angular.module('ctrp.module.validators')
            .directive('ctrpSubmit', ctrpSubmit);

            ctrpSubmit.$inject = ['$parse', '$log'];

            function ctrpSubmit($parse, $log) {

                var directiveObject = {
                    restrict: 'A',
                    require: ['ctrpSubmit', '?form'],
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
                        submitController.attempted = formController.$submitted;
                        $log.info('form is submitted: ' + formController.$submitted);
                        if (!scope.$$phase) {
                            scope.$apply();
                        }

                        if (formController.$invalid) { //|| formController.$pristine
                            $log.error('form submission invalid or untouched!');
                            return false;
                        }

                        var formAction = $parse(attrs.ctrpSubmit);
                        /* execute the form action if valid */
                        scope.$apply(function() {
                            formAction(scope, {$event: event});
                        });
                    });
                } //linkerFn

                function controllerFn($scope, $element, $attrs) {
                    this.attempted = false;
                    var formController = null;

                    this.setFormController = function(controller) {
                        console.log('setting form controller!');
                        formController = controller;
                    };

                    /* fieldModelController is ngModel controller */
                    this.needsAttention = function(fieldModelController) {
                        if (!formController) {
                            return false;
                        }

                        /* Used in PA:
                           formController.$setPristine sets $submitted property to false.
                           Setting this.attempted based on $submitted value allows for resetting
                           a CRUD form when list/CRUD views are displayed separately in the UI
                        */

                        if (fieldModelController) {
                            return formController.$submitted && fieldModelController.$invalid &&
                                (fieldModelController.$dirty || this.attempted);
                        } else {
                            return formController &&
                                formController.$submitted && formController.$invalid &&
                                (formController.$dirty || this.attempted);
                        }
                    }; //needsAttention

                    /*
                    function cb() {
                        $log.info('cb said false!');
                        return false;
                    }
                    */
                } //controllerFn



            }



})();
