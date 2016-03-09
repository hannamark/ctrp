/**
 * Created by schintal, Mar 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAnatomicSitesCtrl', pasAnatomicSitesCtrl);

    pasAnatomicSitesCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj'];

    function pasAnatomicSitesCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj) {
        var vm = this;

        console.log('IN pasAnatomicSitesCtrl=');

    } //pasAnatomicSitesCtrl

})();
