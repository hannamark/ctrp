/**
 * Created by wangg5, January 25th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('regulatoryInfoHumanSafetyCtrl', regulatoryInfoHumanSafetyCtrl);

    regulatoryInfoHumanSafetyCtrl.$inject = ['$scope', 'PATrialService', 'boardApprovalStatuses', '_'];

    function regulatoryInfoHumanSafetyCtrl($scope, PATrialService, boardApprovalStatuses, _) {
        var vm = this;
        vm.infoObj = {}; // human subject safety information object
        vm.boardAffiliatedWith = {name: '', array: []};
        vm.statuses = boardApprovalStatuses.statuses;

    } // regulatoryInfoHumanSafetyCtrl

})();
