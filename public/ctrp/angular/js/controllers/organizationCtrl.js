/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService'];

    function organizationCtrl(OrgService) {

        var vm = this;
        vm.gridOptions = OrgService.getGridOptions();

        activate();

    /****************************** implementations **************************/

        function activate() {

        } //activate
    }

})();
