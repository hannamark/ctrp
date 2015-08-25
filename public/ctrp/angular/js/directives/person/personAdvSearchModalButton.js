/**
 * Created by wangg5 on 8/24/15.
 */

/**
 * Modal for wrapping the advancedPersonSearchForm directive
 *
 */

(function() {

    'use strict';

    angular.module('ctrpApp')
        .controller('advancedPersonSearchModalCtrl', advancedPersonSearchModalCtrl)
        .directive('ctrpPersonAdvSearchModalButton', ctrpPersonAdvSearchModalButton);

    advancedPersonSearchModalCtrl.$inject = ['$scope', '$modalInstance']; //for modal controller
    ctrpPersonAdvSearchModalButton.$inject = ['$modal', '$compile', '_', '$timeout']; //modal button directive


    function ctrpPersonAdvSearchModalButton($modal, $compile, _, $timeout) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                maxRowSelectable : '=?', //int, required!
                selectedPersonsArray: '@selectedPersonsArray',
            },
//            template: '<button class="btn btn-default">Hello</button>',
            templateUrl: '/ctrp/angular/js/directives/person/personAdvSearchModalButtonTemplate.html',
            link: linkerFn,
            controller: personAdvSearchModalButtonController
        };

        return directiveObj;


        function linkerFn(scope, element, attrs) {
            $compile(element.contents())(scope);
          //  element.text('hello world!');
            console.log('in linkerFn for personAdvSearchModal Button');
        } //linkerFn


        function personAdvSearchModalButtonController($scope) {

            $scope.savedSelection = []; //TODO: to be passed to the container scope
            $scope.showGrid = true;
            $scope.curationMode = false;
            $scope.selectedPersonFilter = '';
            $scope.
            var modalOpened = false;

            $scope.searchPerson = function(size) {
                if (modalOpened) return; //prevent modal open twice in single click

                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/ctrp/angular/partials/modals/advanced_person_search_form_modal.html',
                    controller: 'advancedPersonSearchModalCtrl as advPersonSearchModalView',
                    size: size
                });
                modalOpened = true;

                modalInstance.result.then(function (selectedPersons) {
                    // console.log("received selected items: " + JSON.stringify(selectedPersons));
                    //TODO: $scope.batchSelect('selectAll', selectedPersons);
                   // $scope.savedSelection = selectedPersons;
                    console.log('modal resolved the promise for selected Persons: ' + JSON.stringify(selectedPersons));
                    if (angular.isArray(selectedPersons) && selectedPersons.length > 0) {

                        $scope.$apply(function() {
                            $scope.savedSelection = $scope.savedSelection.concat(selectedPersons);
                        });

                        $scope.$parent.selectedPersonsArray = $scope.$parent.selectedPersonsArray.concat(selectedPersons);


                        /*
                        _.each(selectedPersons, function(personItem, idx) {
                            console.log("pushing the personItem: " + JSON.stringify(personItem));
                           $scope.savedSelection.push(personItem);
                           $scope.$parent.selectedPersonsArray.push(personItem);
                        });
                        */
                    }
                    modalOpened = false;
                }, function () {
                    modalOpened = false;
                    console.log("operation canceled");
                });
            }; //searchPerson


            //delete the affiliated organization from table view
            $scope.toggleSelection = function (index) {
                if (index < $scope.savedSelection.length) {
                    $scope.savedSelection[index]._destroy = !$scope.savedSelection[index]._destroy;
                }
            };// toggleSelection


        }

    } //personAdvSearchModalButton



    /**
     * Adv person search modal controller
     *
     * @param $scope
     * @param $modalInstance
     */
    function advancedPersonSearchModalCtrl($scope, $modalInstance) {
        var vm = this;
        $scope.personSearchResults = {people: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedPersonsArray = [];

        vm.cancel = function() {
            $modalInstance.dismiss('cancel');
        }; //cancel

        vm.confirmSelection = function() {
            $modalInstance.close($scope.selectedPersonsArray);
        }; //confirmSelection


        activate();

        function activate() {
            watchPersonSearchResults();
            watchSelectedPersons();
        }


        function watchPersonSearchResults() {
            $scope.$watch('personSearchResults', function (newVal, oldVal) {
                $scope.personSearchResults = newVal;
                //console.log('in Modal, personSearchResults: ' + JSON.stringify($scope.personSearchResults));
            }, true);
        } //watchPersonSearchResults


        function watchSelectedPersons() {
            $scope.$watch('selectedPersonsArray', function(newVal, oldVal) {
                console.log('In Person search modal, selectedPersonsArray.length: ' + $scope.selectedPersonsArray.length);
            }, true);

        } //watchSelectedPersons
    }





})();

