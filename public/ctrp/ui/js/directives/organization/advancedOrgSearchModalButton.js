/**
 * Created by wangg5 on 9/14/15.
 *
 * Modal for wrapping the advancedOrgSearchForm2 directive
 *
 */


(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('advancedOrgSearchForm2ModalCtrl', advancedOrgSearchForm2ModalCtrl)
        .directive('ctrpOrgAdvSearchModalButton', ctrpOrgAdvSearchModalButton);

    advancedOrgSearchForm2ModalCtrl.$inject = ['$scope', '$modalInstance', 'maxRowSelectable']; //for modal controller
    ctrpOrgAdvSearchModalButton.$inject = ['$modal', '$compile', '_', '$timeout']; //modal button directive


    function ctrpOrgAdvSearchModalButton($modal, $compile, _, $timeout) {
        var directiveObj = {
            restrict: 'E',
            scope: {
                maxRowSelectable: '=?', //int, required!
                useBuiltInTemplate: '=?', //boolean
                selectedOrgsArray: '=',
                allowOverwrite: '=' //boolean, overwrite existing selected organizations or not (default to false)

            },
            templateUrl: '/ctrp/ui/js/directives/organization/advancedOrgSearchModalButtonTemplate.html',
            link: linkerFn,
            controller: orgAdvSearchModalButtonController
        };

        return directiveObj;


        function linkerFn(scope, element, attrs) {
            $compile(element.contents())(scope);
            console.log('in linkerFn for orgAdvSearchModal Button');
            //  scope.useBuiltInTemplate = attrs.useBuiltInTemplate == undefined ? false : true;
        } //linkerFn


        function orgAdvSearchModalButtonController($scope, $timeout) {

            $scope.savedSelection = [];
            $scope.showGrid = true;
            $scope.curationMode = false;
            $scope.selectedOrgsArray = [];
            $scope.allowOverwrite = $scope.allowOverwrite == undefined ? false : $scope.allowOverwrite;
            //$scope.useBuiltInTemplate = $scope.useBuiltInTemplate == undefined ? false : $scope.useBuiltInTemplate;
            var modalOpened = false;


            //console.log('maxRow selectable: ' + $scope.maxRowSelectable + ', builtInTemplate: ' + $scope.useBuiltInTemplate);
            $scope.searchOrgs = function(size) {
                if (modalOpened) return; //prevent modal open twice in single click

                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/ctrp/ui/partials/modals/advanced_org_search_form_modal2.html',
                    controller: 'advancedOrgSearchForm2ModalCtrl as advOrgSearchForm2ModalView',
                    size: size,
                    resolve: {
                        maxRowSelectable: function () {
                            return $scope.maxRowSelectable;
                        }
                    }
                });
                modalOpened = true;

                modalInstance.result.then(function (selectedOrgs) {

                    if (angular.isArray(selectedOrgs) && selectedOrgs.length > 0) {
                        if ($scope.allowOverwrite) {
                            $scope.savedSelection = selectedOrgs;
                            $scope.selectedOrgsArray = selectedOrgs;
                        } else {
                            //concatenate
                            $scope.savedSelection = $scope.savedSelection.concat(selectedOrgs);
                            $scope.selectedOrgsArray = $scope.selectedOrgsArray.concat(selectedOrgs);
                        }
                        console.log('modal resolved selectedOrgs: ' + JSON.stringify(selectedOrgs));
                    }

                    modalOpened = false;
                }, function () {
                    modalOpened = false;
                    console.log("operation canceled");
                });
            }; //searchOrg

            /*
            // is this redundant???
            $scope.$watchCollection('selectedOrgsArray', function(newVal) {
                $scope.selectedOrgsArray = newVal;
            }.bind(this));
            */


            //delete the affiliated organization from table view
            $scope.toggleSelection = function (index) {
                if (index < $scope.savedSelection.length) {
                    $scope.savedSelection.splice(index, 1);
                    // $scope.savedSelection[index]._destroy = !$scope.savedSelection[index]._destroy;
                }
            };// toggleSelection

            $scope.batchSelect = function(intention) {
                if (intention == 'removeAll') {
                    $scope.savedSelection.length = 0;
                }
            }


        } //orgAdvSearchModalButtonController
    } //ctrpOrgAdvSearchModalButton





    /**
     * Adv org search modal controller
     *
     * @param $scope
     * @param $modalInstance
     */
    function advancedOrgSearchForm2ModalCtrl($scope, $modalInstance, maxRowSelectable) {
        var vm = this;
        vm.maxRowSelectable = maxRowSelectable || 1; //to be passed to the adv org search form

        console.log('in Modal, received promise maxRowSelectable: ' + vm.maxRowSelectable);
        $scope.orgSearchResults = {orgs: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedOrgsArray = [];  // orgs selected in the modal

        vm.cancel = function() {
            $modalInstance.dismiss('canceled');
        }; //cancel

        vm.confirmSelection = function() {
            $modalInstance.close($scope.selectedOrgsArray);
        }; //confirmSelection


        activate();

        function activate() {
            watchOrgSearchResults();
            watchSelectedOrgs();
        }


        function watchOrgSearchResults() {
            $scope.$watch('orgSearchResults', function (newVal, oldVal) {
                $scope.orgSearchResults = newVal;
                //console.log('in Modal, orgSearchResults: ' + JSON.stringify($scope.orgSearchResults));
            }, true);
        } //watchOrgSearchResults


        function watchSelectedOrgs() {
            $scope.$watchCollection('selectedOrgsArray', function(newVal, oldVal) {
                console.log('In Org search modal, selectedOrgsArray.length: ' + $scope.selectedOrgsArray.length);
            }, true);

        } //watchSelectedOrgs

    } //advancedOrgSearchForm2ModalCtrl


})();
