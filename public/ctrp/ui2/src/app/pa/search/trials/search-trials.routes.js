/**
 * Configure routes for trial component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(paRoutes);

    paRoutes.$inject = ['$stateProvider'];
    function paRoutes($stateProvider) {
        $stateProvider
            .state('main.pa.trials', {
                        url: '/pa_trials',
                        templateUrl: 'app/pa/search/trials/pa_trial_list.html',
                        controller: 'paTrialCtrl as trialView',
                        resolve: {
                            TrialService: 'TrialService',
                            PATrialService: 'PATrialService',
                            studySourceObj: function(TrialService) {
                                return TrialService.getStudySources();
                            },
                            phaseObj: function(TrialService) {
                                return TrialService.getPhases();
                            },
                            primaryPurposeObj: function(TrialService) {
                                return TrialService.getPrimaryPurposes();
                            },
                            trialStatusObj: function(TrialService) {
                                return TrialService.getTrialStatuses();
                            },
                            milestoneObj: function(TrialService) {
                                return TrialService.getMilestones();
                            }

                        },
                        ncyBreadcrumb: {
                            parent: 'main.defaultContent',
                            label: 'Search PA Trials'
                        }
                    })

    } //paRoutes


})();

