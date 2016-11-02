/**
 * Created wangg5 on 11/1/2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.po')
        .controller('personDetailCtrl2', personDetailCtrl2);

    personDetailCtrl2.$inject = ['personDetailObj', 'PersonService', 'toastr', 'DateService', 'UserService', 'MESSAGES',
        '$scope', 'Common', 'sourceStatusObj','sourceContextObj', '$state', '$uibModal', 'OrgService', 'poAffStatuses', '_', '$timeout'];

    function personDetailCtrl2(personDetailObj, PersonService, toastr, DateService, UserService, MESSAGES,
                              $scope, Common, sourceStatusObj,sourceContextObj, $state, $uibModal, OrgService, poAffStatuses, _, $timeout) {

        var vm = this;
        vm.person = personDetailObj || {lname: "",
                                        source_status_id: "",
                                        source_context: "CTRP",
                                        new: true,
                                        processing_status: "Complete"}; //personDetailObj.data;
        vm.person = vm.person.data || vm.person;
        _setupState();
        console.info('vm.person: ', vm.person);

        // actions
        vm.selectContext = selectTab;
        vm.resetForm = resetForm;
        vm.clearForm = clearForm;


        activate();





        function activate() {
            _watchOrgAffiliation();
        }

        function selectTab(contextName) {
            console.info('contextName: ', contextName);
            if (!!contextName) {
                vm.tabOpen = contextName;
                vm.curPerson = (contextName === 'CTEP') ? vm.ctepPerson : vm.ctrpPerson;
                vm.sourceStatusArrSelected = _sourceStatusesForContext(vm.curPerson.source_context_id);

                // TODO: if new person, assign the ctrp source context id to it
                if (vm.curPerson.new) {
                    var ctrpContext = _.findWhere(vm.sourceContextArr, {name: 'CTRP'});
                    vm.curPerson.source_context_id = !!ctrpContext ? ctrpContext.id : null;
                }
                if (vm.curPerson.po_affiliations && vm.curPerson.po_affiliations.length > 0) {
                    _populatePOAff();
                }

            } // if context name is defined
        }

        // retrieve the source statuses for the given sourceContextId in curPerson
        function _sourceStatusesForContext(sourceContextId) {

            var selectedStatusArr = [];
            if (!angular.isDefined(sourceContextId)) return selectedStatusArr;

            selectedStatusArr = vm.sourceStatusArr.filter(function(status) {
                return status.source_context_id === sourceContextId &&
                        status.name.indexOf('Null') === -1;
            });
            return selectedStatusArr;
        }

        /**
         * Watch the selection of organization for affiliation
         * @return {Void} [description]
         */
        function _watchOrgAffiliation() {
            $scope.$watchCollection(function() {return vm.orgsArrayReceiver;}, function(selectedOrgs, oldVal) {
                console.info('orgs: ', selectedOrgs);
                if (angular.isDefined(selectedOrgs) && angular.isArray(selectedOrgs)) {
                    _.each(selectedOrgs, function(anOrg, index) {
                        if (_.findIndex(vm.savedSelection, {id: anOrg.id}) === -1) {
                            vm.savedSelection.unshift(OrgService.initSelectedOrg(anOrg));
                            $scope.person_form.$setDirty();
                        }
                    });
                }
            }, true);
        } // watchOrgAffiliations

        /**
         * Set up the initial state upload loading
         * @return {[Void]}
         */
        function _setupState() {
            vm.tabIndex = '';
            vm.curPerson = {}; // person currently displayed in the active tab
            vm.ctepPerson = null;
            vm.ctrpPerson = null;
            vm.person.processing_status = 'Complete';
            vm.defaultTab = vm.person.source_context; // default tab
            vm.tabOpen = vm.defaultTab;
            vm.masterCopy= angular.copy(vm.person);
            vm.sourceStatusArr = sourceStatusObj;
            vm.sourceStatusArr.sort(Common.a2zComparator());
            console.info('sourceStatusArr: ', vm.sourceStatusArr);
            vm.sourceStatusArrSelected = [];
            vm.sourceContextArr = sourceContextObj;
            vm.savedSelection = [];
            vm.associatedPersonContexts = [];
            vm.orgsArrayReceiver = []; //receive selected organizations from the modal
            vm.selectedOrgFilter = '';
            vm.hasCtrpContext = _.findIndex(vm.person.cluster || [], {context: 'CTRP'}) > -1;
            var globalWriteModeEnabled = UserService.isCurationModeEnabled() || false;
            vm.processStatusArr = OrgService.getProcessingStatuses();
            vm.formTitleLabel = 'Add Person'; //TODO: dynamic title ;default form title
            vm.affiliatedOrgError = true; // flag for empty org affiliations
            vm.matchedCtrpPersons = []; // CTRP persons found from attempt to clone ctep person
            vm.associationForRemoval = []; // object person objects
            vm.confirm = {}; // messages
            var personContextCache = {"CTRP": null, "CTEP": null, "NLM": null};
            var USER_ROLES_ALLOWED_COMMENT = ['ROLE_CURATOR','ROLE_SUPER','ROLE_ADMIN', 'ROLE_ABSTRACTOR', 'ROLE_RO'];
            vm.isAllowedToComment = _.contains(USER_ROLES_ALLOWED_COMMENT, UserService.getUserRole());

            if (vm.person.source_context === 'CTRP') {
                vm.ctrpPerson = vm.person;
                vm.ctepPerson = _.findWhere(vm.person.associated_persons, {source_context: 'CTEP', source_status: 'Active'});
            } else if (vm.person.source_context === 'CTEP') {
                vm.ctepPerson = vm.person;
                vm.ctrpPerson = _.findWhere(vm.person.associated_persons, {source_context: 'CTRP', source_status: 'Active'});
            } else {
                vm.ctrpPerson = null;
                vm.ctepPerson = null;
            }
            selectTab(vm.defaultTab);
        }

        function _populatePOAff() {
            //find the organization name with the given id
            var findOrgName = function(poAff, cb) {
                OrgService.getOrgById(poAff.organization_id).then(function(organization) {
                    var status = organization.server_response.status;

                    if (status >= 200 && status <= 210) {
                        var curOrg = {"id" : poAff.organization_id, "name": organization.name};
                        curOrg.effective_date = moment(poAff.effective_date).toDate(); //DateService.convertISODateToLocaleDateStr(poAff.effective_date);
                        curOrg.expiration_date = moment(poAff.expiration_date).toDate(); //DateService.convertISODateToLocaleDateStr(poAff.expiration_date);
                        curOrg.po_affiliation_status_id = poAff.po_affiliation_status_id;
                        curOrg.po_affiliation_id = poAff.id; //po affiliation id
                        curOrg.lock_version = poAff.lock_version;
                        curOrg._destroy = poAff._destroy || false;
                        vm.savedSelection.push(curOrg);
                    }
                }).catch(function(err) {
                    console.error("error in retrieving organization name with id: " + poAff.organization_id);
                });
                cb();
            }; // findOrgName

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };

            async.eachSeries(vm.curPerson.po_affiliations, findOrgName, retOrgs);
        } // _populatePOAff

        function showToastr(message) {
            toastr.clear();
            toastr.success(message, 'Operation Successful!');
        }

        function resetForm() {
            angular.copy(vm.masterCopy, vm.curPerson);
            vm.savedSelection = [];
            _populatePOAff();
            $scope.person_form.$setPristine();
        };

        function clearForm() {
            $scope.person_form.$setPristine();
            var excludedKeys = ['new', 'po_affiliations', 'source_status_id'];
            Object.keys(vm.curPerson).forEach(function(key) {
                if (excludedKeys.indexOf(key) == -1) {
                    vm.curPerson[key] = angular.isArray(vm.curPerson[key]) ? [] : '';
                }
            });
            //default context to ctrp
            // vm.curPerson.source_context_id = OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP');
            vm.savedSelection = [];
            _populatePOAff();
        };

    } // personDetailCtrl2
})();
