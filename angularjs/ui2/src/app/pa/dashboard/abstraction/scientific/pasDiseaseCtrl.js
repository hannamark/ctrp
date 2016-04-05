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

        vm.getTree = function() {
            var treeParams = {disease_id: vm.disease_id};
            DiseaseService.getNcitTree(treeParams).then(function(response) {
                $scope.ncitTree = [response.data];
            }).catch(function(err) {
                console.log("Error in getting NCIT tree: " + err);
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }

    } //pasDiseaseCtrl
})();
