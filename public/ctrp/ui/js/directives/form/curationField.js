/**
 * ***********************************************************************
 * For annotating fields in a form for curation.                         *
 * This directive listens to the privilege changes sent from $rootScope* *
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
                var curationEnabled = UserService.getPrivilege() == 'CURATOR' ? true : false;

                if ('date-disabled' in attrs) {
                    attrs.$set('date_disabled', !curationEnabled);
                    return;
                }

                if (curationEnabled == true) {
                    element.removeAttr('disabled');
                } else {
                    attrs.$set('disabled', 'disabled');
                }
               // $compile(element.contents())(scope);
            }

        } //link




    } //curationField


})();