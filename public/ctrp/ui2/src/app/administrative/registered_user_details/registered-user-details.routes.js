/**
 * Configure routes for administrative - 'registered user details' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(registeredUserDetailsRoutes);

    registeredUserDetailsRoutes.$inject = ['$stateProvider'];
    function registeredUserDetailsRoutes($stateProvider) {
        $stateProvider
            .state('main.registeredUserDetails', {}
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

    } //registeredUserDetailsRoutes


})();
