/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'OrgService', 'toastr', 'MESSAGES',
        '$scope', 'countryList', 'Common', 'sourceStatusObj', '$state', '$modal'];

    function orgDetailCtrl(orgDetailObj, OrgService, toastr, MESSAGES,
                           $scope, countryList, Common, sourceStatusObj, $state, $modal) {
        var vm = this;
        vm.numbers = [1, 2, 3];
        vm.states = [];
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList.data;
        vm.countriesArr.sort(Common.a2zComparator());
        vm.curOrg = orgDetailObj || {name: "", country: ""}; //orgDetailObj.data;
        //vm.curOrg = vm.curOrg || vm.curOrg;
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        //console.log('received orgDetailObj: ' + JSON.stringify(orgDetailObj));

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
            appendNewOrgFlag();

            //prepare the modal window for existing organizations
            if (!vm.curOrg.new) {
                prepareModal();
            }
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
        } //listenToStatesProvinces


        /**
         * Append a 'new' key to the vm.curOrg to
         * indicate this is a new organization, not an organization
         * for editing/curating
         *
         */
        function appendNewOrgFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curOrg.new = true;  //
            }
        }


        function prepareModal() {
            vm.confirmDelete = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'delete_confirm_template.html',
                    controller: 'ModalInstanceCtrl as vm',
                    size: size,
                    resolve: {
                        orgId: function() {
                            return vm.curOrg.id;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log("about to delete the orgDetail " + vm.curOrg.id);
                    $state.go('main.organizations');
                }, function () {
                    console.log("operation canceled")
                   // $state.go('main.orgDetail', {orgId: vm.curOrg.id});
                });

            } //prepareModal
        }; //confirmDelete



    }


})();