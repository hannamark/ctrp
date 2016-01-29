/**
 * Created by wangg5 on 9/14/15.
 *
 * Modal for wrapping the advancedOrgSearchForm2 directive
 *
 */


(function() {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('advancedOrgSearchForm2ModalCtrl', advancedOrgSearchForm2ModalCtrl)
        .directive('ctrpOrgAdvSearchModalButton', ctrpOrgAdvSearchModalButton);

    advancedOrgSearchForm2ModalCtrl.$inject = ['$scope', '$uibModalInstance', 'maxRowSelectable']; //for modal controller
    ctrpOrgAdvSearchModalButton.$inject = ['$uibModal', '$compile', '_', '$timeout', 'Common']; //modal button directive


    function ctrpOrgAdvSearchModalButton($uibModal, $compile, _, $timeout, Common) {
        var directiveObj = {
            restrict: 'E',
            scope: {
                maxRowSelectable: '=?', //int, required!
                useBuiltInTemplate: '=?', //boolean
                selectedOrgsArray: '=',
                allowOverwrite: '=?' //boolean, overwrite previously selected organizations or not (default to true)

            },
            templateUrl: 'app/po/organization/directives/advancedOrgSearchModalButtonTemplate.html',
            link: linkerFn,
            controller: orgAdvSearchModalButtonController
        };

        return directiveObj;


        function linkerFn(scope, element, attrs) {
            $compile(element.contents())(scope);
            //console.log('in linkerFn for orgAdvSearchModal Button');
            //  scope.useBuiltInTemplate = attrs.useBuiltInTemplate == undefined ? false : true;
        } //linkerFn


        function orgAdvSearchModalButtonController($scope, $timeout) {

            $scope.savedSelection = [];
            $scope.showGrid = true;
            $scope.curationMode = false;
            $scope.selectedOrgsArray = [];
            $scope.allowOverwrite = $scope.allowOverwrite == undefined ? true : $scope.allowOverwrite;
            //$scope.useBuiltInTemplate = $scope.useBuiltInTemplate == undefined ? false : $scope.useBuiltInTemplate;
            var modalOpened = false;
            console.log('in button controller, use built-in template: ' + $scope.useBuiltInTemplate + ', maxRowSelectable:' + $scope.maxRowSelectable);


            //console.log('maxRow selectable: ' + $scope.maxRowSelectable + ', builtInTemplate: ' + $scope.useBuiltInTemplate);
            $scope.searchOrgs = function(size) {
                if (modalOpened) return; //prevent modal open twice in single click

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/po/organization/directives/advanced_org_search_form_modal2.html',
                    controller: 'advancedOrgSearchForm2ModalCtrl as advOrgSearchForm2ModalView',
                    size: size,
                    resolve: {
                        maxRowSelectable: function () {
                            return $scope.maxRowSelectable || 'undefined';
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
                            _.each(selectedOrgs, function(selectedOrg, index) {
                                //prevent pushing duplicated org
                               if (Common.indexOfObjectInJsonArray($scope.savedSelection, "id", selectedOrg.id) == -1) {
                                   $scope.savedSelection.push(selectedOrg);
                               }
                            });

                            // $scope.savedSelection = $scope.savedSelection.concat(selectedOrgs);
                            $scope.selectedOrgsArray = $scope.savedSelection; //$scope.selectedOrgsArray.concat(selectedOrgs);
                        }
                        // console.log('modal resolved selectedOrgs: ' + JSON.stringify(selectedOrgs));
                    }

                    modalOpened = false;
                }, function () {
                    modalOpened = false;
                    console.log("operation canceled");
                });
            }; //searchOrg


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
     * @param $uibModalInstance
     */
    function advancedOrgSearchForm2ModalCtrl($scope, $uibModalInstance, maxRowSelectable) {
        var vm = this;
        vm.maxRowSelectable = maxRowSelectable || 'undefined'; //to be passed to the adv org search form
        //console.log('in Modal, received promise maxRowSelectable: ' + vm.maxRowSelectable);
        $scope.orgSearchResults = {orgs: [], total: 0, start: 1, rows: 10, sort: 'name', order: 'asc'};
        $scope.selectedOrgsArray = [];  // orgs selected in the modal

        vm.cancel = function() {
            $uibModalInstance.dismiss('canceled');
        }; //cancel

        vm.confirmSelection = function() {
            $uibModalInstance.close($scope.selectedOrgsArray);
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
                //TODO: do something here if necessary
                // console.log('In Org search modal, selectedOrgsArray.length: ' + $scope.selectedOrgsArray.length);
            }, true);

        } //watchSelectedOrgs

    } //advancedOrgSearchForm2ModalCtrl


})();
