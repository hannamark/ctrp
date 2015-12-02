/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', '$scope'];
    function paTrialOverviewCtrl($state, $stateParams, $scope) {
        var vm = this;
        vm.accordionOpen = true;

        $scope.toggleAccordion = function() {
            vm.accordionOpen = !vm.accordionOpen;
        };

        console.log('in accordion, state.name: ', $state.current.name);
        console.log('in trial overview, from state name: ', $state.fromState);
        console.log('trialId in the url is: ', $stateParams.trialId);
    };

})();
