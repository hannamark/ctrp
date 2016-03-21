/**
 * created by wangg5 on March 21, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAssociatedTrialCtrl', pasAssociatedTrialCtrl);

    pasAssociatedTrialCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout'];

    function pasAssociatedTrialCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout) {
            var vm = this;
            console.info('in associated trials');

        }

    })();
