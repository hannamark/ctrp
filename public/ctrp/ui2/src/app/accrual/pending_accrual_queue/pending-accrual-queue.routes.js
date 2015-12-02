/**
 * Configure routes for accrual- 'pending accrual queue' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(pendingAccrualQueueRoutes);

    pendingAccrualQueueRoutes.$inject = ['$stateProvider'];
    function pendingAccrualQueueRoutes($stateProvider) {
        $stateProvider
            .state('main.pendingAccrualQueue', {}
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

    } //pendingAccrualQueueRoutes


})();
