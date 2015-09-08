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

    advancedPersonSearchModalCtrl.$inject = ['$scope', '$modalInstance', 'maxRowSelectable']; //for modal controller
    ctrpPersonAdvSearchModalButton.$inject = ['$modal', '$compile', '_', '$timeout']; //modal button directive


    function ctrpPersonAdvSearchModalButton($modal, $compile, _, $timeout) {

        var directiveObj = {
            restrict: 'E',
            scope: {
                maxRowSelectable : '=?', //int, required!
                useBuiltInTemplate: '=?', //boolean
                selectedPersonsArray: '='
            },
            templateUrl: '/ctrp/ui/js/directives/person/personAdvSearchModalButtonTemplate.html',
            link: linkerFn,
            controller: personAdvSearchModalButtonController
        };

        return directiveObj;


        function linkerFn(scope, element, attrs) {
            $compile(element.contents())(scope);
            console.log('in linkerFn for personAdvSearchModal Button');
          //  scope.useBuiltInTemplate = attrs.useBuiltInTemplate == undefined ? false : true;
        } //linkerFn


        function personAdvSearchModalButtonController($scope, $timeout) {

            $scope.savedSelection = [];
            $scope.showGrid = true;
            $scope.curationMode = false;
            $scope.selectedPersonsArray = [];
            //$scope.useBuiltInTemplate = $scope.useBuiltInTemplate == undefined ? false : $scope.useBuiltInTemplate;
            var modalOpened = false;

            //console.log('maxRow selectable: ' + $scope.maxRowSelectable + ', builtInTemplate: ' + $scope.useBuiltInTemplate);
            $scope.searchPerson = function(size) {
                if (modalOpened) return; //prevent modal open twice in single click

                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/ctrp/ui/partials/modals/advanced_person_search_form_modal.html',
                    controller: 'advancedPersonSearchModalCtrl as advPersonSearchModalView',
                    size: size,
                    resolve: {
                        maxRowSelectable: function () {
                            return $scope.maxRowSelectable;
                        }
                    }
                });
                modalOpened = true;

                modalInstance.result.then(function (selectedPerson) {

                    if (angular.isArray(selectedPerson) && selectedPerson.length > 0) {
                        $scope.savedSelection = selectedPerson;
                        $scope.selectedPersonsArray = selectedPerson;
                        console.log('modal resolved selectedPerson: ' + JSON.stringify(selectedPerson));
                    }

                    modalOpened = false;
                }, function () {
                    modalOpened = false;
                    console.log("operation canceled");
                });
            }; //searchPerson

            $scope.$watch('selectedPersonsArray', function(newVal) {
                $scope.selectedPersonsArray = newVal;
            }.bind(this));


            //delete the affiliated organization from table view
            $scope.toggleSelection = function (index) {
                if (index < $scope.savedSelection.length) {
                    $scope.savedSelection.splice(index, 1);
                    // $scope.savedSelection[index]._destroy = !$scope.savedSelection[index]._destroy;
                }
            };// toggleSelection


        } //personAdvSearchModalButtonController

    } //personAdvSearchModalButton



    /**
     * Adv person search modal controller
     *
     * @param $scope
     * @param $modalInstance
     */
    function advancedPersonSearchModalCtrl($scope, $modalInstance, maxRowSelectable) {
        var vm = this;
        vm.maxRowSelectable = maxRowSelectable; //to be passed to the adv person search form

        // console.log('in Modal, received promise maxRowSelectable: ' + maxRowSelectable + ', also received usedInModal: ' + usedInModal);
        $scope.personSearchResults = {people: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedPersonsArray = [];  // persons selected in the modal

        vm.cancel = function() {
            $modalInstance.dismiss('canceled');
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

