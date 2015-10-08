/**
 * ***********************************************************************
 * For annotating fields in a form for curation.                         *
 * This directive listens to the privilege changes sent from $rootScope* *
 *                                                                       *
 * You can configure what user role can curate the field by setting the  *
 * user roles/privileges at the directive. For example:                  *
 *                                                                       *
 * curation-field=" 'CURATOR1, CURATOR2, ADMIN' "                        *
 * (if not set, default to 'CURATOR')                                    *
 *                                                                       *
 * ***********************************************************************
 *
 * Created by wangg5 on 10/7/15.
 *
 */


(function() {

    'use strict';

    angular.module('ctrpApp')
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

            watchPrivilegeSubRoutine();

            scope.$on(MESSAGES.PRIVILEGE_CHANGED, function() {
                watchPrivilegeSubRoutine();
            });

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