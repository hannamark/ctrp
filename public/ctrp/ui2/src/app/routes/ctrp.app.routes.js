/**
 * <b>Routing module for the entire CTRP app</b>
 *
 * Feature modules should extend from this module to add new routes.
 * !!DO NOT add feature module routes in this file!!
 */

(function() {
    'use strict';

    var ctrpAppRoutes = angular.module('ctrp.app.routes', ['ui.router']);

    ctrpAppRoutes.config(uiRouterConfig);
    uiRouterConfig.$inject = ['$provide'];

    /**
     * Customize the ui.router module with fromState and fromParams so the app
     * knows which state the user comes from
     *
     * @param  {object} $provide [Angular built-in service object]
     * @return {void}
     */
    function uiRouterConfig($provide) {
        $provide.decorator('$state', function($delegate, $rootScope) {
              $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                  $delegate.fromParams = fromParams;
                  $delegate.fromState = fromState;
                  //$delegate.current = toState;
              });
               return $delegate;
           });
    } //uiRouterConfig


    ctrpAppRoutes.config(httpProviderConfig);
    httpProviderConfig.$inject = ['$httpProvider']; //inject the $httpProvider service object

    /**
     * Configure http provider for interceptor and headers
     * @param  {object} $httpProvider [Angular built-in service object]
     * @return {void}
     */
    function httpProviderConfig($httpProvider) {
        //initialize get if not there
           if (!$httpProvider.defaults.headers.get) {
               $httpProvider.defaults.headers.get = {};
               $httpProvider.defaults.headers.common = {};
           }

           //TODO: load the interceptors: $httpProvider.interceptors.push('AuthInterceptor');
           //disable IE ajax request caching
           $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
           $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
           $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

           //interceptor below:
           $httpProvider.defaults.useXDomain = true;
           delete $httpProvider.defaults.headers.common['X-Requested-With'];

    } //httpProviderConfig

    ctrpAppRoutes.config(poAppRoutesConfig);
    poAppRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function poAppRoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function($injector) {
              var $state = $injector.get('$state');
               $state.go('main.defaultContent');
           });

           $stateProvider.state('main', {
                  url: '/main',
                  views: {
                      '': {
                          templateUrl: 'app/layout/mainContentFrame.html'
                      },

                      'rightPanel@main': {
                          templateUrl: 'app/layout/rightPanel.html'
                      },

                      'mainContent@main': {
                          templateUrl: 'app/layout/mainContent.html'
                      }
                  },
                  /*
                  ncyBreadcrumb: {
                      label: 'Home',
                      skip: true
                  }
                  */
              })
              .state('main.defaultContent', {
                   url: '/welcome',
                   templateUrl: 'app/layout/welcome/welcomeContent.html',
                   /*
                   controller: 'headerNavigationCtrl as headerView',
                   ncyBreadcrumb: {
                       label: 'Home'
                   }
                   */
               })

    } //poAppRoutesConfig

})();
