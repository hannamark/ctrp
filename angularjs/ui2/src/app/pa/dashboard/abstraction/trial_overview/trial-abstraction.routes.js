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
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_overview.html',
                    controller: 'paTrialOverviewCtrl as paTrialOverview',
                    section: 'pa',
                    resolve: {
                        TrialService: 'TrialService',
                        curTrial: function(TrialService, $stateParams) {
                            var trialId = $stateParams.trialId;
                            console.log('trialId: ' + trialId);
                            return TrialService.getTrialById(trialId);
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.paTrialSearch',
                        label: 'Trial Overview'
                    }
                })
                .state('main.pa.trialOverview.trialIdentification', {
                    url: '/identification',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_identification.html',
                    controller: 'trialIdentificationCtrl as trialIdView',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Identification'
                    }
                })
                .state('main.pa.trialOverview.trialHistory', {
                    url: '/history',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_history.html',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial History'
                    }
                })
                .state('main.pa.trialOverview.trialMilestones', {
                    url: '/milestones',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/trial_milestones.html',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Trial Milestones'
                    }
                })
                .state('main.pa.trialOverview.onHoldInfo', {
                    url: '/on-hold-info',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/on_hold_info.html',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'On Hold Info'
                    }
                })
                .state('main.pa.trialOverview.viewTSR', {
                    url: '/view-tsr',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/view_TSR.html',
                    controller: 'trialReportSummaryCtrl as tsrCtrl',
                    /*
                    controller: function($scope, $state) {
                        console.log('trialId from trialOverview controller: ', $scope.$parent.paTrialOverview.trialId);
                        var curTrialId = $scope.$parent.paTrialOverview.trialId;
                        //redirect to trial update page
                        var url = $state.href('main.trialDetail', {trialId: curTrialId, editType: 'update'});
                        window.open(url, '_blank');
                        // $state.go('main.trialDetail', {trialId: curTrialId, editType: 'update'}, {inherit: false});
                    },
                    */
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'View TSR'
                    }
                })
                .state('main.pa.trialOverview.assignOwnership', {
                    url: '/assign-ownership',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/assign_ownership.html',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Assign Ownership'
                    }
                })
                .state('main.pa.trialOverview.checkoutHistory', {
                    url: '/check-out-history',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/check_out_history.html',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Check Out History'
                    }
                })
                .state('main.pa.trialOverview.jsonRawData', {
                    url: '/raw-json-trial-data',
                    templateUrl: 'app/pa/dashboard/abstraction/trial_overview/raw_json_trial_data.html',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'Raw JSON Data'
                    }
                });

    } //trialAbstractionRoutes


})();
