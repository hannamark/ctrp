/**
 * Configure routes for trial component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(trialRegistrationRoutes);

    trialRegistrationRoutes.$inject = ['$stateProvider'];
    function trialRegistrationRoutes($stateProvider) {
        $stateProvider
            .state('main.trials', {
                        url: '/trials',
                        templateUrl: 'app/registry/registration/trial_list.html',
                        controller: 'trialCtrl as trialView',
                        resolve: {
                            TrialService: 'TrialService',
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
                            }
                        },
                        ncyBreadcrumb: {
                            parent: 'main.defaultContent',
                            label: 'Search Trials'
                        }
                    })

                    .state('main.addTrial', {
                        url: '/new_trial/:studySourceCode',
                        templateUrl: 'app/registry/registration/trialDetails.html',
                        controller: 'trialDetailCtrl as trialDetailView',
                        resolve: {
                            TrialService: 'TrialService',
                            trialDetailObj: function($q) {
                                var deferred = $q.defer();
                                deferred.resolve(null);
                                return deferred.promise;
                            },
                            studySourceCode: function($stateParams) {
                                return $stateParams.studySourceCode;
                            },
                            studySourceObj: function(TrialService) {
                                return TrialService.getStudySources();
                            },
                            protocolIdOriginObj: function(TrialService) {
                                return TrialService.getProtocolIdOrigins();
                            },
                            phaseObj: function(TrialService) {
                                return TrialService.getPhases();
                            },
                            researchCategoryObj: function(TrialService) {
                                return TrialService.getResearchCategories();
                            },
                            primaryPurposeObj: function(TrialService) {
                                return TrialService.getPrimaryPurposes();
                            },
                            secondaryPurposeObj: function(TrialService) {
                                return TrialService.getSecondaryPurposes();
                            },
                            accrualDiseaseTermObj: function(TrialService) {
                                return TrialService.getAccrualDiseaseTerms();
                            },
                            responsiblePartyObj: function(TrialService) {
                                return TrialService.getResponsibleParties();
                            },
                            fundingMechanismObj: function(TrialService) {
                                return TrialService.getFundingMechanisms();
                            },
                            instituteCodeObj: function(TrialService) {
                                return TrialService.getInstituteCodes();
                            },
                            nciObj: function(TrialService) {
                                return TrialService.getNci();
                            },
                            trialStatusObj: function(TrialService) {
                                return TrialService.getTrialStatuses();
                            },
                            holderTypeObj: function(TrialService) {
                                return TrialService.getHolderTypes();
                            },
                            expandedAccessTypeObj: function(TrialService) {
                                return TrialService.getExpandedAccessTypes();
                            },
                            GeoLocationService : 'GeoLocationService',
                            countryList: function(GeoLocationService) {
                                return GeoLocationService.getCountryList();
                            }
                        },
                        ncyBreadcrumb: {
                            //parent: 'main.trials',
                            parent: 'main.trials',
                            label: 'Register Trial'
                        }
                    })

                .state('main.trialDetail', {
                    url: '/trials/:trialId/{editType}',
                    templateUrl: 'app/pa/trial/registration/trialDetails.html',
                    controller: 'trialDetailCtrl as trialDetailView',
                    resolve: {
                        TrialService: 'TrialService',
                        trialDetailObj: function($stateParams, TrialService) {
                            return TrialService.getTrialById($stateParams.trialId);
                        },
                        studySourceCode: function() {
                            return '';
                        },
                        studySourceObj: function(TrialService) {
                            return TrialService.getStudySources();
                        },
                        protocolIdOriginObj: function(TrialService) {
                            return TrialService.getProtocolIdOrigins();
                        },
                        phaseObj: function(TrialService) {
                            return TrialService.getPhases();
                        },
                        researchCategoryObj: function(TrialService) {
                            return TrialService.getResearchCategories();
                        },
                        primaryPurposeObj: function(TrialService) {
                            return TrialService.getPrimaryPurposes();
                        },
                        secondaryPurposeObj: function(TrialService) {
                            return TrialService.getSecondaryPurposes();
                        },
                        accrualDiseaseTermObj: function(TrialService) {
                            return TrialService.getAccrualDiseaseTerms();
                        },
                        responsiblePartyObj: function(TrialService) {
                            return TrialService.getResponsibleParties();
                        },
                        fundingMechanismObj: function(TrialService) {
                            return TrialService.getFundingMechanisms();
                        },
                        instituteCodeObj: function(TrialService) {
                            return TrialService.getInstituteCodes();
                        },
                        nciObj: function(TrialService) {
                            return TrialService.getNci();
                        },
                        trialStatusObj: function(TrialService) {
                            return TrialService.getTrialStatuses();
                        },
                        holderTypeObj: function(TrialService) {
                            return TrialService.getHolderTypes();
                        },
                        expandedAccessTypeObj: function(TrialService) {
                            return TrialService.getExpandedAccessTypes();
                        },
                        GeoLocationService : 'GeoLocationService',
                        countryList: function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        }
                    },
                    ncyBreadcrumb: {
                        //parent: 'main.trials',
                        parent: 'main.trials',
                        label: 'Trial Detail'
                    }
                });

    } //trialRegistrationRoutes


})();
