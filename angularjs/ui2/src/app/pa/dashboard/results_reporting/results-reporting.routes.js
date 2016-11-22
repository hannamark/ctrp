/**
 * Configure routes for pa-abstraction component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(resultsReportingRoutes);

    resultsReportingRoutes.$inject = ['$stateProvider'];
    function resultsReportingRoutes($stateProvider) {
        $stateProvider
            .state(
                'main.resultsReporting', {} //TODO: rename this if needed
                /** TODO: configure this section
                 {
                        url: '/trial_overview',
                        templateUrl: 'app/pa/trial/abstraction/trial_overview.html',
                        // controller: 'trialCtrl as trialView'
                        ncyBreadcrumb: {
                            parent: 'main.defaultContent', //TODO: replace this with appropriate parent state name
                            label: 'label place holder' //TODO: give an appropriate label name
                        }
                    }
                        */
                    );

    } //resultsReportingRoutes


})();
