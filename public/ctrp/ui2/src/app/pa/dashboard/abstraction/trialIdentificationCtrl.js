
/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialIdentificationCtrl', trialIdentificationCtrl);

    trialIdentificationCtrl.$inject = ['$scope'];

    function trialIdentificationCtrl($scope) {
        var vm = this;
        console.log('in trial identifiation, parent detail object: ',$scope.$parent);
    } //trialIdentificationCtrl

})();
