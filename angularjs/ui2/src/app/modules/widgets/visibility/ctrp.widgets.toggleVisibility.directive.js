(function() {
      'use strict';

      angular.module('ctrpApp.widgets')
      .directive('toggleVisibility', toggleVisibility);

      toggleVisibility.$inject = ['$compile'];

      function toggleVisibility($compile) {
          var directive = {
            restrict: 'E',
            templateUrl: 'app/modules/widgets/visibility/ctrp.widgets.toggleVisibility.tpl.html',
            link: function(scope, element, attrs) {

                var elementToToggle = attrs.elementToToggle.split(',');
                scope.isHidden = attrs.toggleVisibilityDefault ? attrs.toggleVisibilityDefault : false;
                scope.label = attrs.elementLabel ? attrs.elementLabel : '';

                element.on('click', function(e) {
                    toggleElem();
                    scope.$apply();
                });

                toggleElem();


                function toggleElem() {
                    if (scope.isHidden) {
                        show();
                    } else {
                        hide();
                    }

                    scope.isHidden = !scope.isHidden;
                }

                function show() {
                    _.each(elementToToggle, function(elem) {
                        $(elem).slideDown();
                    });
                }

                function hide() {
                    _.each(elementToToggle, function(elem) {
                        $(elem).slideUp();
                    });
                }
            }
         }

         return directive;
     }
}());
