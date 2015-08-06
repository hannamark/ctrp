/**
 * Created by wangg5 on 8/6/15.
 */


/**
 * Reusable advanced organization search form
 */
(function() {

    'use strict';

    angular.module('ctrpApp')
        .directive('advancedOrgSearchForm', advancedOrgSearchForm);

    advancedOrgSearchForm.$inject = ['OrgService'];

    function advancedOrgSearchForm(OrgService) {

        var directiveObj = {
            restrict : 'E',
            scope: {countries: '=', sourceStatuses: '=' },  //false: directive uses the parent scope so it can access the parent's ng-model
            templateUrl: '/ctrp/angular/js/directives/advancedOrgSearchFormTemplate.html',
            link: linkFn,
            controller: orgSearchController
        };

        return directiveObj;


        /**************** implementations below ******************/

        function linkFn(scope, element, attr, controller) {
            // element.text('this is the advanced search form');
           // scope.sourceStatuses.length;
           // scope.countries.length;
            console.log('countries length: ' + scope.countries.length);
            console.log('sourceStatuses length: ' + scope.sourceStatuses.length);
        } //linkFn


        function orgSearchController($scope) {
            $scope.name = "tony wang";
            console.log("running the controller in the form directive");

            $scope.countriesArr = $scope.$parent.countriesArr;
            $scope.states = []; //$scope.$parent.states;
            $scope.sourceStatusArr = $scope.$parent.sourceStatusArr;

            // console.log('sourceStatusArr.length = ' + $scope.$parent.sourceStatuses.length);

        } //orgSearchController


    } //advancedOrgSearchForm


})();