/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialAbstractionScientificRoutes);

    trialAbstractionScientificRoutes.$inject = ['$stateProvider'];

    function trialAbstractionScientificRoutes($stateProvider) {
        $stateProvider
                .state('main.pa.trialOverview.trialDescription', {
                    url: '/trial-description',
                    templateUrl: '',
                    controller: '',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Description'
                    }
                })
                .state('main.pa.trialOverview.trialDesign', {
                    url: '/trial-design',
                    templateUrl: '',
                    controller: '',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Design'
                    }
                });
    }
})();
