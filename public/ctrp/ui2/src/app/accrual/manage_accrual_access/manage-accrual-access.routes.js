/**
 * Configure routes for accrual- 'manage accrual access' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(manageAccrualAccessRoutes);

    manageAccrualAccessRoutes.$inject = ['$stateProvider'];
    function manageAccrualAccessRoutes($stateProvider) {
        $stateProvider
            .state(
                'main.manageAccrualAccess', {} //TODO: rename this if needed
                /** TODO: configure this section
                 {
                        url: '/trial_overview',
                        templateUrl: 'app/pa/trial/abstraction/trial_overview.html',
                        // controller: 'trialCtrl as trialView'
                        ncyBreadcrumb: {
                            parent: 'main.defaultContent', //TODO: replace this with appropriate parent state name
                            label: 'label place holder' //TODO: give an appropriate label name
                        }
                    }
                        */
                    );

    } //manageAccrualAccessRoutes


})();
