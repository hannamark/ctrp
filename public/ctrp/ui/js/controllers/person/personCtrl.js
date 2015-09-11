/**
 * Created by wus4 on 7/2/15.
 */


(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personCtrl', personCtrl);

    personCtrl.$inject = ['PersonService', '$scope'];

    function personCtrl(PersonService, $scope) {
        var vm = this;

        $scope.personSearchResults = {people: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedPersonsArray = []; // persons selected in the ui-grid


        activate();


        function activate() {
            watchpersonSearchResults();
        }


        /**
         * watch the organization search results
         */
        function watchpersonSearchResults() {
            $scope.$watch('personSearchResults', function(newVal, oldVal) {
                // $scope.personSearchResults = newVal;
                // console.log("received personSearchResults: " + JSON.stringify(newVal));
            }, true);


            $scope.$watch('selectedPersonsArray', function(newVal, oldVal) {
                // $scope.personSearchResults = newVal;
                //console.log("received selectedPersonsArray: " + JSON.stringify(newVal));
            }, true);
        } //watchpersonSearchResults
    }

})();
