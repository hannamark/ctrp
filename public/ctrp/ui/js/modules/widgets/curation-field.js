(function() {
  'use strict';
  angular.module('ctrpApp.widgets')
  .directive('curationField', curationField);

  curationField.$inject = ['$log', '$compile', '$timeout', 'MESSAGES', 'UserService'];

  function curationField($log, $compile, $timeout, MESSAGES, UserService) {

      var directiveObj = {
          link: link,
          require: '?ngModel',
          restrict: 'A',
          replace: true,
          scope: {
              ngModel: '=ngModel'
          }
      }

      return directiveObj;


      function link(scope, element, attrs, ngModelCtrl) {

          // watchPrivilegeSubRoutine();
          watchCurationMode();

          scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
             // watchPrivilegeSubRoutine();
              watchCurationMode();
          });

          /**
           * watch for the curation mode to enable/hide or disable/show the element
           */
          function watchCurationMode() {
              var isCurationEnabled = UserService.isCurationModeEnabled() || false;
              if (isCurationEnabled) {
                  if (isButton(element)) {
                      element.show();
                  } else {
                      element.removeAttr('disabled');
                  }
              } else {
                  if (isButton(element)) {
                      element.hide();
                  } else {
                      attrs.$set('disabled', 'disabled');
                  }
              }
          }

          /*
          function watchPrivilegeSubRoutine() {
              var allowedRoles = attrs.curationField || 'CURATOR'; //default to CURATOR if not set
              var curPrivilege = UserService.getPrivilege() || '';
              var curationEnabled = curPrivilege != '' && allowedRoles.indexOf(curPrivilege) > -1;

              //TODO: handle date picker
              if (attrs.hasOwnProperty('isOpen')) {
                  $log.info('found a date picker');
                  attrs.$set('ng-disabled', curationEnabled);
              }


              if (curationEnabled === true) {
                 // if (attrs.hasOwnProperty('ngDisabled') && isButton(element)) {
                  if (isButton(element)) {
                      element.show();
                  } else {
                      element.removeAttr('disabled');
                  }
              } else {
                  if (isButton(element)) {
                      element.hide();
                  } else {
                      attrs.$set('disabled', 'disabled');
                  }
              }
             // $compile(element.contents())(scope);
          }
          */

      } //link


      /**
       * check if the element is a button
       * @param ele
       * @returns {boolean}
       */
      function isButton(ele) {
          if (ele && ele[0].outerHTML) {
              var buttonProperties = ['button', 'btn', 'submit', 'reset'];

              for (var i = 0; i < buttonProperties.length; i++) {
                  if (ele[0].outerHTML.indexOf(buttonProperties[i]) > -1) {
                      return true;
                  }
              }
          }

          return false;
      }




  } //curationField



})();
