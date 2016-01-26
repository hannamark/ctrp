/**
 * Created by wangg5, January 25th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('regulatoryInfoHumanSafetyCtrl', regulatoryInfoHumanSafetyCtrl);

    regulatoryInfoHumanSafetyCtrl.$inject = ['$scope', 'PATrialService', 'boardApprovalStatuses'];

    function regulatoryInfoHumanSafetyCtrl($scope, PATrialService, boardApprovalStatuses) {
        var vm = this;
        console.log('board approval statuses: ', boardApprovalStatuses.statuses);
    } // regulatoryInfoHumanSafetyCtrl

})();
