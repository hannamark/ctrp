/**
 * Configure routes for accrual- 'accrual out-of-scope trials' component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(accrualsOutOfScopeTrialsRoutes);

    accrualsOutOfScopeTrialsRoutes.$inject = ['$stateProvider'];
    function accrualsOutOfScopeTrialsRoutes($stateProvider) {
        $stateProvider
            .state('main.accrualsOutOfScopeTrials', {} //TODO: rename this state if needed
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

    } //accrualsOutOfScopeTrialsRoutes


})();
