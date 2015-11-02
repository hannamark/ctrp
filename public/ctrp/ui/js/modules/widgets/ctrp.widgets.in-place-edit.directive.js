/**
 * Created by wangg5 on 10/27/15.

 * This directive supports in-place edit and save. Required fields/attributes for this directive include
 * on-save handler and template. If template is not provided or reachable, it will use the default
 * template
 */

(function() {
    'use strict';

    angular.module('ctrpApp.widgets')
    .directive('inPlaceEdit', inPlaceEdit);

    inPlaceEdit.$inject = ['$timeout', '$compile', 'MESSAGES', 'UserService'];

    function inPlaceEdit($timeout, $compile, MESSAGES, UserService) {
      var defaultTemplateUrl = '/ctrp/ui/js/modules/widgets/ctrp.widgets.in-place-edit.default_template.html';
      var directiveObj = {
        restrict: 'A',
        transclude: true,
        scope: {
          model: '=inPlaceEdit',
          saveHandler: '&onSave'
        },
        link: linkerFn,
        templateUrl: function(element, attrs) {
          return attrs.template || defaultTemplateUrl;
        }
      };
      return directiveObj;

      function linkerFn(scope, element, attrs) {
        scope.editMode = false;
        scope.writeModeEnabled = UserService.isCurationModeEnabled() || false;
        //if not set, isEditable is considered to be false
        scope.isEditable = attrs.hasOwnProperty('isEditable') ? scope.$eval(attrs.isEditable) : false;
        scope.edit = edit;
        scope.saveEdit = saveEdit;
        scope.cancelEdit = cancelEdit;
        var prevValue;

        //cancel edit on blur
        element.bind('blur', cancelEdit);

        //Esc for canceling edit
        element.bind('keydown', function(event) {
            if (event.which == 27) {
              cancelEdit(event.target, event);
            }
        });

        //functions below
        checkWriteMode();
        function edit() {
          scope.editMode = true;
          prevValue = scope.model;

          $timeout(function() {
            element.find('textarea')[0].focus();
          }, 0, false);
        }

        function saveEdit() {
          scope.editMode = false;
          scope.saveHandler({value: scope.model});
        }

        function cancelEdit() {
          scope.editMode = false;
          scope.model = prevValue;
        }

        //Listen to the write-mode switch
        scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
          checkWriteMode();
          // $compile(element.contents())(scope);
        });

        /* check for the global write mode */
        function checkWriteMode() {
          scope.writeModeEnabled = UserService.isCurationModeEnabled() || false;
          scope.editMode = scope.writeModeEnabled == false ? false : scope.editMode;
        }

      } //linkerFn


    } //inPlaceEdit
})();
