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
        vm.issues = {
            errors: {admin: [], scientific: []},
            warnings: []
        };

        vm.issues.errors.admin.push({id: 2, error_code: 'PAE001', section: 'PAA', item: 'trial_status',
            type: 'error', description: 'Official title is required', remark: 'follow the menus'});
        vm.issues.errors.scientific.push({id: 3, error_code: 'PAE002', section: 'PAS', item: 'intervention',
                type: 'error', description: 'intervention is required', remark: 'follow the menus'});

        vm.issues.warnings.push({id: 4, error_code: 'PAW001', section: 'PAS', item: 'trial_design',
                    type: 'warning', description: 'trial design has warnings', remark: 'follow the menus'});


    } // abstractValidCtrl

})();
