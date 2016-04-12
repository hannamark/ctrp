/**
 * Created by wus4 on 4/1/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasDiseaseCtrl', pasDiseaseCtrl);

    pasDiseaseCtrl.$inject = ['$scope', '$state', 'toastr', 'MESSAGES', '_', '$timeout', 'DiseaseService'];

    function pasDiseaseCtrl($scope, $state, toastr, MESSAGES, _, $timeout, DiseaseService) {
        var vm = this;

        vm.searchDiseases = function() {
            var searchParams = {disease_name: vm.disease_name};
            DiseaseService.searchDiseases(searchParams).then(function(response) {
                console.log(response);
            }).catch(function(err) {
                console.log("Error in searching diseases: " + err);
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }

    } //pasDiseaseCtrl
})();
