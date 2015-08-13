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
        vm.modalTitle = "Family Memberships for ";
        FamilyService.getFamilyById(familyId).then(function(data) {
            vm.familyName=data.data.name;
            vm.modalTitle= vm.modalTitle +vm.familyName;
        })
        vm.close = function() {
            $modalInstance.dismiss('cancel');
        };
        vm.aff_orgs=[];
        FamilyService.getAffiliatedOrgsByFamilyId(familyId).then(function (data) {
            console.log("received family member orgss: " + JSON.stringify(data.data));
            vm.aff_orgs=data.data;
        }).catch(function (error) {
            console.log("error in retrieving family member orgs: " + JSON.stringify(error));
        })

    }

})();