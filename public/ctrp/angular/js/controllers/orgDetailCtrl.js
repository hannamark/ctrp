/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'OrgService', 'toastr', 'MESSAGES',
        '$scope', 'countryList', 'Common', 'sourceStatusObj'];

    function orgDetailCtrl(orgDetailObj, OrgService, toastr, MESSAGES,
                           $scope, countryList, Common, sourceStatusObj) {
        var vm = this;
        vm.states = [];
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList.data;
        vm.countriesArr.sort(Common.a2zComparator());
        vm.curOrg = orgDetailObj || {name: "", country: ""}; //orgDetailObj.data;
        vm.curOrg = vm.curOrg.data || vm.curOrg;
        vm.sourceStatusArr = sourceStatusObj.data;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        // console.log('received orgDetailObj: ' + JSON.stringify(orgDetailObj));
        console.log('received source Status arr: ' + JSON.stringify(vm.sourceStatusArr));



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
            } else {
                vm.curOrg.country = 'United States'; //default country
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