/**
 * Created by wangg5 on 8/21/15.
 */

(function() {
    'use strict';
    
    angular.module('ctrpApp')
        .controller('personSearchCtrl', personSearchCtrl);

    personSearchCtrl.$inject = ['PersonService', '$scope'];
    
    function personSearchCtrl(PersonService, $scope) {
        var vm = this;

        vm.name = 'Tony';

    } //personSearchCtrl
    
    
})();