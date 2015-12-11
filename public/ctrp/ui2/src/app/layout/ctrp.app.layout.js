(function() {
    'use strict';

    angular.module('ctrp.app.layout', [
        /* Angular modules */
        'ngTouch',
        'ngAnimate',
        'ngSanitize',

        /* ctrp cross-app modules */
        'ctrp.module.routes',
        'ctrp.module.timeout',
        'ctrp.module.dataservices',
        'ctrp.module.common',
        'ctrp.module.constants',
        'ctrp.module.underscoreWrapper',

        /* ctrp feature modules */


        /* 3rd party */
        'ui.router'

    ]).run(function($rootScope, $urlRouter, $state, $stateParams, $injector, UserService, LocalCacheService) {
            console.log('ctrp.app.layout is running!');
            $rootScope.$on('stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                var statesNotRequiringGsa = ['main.sign_in', 'main.sign_up', 'main.gsa'];
                if (statesNotRequiringGsa.indexOf(toState.name) === -1 &&
                    LocalCacheService.getCacheWithKey('gsaFlag') !== 'Accept') {
                    $state.go('main.gsa');
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

                event.preventDefault();
                var writeModeSupported = false; //is write mode supported for the toState?
                if (toState.section) {
                    var writeModeSupported = UserService.isWriteModeSupportedForSection(toState.section);
                    console.log('writeModeSupported: ', writeModeSupported);
                }

                $rootScope.$broadcast('isWriteModeSupported', writeModeSupported); //broadcast this


                if (toState.name === 'main.sign_in' || toState.name === 'main.sign_up') {

                    if (!UserService.isLoggedIn()) {
                        UserService.getAppVerFromDMZ().then(function(data) {
                            console.log('retrieved data from dmz: ' + JSON.stringify(data));
                            UserService.setAppVersion(data['app_version']);
                        });
                        UserService.getAppRelMilestoneFromDMZ().then(function(data) {
                            console.log('retrieved data from dmz: ' + JSON.stringify(data));
                            UserService.setAppRelMilestone(data['app_rel_milestone']);
                        });
                    }
                } else {
                    //do not show app version or release milestone on other pages unless authenticated
                    if (!UserService.isLoggedIn()) {
                        UserService.setAppVersion('');
                        UserService.setAppRelMilestone('');
                    }
                }
            });


            /*
            $rootScope.$on('$stateChangeStart', function(event, next, current) {
                if (next && current) {
                    var answer = confirm("Are you sure you want to navigate away from this page");
                    if (!answer) {
                        event.preventDefault();
                    }
                }

            });
            */
        });

})();
