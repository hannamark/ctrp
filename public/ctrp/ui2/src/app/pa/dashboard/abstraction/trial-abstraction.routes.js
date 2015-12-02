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
                /* this is the parent state for the states below */
                    url: '/trial/:trialId',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview.html',
                    // controller: 'paTrialOverviewCtrl as paTrialOverview',
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent', //TODO: to be changed to PA Trial search
                        label: 'Trial Overview'
                    }
                })
                .state('main.pa.trialOverview.trialIdentification', {
                    url: '/identification',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_identification.html',
                    controller: 'trialIdentificationCtrl as trialIdView',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Identification'
                    }
                })
                .state('main.pa.trialOverview.trialHistory', {
                    url: '/history',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_history.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial History'
                    }
                });

    } //trialAbstractionRoutes


})();
