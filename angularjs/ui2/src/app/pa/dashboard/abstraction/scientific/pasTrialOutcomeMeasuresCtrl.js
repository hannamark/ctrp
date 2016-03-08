(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialOutcomeMeasuresCtrl', pasTrialOutcomeMeasuresCtrl);

    pasTrialOutcomeMeasuresCtrl.$inject = ['$scope', 'TrialService', 'PATrialService','OutcomeMeasureService', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants'];

    function pasTrialOutcomeMeasuresCtrl($scope, TrialService, PATrialService,OutcomeMeasureService, toastr,
                                MESSAGES, _, $timeout,uiGridConstants) {
        var vm = this;

        //ui-grid plugin options
        vm.gridOptions = OutcomeMeasureService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;

        activate();
        function activate() {
            submit();
        }

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };





        function submit() {

                OutcomeMeasureService.getOutcomeMeasures().then(function (data) {
                    console.log('received search results: ' + JSON.stringify(data));
                    vm.gridOptions.data = data.outcome_measures;
                    vm.gridOptions.totalItems = data.outcome_measures["length"];
                }).catch(function (err) {
                    console.log('Getting audit trials failed');
                }).finally(function () {
                    console.log('search finished');
                    vm.searching = false;
                });
            }

    }

})();
