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

        $scope.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        }

        activate();

        /****************************** implementations **************************/

        function activate() {
        }

    } //pasDiseaseCtrl
})();
