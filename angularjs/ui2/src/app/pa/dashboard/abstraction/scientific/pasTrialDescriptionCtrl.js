(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDescriptionCtrl', pasTrialDescriptionCtrl);

    pasTrialDescriptionCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', 'protocolIdOriginObj', '_', '$timeout'];

    function pasTrialDescriptionCtrl($scope, TrialService, PATrialService, toastr,
                                     MESSAGES, protocolIdOriginObj, _, $timeout) {
        var vm = this;

    } //pasTrialDescriptionCtrl

})();
