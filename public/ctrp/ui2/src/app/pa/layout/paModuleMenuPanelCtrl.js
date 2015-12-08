/**
 * created by wangg5 on Dec 8, 2015
 * PA - PA menu panel controller
 *
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa')
    .controller('paModuleMenuPanel', paModuleMenuPanel);

    paModuleMenuPanel.$inject = ['$state', '$scope', '$breadcrumb'];

    function paModuleMenuPanel($state, $scope, $breadcrumb) {
        var vm = this;
        vm.curState = $state.current;
        //get curUrlLink, e.g. '#/main/pa/trial/12/history'
        var curUrlLink = vm.curState.ncyBreadcrumbLink || '';
        var match = curUrlLink.match(/trial\/(\d+)/); //get the trialId, e.g. 12
        vm.trialId = match ? match[1] : '';
        console.log('extracted trialId: ', vm.trialId);
    }
})();
