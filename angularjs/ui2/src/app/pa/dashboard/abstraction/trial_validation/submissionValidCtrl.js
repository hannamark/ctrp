/**
 * Created by wangg5, June 27th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('submissionValidCtrl', submissionValidCtrl);

    submissionValidCtrl.$inject = ['$scope', '$timeout'];

    function submissionValidCtrl($scope, emailLogs) {
        var vm = this;
        console.info('hello from submission validation controller!');

    } // trialEmailLogsCtrl

})();
