/**
 * Created by dullam on 7/20/2015.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .controller('familyDetailCtrl', familyDetailCtrl);
    familyDetailCtrl.$inject = ['familyDetailObj', 'FamilyService', 'familyStatusObj','familyTypeObj','toastr', 'MESSAGES',
        '$scope', 'Common', '$state', '$modal'];
    function familyDetailCtrl(familyDetailObj, FamilyService, familyStatusObj,familyTypeObj,toastr, MESSAGES,
                              $scope, Common, $state, $modal) {
        var vm = this;
        //console.log("in details controller ......."+JSON.stringify(familyDetailObj));
        vm.curFamily = familyDetailObj || {name: ""}; //familyDetailObj.data;
        vm.curFamily = vm.curFamily.data || vm.curFamily;
        vm.familyStatusArr = familyStatusObj.data;
        vm.familyTypeArr = familyTypeObj.data;

        //update family (vm.curFamily)
        vm.updateFamily = function() {
            FamilyService.upsertFamily(vm.curFamily).then(function(response) {
                toastr.success('Family ' + vm.curFamily.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating family " + JSON.stringify(vm.curFamily));
            });
        }; // updateFamily

        activate()
        /****************** implementations below ***************/
        function activate() {
            appendNewFamilyFlag();

            //prepare the modal window for existing families
            if (!vm.curFamily.new) {
                prepareModal();
            }
        }

        /**
         * Append a 'new' key to the vm.curFamily to
         * indicate this is a new family, not an family
         * for editing/curating
         *
         */
        function appendNewFamilyFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curFamily.new = true;  //
            }
        }


        function prepareModal() {
            vm.confirmDelete = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'delete_confirm_template.html',
                    controller: 'ModalInstanceFamilyCtrl as vm',
                    size: size,
                    resolve: {
                        familyId: function() {
                            return vm.curFamily.id;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log("about to delete the familyDetail " + vm.curFamily.id);
                    $state.go('main.families');
                }, function () {
                    console.log("operation canceled")
                });

            } //confirmDelete
        }; //prepareModal

    }

})();