/**
 * Created by wus4 on 4/1/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasDiseaseCtrl', pasDiseaseCtrl);

    pasDiseaseCtrl.$inject = ['$scope', '$state', 'toastr', 'MESSAGES', '_', '$timeout', 'DiseaseService', '$window'];

    function pasDiseaseCtrl($scope, $state, toastr, MESSAGES, _, $timeout, DiseaseService, $window) {
        var vm = this;
        vm.addedDiseases = [];

        vm.searchDiseases = function() {
            var searchParams = {disease_name: vm.disease_name};
            DiseaseService.searchDiseases(searchParams).then(function(response) {
                vm.searchResult = response.diseases;
                vm.infoUrl = response.info_url;
                vm.treeUrl = response.tree_url;
            }).catch(function(err) {
                console.log("Error in searching diseases: " + err);
            });
        };

        vm.openTree = function(ncitCode) {
            console.log(ncitCode);
            $window.open(vm.treeUrl + ncitCode, '_blank', 'top=100, left=100, height=740, width=680, scrollbars=yes');
        };

        vm.openInfo = function(ncitCode) {
            console.log(ncitCode);
            $window.open(vm.infoUrl + ncitCode);
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
