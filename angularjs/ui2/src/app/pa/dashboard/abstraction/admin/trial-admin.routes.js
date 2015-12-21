/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialAbstractionRoutes);

    trialAbstractionRoutes.$inject = ['$stateProvider'];
    function trialAbstractionRoutes($stateProvider) {
        $stateProvider
                .state('main.pa.trialOverview.generalTrialDetails', {
                    url: '/trialDetails',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/trial_details.html',
                    // controller: 'trialIdentificationCtrl as trialIdView',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'General Details'
                    }
                })
                .state('main.pa.trialOverview.nciInfo', {
                    url: '/nciInfo',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/trial_nci.html',
                    controller: 'trialNciCtrl as trialNciView',
                    section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    //PATrialService: 'PATrialService',
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'NCI Specific Information'
                    }
                });

    } //trialAbstractionRoutes


})();
