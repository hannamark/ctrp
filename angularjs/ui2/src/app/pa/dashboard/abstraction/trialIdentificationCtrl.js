
/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialIdentificationCtrl', trialIdentificationCtrl);

    trialIdentificationCtrl.$inject = ['$scope'];

    function trialIdentificationCtrl($scope) {
        var vm = this;
        // vm.trialProcessingObj = {priority: '2 - Normal', comment: ''};
        //get the processing info from parent scope
        vm.trialProcessingObj = {
            priority: $scope.$parent.paTrialOverview.trialDetailObj.process_priority || '2 - Normal',
            comment: $scope.$parent.paTrialOverview.trialDetailObj.process_comment
        };
        vm.saveProcessingInfo = saveProcessingInfo;
        vm.resetView = resetView;

        /* implementations below */
        function saveProcessingInfo() {
            console.log('processing info: ', vm.trialProcessingObj);
        }

        function resetView() {
            vm.trialProcessingObj.comment = '';
            vm.trialProcessingObj.priority = '2 - Normal';
        }

    } //trialIdentificationCtrl

})();
