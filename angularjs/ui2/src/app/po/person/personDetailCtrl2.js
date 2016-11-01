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
        vm.person = personDetailObj || {lname: "", source_status_id: "", source_context: "CTRP"}; //personDetailObj.data;
        vm.person = vm.person.data || vm.person;
        _setupState();

        // actions
        vm.selectContext = selectTab;


        activate();





        function activate() {

        }

        function selectTab(contextName) {
            if (!!contextName) {
                vm.tabOpen = contextName;
                vm.curPerson = (contextName === 'CTEP') ? vm.ctepPerson : vm.ctrpPerson;
            } // if context name is defined
        }

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
            vm.sourceContextArr = sourceContextObj;
            vm.savedSelection = [];
            vm.associatedPersonContexts = [];
            vm.orgsArrayReceiver = []; //receive selected organizations from the modal
            vm.selectedOrgFilter = '';
            vm.hasCtrpContext = _.findIndex(vm.person.cluster || [], {context: 'CTRP'}) > -1;
            var globalWriteModeEnabled = UserService.isCurationModeEnabled() || false;
            vm.processStatusArr = OrgService.getProcessingStatuses();
            vm.formTitleLabel = 'Add Person'; //default form title
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
            console.info('ctrpPerson: ', vm.ctrpPerson);
            console.info('ctepPerson: ', vm.ctepPerson);
            // selectTab(vm.defaultTab);
        }

    } // personDetailCtrl2
})();
