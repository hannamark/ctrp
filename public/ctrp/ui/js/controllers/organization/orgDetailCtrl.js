/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'OrgService', 'toastr', 'MESSAGES', 'UserService',
        '$scope', 'countryList', 'Common', 'sourceContextObj', 'sourceStatusObj', '$state', '$modal'];

    function orgDetailCtrl(orgDetailObj, OrgService, toastr, MESSAGES, UserService,
                           $scope, countryList, Common, sourceContextObj, sourceStatusObj, $state, $modal) {
        var vm = this;
        vm.name = "tony";
        vm.numbers = [1, 2, 3];
        vm.states = [];
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList;
        vm.curOrg = orgDetailObj || {name: "", country: ""}; //orgDetailObj.data;
        vm.sourceContextArr = sourceContextObj;
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        //default source status is 'Pending', as identified by the 'code' value (hard coded allowed as per the requirements)
        var activeStatusIndex = Common.indexOfObjectInJsonArray(vm.sourceStatusArr, 'code', 'ACT');
        vm.activeStatusName = vm.sourceStatusArr[activeStatusIndex].name || '';
        vm.curOrg.source_status_id = vm.curOrg.source_status_id || vm.sourceStatusArr[activeStatusIndex].id;

        var ctrpSourceContextIndex = Common.indexOfObjectInJsonArray(vm.sourceContextArr, 'code', 'CTRP');
        vm.ctrpSourceContextIndex = ctrpSourceContextIndex;

        vm.curationReady = false;
        console.log("vm.ctrpSourceContextIndex is " + vm.ctrpSourceContextIndex);
        console.log("context array is " + JSON.stringify(vm.sourceContextArr));

        //console.log('vm.curOrg: ' + JSON.stringify(vm.curOrg));

        //update organization (vm.curOrg)
        vm.updateOrg = function () {
            if (vm.curOrg.new) {
                vm.curOrg.created_by = UserService.getLoggedInUsername();
            } else {
                vm.curOrg.updated_by = UserService.getLoggedInUsername();
            }
            OrgService.upsertOrg(vm.curOrg).then(function (response) {
                if (vm.curOrg.new) {
                    vm.resetForm();
                } else {
                    vm.curOrg.updated_by = response.updated_by;
                    $state.go('main.organizations', {}, {reload: true});
                }
                toastr.success('Organization ' + vm.curOrg.name + ' has been recorded', 'Operation Successful!');
            }).catch(function (err) {
                console.log("error in updating organization " + JSON.stringify(vm.curOrg));
            });
        }; // updateOrg


        vm.resetForm = function () {
            // console.log('resetting form');
            var excludedKeys = ['new', 'ctrp_id', 'id', 'state', 'country', 'source_status_id'];
            Object.keys(vm.curOrg).forEach(function (key) {
                if (excludedKeys.indexOf(key) == -1) {
                    vm.curOrg[key] = angular.isArray(vm.curOrg[key]) ? [] : '';
                    $scope.organization_form.$setPristine();
                }
                //default context to ctrp
                vm.curOrg.source_context_id = OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP');
            });
        };


        activate();


        /****************** implementations below ***************/
        function activate() {
            //default context to ctrp, if not set
            vm.curOrg.source_context_id = !vm.curOrg.source_context_id ?
                OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP') : vm.curOrg.source_context_id;

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

            $scope.$on(MESSAGES.STATES_AVAIL, function () {
                vm.states = OrgService.getStatesOrProvinces();
            });

            $scope.$on(MESSAGES.STATES_UNAVAIL, function () {
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
                        orgId: function () {
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