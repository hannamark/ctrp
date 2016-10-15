/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'associatedOrgsObj', 'OrgService', 'toastr', 'MESSAGES', 'UserService', '$filter', '_',
        '$scope', 'countryList', 'Common', 'sourceContextObj', 'sourceStatusObj', '$state', '$uibModal', '$timeout', 'GeoLocationService', 'serviceRequests'];

    function orgDetailCtrl(orgDetailObj, associatedOrgsObj, OrgService, toastr, MESSAGES, UserService, $filter, _,
                           $scope, countryList, Common, sourceContextObj, sourceStatusObj, $state, $uibModal, $timeout, GeoLocationService, serviceRequests) {
        var vm = this;
        $scope.organization_form = {};
        vm.addedNameAliases = [];
        vm.states = [];
        vm.processingStatuses = OrgService.getProcessingStatuses();
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList;


        //set orgs and default tab
        if (associatedOrgsObj) {
            vm.associatedOrgs = associatedOrgsObj.associated_orgs;
            console.log("found:     ",vm.associatedOrgs)
            vm.defaultTab = associatedOrgsObj.active_context;
            vm.ctepOrg = getOrgByContext('CTEP');
            vm.nlmOrg = getOrgByContext('NLM');
            vm.ctrpOrg = orgDetailObj;
            console.log("found:     ",vm.ctrpOrg)
        } else {
            vm.ctrpOrg = {name: '', country: '', state: '', source_status_id: ''};
        }

        vm.sourceContextArr = sourceContextObj;
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());

        vm.alias = '';
        vm.curationReady = false;
        vm.showPhoneWarning = false;
        vm.disableBtn = false;

        vm.processStatusArr = OrgService.getProcessingStatuses();

        vm.updateOrg = function () {
            vm.disableBtn = true;

            // Construct nested attributes
            if (vm.addedNameAliases.length > 0) {
                vm.ctrpOrg.name_aliases_attributes = [];
                _.each(vm.addedNameAliases, function (otherId) {
                    vm.ctrpOrg.name_aliases_attributes.push(otherId);
                });
            }
            // An outer param wrapper is needed for nested attributes to work
            var outerOrg = {};
            outerOrg.new = vm.ctrpOrg.new;
            outerOrg.id = vm.ctrpOrg.id;
            outerOrg.organization = vm.ctrpOrg;
            OrgService.upsertOrg(outerOrg).then(function (response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (vm.ctrpOrg.new && status === 201) {
                        // created
                        $state.go('main.orgDetail', {orgId: response.id});
                    } else if (status === 200) {
                        // updated
                        vm.curOrg = response;
                        if (vm.ctrpOrg.context_change) {
                            $state.go('main.orgDetail', response, {reload: true});
                        } else {
                            // To make sure setPristine() is executed after all $watch functions are complete
                            $timeout(function () {
                                $scope.organization_form.$setPristine();
                             }, 1);
                        }
                    }

                    showToastr(vm.ctrpOrg.name);
                    vm.ctrpOrg.new = false;
                }
            }).catch(function (err) {
                console.log("error in updating organization " + JSON.stringify(vm.curOrg));
            }).finally(function() {
                vm.disableBtn = false;
            });
        }; // updateOrg

        function showToastr(orgName) {
            toastr.clear();
            toastr.success('Organization ' + orgName + ' has been recorded', 'Operation Successful!');
        }

        vm.ctrpOrgCopy= angular.copy(vm.ctrpOrg);
        vm.resetForm = function() {
            angular.copy(vm.ctrpOrgCopy, vm.ctrpOrg);
            vm.addedNameAliases = [];
            appendNameAliases();
            listenToStatesProvinces();
            $scope.organization_form.$setPristine();
        };

        vm.clearForm = function () {
            $scope.organization_form.$setPristine();
            vm.addedNameAliases = [];
            vm.alias = '';
            listenToStatesProvinces();
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


        /****************** implementations below ***************/
        function activate() {

            listenToStatesProvinces();
            watchGlobalWriteModeChanges();
            appendNewOrgFlag();
            //prepare the modal window for existing organizations
            if (!vm.ctrpOrg.new) {
                prepareModal();
                appendNameAliases();
            }
            filterSourceContext();
        }
        activate();

        /**
         * get orgs by context
         */
        function getOrgByContext(context){
            var ve = _.filter(vm.associatedOrgs, function (item) {
                return _.contains(context, item["source_context_name"]);
            })[0];
            return ve;
        };

        // Append associations for existing Trial
        function appendNameAliases() {

            for (var i = 0; i < vm.ctrpOrg.name_aliases.length; i++) {
                var name_alias = {};
                name_alias.id = vm.ctrpOrg.name_aliases[i].id;
                name_alias.name = vm.ctrpOrg.name_aliases[i].name;
                name_alias._destroy = false;
                vm.addedNameAliases.push(name_alias);
            }

        }

        /**
         * Watch for the global write mode changes in the header
         * @return {[type]}
         */
        function watchGlobalWriteModeChanges() {
            vm.curOrgEditable = UserService.isCurationModeEnabled();
            //Listen to the write-mode switch
            $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                vm.curOrgEditable = UserService.isCurationModeEnabled();
            });
        }

        /**
         * Filter out NLM and CTEP source contexts from UI
         * @return {void}
         */
        function filterSourceContext() {
            var clonedSourceContextArr = angular.copy(vm.sourceContextArr);
            if (!vm.ctrpOrg.new) {
                var curOrgSourceContextIndex = Common.indexOfObjectInJsonArray(clonedSourceContextArr, 'id', vm.ctrpOrg.source_context_id);
                // _.findWhere(vm.sourceContextArr, {id: vm.ctrpOrg.source_context_id});
                vm.curSourceContextName = curOrgSourceContextIndex > -1 ? vm.sourceContextArr[curOrgSourceContextIndex].name : '';
            } else {
                vm.curSourceContextName = 'CTRP'; //CTRP is the only source context available to new organization
                vm.ctrpSourceContextIndex = Common.indexOfObjectInJsonArray(vm.sourceContextArr, 'code', 'CTRP');
                vm.ctrpOrg.source_context_id = vm.ctrpSourceContextIndex > -1 ? vm.sourceContextArr[vm.ctrpSourceContextIndex].id : '';
            }
            //delete 'CTEP' and 'NLM' from the sourceContextArr
            vm.sourceContextArr = _.without(vm.sourceContextArr, _.findWhere(vm.sourceContextArr, {name: 'CTEP'}));
            vm.sourceContextArr = _.without(vm.sourceContextArr, _.findWhere(vm.sourceContextArr, {name: 'NLM'}));
        }


        /**
         * Listen to the message for availability of states or provinces
         * for the selected country
         */
        function listenToStatesProvinces() {
            if (vm.ctrpOrg.country) {
                vm.watchCountrySelection(vm.ctrpOrg.country);
            } else {
                vm.ctrpOrg.country = 'United States'; //default country
                vm.watchCountrySelection(vm.ctrpOrg.country);
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
                vm.ctrpOrg.new = true;  //
                vm.ctrpOrg.processing_status = "Complete";
                vm.ctrpOrg.source_status_id = _.filter(vm.sourceContextArr, function (item) {
                    return _.contains("CTRP", item.code);
                })[0].id;
            }
        }

        function prepareModal() {
            vm.confirmDelete = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'delete_confirm_template.html',
                    controller: 'ModalInstanceCtrl as vm',
                    size: size,
                    resolve: {
                        orgId: function () {
                            return vm.ctrpOrg.id;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    // console.log("about to delete the orgDetail " + vm.ctrpOrg.id);
                    $state.go('main.organizations');
                }, function () {
                    console.log("operation canceled")
                    // $state.go('main.orgDetail', {orgId: vm.ctrpOrg.id});
                });

            } //prepareModal
        }; //confirmDelete


        //Function that checks if an Organization - based on Name & source context is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the organization/unique Rails end point.
        vm.checkUniqueOrganization = function() {

            var ID = 0;
            if(angular.isObject(orgDetailObj))
                ID = vm.ctrpOrg.id;

            var searchParams = {"org_name": vm.ctrpOrg.name, "source_context_id": vm.ctrpOrg.source_context_id, "org_exists": angular.isObject(orgDetailObj), "org_id": ID};
            vm.showUniqueWarning = false

            var result = OrgService.checkUniqueOrganization(searchParams).then(function (response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.name_unqiue = response.name_unique;

                    if(!response.name_unique && vm.ctrpOrg.name.length > 0)
                        vm.showUniqueWarning = true;
                }
            }).catch(function (err) {
                console.log("error in checking for duplicate org name " + JSON.stringify(err));
            });
        };

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumberPO(vm.ctrpOrg.phone, vm.ctrpOrg.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

        vm.cloneCtepOrg = function(ctepOrgId) {
            OrgService.cloneCtepOrg(ctepOrgId).then(function(response) {
                console.info('clone response: ', response);
            }).catch(function(err) {
                console.error('clone error: ', err);
            });
        };

    }
})();
