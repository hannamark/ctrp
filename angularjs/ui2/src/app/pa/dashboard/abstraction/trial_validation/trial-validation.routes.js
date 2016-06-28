/**
 * wangg5
 * June 27, 2016
 *
 * Configure routes for trial-validation component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialValidationRoutes);
    trialValidationRoutes.$inject = ['$stateProvider'];

    function trialValidationRoutes($stateProvider) {
        $stateProvider
            .state('main.pa.trialOverview.submissionValidation', {
                url: '/submission-validation',
                templateUrl: 'app/pa/dashboard/abstraction/trial_validation/submission_validation.html',
                controller:   'submissionValidCtrl as subValidView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialPhaseArr: function(TrialService) {
                        return TrialService.getPhases();
                    },
                    primaryPurposeArr: function(TrialService) {
                        return TrialService.getPrimaryPurposes();
                    },
                    amendmentReasonObj: function(PATrialService) {
                        return PATrialService.getAmendReasons();
                    }
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Submission Validation'
                }
            });
    } // trialValidationRoutes

})();
