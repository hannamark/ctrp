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
        vm.addedDiseases = [];

        vm.searchDiseases = function() {
            var searchParams = {disease_name: vm.disease_name};
            DiseaseService.searchDiseases(searchParams).then(function(response) {
                vm.searchResult = response.diseases;
            }).catch(function(err) {
                console.log("Error in searching diseases: " + err);
            });
        };

        vm.addDisease = function(index) {
            vm.addedDiseases.push(vm.searchResult[index]);
            vm.searchResult[index].added = true;
        };

        vm.removeDisease = function(index) {
            vm.addedDiseases[index].added = false;
            vm.addedDiseases.splice(index, 1);
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }

    } //pasDiseaseCtrl
})();
