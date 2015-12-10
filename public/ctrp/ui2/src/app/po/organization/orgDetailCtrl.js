/**
 * Created by wangg5 on 6/1/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['orgDetailObj', 'OrgService', 'toastr', 'MESSAGES', 'UserService', '$filter',
        '$scope', 'countryList', 'Common', 'sourceContextObj', 'sourceStatusObj', '$state', '$modal'];

    function orgDetailCtrl(orgDetailObj, OrgService, toastr, MESSAGES, UserService, $filter,
                           $scope, countryList, Common, sourceContextObj, sourceStatusObj, $state, $modal) {
        var vm = this;
        $scope.organization_form = {};
        vm.addedNameAliases = [];
        vm.numbers = [1, 2, 3];
        vm.states = [];
        vm.watchCountrySelection = OrgService.watchCountrySelection();
        vm.countriesArr = countryList;
        vm.curOrg = orgDetailObj || {name: '', country: '', state: '', source_status_id: ''}; //orgDetailObj.data;
        console.log("hey ----- "+JSON.stringify(vm.curOrg.cluster));
        var user_role= !!UserService.getUserRole() ? UserService.getUserRole().split('_')[1].toLowerCase() : '';
        var ctep_index = Common.indexOfObjectInJsonArray(vm.curOrg.cluster, 'context', 'CTEP');
        var trial_submitter_role = 'trial-submitter';
        if(user_role.toUpperCase() == trial_submitter_role.toUpperCase()) {

             if (ctep_index >=0)   vm.curOrg.cluster.splice(ctep_index,1);
        }

        vm.masterCopy= angular.copy(vm.curOrg);
        vm.sourceContextArr = sourceContextObj;
        //vm.curSourceContextName = '';
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        vm.formTitleLabel = 'Add Organization'; //default form title
        vm.alias = '';
        vm.curationReady = false;
        vm.showPhoneWarning = false;
        var orgContextCache = {"CTRP": null, "CTEP": null, "NLM": null};

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
                    vm.clearForm();
                    $state.go('main.orgDetail', {orgId: response.id});
                } else {
                    // vm.curOrg = response;
                    vm.curOrg.updated_by = response.updated_by;
                    vm.curOrg.updated_at = response.updated_at;
                }
                vm.curOrg.new = false;
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
            listenToStatesProvinces();
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

        activate();


        // Swap context when different tab is selected
        $scope.$watch(function() {
            return vm.tabIndex;
        }, function(newValue, oldValue) {
            if (!vm.curOrg.new) {
                var contextKey = vm.curOrg.cluster[newValue].context;
                if (!!orgContextCache[contextKey]) {
                    vm.curOrg = orgContextCache[contextKey];
                    switchSourceContext();
                } else {
                    OrgService.getOrgById(vm.curOrg.cluster[newValue].id).then(function(response) {
                        orgContextCache[contextKey] = angular.copy(response);
                        vm.curOrg = orgContextCache[contextKey]
                        switchSourceContext()
                    }).catch(function (err) {
                        console.log("Error in retrieving organization during tab change.");
                    });
                }
            }
        });


        /****************** implementations below ***************/
        function activate() {
            //default context to ctrp, if not set
            vm.curOrg.source_context_id = !vm.curOrg.source_context_id ?
                OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP') : vm.curOrg.source_context_id;

            listenToStatesProvinces();
            watchGlobalWriteModeChanges();
            appendNewOrgFlag();
            setTabIndex();
            //prepare the modal window for existing organizations
            if (!vm.curOrg.new) {
                prepareModal();
                appendNameAliases();
            }
            filterSourceContext();
            locateSourceStatus();
            createFormTitleLabel();
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
         * For switching the source context when the context tab is tapped
         *
         * @return {[type]} [description]
         */
        function switchSourceContext() {
            listenToStatesProvinces();
            vm.masterCopy= angular.copy(vm.curOrg);
            vm.addedNameAliases = [];
            appendNameAliases();
            filterSourceContext();
            locateSourceStatus();
            createFormTitleLabel();
        }

        /**
         * Watch for the global write mode changes in the header
         * @return {[type]}
         */
        function watchGlobalWriteModeChanges() {
            $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                createFormTitleLabel();
            });
        }

        /**
         * Generate approprate appropriate form title, e.g. 'Edit Organization'
         * @return {void}
         */
        function createFormTitleLabel() {
            vm.formTitleLabel = vm.curOrgEditable && !vm.curOrg.new ? 'Edit Organization' : 'View Organization';
            vm.formTitleLabel = vm.curOrg.new ? 'Add Organization' : vm.formTitleLabel;
        }


        /**
         * Find the source status name if the organization has a source_status_id,
         * or find the source status name that has code = 'ACT' if the organization does not
         * have a source_status_id (e.g. a new organization)
         * @return {void}
         */
        function locateSourceStatus() {
            var curSourceStatusObj = {name: '', id: ''};

            if (vm.curOrg.new) {
                curSourceStatusObj = _.findWhere(vm.sourceStatusArr, {code: 'ACT'}) || curSourceStatusObj;
                vm.sourceStatusArr = [curSourceStatusObj]; // only show the active status for new org
            } else {
                vm.sourceStatusArr = sourceStatusObj; //restore the list of source statuses if now new
                curSourceStatusObj = _.findWhere(vm.sourceStatusArr, {id: vm.curOrg.source_status_id}) || curSourceStatusObj;
            }
            vm.curSourceStatusName = curSourceStatusObj.name;
            vm.curOrg.source_status_id = curSourceStatusObj.id;
        }



        /**
         * Filter out NLM and CTEP source contexts from UI
         * @return {void}
         */
        function filterSourceContext() {
            var clonedSourceContextArr = angular.copy(vm.sourceContextArr);
            if (!vm.curOrg.new) {
                var curOrgSourceContextIndex = Common.indexOfObjectInJsonArray(clonedSourceContextArr, 'id', vm.curOrg.source_context_id);
                // _.findWhere(vm.sourceContextArr, {id: vm.curOrg.source_context_id});
                vm.curSourceContextName = curOrgSourceContextIndex > -1 ? vm.sourceContextArr[curOrgSourceContextIndex].name : '';
            } else {
                vm.curSourceContextName = 'CTRP'; //CTRP is the only source context available to new organization
                vm.ctrpSourceContextIndex = Common.indexOfObjectInJsonArray(vm.sourceContextArr, 'code', 'CTRP');
                vm.curOrg.source_context_id = vm.ctrpSourceContextIndex > -1 ? vm.sourceContextArr[vm.ctrpSourceContextIndex].id : '';
            }
            //delete 'CTEP' and 'NLM' from the sourceContextArr
            vm.sourceContextArr = _.without(vm.sourceContextArr, _.findWhere(vm.sourceContextArr, {name: 'CTEP'}));
            vm.sourceContextArr = _.without(vm.sourceContextArr, _.findWhere(vm.sourceContextArr, {name: 'NLM'}));
            vm.curOrgEditable = vm.curSourceContextName === 'CTRP' || vm.curOrg.new; //if not CTRP context, render it readonly
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
        vm.checkUniqueOrganization = function() {

            var ID = 0;
            if(angular.isObject(orgDetailObj))
                ID = vm.curOrg.id;

            var searchParams = {"org_name": vm.curOrg.name, "source_context_id": vm.curOrg.source_context_id, "org_exists": angular.isObject(orgDetailObj), "org_id": ID};
            vm.showUniqueWarning = false

            var result = OrgService.checkUniqueOrganization(searchParams).then(function (response) {
                vm.name_unqiue = response.name_unique;

                if(!response.name_unique && vm.curOrg.name.length > 0)
                    vm.showUniqueWarning = true
            }).catch(function (err) {
                console.log("error in checking for duplicate org name " + JSON.stringify(err));
            });
        };

        vm.isValidPhoneNumber = function(){
            vm.IsPhoneValid = isValidNumber(vm.curOrg.phone,  vm.curOrg.country);
            vm.showPhoneWarning = true;
            console.log('Is phone valid: ' + vm.IsPhoneValid);
        };

    }


})();
