/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['associatedOrgsObj', 'OrgService', 'toastr', 'MESSAGES', 'UserService', '$filter', '_', 'uiGridExporterConstants', 'uiGridExporterService',
        '$scope', 'countryList', 'Common', 'sourceContextObj', 'sourceStatusObj', '$state', '$uibModal', '$timeout', 'GeoLocationService', 'serviceRequests'];

    function orgDetailCtrl(associatedOrgsObj, OrgService, toastr, MESSAGES, UserService, $filter, _,uiGridExporterConstants, uiGridExporterService,
                           $scope, countryList, Common, sourceContextObj, sourceStatusObj, $state, $uibModal, $timeout, GeoLocationService, serviceRequests) {
        var vm = this;
        $scope.organization_form = {};
        vm.addedNameAliases = [];
        vm.states = [];
        vm.processingStatuses = OrgService.getProcessingStatuses();
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList;

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
                        $state.go('main.orgDetail', {orgId: response.id});
                        //update name aliases
                        vm.ctrpOrg.name_aliases = response.name_aliases;
                        vm.addedNameAliases = [];
                        appendNameAliases();
                        // To make sure setPristine() is executed after all $watch functions are complete
                        $timeout(function () {
                            $scope.organization_form.$setPristine();
                         }, 1);
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
                if (aliasIndex === -1) {
                    var newAlias = {name: vm.alias, _destroy: false};
                    vm.addedNameAliases.unshift(newAlias);
                }
                vm.alias = '';
            }
        };

        vm.ctrpSourceStatusArr = _.filter(vm.sourceStatusArr, function (item) {
            return _.isEqual(
                _.filter(vm.sourceContextArr, function (item) {
                    return _.isEqual('CTRP', item.code);
                })[0].id,
                item.source_context_id);
        });

        /****************** implementations below ***************/
        function activate() {
            initiateOrgs();
            listenToStatesProvinces();
            watchGlobalWriteModeChanges();
            //prepare the modal window for existing organizations
            if (vm.ctrpOrg && !vm.ctrpOrg.new) {
                appendNameAliases();
            }
        }
        activate();

        /**
         * get orgs by context
         */
        function initiateOrgs() {
            //set orgs and default tab
            if (associatedOrgsObj) {
                vm.associatedOrgs = associatedOrgsObj.associated_orgs;
                vm.defaultTab = associatedOrgsObj.active_context;
                vm.ctepOrg = getOrgByContext(vm.associatedOrgs, 'CTEP');
                vm.nlmOrg = getOrgByContext(vm.associatedOrgs,'NLM');
                vm.ctrpOrg = getOrgByContext(vm.associatedOrgs, 'CTRP');
                if (vm.ctrpOrg) {
                    vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                }
                checkToDisableClone();
            } else {
                vm.ctrpOrg = {};
                vm.ctrpOrg.new = true;
                vm.ctrpOrg.processing_status = 'Incomplete';
                vm.ctrpOrg.source_status_id =  _.filter(
                    vm.ctrpSourceStatusArr, function (item) {
                        return _.isEqual('ACT', item.code);
                    })[0].id;
            }
        }

        function checkToDisableClone() {
            vm.disableClone = vm.ctrpOrg && vm.ctepOrg && vm.ctepOrg.ctrp_id;
        }

        function getOrgByContext(orgsArr, context){
            var ve = _.filter(orgsArr, function (item) {
                return _.contains(context, item.source_context_name);
            })[0];
            return ve;
        }

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
        };

        $scope.cloneBtnClicked = function () {
            vm.cloningCTEP = true;
            vm.nilclose = true;
        };
        
        vm.cloningCTEP = false;
        vm.nilclose = true;
        $scope.$on(MESSAGES.ORG_SEARCH_NIL_DISMISS, function() {
            if (vm.cloningCTEP) {
                // To make sure setPristine() is executed after all $watch functions are complete
                $timeout(function () {
                    //reset cloning flag
                    vm.cloningCTEP = false;
                    vm.nilclose = true;
                    vm.cloneCtepOrg();
                }, 1);
            }
        });

        /**
         * Listen to the message for availability of states or provinces
         * for the selected country
         */
        function listenToStatesProvinces() {
            if (vm.ctrpOrg) {
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
            }
        } //listenToStatesProvinces

        //Function that checks if an Organization - based on Name & source context is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the organization/unique Rails end point.
        vm.checkUniqueOrganization = function() {
            vm.showUniqueWarning = false;
            if (vm.ctrpOrg && vm.ctrpOrg.name && vm.ctrpOrg.name.length > 0) {
                var searchParams = {
                    "org_name": vm.ctrpOrg.name,
                    "source_context_id": vm.ctrpOrg.source_context_id,
                    "org_exists": angular.isObject(vm.ctrpOrg),
                    "org_id": vm.ctrpOrg.id
                };
                OrgService.checkUniqueOrganization(searchParams).then(function (response) {
                    var status = response.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.name_unqiue = response.name_unique;
                        if (!response.name_unique)
                            vm.showUniqueWarning = true;
                    }
                }).catch(function (err) {
                    console.log("error in checking for duplicate org name " + JSON.stringify(err));
                });
            }
        };

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumberPO(vm.ctrpOrg.phone, vm.ctrpOrg.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

        var associateOrgsRefresh = function (){
            vm.ctepOrg = getOrgByContext(vm.associatedOrgs, 'CTEP');
            vm.nlmOrg = getOrgByContext(vm.associatedOrgs,'NLM');
            vm.associatedOrgsOptions.data = vm.associatedOrgs;
            vm.defaultTab = 'CTRP';
            vm.updateTime = Date.now();
        };

        vm.associateOrgs = function () {
            vm.confirmOverrideAssociatePopUp = false;
            if (vm.selectedOrgsArray) {
                angular.forEach(vm.selectedOrgsArray, function(value) {
                    var newAssociatedOrg = value;
                    newAssociatedOrg.ctrp_id = vm.ctrpOrg.ctrp_id;
                    // An outer param wrapper is needed for nested attributes to work
                    var outerOrg = {};
                    outerOrg.id = newAssociatedOrg.id;
                    outerOrg.organization = newAssociatedOrg;
                    OrgService.upsertOrg(outerOrg).then(function (response) {
                        vm.associatedOrgs = response.associated_orgs;
                        associateOrgsRefresh();
                        toastr.success('Organization has been associated.', 'Operation Successful!');
                    }).catch(function (err) {
                        console.log("error in associating organization " + JSON.stringify(vm.ctrpOrg));
                    }).finally(function() {
                    });
                });
            }
        };

        vm.ctepAssociateOrgs = function () {
            vm.confirmOverrideAssociatePopUp = false;
            if (vm.selectedOrgsArray) {
                angular.forEach(vm.selectedOrgsArray, function(value) {
                    var newAssociatedOrg = value;
                    vm.ctepOrg.ctrp_id = newAssociatedOrg.ctrp_id;
                    // An outer param wrapper is needed for nested attributes to work
                    var outerOrg = {};
                    outerOrg.id = vm.ctepOrg.id;
                    outerOrg.organization = vm.ctepOrg;
                    OrgService.upsertOrg(outerOrg).then(function (response) {
                        if (status >= 200 && status <= 210) {
                            if (status === 200) {
                                vm.associatedOrgs = response.associated_orgs;
                                associateOrgsRefresh();
                                vm.ctrpOrg = getOrgByContext(vm.associatedOrgs, 'CTRP');
                                vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                                vm.ctrpUpdateTime = Date.now();
                                toastr.success('Organization has been associated.', 'Operation Successful!');
                            }
                        }
                    }).catch(function (err) {
                        console.log("error in associating organization " + JSON.stringify(vm.ctrpOrg));
                    }).finally(function() {
                        vm.defaultTab = 'CTRP';
                    });
                });
            }
        };

        // Swap context when different tab is selected
        $scope.$watch(function() {
            return vm.selectedOrgsArray;
        }, function(newValue, oldValue) {
            if (vm.cloningCTEP) {
                //reset cloning flag after existing match
                vm.nilclose = true; //reset
                vm.ctepAssociateOrgs();

            } else if (newValue && newValue[0] && newValue[0].ctrp_id) {
                var newAssociatedOrg = newValue[0];
                if ( (!vm.ctepOrg || (newAssociatedOrg.id !== vm.ctepOrg.id)) || (vm.nlmOrg || (newAssociatedOrg.id !== vm.nlmOrg.id)) ) {
                    vm.confirmOverrideAssociatePopUp = true;
                } else {
                    toastr.success('The chosen organization is already associated to this organization.', 'Operation Cancelled!');
                }
            } else {
                vm.associateOrgs();
            }
        });

        vm.cloneCtepOrg = function() {
            vm.disableCloneFresh = true;
            OrgService.cloneCtepOrg(vm.ctepOrg.id).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (status === 200) {
                        $timeout(function () {
                            vm.associatedOrgs = response.associated_orgs;
                            associateOrgsRefresh();
                            vm.ctrpOrg = getOrgByContext(vm.associatedOrgs, 'CTRP');
                            vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                            vm.ctrpUpdateTime = Date.now();
                            toastr.success('Organization has been associated.', 'Operation Successful!');
                        }, 1);
                    }
                }
            }).catch(function (err) {
                console.log("error in cloning ctep organization " + JSON.stringify(vm.ctepOrg));
            }).finally(function() {
                vm.disableBtn = false;
                vm.cloningCTEP = false;
                vm.nilclose = true;
                vm.defaultTab = 'CTRP';
            });
        };

        // associated Organization grids
        vm.associatedOrgsOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            useExternalSorting: false,
            enableFiltering: false,
            enableVerticalScrollbar: 2,
            enableHorizontalScrollbar: 2,
            columnDefs: [
                {
                    name: 'ctrp_id',
                    enableSorting: false,
                    displayName: 'CTRP ID',
                    width: '100'
                },
                {
                    name: 'ctep_id',
                    enableSorting: true,
                    displayName: 'CTEP ID',
                    minWidth: '100'
                },
                {
                    name: 'name',
                    displayName: 'Name',
                    enableSorting: false,
                    minWidth: '300'
                },
                {
                    name: 'source_status_name',
                    displayName: 'Source Status',
                    enableSorting: false,
                    minWidth: '180'
                },
                {
                    name: 'source_context_name',
                    displayName: 'Source Context',
                    enableSorting: false,
                    minWidth: '180'
                },
                {
                    name: 'source_id',
                    displayName: 'Source ID',
                    enableSorting: true,
                    minWidth: '130'
                },
                {
                    name: 'aff_families_names',
                    displayName: 'Family Name',
                    enableSorting: false,
                    minWidth: '300'
                },
                {
                    name: 'phone_with_ext',
                    displayName: 'Phone',
                    enableSorting: false,
                    minWidth: '150'
                },
                {
                    name: 'email',
                    displayName: 'Email',
                    enableSorting: false,
                    minWidth: '250'
                },
                {
                    name: 'city',
                    displayName: 'City',
                    enableSorting: true,
                    minWidth: '200'
                },
                {
                    name: 'state_province',
                    displayName: 'State',
                    enableSorting: false,
                    minWidth: '200'
                },
                {
                    name: 'country',
                    displayName: 'Country',
                    enableSorting: false,
                    minWidth: '200'
                },
                {
                    name: 'postal_code',
                    displayName: 'Postal Code',
                    enableSorting: false,
                    minWidth: '200'
                },
                {
                    name: 'id',
                    displayName: 'Context Org ID',
                    enableSorting: false,
                    minWidth: '180'
                },
                {
                    name: 'processing_status',
                    displayName: 'Processing Status',
                    enableSorting: false,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'updated_by',
                    displayName: 'Last Updated by',
                    enableSorting: false,
                    cellFilter: 'date:\'dd-MMM-yyyy\'',
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'org_updated_date',
                    displayName: 'Last Updated Date',
                    enableSorting: false,
                    width: '*',
                    minWidth: '200'
                },
                {
                    name: 'org_assoc_date',
                    displayName: 'Association Start Date',
                    enableSorting: false,
                    width: '*',
                    minWidth: '200'
                }
            ],
            enableRowHeaderSelection : true,
            enableGridMenu: false
        };

        vm.associatedOrgsOptions.exporterAllDataFn = function () {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_USER, allSearchParams).then(
                function (data) {
                    var status = data.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.assciatedOrgsOptions.useExternalPagination = false;
                        vm.assciatedOrgsOptions.useExternalSorting = false;
                        vm.assciatedOrgsOptions.data = data['users'];
                        vm.assciatedOrgsOptions.columnDefs = origGridColumnDefs;
                    }
                }
            );
        };

        vm.associatedOrgsOptions.data = vm.associatedOrgs;
    }
}());
