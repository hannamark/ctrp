/**
 * Created by wangg5 on 6/1/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('organizationCtrl', organizationCtrl);

    organizationCtrl.$inject = ['OrgService', '$scope'];

    function organizationCtrl(OrgService, $scope) {

        var vm = this;
        $scope.orgSearchResults = [];


        activate();

    /****************************** implementations **************************/

        function activate() {
            watchOrgSearchResults()
        } //activate


        /**
         * watch the organization search results
         */
        function watchOrgSearchResults() {
            $scope.$watch('orgSearchResults', function(newVal, oldVal) {
                vm.orgSearchResults = newVal;
            }, true);
        } //watchOrgSearchResults

    }

})();
