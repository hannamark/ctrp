

/**
 * <b>Layout routing for the PA component</b>
 * An extension of the ctrp.module.routes module
 */

(function() {
    'use strict';

    angular.module('ctrp.module.routes')
    .config(paAppRoutesConfig);

    paAppRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function paAppRoutesConfig($stateProvider, $urlRouterProvider) {

           $stateProvider.state('main.pa', {
                  abstract: true,
                  url: '/pa',
                  views: {
                      '': {
                          templateUrl: 'app/pa/layout/paModuleViewFrame.html'
                      },

                      'paMenu@main.pa': {
                          templateUrl: 'app/pa/layout/paModuleMenuPanel.html'
                      },

                      'paContentView@main.pa': {
                          templateUrl: 'app/pa/layout/paModuleContentPanel.html'
                      }
                  },

                  ncyBreadcrumb: {
                      label: 'Protocol Abstraction',
                      skip: true
                  }
              });
    } //paAppRoutesConfig

})();
