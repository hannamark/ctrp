/**
 * Configure routes for administrative - 'manage site admins' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(manageSiteAdminsRoutes);

    manageSiteAdminsRoutes.$inject = ['$stateProvider'];
    function manageSiteAdminsRoutes($stateProvider) {
        $stateProvider
            .state('main.manageSiteAdmins', {} //TODO: rename this state if needed
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

    } //manageSiteAdminsRoutes


})();
