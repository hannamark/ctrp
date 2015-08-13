/**
 * Created by mdulla on 08/12/2015.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('ModalInstanceFamilyMembersCtrl', ModalInstanceFamilyMembersCtrl);


    ModalInstanceFamilyMembersCtrl.$inject = ['$modalInstance', 'FamilyService', 'familyId', '$timeout'];

    function ModalInstanceFamilyMembersCtrl($modalInstance, FamilyService, familyId, $timeout) {
        var vm = this;
        vm.modalTitle = "Please confirm";
        vm.deletionStatus = "";
        vm.ok = function() {
            FamilyService.deleteFamily(familyId).then(function(data) {
                console.log("delete data returned: " + JSON.stringify(data));
                vm.modalTitle = "Deletion is successful";
                timeoutCloseModal("Permanently deleted", data.status); //204 for successful deletion
            }).catch(function(err) {
                vm.modalTitle = "Deletion failed";
                console.log("failed to delete the family, error code: " + err.status);
                timeoutCloseModal(err.data || "Failed to delete", err.status);
            });
        };

        vm.cancel = function() {
            $modalInstance.dismiss('cancel');
        };


        function timeoutCloseModal (deletionStatus, httpStatusCode) {
            vm.deletionStatus = JSON.stringify(deletionStatus);
            $timeout(function() {
                if (httpStatusCode > 206) {
                    //failed deletion is treated the same as cancel
                    $modalInstance.dismiss('cancel');
                } else {
                    $modalInstance.close('delete');
                }
            }, 2500);
        }

    }

})();