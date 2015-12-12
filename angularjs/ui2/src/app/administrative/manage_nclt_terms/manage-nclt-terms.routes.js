/**
* Configure routes for administrative - 'manage nclt terms' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(manageNcltTermsRoutes);

    manageNcltTermsRoutes.$inject = ['$stateProvider'];
    function manageNcltTermsRoutes($stateProvider) {
        $stateProvider
            .state(
                'main.manageNcltTerms', {} //TODO: rename this if needed
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

    } //manageNcltTermsRoutes


})();
