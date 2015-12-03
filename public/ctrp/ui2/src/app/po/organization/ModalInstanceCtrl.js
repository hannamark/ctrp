/**
 * Created by wangg5 on 6/29/15.
 *
 * Confirmation modal for deleting an organization
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);


    ModalInstanceCtrl.$inject = ['$modalInstance', 'OrgService', 'orgId', '$timeout'];

    function ModalInstanceCtrl($modalInstance, OrgService, orgId, $timeout) {
        var vm = this;
        vm.modalTitle = "Please confirm";
        vm.deletionStatus = "";
        vm.ok = function() {
            OrgService.deleteOrg(orgId).then(function(data) {
                console.log("delete data returned: " + JSON.stringify(data));
                if (data.status > 206) {
                    vm.modalTitle = "Deletion failed";
                    timeoutCloseModal(data.data.family || data.data.person);
                } else {
                    vm.modalTitle = "Deletion is successful";
                    timeoutCloseModal("Permanently deleted", data.status); //204 for successful deletion
                }
            }).catch(function(err) {
                vm.modalTitle = "Deletion failed";
                console.log("failed to delete the organization, error code: " + err.status);
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
            }, 1500);
        }

    }

})();
