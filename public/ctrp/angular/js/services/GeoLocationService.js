/**
 * Created by wangg5 on 6/22/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('GeoLocationService', GeoLocationService);

    GeoLocationService.$inject = ['PromiseService', 'URL_CONFIGS', '$log'];

    function GeoLocationService(PromiseService, URL_CONFIGS, $log) {

        var services = {
            getCountryList : getCountryList,
            getStateListInCountry : getStateListInCountry
        };

        return services;




        /***************************** implementations ************************/

        function getCountryList() {
            return PromiseService.getData(URL_CONFIGS.COUNTRY_LIST);

        } //getCountryList



        /**
         *
         * @param country
         * @returns {*|string}
         */
        function getStateListInCountry(country) {
            return PromiseService.getData(URL_CONFIGS.STATES_IN_COUNTRY + country);

        }

    }
    


})();