/**
 * Created by wus4 on 4/1/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('DiseaseService', DiseaseService);

    DiseaseService.$inject = ['PromiseService', 'URL_CONFIGS', '$log', '$rootScope', 'PromiseTimeoutService',
        'UserService', 'Common'];

    function DiseaseService(PromiseService, URL_CONFIGS, $log, $rootScope, PromiseTimeoutService,
                            UserService, Common) {

        var services = {
            getAllNcitDiseaseCodes: getAllNcitDiseaseCodes,
            getNcitTree: getNcitTree
        };

        return services;

        /*********************** implementations *****************/

        function getAllNcitDiseaseCodes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NCIT_DISEASE_CODE_LIST);
        }

        function getNcitTree() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NCIT_TREE);
        }

    }
})();
