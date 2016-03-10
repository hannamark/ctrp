pasEligibilityCtrl

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasEligibilityCtrl', pasEligibilityCtrl);

    pasEligibilityCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout'];

    function pasEligibilityCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout) {


    } // pasEligibilityCtrl

})();
