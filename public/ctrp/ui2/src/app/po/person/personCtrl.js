/**
 * Created by wus4 on 7/2/15.
 */


(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('personCtrl', personCtrl);

    personCtrl.$inject = ['PersonService', '$scope'];

    function personCtrl(PersonService, $scope) {
        var vm = this;
        console.log('in person controller for list');
        $scope.personSearchResults = {people: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedPersonsArray = []; // persons selected in the ui-grid
        

        activate();
        function activate() {}

    }

})();
