/**
 * Created by wangg5, July 8th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('abstractValidCtrl', abstractValidCtrl);

    abstractValidCtrl.$inject = ['$scope', '$timeout', '_'];

    function abstractValidCtrl($scope, $timeout, _) {
        var vm = this;
    } // abstractValidCtrl

})();
