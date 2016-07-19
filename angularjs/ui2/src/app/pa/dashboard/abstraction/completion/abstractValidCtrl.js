/**
 * Created by wangg5, July 8th, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('abstractValidCtrl', abstractValidCtrl);

    abstractValidCtrl.$inject = ['$scope', '$timeout', '_', 'validationResults'];

    function abstractValidCtrl($scope, $timeout, _, validationResults) {
        var vm = this;
        console.info('validationResults: ', validationResults);
        vm.issues = {
            errors: {admin: [], scientific: []},
            warnings: []
        };
        /*
        var errors = _.filter(validationResults, function(result) {
            return result.category === 'error';
        });
        vm.issues.errors.admin = _.filter(errors, function(error) {
            return error.section === 'PAA';
        });
        vm.issues.errors.scientific = _.filter(errors, function(error) {
            return error.section === 'PAS';
        });
        vm.issues.warnings = _.filter(validationResults, function(result) {
            return result.category === 'warning';
        });
        */

        var results = _.groupBy(validationResults, 'category');
        vm.issues.warnings = results.warning || [];
        var errors = _.groupBy(results.error || [], 'section');
        vm.issues.errors.admin = errors.PAA;
        vm.issues.errors.scientific = errors.PAS;
    } // abstractValidCtrl

})();
