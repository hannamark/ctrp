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
        $scope.orgSearchResults = {orgs: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedOrgsArray = []; // orgs selected in the ui-grid


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
                $scope.orgSearchResults = newVal;
               // console.log("received orgSearchResults: " + JSON.stringify(newVal));
            }, true);
        } //watchOrgSearchResults

    }

})();
