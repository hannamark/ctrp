/**
 * Created by wangg5 on 6/29/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);


    ModalInstanceCtrl.$inject = ['$modalInstance', 'OrgService', 'orgId', '$timeout'];

    function ModalInstanceCtrl($modalInstance, OrgService, orgId, $timeout) {
        var vm = this;
        vm.deletionStatus = "";
        vm.ok = function() {
            OrgService.deleteOrg(orgId).then(function(data) {
                console.log("delete data returned: " + JSON.stringify(data));
                timeoutCloseModal("Deletion Successful", data.status); //204 for successful deletion
            }).catch(function(err) {
                console.log("failed to delete " + err.status);
                timeoutCloseModal("Failed to delete", err.status);
            });
        };

        vm.cancel = function() {
            $modalInstance.dismiss('cancel');
        };


        function timeoutCloseModal (deletionStatus, httpStatusCode) {
            vm.deletionStatus = deletionStatus;
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