/**
 * Configure routes for trial component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(paRoutes);

    paRoutes.$inject = ['$stateProvider'];
    function paRoutes($stateProvider) {
        $stateProvider
            .state('main.paTrialSearch', {
                        url: '/pa_trials',
                        templateUrl: 'app/pa/search/trials/pa_trial_list.html',
                        controller: 'paTrialCtrl as trialView',
                        section: 'pa',
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
                            protocolIdOriginObj: function(TrialService) {
                                return TrialService.getProtocolIdOrigins();
                            },
                            milestoneObj: function(PATrialService) {
                                return PATrialService.getMilestones();
                            },
                            researchCategoriesObj: function(PATrialService) {
                                return PATrialService.getResearchCategories();
                            },
                            nciDivObj: function(PATrialService) {
                                return PATrialService.getNciDiv();
                            },
                            nciProgObj: function(PATrialService) {
                                return PATrialService.getNciProg();
                            },
                            submissionTypesObj: function(PATrialService) {
                                return PATrialService.getSubmissionTypes();
                            },
                            submissionMethodsObj: function(PATrialService) {
                                return PATrialService.getSubmissionMethods();
                            },
                            processingStatusObj: function(PATrialService) {
                                return PATrialService.getProcessingStatuses();
                            }
                        },
                        ncyBreadcrumb: {
                            parent: 'main.defaultContent',
                            label: 'Search Trials (PA)'
                        }
                    })

    } //paRoutes


})();
