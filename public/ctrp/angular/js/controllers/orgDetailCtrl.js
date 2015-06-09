/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'OrgService', 'toastr'];

    function orgDetailCtrl(orgDetailObj, OrgService, toastr) {

        var vm = this;
        vm.curOrg = orgDetailObj || {name: ""}; //orgDetailObj.data;
        vm.curOrg = vm.curOrg.data || vm.curOrg;
        console.log('received orgDetailObj: ' + JSON.stringify(orgDetailObj));

        //update organization (vm.curOrg)
        vm.updateOrg = function() {
            OrgService.upsertOrg(vm.curOrg).then(function(response) {
                toastr.success('Organization ' + vm.curOrg.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating organization " + JSON.stringify(vm.curOrg));
            });
        }; // updateOrg

    }


})();