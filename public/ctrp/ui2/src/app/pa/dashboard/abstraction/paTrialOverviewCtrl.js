/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl);

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams'];
    function paTrialOverviewCtrl($state, $stateParams) {
        var vm = this;
        console.log('in trial overview, from state name: ', $state.fromState);
        console.log('trialId in the url is: ', $stateParams.trialId);
    };

})();
