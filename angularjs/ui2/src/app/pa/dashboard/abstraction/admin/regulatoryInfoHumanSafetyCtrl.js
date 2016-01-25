/**
 * Created by wangg5, January 25th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('regulatoryInfoHumanSafetyCtrl', regulatoryInfoHumanSafetyCtrl);

    regulatoryInfoHumanSafetyCtrl.$inject = ['$scope', 'PATrialService'];

    function regulatoryInfoHumanSafetyCtrl($scope, PATrialService) {
        var vm = this;
    } // regulatoryInfoHumanSafetyCtrl

})();
