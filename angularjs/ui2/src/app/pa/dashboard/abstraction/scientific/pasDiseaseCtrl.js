/**
 * Created by wus4 on 4/1/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasDiseaseCtrl', pasDiseaseCtrl);

    pasDiseaseCtrl.$inject = ['$scope', '$state', 'toastr', 'MESSAGES', '_', '$timeout', 'ncitTreeObj'];

    function pasDiseaseCtrl($scope, $state, toastr, MESSAGES, _, $timeout, ncitTreeObj) {
        var vm = this;

        $scope.ncitTree = [ncitTreeObj.data];

        activate();

        /****************************** implementations **************************/

        function activate() {
        }

    } //pasDiseaseCtrl
})();
