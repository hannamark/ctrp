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
        $scope.organization_form = {};
        vm.addedNameAliases = [];
        vm.numbers = [1, 2, 3];
        vm.states = [];
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList;
        vm.curOrg = orgDetailObj || {name: "", country: ""}; //orgDetailObj.data;
        vm.masterCopy= angular.copy(vm.curOrg);
        vm.sourceContextArr = sourceContextObj;
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        //default source status is 'Pending', as identified by the 'code' value (hard coded allowed as per the requirements)
        var activeStatusIndex = Common.indexOfObjectInJsonArray(vm.sourceStatusArr, 'code', 'ACT');
        vm.activeStatusName = vm.sourceStatusArr[activeStatusIndex].name || '';
        vm.curOrg.source_status_id = vm.curOrg.source_status_id || vm.sourceStatusArr[activeStatusIndex].id;

        var ctrpSourceContextIndex = Common.indexOfObjectInJsonArray(vm.sourceContextArr, 'code', 'CTRP');
        vm.ctrpSourceContextIndex = ctrpSourceContextIndex;
        vm.alias = '';
        vm.curationReady = false;
        $scope.showPhoneWarning = false;

        //console.log('vm.curOrg: ' + JSON.stringify(vm.curOrg));

        //update organization (vm.curOrg)
        vm.updateOrg = function () {

            // Construct nested attributes
            if (vm.addedNameAliases.length > 0) {
                vm.curOrg.name_aliases_attributes = [];
                _.each(vm.addedNameAliases, function (otherId) {
                    vm.curOrg.name_aliases_attributes.push(otherId);
                });
            }
            // An outer param wrapper is needed for nested attributes to work
            var outerOrg = {};
            outerOrg.new = vm.curOrg.new;
            outerOrg.id = vm.curOrg.id;
            outerOrg.organization = vm.curOrg;
            OrgService.upsertOrg(outerOrg).then(function (response) {
                if (vm.curOrg.new) {
                  console.log('successfully saved the new org with id: ' + JSON.stringify(response));
                    vm.clearForm();
                    vm.curOrg.new = false;
                    $state.go('main.orgDetail', {orgId: response.id});
                }
                toastr.clear();
                toastr.success('Organization ' + vm.curOrg.name + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function (err) {
                console.log("error in updating organization " + JSON.stringify(vm.curOrg));
            });
        }; // updateOrg

        vm.resetForm = function() {
            angular.copy(vm.masterCopy,vm.curOrg);
            vm.addedNameAliases = [];
            appendNameAliases();
        };

        vm.clearForm = function () {
            $scope.organization_form.$setPristine();
            vm.addedNameAliases = [];
            vm.alias = '';

            var excludedKeys = ['new', 'ctrp_id', 'id', 'state', 'country', 'source_status_id', 'cluster'];
            Object.keys(vm.curOrg).forEach(function (key) {
                if (excludedKeys.indexOf(key) == -1) {
                    vm.curOrg[key] = angular.isArray(vm.curOrg[key]) ? [] : '';
                    /* the following line should be removed */
                   // $scope.organization_form.$setPristine(); //should not setPristine the form multiple times
                }
                //default context to ctrp
                vm.curOrg.source_context_id = OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP');
            });
        };

        // Add new alias
        vm.addNameAlias= function () {
            if (vm.alias) {
                var aliasIndex = Common.indexOfObjectInJsonArray(vm.addedNameAliases, 'name', vm.alias);
                if (aliasIndex == -1) {
                    var newAlias = {name: vm.alias, _destroy: false};
                    vm.addedNameAliases.unshift(newAlias);
                }
                vm.alias = '';
            }
        };
        // Delete the associations
        vm.toggleSelection = function (index, type) {
            if (type == 'other_id') {
                if (index < vm.addedNameAliases.length) {
                    vm.addedNameAliases[index]._destroy = !vm.addedNameAliases[index]._destroy;
                }
            }
        };// toggleSelection

        // Swap context when different tab is selected
        $scope.$watch(function() {
            return vm.tabIndex;
        }, function(newValue, oldValue) {
            if (!vm.curOrg.new) {
                OrgService.getOrgById(vm.curOrg.cluster[newValue].id).then(function (response) {
                    vm.curOrg = response;
                    listenToStatesProvinces();
                    vm.masterCopy= angular.copy(vm.curOrg);
                    vm.addedNameAliases = [];
                    appendNameAliases();
                }).catch(function (err) {
                    console.log("Error in retrieving organization during tab change.");
                });
            }
        });

        activate();


        /****************** implementations below ***************/
        function activate() {
            //default context to ctrp, if not set
            vm.curOrg.source_context_id = !vm.curOrg.source_context_id ?
                OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP') : vm.curOrg.source_context_id;

            listenToStatesProvinces();
            appendNewOrgFlag();
            setTabIndex();
            //prepare the modal window for existing organizations
            if (!vm.curOrg.new) {
                prepareModal();
                appendNameAliases();
            }
        }
        // Append associations for existing Trial
        function appendNameAliases() {
            for (var i = 0; i < vm.curOrg.name_aliases.length; i++) {
                var name_alias = {};
                name_alias.id = vm.curOrg.name_aliases[i].id;
                name_alias.name = vm.curOrg.name_aliases[i].name;
                name_alias._destroy = false;
                vm.addedNameAliases.push(name_alias);
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

        function setTabIndex() {
            if (vm.curOrg.new) {
                vm.curOrg.cluster = [{"context": "CTRP"}];
            } else {
                for (var i = 0; i < vm.curOrg.cluster.length; i++) {
                    if (vm.curOrg.cluster[i].id == vm.curOrg.id) {
                        vm.tabIndex = i;
                    }
                }
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


        //Function that checks if an Organization - based on Name & source context is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the organization/unique Rails end point.
        $scope.checkUniqueOrganization = function(){

            var ID = 0;
            if(angular.isObject(orgDetailObj))
                ID = vm.curOrg.id;

            var searchParams = {"org_name": vm.curOrg.name, "source_context_id": vm.curOrg.source_context_id, "org_exists": angular.isObject(orgDetailObj), "org_id": ID};
            console.log('Org name is ' + vm.curOrg.name);
            console.log('Source context is ' + vm.curOrg.source_context_id);
            console.log('Org exists? ' + angular.isObject(orgDetailObj));
            console.log('Org ID ' + vm.curOrg.id);

            vm.showUniqueWarning = false

            var result = OrgService.checkUniqueOrganization(searchParams).then(function (response) {
                vm.name_unqiue = response.name_unique;

                if(!response.name_unique && vm.curOrg.name.length > 0)
                    vm.showUniqueWarning = true

                console.log("Is org name unique: " +  vm.name_unqiue);
                console.log(JSON.stringify(response));
            }).catch(function (err) {
                console.log("error in checking for duplicate org name " + JSON.stringify(err));
            });
        };

        $scope.IsValidPhoneNumber = function(){

            //var selectedCountryCode = countryToCountryCode('United States');

            //console.log("country code is " + selectedCountryCode);

            $scope.IsPhoneValid = isValidNumber(vm.curOrg.phone,  vm.curOrg.country);
            $scope.showPhoneWarning = true;
            console.log('Is phone valid: ' + $scope.IsPhoneValid);


        }

    }


})();
