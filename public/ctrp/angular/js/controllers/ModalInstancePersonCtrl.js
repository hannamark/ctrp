/**
 * Created by wus4 on 7/7/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('ModalInstancePersonCtrl', ModalInstancePersonCtrl);


    ModalInstancePersonCtrl.$inject = ['$modalInstance', 'PersonService', 'personId', '$timeout'];

    function ModalInstancePersonCtrl($modalInstance, PersonService, personId, $timeout) {
        var vm = this;
        vm.modalTitle = "Please confirm";
        vm.deletionStatus = "";
        vm.ok = function() {
            PersonService.deletePerson(personId).then(function(data) {
                console.log("delete data returned: " + JSON.stringify(data));
                vm.modalTitle = "Deletion is successful";
                timeoutCloseModal("Permanently deleted", data.status); //204 for successful deletion
            }).catch(function(err) {
                vm.modalTitle = "Deletion failed";
                console.log("failed to delete the person, error code: " + err.status);
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