/**
 * Configure routes for administrative - 'new biomarker requests' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(newBiomarkerRequestsRoutes);

    newBiomarkerRequestsRoutes.$inject = ['$stateProvider'];
    function newBiomarkerRequestsRoutes($stateProvider) {
        $stateProvider
            .state('main.newBiomarkerRequests', {}
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

    } //newBiomarkerRequestsRoutes


})();
