/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'OrgService', 'toastr', 'MESSAGES', '$scope', 'countryList', 'Common'];

    function orgDetailCtrl(orgDetailObj, OrgService, toastr, MESSAGES, $scope, countryList, Common) {

        var vm = this;
        vm.states = [];
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList.data;
        vm.countriesArr.sort(Common.a2zComparator());
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



        activate()


        /****************** implementations below ***************/
        function activate() {
            listenToStatesProvinces();
        }



        /**
         * Listen to the message for availability of states or provinces
         * for the selected country
         */
        function listenToStatesProvinces() {
            if (vm.curOrg.country) {
                vm.watchCountrySelection(vm.curOrg.country);
            }

            $scope.$on(MESSAGES.STATES_AVAIL, function() {
                vm.states = OrgService.getStatesOrProvinces();
            });

            $scope.$on(MESSAGES.STATES_UNAVAIL, function() {
                vm.states = [];
            })
        }


    }


})();