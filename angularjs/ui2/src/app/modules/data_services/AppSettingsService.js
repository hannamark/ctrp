
(function () {
    'use strict';
    angular.module('ctrp.module.dataservices')
        .service('AppSettingsService', AppSettingsService);

    AppSettingsService.$inject = ['$http'];

    function AppSettingsService( $http ) {
        var appSettingsService = this;
        appSettingsService.appSettings = {};

        appSettingsService.getSettings = function (settings, external) {
            return appSettingsService.appSettings[settings] || _getRequestSettings(settings, external);
        };

        var _getRequestSettings = function (settings, external) {
            var requestURL = '/ctrp/';
            requestURL = external ? requestURL + 'app_settings_ext/' : requestURL + 'app_settings/';
            appSettingsService.appSettings[settings] = $http.get(requestURL + settings + '.json');
            return appSettingsService.appSettings[settings];
        };

    }
})();
