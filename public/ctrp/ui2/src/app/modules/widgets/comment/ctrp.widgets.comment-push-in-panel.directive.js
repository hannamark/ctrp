/**
 * Created by wangg5 on 10/26/15.
 */


(function() {
    'use strict';

    angular.module('ctrpApp.widgets')
        .directive('sideNavPushIn', sideNavPushIn);

    sideNavPushIn.$inject = [];

    function sideNavPushIn() {
        var directiveObj = {
            restrict: 'A',
            require: '^mdSidenav',
            link: link
        };

        return directiveObj;

        function link(scope, element, attrs, sidenavCtrl) {
            var parent = angular.element(document.body); // document.getElementById('pushable_panel')
            parent.addClass('md-sidenav-push-in');
            var cssClass = (element.hasClass('md-sidenav-left') ? 'md-sidenav-left' : 'md-sidenav-right') + '-open';
            var stateChanged = function (state) {
                parent[state ? 'addClass' : 'removeClass'](cssClass);
            };

            // overvwrite default functions and forward current state to custom function
            angular.forEach(['open', 'close', 'toggle'], function (fn) {
                var org = sidenavCtrl[fn];
                sidenavCtrl[fn] = function () {
                    var res = org.apply(sidenavCtrl, arguments);
                    stateChanged(sidenavCtrl.isOpen());
                    return res;
                };
            });

        }
    }


})();