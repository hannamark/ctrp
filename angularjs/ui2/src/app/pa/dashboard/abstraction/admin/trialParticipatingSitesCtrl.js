
/**
 * Created by schintal, Jan 31, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialParticipatingSitesCtrl.$inject = ['TrialService', 'PATrialService', 'PersonService','DateService', '$scope', '$timeout','$state', '$stateParams', 'toastr', 'MESSAGES', 'trialDetailObj', 'siteRecruitmentStatusesObj', 'centralContactTypes'];

    function trialParticipatingSitesCtrl(TrialService, PATrialService, PersonService, DateService , $scope, $timeout, $stateParams, $route, toastr, MESSAGES, trialDetailObj, siteRecruitmentStatusesObj, centralContactTypes) {

        var vm = this;

        // injected objects
        vm.curTrial = trialDetailObj;
        vm.siteRecruitmentStatusesArr = siteRecruitmentStatusesObj;

        // initializations
        vm.currentParticipatingSite= {};
        vm.current_site_recruitment = {};
        vm.current_investigator = {};
        vm.currentParticipatingSite.site_rec_status_wrappers_attributes=[];
        vm.currentParticipatingSite.contacts = [];
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
        vm.centralContactTypes = centralContactTypes.types;
        for (var i = 0; i < vm.centralContactTypes; i++) {
           if(vm.centralContactTypes[i].code  == "NONE") {
               vm.centralContactTypes.splice(i, 1);
           }
        }
        console.log('vm.centralContactTypes=' + JSON.stringify(vm.centralContactTypes));

        //actions
        vm.addSiteRecruitment = addSiteRecruitment;
        vm.editSiteRecruitment = editSiteRecruitment;
        vm.deleteSiteRecruitment = deleteSiteRecruitment;
        vm.cancelSiteRecruitmentEdit = cancelSiteRecruitmentEdit;
        vm.editInvestigator  = editInvestigator;
        vm.deleteInvestigator  = deleteInvestigator;
        vm.commitEditInvestigator = commitEditInvestigator;
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.openCalendar = openCalendar;
        vm.commitEditSiteRecruitment = commitEditSiteRecruitment;
        vm.setAsSiteContact = setAsSiteContact;


        activate();

        /****************** implementations below ***************/
        function activate() {
            getTrialDetailCopy();
            watchTrialDetailObj();
            watchOrganization();
            watchPISelection();
            watchContact();
            watchPersonSelection();
        }


        vm.saveParticipatingSite = function(){
            vm.disableBtn = true;
            console.log("In save trial");
          //  for (var i = 0; i < vm.curTrial.participating_sites_list.length; i++) {
          //      if (vm.curTrial.participating_sites_list[i] == vm.currentParticipatingSite.id) {
          //          vm.curTrial.participating_sites_list[i] = vm.currentParticipatingSite.id;
          //      }
          //  }

            if (!vm.currentParticipatingSite.id) {
                vm.currentParticipatingSite.new = true;
            }
            // An outer param wrapper is needed for nested attributes to work
            var outerPS = {};
            outerPS.new = vm.currentParticipatingSite.new;
            outerPS.id = vm.currentParticipatingSite.id;
            outerPS.participating_site = vm.currentParticipatingSite;
            vm.currentParticipatingSite.trial_id = trialDetailObj.id;
            console.log("/n In save saveParticipatingSite vm.currentParticipatingSite=" + JSON.stringify(vm.currentParticipatingSite));

            TrialService.upsertParticipatingSite(outerPS).then(function(response) {
                console.log("/n server_response="+JSON.stringify(response));
                var newParticipatingSite = false;
                if(!vm.currentParticipatingSite.id){
                    // New Participating Site
                    newParticipatingSite = true;
                    vm.currentParticipatingSite.id = response.id;
                }
                if(vm.currentParticipatingSite.id) {
                    TrialService.getParticipatingSiteById(vm.currentParticipatingSite.id).then(function (response) {
                        console.log("getParticipatingSiteById response = " + JSON.stringify(response));
                        vm.currentParticipatingSite.site_rec_status_wrappers = response.site_rec_status_wrappers;
                        vm.currentParticipatingSite.site_rec_status_wrappers_attributes = [];
                        vm.currentParticipatingSite.participating_site_investigators = response.participating_site_investigators;
                        vm.currentParticipatingSite.participating_site_investigators_attributes = [];
                        vm.current_site_recruitment = {};
                        if(newParticipatingSite){
                            vm.curTrial.participating_sites_list.push(vm.currentParticipatingSite);
                        } else {
                            for (var i = 0; i < vm.curTrial.participating_sites_list.length; i++) {
                                if (vm.curTrial.participating_sites_list[i] == vm.currentParticipatingSite.id) {
                                    vm.curTrial.participating_sites_list[i] = vm.currentParticipatingSite;
                                }
                            }
                        }
                        PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                        $scope.$emit('updatedInChildScope', {});
                        toastr.clear();
                        toastr.success('Participating Site of  ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                            extendedTimeOut: 1000,
                            timeOut: 0
                        });
                    }).catch(function (err) {
                        console.log("2server_response="+JSON.stringify(response));
                    });
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerPS));
            });

        }//saveParticipatingSite



        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Add Participating to a temp array
        function watchOrganization() {
            $scope.$watchCollection(function() {return vm.selOrganization.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    console.log("newVal = "+ JSON.stringify(newVal));
                    vm.currentParticipatingSite.name = newVal[0].name;
                    vm.currentParticipatingSite.organization = newVal[0];
                    vm.currentParticipatingSite.organization_id = newVal[0].id;
                    vm.city = newVal[0].city;
                    vm.state_province = newVal[0].state_province;
                    vm.country = newVal[0].country;
                    vm.postal_code = newVal[0].postal_code;
                    vm.selOrganization = {name: vm.currentParticipatingSite["po_name"], array: []};
                    //console.log("vm.currentParticipatingSite =" + JSON.stringify(vm.currentParticipatingSite));
                }
            });
        }

        /**
         *  Set Add Mode. This causes the first tab to appear for a new Participating Site
         **/
        function setAddMode() {
            console.log("SETTING TO ADDMODE");
            vm.addEditMode = true;
            vm.currentParticipatingSite = {};
            vm.current_site_recruitment = {};
            vm.city = null;
            vm.state_province =  null;
            vm.country = null;
            vm.postal_code = null;
            vm.po_name = null;
            vm.selOrganization = {name: '', array: []};
        }

        /**
         *  Set Edit Mode. This causes the first tab to appear for an existing Participating Site
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentParticipatingSite = vm.curTrial.participating_sites_list[idx];
            console.log("SETTING TO EDITMODE vm.currentParticipatingSite="+JSON.stringify(vm.currentParticipatingSite));
            console.log("SETTING TO EDITMODE vm.curTrial.participating_sites_list="+JSON.stringify(vm.curTrial.participating_sites_list));
            console.log("SETTING TO EDITMODE vm.currentParticipatingSite.site_rec_status_wrappers="+JSON.stringify(vm.currentParticipatingSite["site_rec_status_wrappers"]));
            vm.city =  vm.curTrial.participating_sites_list[idx].organization.city;
            vm.state_province =  vm.curTrial.participating_sites_list[idx].organization.state_province;
            vm.country = vm.curTrial.participating_sites_list[idx].organization.country;
            vm.postal_code = vm.curTrial.participating_sites_list[idx].organization.postal_code;
            vm.po_name = vm.curTrial.participating_sites_list[idx].organization.po_name;
            vm.selOrganization = {name: vm.currentParticipatingSite["po_name"], array: []};
        }

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
            //console.log("vm.current_site_recruitment="+JSON.stringify(vm.current_site_recruitment));
            //console.log("vm.currentParticipatingSite="+JSON.stringify(vm.currentParticipatingSite));
            vm.current_site_recruitment.participating_site_id= vm.currentParticipatingSite.id;
            // Temporary code. User of ng-options in the UI should resolve it.
            for (var i = 0; i < vm.siteRecruitmentStatusesArr.length; i++) {
                if (vm.current_site_recruitment.site_recruitment_status == vm.siteRecruitmentStatusesArr[i].name) {
                    vm.current_site_recruitment.site_recruitment_status_id = vm.siteRecruitmentStatusesArr[i].id;
                }
            }
            vm.current_site_recruitment.new = true;
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes = [];
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes.push(vm.current_site_recruitment);
            //console.log("vm.current_participating_site.="+JSON.stringify(vm.currentParticipatingSite));
            //console.log("vm.curTrial.participating_sites_list="+JSON.stringify(vm.curTrial.participating_sites_list));
            vm.saveParticipatingSite();
        }

        /**
         *  First Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to show the values of the selected site recruitment record
         **/
        function editSiteRecruitment(index) {
            //if (index < vm.tempTrialStatuses.length) {
            console.log("In editSiteRecruitment");
            vm.current_site_recruitment = angular.copy(vm.currentParticipatingSite.site_rec_status_wrappers[index]);
            vm.current_site_recruitment.edit = true;
            vm.current_site_recruitment.index = index;
            // vm.tempTrialStatuses.splice(index, 1);
            //}
        }

        /**
         *  First Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to save the user entered values of the selected site recruitment record
        */
        function commitEditSiteRecruitment() {
            console.log("In commitEditSiteRecruitment");
            if (vm.current_site_recruitment.edit) {
                vm.current_site_recruitment.status_date = DateService.convertISODateToLocaleDateStr(vm.current_site_recruitment.status_date);
                console.log("site_recruitment_status_id="+JSON.stringify(vm.current_site_recruitment.site_recruitment_status));
                var selectedStatus = _.findWhere(vm.siteRecruitmentStatusesArr, {name: vm.current_site_recruitment.site_recruitment_status});
                console.log("selectedStatus="+JSON.stringify(selectedStatus));
                if (!!selectedStatus) {
                    vm.current_site_recruitment.site_recruitment_status_id = selectedStatus.id;
                    console.log("In commitEditSiteRecruitment=" + JSON.stringify(vm.current_site_recruitment));
                }
                vm.currentParticipatingSite.site_rec_status_wrappers_attributes = [];
                vm.currentParticipatingSite.site_rec_status_wrappers_attributes.push(vm.current_site_recruitment);
                vm.saveParticipatingSite();
            }
        } // commitEdit

        /**
         *  First Tab
         *  Delete an existing Site Recruitment Status Record in the Participating Site
         */
        function deleteSiteRecruitment(index) {
            //if (index < vm.tempTrialStatuses.length) {
            console.log("In delete  SiteRecruitment");
            vm.current_site_recruitment = angular.copy(vm.currentParticipatingSite.site_rec_status_wrappers[index]);
            vm.current_site_recruitment._destroy = true;
            vm.current_site_recruitment.index = index;
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes = [];
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes.push(vm.current_site_recruitment);
            vm.saveParticipatingSite();
            // vm.tempTrialStatuses.splice(index, 1);
            //}
        }

        /**
         *  First Tab
         *  Cancel out of editing an existing Site Recruitment Status Record in the Participating Site
         */
        function cancelSiteRecruitmentEdit() {
            vm.current_site_recruitment = {};
        }


        /**
         * Second Tab
         * Selecting a new Investigator
         */
        function watchPISelection() {
            $scope.$watchCollection(function() {return vm.principalInvestigator.array;}, function(newVal, oldVal) {
                console.log("newVal=" + JSON.stringify(newVal));
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.principalInvestigator.name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
                    vm.principalInvestigator.pi = vm.principalInvestigator.array[0];
                    vm.principalInvestigator.pi_id  = vm.principalInvestigator.array[0].id; // update PI on view
                    var participating_site_investigator = {};
                    participating_site_investigator.person_id = vm.principalInvestigator.array[0].id;
                    participating_site_investigator.new = true;
                    vm.currentParticipatingSite.participating_site_investigators_attributes = [];
                    vm.currentParticipatingSite.participating_site_investigators_attributes.push(participating_site_investigator);
                }
            });
        }

        /**
         *  Second Tab
         *  Delete an existing Investigator in the Participating Site
         */
        function deleteInvestigator(index) {
            //if (index < vm.tempTrialStatuses.length) {
            console.log("In delete  deleteInvestigator");
            vm.current_investigator = angular.copy(vm.currentParticipatingSite.participating_site_investigators[index]);
            vm.current_investigator._destroy = true;
            vm.current_investigator.index = index;
            vm.currentParticipatingSite.participating_site_investigators_attributes = [];
            vm.currentParticipatingSite.participating_site_investigators_attributes.push(vm.current_investigator);
            vm.saveParticipatingSite();
            // vm.tempTrialStatuses.splice(index, 1);
            //}
        }

        /**
         * Editing an existing investigator
         * @param index
         */
        function editInvestigator(index) {
            //if (index < vm.tempTrialStatuses.length) {
            console.log("In editSiteRecruitment");
            vm.current_investigator = angular.copy(vm.currentParticipatingSite.participating_site_investigators[index]);
            vm.current_investigator.edit = true;
            //vm.current_investigator.index = index;
            console.log("In editSiteRecruitment vm.current_investigator=" +JSON.stringify(vm.current_investigator));
            // vm.tempTrialStatuses.splice(index, 1);
            //}
        }

        /**
         *  Second Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to save the user entered values of the selected site recruitment record
         */
        function commitEditInvestigator() {
            console.log("In commitEditInvestigator");
            if (vm.current_investigator.edit) {
                console.log("EDIT!!!!!!In commitEditInvestigator");
               // var selectedStatus = _.findWhere(vm.siteRecruitmentStatusesArr, {name: vm.current_site_recruitment.site_recruitment_status});
             //   console.log("selectedStatus="+JSON.stringify(selectedStatus));
             //   if (!!selectedStatus) {
             //       vm.current_investigator.investigator_type = selectedStatus.id;
             //       console.log("In commitEditSiteRecruitment=" + JSON.stringify(vm.current_site_recruitment));
             //   }
                vm.currentParticipatingSite.participating_site_investigators_attributes = [];
                vm.currentParticipatingSite.participating_site_investigators_attributes.push(vm.current_investigator);
                console.log("EDIT!!!!!!In commitEditInvestigator=" + JSON.stringify(vm.currentParticipatingSite.participating_site_investigators_attributes));
                vm.saveParticipatingSite();
            }
        } // commitEdit

        /**
         *  Set the Investigator as a Primary Contact
         */
        function setAsSiteContact(index) {
            var inv = vm.currentParticipatingSite.participating_site_investigators[index];
            vm.currentParticipatingSite.contact_name = inv.person.lname;
            vm.currentParticipatingSite.contact_phone = inv.person.phone;
            vm.currentParticipatingSite.contact_email = inv.person.email;
            for (var i = 0; i < vm.centralContactTypes; i++) {
                if(vm.centralContactTypes[i].code  == "PI") {
                    vm.currentParticipatingSite.contact_type = vm.centralContactTypes[i];
                }
            }
            //vm.currentParticipatingSite.contact_type = ;
        }

        /**
         * Third Tab
         */

        function watchContact() {
            $scope.$watch(function() {return vm.currentParticipatingSite.contact_type;}, function(newVal, oldVal) {
                console.log("Watchcontact newVal " + newVal);
                /**
                if (angular.isArray(newVal) && newVal.length > 0 && !newVal[0].fullname) {
                    vm.currentParticipatingSite.central_contacts[0] = newVal[0];
                    var firstName = newVal[0].fname || '';
                    var middleName = newVal[0].mname || '';
                    var lastName = newVal[0].lname || '';
                    var fullName = firstName + ' ' + middleName + ' ' + lastName;
                    vm.currentParticipatingSite.central_contacts[0].fullname = (fullName).trim();
                    vm.currentParticipatingSite.central_contacts[0].person_id = newVal[0].id || '';
                    vm.currentParticipatingSite.central_contacts[0].phone = newVal[0].phone.replace(regex, '');
                    delete vm.currentParticipatingSite.central_contacts[0].id;
                } **/
            });

        }

        /**
         * Third Tab
         * Selecting a new  Person
         */
        function watchPersonSelection() {
            $scope.$watchCollection(function() {return vm.selectedPerson.array;}, function(newVal, oldVal) {
                console.log(" watchPersonSelection newVal=" + JSON.stringify(newVal));
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.currentParticipatingSite.contact_name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
                    vm.principalInvestigator.pi = vm.principalInvestigator.array[0];
                    vm.principalInvestigator.pi_id  = vm.principalInvestigator.array[0].id; // update PI on view
                    var participating_site_investigator = {};
                    participating_site_investigator.person_id = vm.principalInvestigator.array[0].id;
                    participating_site_investigator.new = true;
                    vm.currentParticipatingSite.participating_site_investigators_attributes = [];
                    vm.currentParticipatingSite.participating_site_investigators_attributes.push(participating_site_investigator);
                }
            });
        }

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
                console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy


    } //trialParticipatingSitesCtrl

})();
