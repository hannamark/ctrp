/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialAbstractionRoutes);

    trialAbstractionRoutes.$inject = ['$stateProvider'];
    function trialAbstractionRoutes($stateProvider) {
        $stateProvider
            .state('main.pa.trialOverview', {
                        url: '/trial_overview',
                        templateUrl: 'app/pa/dashboard/abstraction/trial_overview.html',
                        // controller: 'trialCtrl as trialView'
                        ncyBreadcrumb: {
                            parent: 'main.defaultContent',
                            label: 'Trial Overview'
                        }
                    });

    } //trialAbstractionRoutes


})();
