/**
 * Created by wangg5 on 8/21/15.
 */


(function () {

    'use strict';

    angular.module('ctrpApp')
        .directive('ctrpAdvancedPersonSearchForm', ctrpAdvancedPersonSearchForm);

    ctrpAdvancedPersonSearchForm.$inject = ['PersonService', 'Common', '$location',
        'MESSAGES', 'uiGridConstants', '$timeout', '_', 'toastr', '$anchorScroll'];


    function ctrpAdvancedPersonSearchForm(PersonService, Common, $location, uiGridConstants,
                                          $timeout,  _, toastr, $anchorScroll) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                showgrid: '=',  //boolean
                //enablerowselection: '=',  //boolean
                maxRowSelectable : '=', //int
                isInModal: '=',  //boolean
                personSearchResults: '@personSearchResults',
                selectedPersonsArray: '@selectedPersonsArray',
            },
            templateUrl: '/ctrp/angular/js/directives/advancedPersonSearchFormTemplate.html',
            link: linkFn,
            controller: advPersonSearchDirectiveController
        };

        return directiveObj;
        
        
        function linkFn(scope, element, attrs) {

            element.text('hello replaced text!');
            console.log('isUsedInModal: ' + attrs.isInModal);
            //pass to controller scope, but will require a timeout in controller - inconvenient
            // scope.isInModal = attrs.isInModal; //
            
        } //linkFn
        
        
        
        function advPersonSearchDirectiveController($scope, $timeout) {

            console.log('$scope.isInModal: ' + $scope.isInModal);
            console.log('maxRowSelectable: ' + $scope.maxRowSelectable);

        } //advPersonSearchDirectiveController

    }


})();