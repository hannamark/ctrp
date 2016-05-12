
/**
 * Created by schintal, Jan 31, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialParticipatingSitesCtrl.$inject = ['TrialService', 'PATrialService', 'PersonService','DateService', '$scope', '$timeout','$state', '$stateParams', 'toastr', 'MESSAGES', 'trialDetailObj', 'siteRecruitmentStatusesObj', 'centralContactTypes', 'investigatorTypes', '$location', '$anchorScroll'];

    function trialParticipatingSitesCtrl(TrialService, PATrialService, PersonService, DateService , $scope, $timeout, $stateParams, $route, toastr, MESSAGES, trialDetailObj, siteRecruitmentStatusesObj, centralContactTypes, investigatorTypes, $location, $anchorScroll) {

        var vm = this;

        // injected objects
        vm.curTrial = trialDetailObj;

        console.log("Initial vm.curTrial.participating_sites="+JSON.stringify(trialDetailObj.participating_sites));
        vm.siteRecruitmentStatusesArr = siteRecruitmentStatusesObj;

        // initializations
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.currentParticipatingSite = {};
        vm.current_site_recruitment = {};
        vm.current_investigator = {};
        vm.siteRecruitmentGrid = [];
        vm.investigatorGrid = [];
        vm.currentParticipatingSite.site_rec_status_wrappers_attributes=[];
        vm.currentParticipatingSite.participating_site_investigators=[];
        vm.persisted_contact = {};
        vm.persistedOrganization = {};
        vm.showOrgFields = true;
        vm.city=null;
        vm.state_province=null;
        vm.country=null;
        vm.postal=null;
        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.selOrganization = {name: '', array: []};
        vm.principalInvestigator = {name: '', array: []};
        vm.selectedPerson = {name: '', array: []};
        vm.selectedInvestigator = null;
        vm.investigatorArray = [];
        vm.selectedContactTypePI = false;
        vm.centralContactTypes = centralContactTypes.types;
        vm.investigatorTypes = investigatorTypes;
        for (var i = 0; i < vm.centralContactTypes.length; i++) {
           if(vm.centralContactTypes[i].code  == "NONE") {
               //console.log('vm.centralContactTypes[i].code=' +vm.centralContactTypes[i].code);
               vm.centralContactTypes.splice(i, 1);
           }
        }
        //console.log('vm.centralContactTypes=' + JSON.stringify(vm.centralContactTypes));

        //actions
        vm.addSiteRecruitment = addSiteRecruitment;
        vm.editSiteRecruitment = editSiteRecruitment;
        vm.deleteSiteRecruitment = deleteSiteRecruitment;
        vm.cancelSiteRecruitmentEdit = cancelSiteRecruitmentEdit;
        vm.cancelInvestigatorEdit = cancelInvestigatorEdit;
        vm.editInvestigator  = editInvestigator;
        vm.deleteInvestigator  = deleteInvestigator;
        vm.commitEditInvestigator = commitEditInvestigator;
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.openCalendar = openCalendar;
        vm.commitEditSiteRecruitment = commitEditSiteRecruitment;
        vm.resetParticipatingSite = resetParticipatingSite;
        vm.watchContactType = watchContactType;
        vm.tabIndex = 0;


        activate();

        /****************** implementations below ***************/
        function activate() {
            getTrialDetailCopy();
            watchTrialDetailObj();
            watchOrganization();
            watchPISelection();
            watchContactType();
            watchPersonSelection();
            watchInvestigatorSelection();
        }

        vm.checkAllSites = function () {
            if (vm.selectedAllSites) {
                vm.selectedAllSites = true;
            } else {
                vm.selectedAllSites = false;
            }

            angular.forEach(vm.curTrial.participating_sites, function (item) {
                item.selected = vm.selectedAllSites;
                vm.deleteListHandler(vm.curTrial.participating_sites);
            });

        };

        vm.saveContact = function(){
            vm.saveParticipatingSite();
        }

        vm.resetParticipatingSiteContactInfo = function() {
            vm.currentParticipatingSite.contact_name = null;
            vm.currentParticipatingSite.contact_phone =  null;
            vm.currentParticipatingSite.extension =  null;
            vm.currentParticipatingSite.contact_email =  null;
            vm.currentParticipatingSite.contact_type = 'General';

        }
        vm.setParticipatingSiteContactInfo = function() {
            var name = PersonService.extractFullName(vm.currentParticipatingSite.person);
            vm.currentParticipatingSite.contact_name = name;
            vm.currentParticipatingSite.contact_phone =  vm.currentParticipatingSite.contact_phone ? vm.currentParticipatingSite.contact_phone : vm.currentParticipatingSite.person.phone;
            vm.currentParticipatingSite.contact_email =  vm.currentParticipatingSite.contact_email ? vm.currentParticipatingSite.contact_email : vm.currentParticipatingSite.person.email;
            vm.currentParticipatingSite.extension = vm.currentParticipatingSite.extension ? vm.currentParticipatingSite.extension : vm.currentParticipatingSite.person.extension;
        }

        vm.saveParticipatingSite = function(){
            vm.disableBtn = true;
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes = [];
            for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                var siteObj = vm.siteRecruitmentGrid[i];
                if (siteObj.edit || siteObj.new || (siteObj._destroy && siteObj.id)) {
                    vm.currentParticipatingSite.site_rec_status_wrappers_attributes.push(siteObj);
                }
            }
            vm.siteRecruitmentGrid = [];

            vm.currentParticipatingSite.participating_site_investigators_attributes = [];
            for (var i = 0; i < vm.investigatorGrid.length; i++) {
                var invObj = vm.investigatorGrid[i];
                if(vm.currentParticipatingSite.contact_type != "PI"){
                    invObj.set_as_contact = false;
                } else if(vm.currentParticipatingSite.person && (invObj.person.id == vm.currentParticipatingSite.person.id)){
                    vm.setParticipatingSiteContactInfo();
                    invObj.set_as_contact = true;
                    vm.currentParticipatingSite.contact_type = "PI"; // should have been set before
                } else {
                    invObj.set_as_contact = false;
                }
                if (invObj.edit || invObj.new || (invObj.id && invObj._destroy)) {
                    vm.currentParticipatingSite.participating_site_investigators_attributes.push(invObj);
                }
            }
            if (!vm.currentParticipatingSite.id) {
                vm.currentParticipatingSite.new = true;
            }
            if (vm.currentParticipatingSite.person){
                vm.currentParticipatingSite.person_id = vm.currentParticipatingSite.person.id
            }
            // An outer param wrapper is needed for nested attributes to work
            var outerPS = {};
            outerPS.new = vm.currentParticipatingSite.new;
            outerPS.id = vm.currentParticipatingSite.id;
            outerPS.participating_site = vm.currentParticipatingSite;
            vm.currentParticipatingSite.trial_id = trialDetailObj.id;

            if (vm.tabIndex === 2) {
                vm.watchContactType();
            }

            TrialService.upsertParticipatingSite(outerPS).then(function(response) {
                //console.log("/n server_response="+JSON.stringify(response));
                var newParticipatingSite = false;
                if(!vm.currentParticipatingSite.id){
                    // New Participating Site
                    newParticipatingSite = true;
                    vm.currentParticipatingSite.id = response.id;
                }
                if(vm.currentParticipatingSite.id) {
                    console.log("before update person = " + JSON.stringify(vm.currentParticipatingSite.person));
                    TrialService.getParticipatingSiteById(vm.currentParticipatingSite.id).then(function (response) {
                        console.log("getParticipatingSiteById response.person = " + JSON.stringify(response.person));
                        if (response.server_response.status === 200) {
                            response.site_rec_status_wrappers = DateService.formatDateArray(response.site_rec_status_wrappers, 'status_date', 'DD-MMM-YYYY');

                            vm.currentParticipatingSite = response;
                        }
                        vm.persisted_contact.contact_name = vm.currentParticipatingSite.contact_name;
                        vm.persisted_contact.contact_phone = vm.currentParticipatingSite.contact_phone;
                        vm.persisted_contact.extension = vm.currentParticipatingSite.extension;
                        vm.persisted_contact.contact_email = vm.currentParticipatingSite.contact_email;
                        vm.persisted_contact.contact_type = vm.currentParticipatingSite.contact_type;
                        vm.persisted_contact.persisted_person = vm.currentParticipatingSite.person;
                        vm.persisted_organization = vm.currentParticipatingSite.organization;
                        vm.initSiteRecruitmentGrid();
                        vm.initInvestigatorGrid();
                        if(newParticipatingSite){
                            vm.currentParticipatingSite.new = false;
                            vm.curTrial.participating_sites.push(vm.currentParticipatingSite);
                        } else {
                            for (var i = 0; i < vm.curTrial.participating_sites.length; i++) {
                                if (vm.curTrial.participating_sites[i].id == vm.currentParticipatingSite.id) {
                                    vm.curTrial.participating_sites[i] = vm.currentParticipatingSite;
                                }
                            }
                        }
                        vm.investigatorArray = [];
                        if (vm.currentParticipatingSite.hasOwnProperty('participating_site_investigators')) {
                            for (var i = 0; i < vm.currentParticipatingSite.participating_site_investigators.length; i++) {
                                var id = vm.currentParticipatingSite.participating_site_investigators[i].id;
                                var name = PersonService.extractFullName(vm.currentParticipatingSite.participating_site_investigators[i].person);

                                vm.investigatorArray.push({"id": id, "name": name});
                                //console.log('vm.investigatorArray' + JSON.stringify(vm.investigatorArray));
                            }
                        }

                        vm.current_site_recruitment = {};
                        PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                        $scope.$emit('updatedInChildScope', {});
                        toastr.clear();
                        toastr.success('Participating Site of  ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                            extendedTimeOut: 5,
                            timeOut: 0
                        });
                    }).catch(function (err) {
                        console.log("2server_response="+JSON.stringify(response));
                    });
                }
                vm.selectedAllSites = false;
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerPS));
            });
        };//saveParticipatingSite

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Add Participating to a temp array
        function watchOrganization() {
            $scope.$watchCollection(function() {return vm.selOrganization.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.currentParticipatingSite.name = newVal[0].name;
                    vm.currentParticipatingSite.organization = newVal[0];
                    vm.currentParticipatingSite.organization_id = newVal[0].id;
                    vm.city = newVal[0].city;
                    vm.state_province = newVal[0].state_province;
                    vm.country = newVal[0].country;
                    vm.postal_code = newVal[0].postal_code;
                    vm.selOrganization = {name: vm.currentParticipatingSite["po_name"], array: []};
                }
            });
        }

        /**
         *  Set Add Mode. This causes the first tab to appear for a new Participating Site
         **/
        function setAddMode(addEditModeValue) {
            //console.log("SETTING TO ADDMODE");
            if (!(typeof addEditModeValue === 'undefined' || addEditModeValue === null)) {
                vm.addEditMode = addEditModeValue;
                $location.hash('section_top');
                $anchorScroll();
            } else {
                vm.addEditMode = true;
                vm.tabIndex = 0;
                $scope.ps_sites_form.$setPristine();
            }

            vm.currentParticipatingSite = {
                contact_type: 'General'
            };

            vm.current_site_recruitment = {};
            vm.city = null;
            vm.state_province =  null;
            vm.country = null;
            vm.postal_code = null;
            vm.po_name = null;
            vm.selOrganization = {name: '', array: []};
            vm.siteRecruitmentGrid = [];
            vm.investigatorGrid = [];
        }

        /**
         *  Set Edit Mode. This causes the first tab to appear for an existing Participating Site
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentParticipatingSite = angular.copy(vm.curTrial.participating_sites[idx]);

            if(vm.curTrial.participating_sites[idx].organization) {
                vm.city = vm.curTrial.participating_sites[idx].organization.city;
                vm.state_province = vm.curTrial.participating_sites[idx].organization.state_province;
                vm.country = vm.curTrial.participating_sites[idx].organization.country;
                vm.postal_code = vm.curTrial.participating_sites[idx].organization.postal_code;
                vm.po_name = vm.curTrial.participating_sites[idx].organization.po_name;
                vm.selOrganization = {name: vm.currentParticipatingSite["po_name"], array: []};
            }

            vm.persisted_contact = {};
            vm.persisted_contact.contact_name = vm.currentParticipatingSite.contact_name;
            vm.persisted_contact.contact_phone = vm.currentParticipatingSite.contact_phone;
            vm.persisted_contact.extension = vm.currentParticipatingSite.extension;
            vm.persisted_contact.contact_email = vm.currentParticipatingSite.contact_email;
            vm.persisted_contact.contact_type = vm.currentParticipatingSite.contact_type;
            vm.persisted_contact.persisted_person = vm.currentParticipatingSite.person;
            vm.persisted_organization = vm.currentParticipatingSite.organization;
            vm.initSiteRecruitmentGrid();
            vm.initInvestigatorGrid();
            vm.validateStatus();
            vm.tabIndex = 0;

            if (!vm.currentParticipatingSite.contact_type) {
                vm.currentParticipatingSite.contact_type = 'General';
            }

            _.each(vm.investigatorGrid, function(inv) {
                if (inv.set_as_contact) {
                    var selectedInv = inv;
                    _.each(vm.investigatorArray, function(investigator) {
                        if (investigator.id === selectedInv.id) {
                            vm.selectedInvestigator = {id: investigator.id, name: investigator.name};
                        }
                    });
                }
            });
        }

        vm.initSiteRecruitmentGrid = function (){
            vm.siteRecruitmentGrid = [];
            for (var i = 0; i < vm.currentParticipatingSite.site_rec_status_wrappers.length; i++) {
                var siteObj = vm.currentParticipatingSite.site_rec_status_wrappers[i];
                siteObj._destroy = false;
                siteObj.edit = false;
                siteObj.uiEdit = false;
                siteObj.new = false;
                // For displaying status name in the table
                _.each(vm.siteRecruitmentStatusesArr, function (status) {
                    if (status.id == siteObj.site_recruitment_status.id) {
                        siteObj.sr_status_name = status.name;
                        siteObj.sr_status_code = status.code;
                    }
                });

                vm.siteRecruitmentGrid.push(siteObj);
            };
            vm.validateStatus();
        };

        /**
         *  Initialize Investigator Grid
         */
        vm.initInvestigatorGrid = function (){
            vm.investigatorGrid = [];
            for (var i = 0; i < vm.currentParticipatingSite.participating_site_investigators.length; i++) {
                var invObj = vm.currentParticipatingSite.participating_site_investigators[i];
                invObj._destroy = false;
                invObj.edit = false;
                invObj.new = false;
                invObj.uiEdit = false;
                invObj._destroy = false;

                // refreshing the current participating site person
                if(vm.persisted_contact &&  vm.persisted_contact.persisted_person) {
                    vm.currentParticipatingSite.person = vm.persisted_contact.persisted_person;
                    vm.currentParticipatingSite.person_id = vm.persisted_contact.persisted_person.id;
                }
                if(vm.currentParticipatingSite.contact_type == "PI"){
                    if (vm.currentParticipatingSite.person && vm.currentParticipatingSite.person.id == invObj.person.id) {
                        invObj.set_as_contact = true;
                    } else {
                        invObj.set_as_contact = false;
                    }
                } else {
                    invObj.set_as_contact = false;
                };

                vm.investigatorGrid.push(invObj);
            };
        };

        function openCalendar ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'status_date') {
                vm.statusDateOpened = !vm.statusDateOpened;
            }
        }; //openCalendar

        /**
         *  First Tab
         *  Add a new Site Recruitment Status Record to the Participating Site
         **/
        function addSiteRecruitment() {
            vm.current_site_recruitment.participating_site_id= vm.currentParticipatingSite.id;
            vm.current_site_recruitment.new = true;
            vm.current_site_recruitment._destroy = false;
            var newSiteRec = vm.current_site_recruitment;
            var siteObj = vm.current_site_recruitment;
            siteObj.status_date = DateService.convertISODateToLocaleDateStr( vm.current_site_recruitment.status_date);
            _.each(vm.siteRecruitmentStatusesArr, function (status) {
                if (status.name == siteObj.site_recruitment_status.name) {
                    siteObj.sr_status_name = status.name;
                    siteObj.sr_status_code = status.code;
                    siteObj.site_recruitment_status_id = status.id;
                }
            });
            vm.validateStatus();
            vm.siteRecruitmentGrid.push(siteObj);
            vm.current_site_recruitment = {};
        }

        /**
         *  First Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to show the values of the selected site recruitment record
         **/
        function editSiteRecruitment(index) {
            vm.current_site_recruitment = angular.copy(vm.siteRecruitmentGrid[index]);
            vm.current_site_recruitment.edit = true;
            vm.siteRecruitmentGrid[index].edit = true;
            vm.current_site_recruitment.uiEdit = true;
            vm.siteRecruitmentGrid[index].uiEdit = true;
            vm.current_site_recruitment._destroy = false;
            vm.current_site_recruitment.index = index;
        }

        /**
         *  First Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to save the user entered values of the selected site recruitment record
        */
        function commitEditSiteRecruitment() {
            if (vm.current_site_recruitment.edit) {
                vm.current_site_recruitment.status_date = DateService.convertISODateToLocaleDateStr(vm.current_site_recruitment.status_date);
                vm.current_site_recruitment.site_recruitment_status_id = vm.current_site_recruitment.site_recruitment_status.id;
                var siteObj = vm.current_site_recruitment;

                _.each(vm.siteRecruitmentStatusesArr, function (status) {
                    if (status.name == siteObj.site_recruitment_status.name) {
                        siteObj.sr_status_name = status.name;
                        siteObj.sr_status_code = status.code;
                        siteObj.site_recruitment_status = status;
                        siteObj.site_recruitment_status_id = status.id;
                    }
                });
                for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                    var siteObj = vm.siteRecruitmentGrid[i];
                    if(siteObj.id == vm.current_site_recruitment.id){
                        vm.siteRecruitmentGrid[i] = vm.current_site_recruitment;
                        vm.siteRecruitmentGrid[i].uiEdit = false;
                    }
                }
                vm.validateStatus();

                /* ADDED BY ADIL IN ORDER TO RESET EDIT VIEW AND REMOVE IT FROM THE UI AS NEEDED */
                vm.current_site_recruitment = {};

            }
        } // commitEdit

        /**
         *  First Tab
         *  Delete an existing Site Recruitment Status Record in the Participating Site
         */
        function deleteSiteRecruitment(index) {
            vm.current_site_recruitment.edit = false;
            vm.siteRecruitmentGrid[index]._destroy = !vm.siteRecruitmentGrid[index]._destroy;
            vm.validateStatus();
        }

        /**
         *  First Tab
         *  Cancel out of editing an existing Site Recruitment Status Record in the Participating Site
         */
        function cancelSiteRecruitmentEdit() {
            for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                var siteObj = vm.siteRecruitmentGrid[i];
                if(siteObj.id == vm.current_site_recruitment.id){
                    vm.siteRecruitmentGrid[i].uiEdit = false;
                }
            }
            vm.current_site_recruitment = {};
        }


        /**
         * Second Tab
         * Selecting a new Investigator
         */
        function watchPISelection() {
            $scope.$watchCollection(function() {return vm.principalInvestigator.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.principalInvestigator.name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
                    vm.principalInvestigator.pi = vm.principalInvestigator.array[0];
                    vm.principalInvestigator.pi_id  = vm.principalInvestigator.array[0].id; // update PI on view
                    var participating_site_investigator = {};
                    participating_site_investigator.person_id = vm.principalInvestigator.array[0].id;
                    participating_site_investigator.new = true;
                    participating_site_investigator.person = vm.principalInvestigator.array[0];
                    // Check of Duplicate Entry
                    var exists = false;
                    for (var i = 0; i < vm.investigatorGrid.length; i++) {
                        if(vm.investigatorGrid[i].person_id == participating_site_investigator.person_id){
                            exists = true;
                        }
                    }
                    if(!exists){
                        // New Investigator
                        participating_site_investigator._destroy = false;
                        vm.current_investigator = participating_site_investigator;
                        vm.investigatorGrid.push(participating_site_investigator);
                        vm.current_investigator.uiEdit = true;
                        vm.current_investigator.new = true;
                    }
                    vm.principalInvestigator = {name: '', array: []};
                }
            });
        }

        /**
         *  Second Tab
         *  Delete an existing Investigator in the Participating Site
         */
        function deleteInvestigator(index) {
            /* currentParticipatingSite can be empty {} so check to see if it has participating_site_investigators [] as a property */
            if (vm.currentParticipatingSite.hasOwnProperty('participating_site_investigators') && vm.currentParticipatingSite.participating_site_investigators[index]){
                vm.currentParticipatingSite.participating_site_investigators[index].edit = false;
                vm.current_investigator = angular.copy(vm.currentParticipatingSite.participating_site_investigators[index]);
                if (vm.currentParticipatingSite.contact_type == "PI") {
                    // refreshing the current participating site person
                    if(vm.persisted_contact && vm.persisted_contact.persisted_person) {
                        vm.currentParticipatingSite.person = vm.persisted_contact.persisted_person;
                        vm.currentParticipatingSite.person_id = vm.persisted_contact.persisted_person.id;
                    }
                    if (vm.currentParticipatingSite.person && vm.currentParticipatingSite.person.id == vm.current_investigator.person.id) {
                        vm.currentParticipatingSite.contact_name = null;
                        vm.currentParticipatingSite.contact_phone =  null;
                        vm.currentParticipatingSite.extension = null;
                        vm.currentParticipatingSite.contact_email =  null;
                        vm.currentParticipatingSite.contact_type = 'General';
                        vm.persisted_contact.contact_name = null;
                        vm.persisted_contact.contact_phone = null;
                        vm.persisted_contact.contact_email = null;
                        vm.persisted_contact.contact_type = null;
                        vm.persisted_contact.persisted_person = null;
                        vm.persisted_contact.persisted_person_id = null;
                    }
                }
                if( vm.current_investigator) {
                    vm.current_investigator._destroy = true;
                    vm.investigatorGrid[index]._destroy = !vm.investigatorGrid[index]._destroy;
                } else{
                    vm.investigatorGrid.splice(index,1);
                }
            } else {
                vm.investigatorGrid.splice(index,1);
            }
        }

        /**
         * Editing an existing Investigator
         * @param index
         */
        function editInvestigator(index) {
            vm.current_investigator = angular.copy(vm.investigatorGrid[index]);
            vm.current_investigator.uiEdit = true;
            vm.investigatorGrid[index].uiEdit = true;

            if(vm.current_investigator.id) {
                vm.current_investigator.edit = true;
                vm.investigatorGrid[index].edit = true;

            } else {
                vm.current_investigator.new = true;
                vm.current_investigator.uiEdit = true;
            }
            // refreshing the current participating site person
            if(vm.persisted_contact &&  vm.persisted_contact.persisted_person) {
                vm.currentParticipatingSite.person = vm.persisted_contact.persisted_person;
                vm.currentParticipatingSite.person_id = vm.persisted_contact.persisted_person.id;
            }
            if(vm.currentParticipatingSite.contact_type == "PI") {
                if (vm.currentParticipatingSite.person && vm.currentParticipatingSite.person.id == vm.current_investigator.person.id) {
                    vm.current_investigator.set_as_contact = true;
                } else {
                    vm.current_investigator.set_as_contact = false;
                }
            } else{
                vm.current_investigator.set_as_contact = false;
            }
        }

        /**
         *  Second Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to save the user entered values of the selected site recruitment record
         */
        function commitEditInvestigator() {
            console.log("in commitEditInvestigator");
            var primary_contact_set = false;

            vm.current_investigator.uiEdit = false;
           // if (vm.current_investigator.edit) {
                for (var i = 0; i < vm.investigatorGrid.length; i++) {
                     if (vm.current_investigator.person.id == vm.investigatorGrid[i].person.id){
                        vm.investigatorGrid.splice(i,1);
                        vm.investigatorGrid.splice(i, 0, vm.current_investigator);
                        /*
                         if(vm.current_investigator.set_as_contact){
                             vm.currentParticipatingSite.person_id = vm.current_investigator.person.id;
                             vm.currentParticipatingSite.person = vm.current_investigator.person;
                             vm.currentParticipatingSite.contact_type = "PI";
                         } else {
                         */
                         /*
                         if (vm.currentParticipatingSite.contact_type == "PI") {
                             if (vm.currentParticipatingSite.person && vm.currentParticipatingSite.person.id == vm.current_investigator.person.id) {
                                 vm.currentParticipatingSite.contact_name = null;
                                 vm.currentParticipatingSite.contact_phone = null;
                                 vm.currentParticipatingSite.extension = null;
                                 vm.currentParticipatingSite.contact_email = null;
                                 vm.currentParticipatingSite.person_id = null;
                                 vm.currentParticipatingSite.person = null;
                                 vm.selectedInvestigator = null;
                             }
                         }
                         */
                        //}
                    /*
                    } else {
                         if(vm.current_investigator.set_as_contact){
                             vm.investigatorGrid[i].set_as_contact = false;
                         }
                    }
                    */
                    }
                }
                vm.current_investigator = {};
                vm.saveParticipatingSite();
           // }
        } // commitEditInvestigator


        /**
         *  Second Tab
         *  Cancel out of editing an existing Site Recruitment Status Record in the Participating Site
         */
        function cancelInvestigatorEdit() {

            for (var i = 0; i < vm.investigatorGrid.length; i++) {
                console.log("in commitEditInvestigator vm.current_investigator=" + JSON.stringify(vm.current_investigator));
                if (vm.current_investigator.id == vm.investigatorGrid[i].id) {
                    vm.investigatorGrid[i].uiEdit = false;
                }
            }
            vm.current_investigator = {};
        }


        /**
         * Third Tab
         */

        function watchContactType() {
            $scope.$watch(function() {return vm.currentParticipatingSite.contact_type;}, function(newVal, oldVal) {
                if(newVal == "PI"){
                    vm.selectedContactTypePI = true;
                    vm.investigatorArray = [];
                    /* To resolve property undefined error when participating_site_investigators array does not exist */
                    if (vm.currentParticipatingSite.hasOwnProperty('participating_site_investigators')) {
                        for (var i = 0; i < vm.currentParticipatingSite.participating_site_investigators.length; i++) {
                            var id = vm.currentParticipatingSite.participating_site_investigators[i].id;
                            var name = PersonService.extractFullName(vm.currentParticipatingSite.participating_site_investigators[i].person);

                            vm.investigatorArray.push({"id": id, "name": name});
                        }
                    }
                    if(vm.persisted_contact.contact_type == "PI" && vm.currentParticipatingSite.id){
                        vm.currentParticipatingSite.contact_name = vm.persisted_contact.contact_name;
                        vm.currentParticipatingSite.contact_phone = vm.persisted_contact.contact_phone;
                        vm.currentParticipatingSite.extension = vm.persisted_contact.extension;
                        vm.currentParticipatingSite.contact_email = vm.persisted_contact.contact_email;
                        vm.currentParticipatingSite.person_id =  vm.persisted_contact.person_id;
                        vm.currentParticipatingSite.person =  vm.persisted_contact.person;
                    } else {
                        vm.currentParticipatingSite.contact_name = null;
                        vm.currentParticipatingSite.contact_phone = null;
                        vm.currentParticipatingSite.extension = null;
                        vm.currentParticipatingSite.contact_email = null;
                        vm.currentParticipatingSite.person_id = null;
                    }

                    /* Sets value of vm.selectedInvestigator to the investigator with set_as_contact ==== true */
                    _.each(vm.investigatorGrid, function(inv) {
                        if (inv.set_as_contact) {
                            var selectedInv = inv;
                            _.each(vm.investigatorArray, function(investigator) {
                                if (investigator.id === selectedInv.id) {
                                    vm.selectedInvestigator = {id: investigator.id, name: investigator.name};
                                }
                            });
                        }
                    });

                } else if (newVal == "General"){
                    vm.selectedContactTypePI = false;
                    if(vm.persisted_contact.contact_type == "General"){
                        vm.currentParticipatingSite.contact_name = vm.persisted_contact.contact_name;
                        vm.currentParticipatingSite.contact_phone = vm.persisted_contact.contact_phone;
                        vm.currentParticipatingSite.extension = vm.persisted_contact.extension;
                        vm.currentParticipatingSite.contact_email = vm.persisted_contact.contact_email;
                        vm.currentParticipatingSite.person_id = null;
                    } else {
                        vm.currentParticipatingSite.contact_name = null;
                        vm.currentParticipatingSite.contact_phone = null;
                        vm.currentParticipatingSite.extension = null;
                        vm.currentParticipatingSite.contact_email = null;
                        vm.currentParticipatingSite.person_id = null;
                    }
                    vm.selectedInvestigator = null;

                } else if (newVal == "Person"){
                    vm.selectedContactTypePI = false;
                    if(vm.persisted_contact.contact_type == "Person"){
                        vm.currentParticipatingSite.contact_name = vm.persisted_contact.contact_name;
                        vm.currentParticipatingSite.contact_phone = vm.persisted_contact.contact_phone;
                        vm.currentParticipatingSite.extension = vm.persisted_contact.extension;
                        vm.currentParticipatingSite.contact_email = vm.persisted_contact.contact_email;
                        vm.currentParticipatingSite.person_id =  vm.persisted_contact.person_id;
                        vm.currentParticipatingSite.person =  vm.persisted_contact.person;
                    } else {
                        vm.currentParticipatingSite.contact_name = null;
                        vm.currentParticipatingSite.contact_phone = null;
                        vm.currentParticipatingSite.extension = null;
                        vm.currentParticipatingSite.contact_email = null;
                        vm.currentParticipatingSite.person_id = null;
                        vm.currentParticipatingSite.person = null;
                    }

                    vm.selectedInvestigator = null;
                }
            });
        }

        /**
         * Third Tab
         * Selecting a new  Person
         */
        function watchPersonSelection() {
            $scope.$watchCollection(function() {return vm.selectedPerson.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.currentParticipatingSite.contact_name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
                    var personAsContact = {};
                    var person = vm.selectedPerson.array[0];
                    personAsContact.person_id = person.id;
                    personAsContact.new = true;
                    vm.currentParticipatingSite.contact_type = "Person";
                    vm.currentParticipatingSite.contact_phone = person.phone;
                    vm.currentParticipatingSite.extension = person.extension;
                    vm.currentParticipatingSite.contact_email = person.email;
                    vm.currentParticipatingSite.person =  person;
                    vm.currentParticipatingSite.person_id =  person.id;
                }
            });
        }

        /**
         * Third Tab
         */

        function watchInvestigatorSelection() {
            $scope.$watch(function() {return vm.selectedInvestigator;}, function(newVal, oldVal) {
                if (!newVal) {
                    vm.currentParticipatingSite.contact_name = null;
                    vm.currentParticipatingSite.contact_phone = null;
                    vm.currentParticipatingSite.extension = null;
                    vm.currentParticipatingSite.contact_email = null;
                    vm.currentParticipatingSite.person = null;
                    vm.currentParticipatingSite.person_id = null;
                }

                if (!oldVal) {
                    oldVal = {
                        id: newVal ? newVal.id : 0
                    };
                }
                console.log("In watchInvestigatorSelection newVal="+ JSON.stringify(newVal));
                if (vm.currentParticipatingSite.participating_site_investigators) {
                    for (var i = 0; i < vm.currentParticipatingSite.participating_site_investigators.length; i++) {
                        if(newVal && vm.currentParticipatingSite.participating_site_investigators[i].id == newVal.id){
                            var inv = vm.currentParticipatingSite.participating_site_investigators[i].person;
                            vm.currentParticipatingSite.contact_name = PersonService.extractFullName(inv);
                            vm.currentParticipatingSite.contact_phone = newVal.id === oldVal.id && vm.currentParticipatingSite.contact_phone ? vm.currentParticipatingSite.contact_phone : inv.phone;
                            vm.currentParticipatingSite.extension = inv.extension;
                            vm.currentParticipatingSite.contact_email = newVal.id === oldVal.id && vm.currentParticipatingSite.contact_email ? vm.currentParticipatingSite.contact_email : inv.email;
                            //vm.currentParticipatingSite.contact_type = "PI"; // replace hardcoding
                            vm.currentParticipatingSite.person = inv;
                            vm.currentParticipatingSite.person_id = inv.id;
                        }
                    }
                }
            });
        };

        /**
         * Get trial detail object from parent scope
         */
        function watchTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                getTrialDetailCopy();
            });
        } //watchTrialDetailObj

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
            }, 1);
        } //getTrialDetailCopy

        function deleteListHandler(participatingSitesSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(participatingSitesSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteParticipatingSitesList = deleteList ;
        };

        function deleteSelected(){
            vm.curTrial.participating_sites_attributes=[];
            for (var i = 0; i < vm.selectedDeleteParticipatingSitesList.length; i++) {
                vm.deleteParticipatingSite( vm.selectedDeleteParticipatingSitesList[i].id);
            }
        };

        vm.deleteParticipatingSite = function(psId){
            vm.disableBtn = true;

            TrialService.deleteParticipatingSite(psId).then(function(response) {
                vm.curTrial.lock_version = response.lock_version || '';
                $scope.$emit('updatedInChildScope', {});
                for (var j = 0; j < vm.curTrial.participating_sites.length; j++) {
                    if (vm.curTrial.participating_sites[j].id == psId){
                        vm.curTrial.participating_sites.splice(j, 1);
                    }
                }
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                toastr.clear();
                toastr.success('Record(s) deleted.', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in deleting participating site=" + psId);
            });

        }//saveTrial

        // Validate Trials Stautuses
        vm.validateStatus = function() {
            // Remove statuses with _destroy is true
            var noDestroyStatusArr = [];
            for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                if (!vm.siteRecruitmentGrid[i]._destroy) {
                    noDestroyStatusArr.push(vm.siteRecruitmentGrid[i]);
                }
            }

            TrialService.validateSrStatus({"statuses": noDestroyStatusArr}).then(function(response) {
                vm.statusValidationMsgs = response.validation_msgs;

                // Add empty object to positions where _destroy is true
                for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                    if (vm.siteRecruitmentGrid[i]._destroy) {
                        vm.statusValidationMsgs.splice(i, 0, {});
                    }
                }
            }).catch(function(err) {
                console.log("Error in validating trial status: " + err);
            });
        };


        function resetParticipatingSite() {
            vm.selectedAllSites = false;
            vm.selectedDeleteParticipatingSitesList = [];
            if(vm.currentParticipatingSite.id > 0){
                for (var i = 0; i < vm.curTrial.participating_sites.length; i++) {
                    if(vm.curTrial.participating_sites[i].id == vm.currentParticipatingSite.id){
                        vm.currentParticipatingSite = vm.curTrial.participating_sites[i];
                        vm.setEditMode(i);
                    }
                }
            } else {
                vm.setAddMode();
            }
            vm.selOrganization = {name: '', array: []};
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes=[];
            vm.current_site_recruitment = {};
            vm.principalInvestigator = {name: '', array: []};
            vm.selectedPerson = {name: '', array: []};

            /*
            $timeout(function() {
                getTrialDetailCopy();
            }, 0);
            */
        }

    } //trialParticipatingSitesCtrl

})();
