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
                    url: '/general-trial-details',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/general_trial_details.html',
                    controller: 'generalTrialDetailsCtrl as generalTrialDetailView',
                    section: 'pa',
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'General Details'
                    }
                })
            .state('main.pa.trialOverview.regulatoryFda', {
                url: '/regFda',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_regulatory_fda.html',
                controller: 'trialRegFdaCtrl as trialDetailView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    responsiblePartyObj: function(TrialService) {
                        return TrialService.getResponsibleParties();
                    },
                    GeoLocationService : 'GeoLocationService',
                    countryList: function(GeoLocationService) {
                        return GeoLocationService.getCountryList();
                    },
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Regulatory Details'
                }
            })
            .state('main.pa.trialOverview.regulatoryInd', {
                url: '/regInd',
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_regulatory_ind.html',
                controller: 'trialRegFdaCtrl as trialDetailView',
                section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    responsiblePartyObj: function(TrialService) {
                        return TrialService.getResponsibleParties();
                    },
                    GeoLocationService : 'GeoLocationService',
                    countryList: function(GeoLocationService) {
                        return GeoLocationService.getCountryList();
                    },
                },
                ncyBreadcrumb: {
                    parent: 'main.pa.trialOverview',
                    label: 'Regulatory Details'
                }
            })

            .state('main.pa.trialOverview.nciInfo', {
                    url: '/nciInfo',
                    templateUrl: 'app/pa/dashboard/abstraction/admin/trial_nci.html',
                    controller: 'trialNciCtrl as trialNciView',
                    section: 'pa',
                resolve: {
                    TrialService: 'TrialService',
                    PATrialService: 'PATrialService',
                    trialDetailObj: function($stateParams, TrialService) {
                        return TrialService.getTrialById($stateParams.trialId);
                    },
                    studySourceObj: function(TrialService) {
                        return TrialService.getStudySources();
                    },
                    nciDivObj: function(PATrialService) {
                        return PATrialService.getNciDiv();
                    },
                    nciProgObj: function(PATrialService) {
                        return PATrialService.getNciProg();
                    },
                    },
                    ncyBreadcrumb: {
                        parent: 'main.pa.trialOverview',
                        label: 'NCI Specific Information'
                    }
                });

    } //trialAbstractionRoutes


})();
