/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialStatusCtrl', paTrialStatusCtrl);

    paTrialStatusCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService'];

    function paTrialStatusCtrl($scope, _, PATrialService, TrialService) {
        var vm = this;
        console.log('in paTrialStatusCtrl');
    } // paTrialStatusCtrl

})();
