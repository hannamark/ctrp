(function () {

    'use strict';

    angular.module('ctrpApp')
        .directive('masterDirective',masterDirective)
    function masterDirective() {
            return {
                restrict: 'E',
                scope: {
                    mod: '='
                },
                //template: '{{mod}}',// <br /> <div popover-placement="bottom" popover-template="\'t.html\'">Click to Open Popover</div>'
                template: '<button popover-placement="right" type="button" class="btn btn-default" popover-trigger="focus" popover-template="\'/ctrp/angular/js/directives/masterDirectiveTemplate.html\'">Family Members</button>',
                //templateUrl: '/ctrp/angular/js/directives/masterDirectiveTemplate.html',
                //template: '<button popover-template="dynamicPopover.templateUrl" popover-title="{{dynamicPopover.title}}" type="button" class="btn btn-default">Popover With Template</button>',
                /*link: function(scope, element, attrs) {
                    element.text('replaced text');
                },*/
                controller: function($scope) {
                    console.log("hello 123 ***** " + JSON.stringify($scope.mod));

                }
                //templateUrl: '/ctrp/angular/js/directives/masterDirectiveTemplate.html'

            }
        }
})();
