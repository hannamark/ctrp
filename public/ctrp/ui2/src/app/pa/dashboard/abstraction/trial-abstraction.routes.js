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
                    controller: function($scope) {
                        $scope.trialName = "Test!!";
                    },
                    ncyBreadcrumb: {
                        parent: 'main.paTrialSearch',
                        label: 'Trial Overview: {{trialName}}'
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
                })
                .state('main.pa.trialOverview.trialMilestones', {
                    url: '/milestones',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_milestones.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Milestones'
                    }
                })
                .state('main.pa.trialOverview.onHoldInfo', {
                    url: '/on-hold-info',
                    templateUrl: 'app/pa/dashboard/abstraction/on_hold_info.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'On Hold Info'
                    }
                })
                .state('main.pa.trialOverview.viewTSR', {
                    url: '/view-tsr',
                    templateUrl: 'app/pa/dashboard/abstraction/view_TSR.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'View TSR'
                    }
                })
                .state('main.pa.trialOverview.assignOwnership', {
                    url: '/assign-ownership',
                    templateUrl: 'app/pa/dashboard/abstraction/assign_ownership.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Assign Ownership'
                    }
                })
                .state('main.pa.trialOverview.checkoutHistory', {
                    url: '/check-out-history',
                    templateUrl: 'app/pa/dashboard/abstraction/check_out_history.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Check Out History'
                    }
                })
                .state('main.pa.trialOverview.jsonRawData', {
                    url: '/raw-json-trial-data',
                    templateUrl: 'app/pa/dashboard/abstraction/raw_json_trial_data.html',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Raw JSON Data'
                    }
                });

    } //trialAbstractionRoutes


})();
