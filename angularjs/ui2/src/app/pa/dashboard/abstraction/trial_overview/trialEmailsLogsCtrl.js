/**
 * Created by wangg5, April 26th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('trialEmailLogsCtrl', trialEmailLogsCtrl);

    trialEmailLogsCtrl.$inject = ['$scope', 'emailLogs'];

    function trialEmailLogsCtrl($scope, emailLogs) {
        var vm = this;
        console.info('in trialEmailLogsCtrl: ', emailLogs);

    } // trialEmailLogsCtrl

})();
