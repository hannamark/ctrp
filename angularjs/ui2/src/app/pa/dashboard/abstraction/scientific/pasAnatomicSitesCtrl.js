/**
 * Created by schintal, Mar 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAnatomicSitesCtrl', pasAnatomicSitesCtrl);

    pasAnatomicSitesCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj','anatomicSitesObj'];

    function pasAnatomicSitesCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj, anatomicSitesObj) {
        var vm = this;

        console.log('IN pasAnatomicSitesCtrl='+ JSON.stringify(anatomicSitesObj));
        // injected objects
        vm.curTrial = trialDetailObj;

        console.log("vm.curTrial.anatomic_sites="+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

    } //pasAnatomicSitesCtrl

})();
