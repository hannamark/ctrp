/**
 * Created by wus4 on 2/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('psDetailCtrl', psDetailCtrl);

    psDetailCtrl.$inject = ['psDetailObj', 'trialDetailObj', 'userDetailObj', 'PersonService', 'TrialService', 'PATrialService', '$scope', 'toastr', '$state',
        'srStatusObj', 'DateService', '$timeout', 'centralContactTypes'];

    function psDetailCtrl(psDetailObj, trialDetailObj, userDetailObj, PersonService, TrialService, PATrialService, $scope, toastr, $state,
                          srStatusObj, DateService, $timeout, centralContactTypes) {

        var vm = this;
        vm.curPs = psDetailObj || {};
        vm.curPs = vm.curPs.data || vm.curPs;
        vm.curPsOriginal = angular.copy(vm.curPs);
        vm.curTrial = trialDetailObj || vm.curPs.trial;
        vm.curUser = userDetailObj;
        vm.centralContactTypes = centralContactTypes.types;
        vm.centralContactTypes.shift(); // Remove 'None' value as done in PA
        vm.curPs.contact_type = vm.curPs.contact_type ? vm.curPs.contact_type : 'General';
        vm.availableOrgs = [];
        vm.srStatusArr = srStatusObj;
        vm.status_date_opened = false;
        vm.addedStatuses = [];
        vm.srsNum = 0;
        vm.selectedPiArray = [];
        vm.selectedPersonContactArray = [];
        vm.editMode = false; // Flag used in manage sites screen
        vm.selectedInvContact;

        vm.updatePs = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curPs.trial_id = vm.curTrial.id;

            if (vm.selectedPiArray.length > 0) {
                vm.curPs.participating_site_investigators_attributes = [];
                var psInvestigatorObj = {person_id: vm.selectedPiArray[0].id, investigator_type: 'Principal Investigator'};
                if (!vm.curPs.new) {
                    psInvestigatorObj.id = vm.curPs.participating_site_investigators[vm.sitePiIdx].id;
                }
                vm.curPs.participating_site_investigators_attributes.push(psInvestigatorObj);
            }

            if (vm.addedStatuses.length > 0) {
                vm.curPs.site_rec_status_wrappers_attributes = [];
                _.each(vm.addedStatuses, function (status) {
                    vm.curPs.site_rec_status_wrappers_attributes.push(status);
                });
            }

            // Delete temp. UI property 'person.fullname'
            configurePsInvList('delete');

            // An outer param wrapper is needed for nested attributes to work
            var outerPs= {};
            outerPs.new = vm.curPs.new;
            outerPs.id = vm.curPs.id;
            outerPs.participating_site = vm.curPs;

            TrialService.upsertParticipatingSite(outerPs).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (vm.isManageScreen) {
                        $state.go('main.manageParticipatingSite', {trialId: response.trial.id}, {reload: true});
                    } else {
                        $state.go('main.viewTrial', {trialId: response.trial.id});
                    }
                    toastr.success('Participating Site ' + vm.curPs.id + ' has been recorded', 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log('error in updating trial ' + JSON.stringify(outerPs));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Delete the associations
        vm.toggleSelection = function (index, type) {
            if (type == 'sr_status') {
                if (index < vm.addedStatuses.length) {
                    vm.addedStatuses[index]._destroy = !vm.addedStatuses[index]._destroy;
                    if (vm.addedStatuses[index]._destroy) {
                        vm.srsNum--;
                    } else {
                        vm.srsNum++;
                    }
                    vm.validateStatus();
                }
            }
        };

        vm.openCalendar = function ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == 'status_date') {
                vm.status_date_opened = !vm.status_date_opened;
            }
        };

        // Add trial status to a temp array
        vm.addStatus = function () {
            if (vm.status_date && vm.sr_status_id) {
                var newStatus = {};
                newStatus.status_date = vm.status_date;
                newStatus.site_recruitment_status_id = vm.sr_status_id;
                // For displaying status name in the table
                _.each(vm.srStatusArr, function (status) {
                    if (status.id == vm.sr_status_id) {
                        newStatus.sr_status_name = status.name;
                        newStatus.sr_status_code = status.code;
                    }
                });
                newStatus.comments = vm.status_comment;
                newStatus._destroy = false;
                TrialService.addStatus(vm.addedStatuses, newStatus);
                vm.srsNum++;
                vm.status_date = null;
                vm.sr_status_id = null;
                vm.status_comment = null;
                vm.showAddStatusError = false;
                vm.validateStatus();
            } else {
                vm.showAddStatusError = true;
            }
        };

        // Validate Trials Stautuses
        vm.validateStatus = function() {
            // Remove statuses with _destroy is true
            var noDestroyStatusArr = [];
            for (var i = 0; i < vm.addedStatuses.length; i++) {
                if (!vm.addedStatuses[i]._destroy) {
                    noDestroyStatusArr.push(vm.addedStatuses[i]);
                }
            }

            TrialService.validateSrStatus({"statuses": noDestroyStatusArr}).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.statusValidationMsgs = response.validation_msgs;

                    // Add empty object to positions where _destroy is true
                    for (var i = 0; i < vm.addedStatuses.length; i++) {
                        if (vm.addedStatuses[i]._destroy) {
                            vm.statusValidationMsgs.splice(i, 0, {});
                        }
                    }
                }
            }).catch(function(err) {
                console.log("Error in validating trial status: " + err);
            });
        };

        vm.addPs = function() {
            vm.editMode = false;
            vm.curPs = {};
            vm.curPs.new = true;
            vm.addedStatuses = [];
            vm.srsNum = 0;
            vm.selectedPiArray = [];
            setDefaultOrg();
        };

        vm.editPs = function(psIdx) {
            vm.editMode = true;
            vm.curPs = vm.curTrial.sitesu_sites[psIdx];
            vm.addedStatuses = [];
            vm.srsNum = 0;
            vm.selectedPiArray = [];
            setSitePi();
            appendStatuses();
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            allowPermittedAction();
            appendNewPsFlag();
            setManageScreenFlag();
            populateOrgs();
            setDefaultOrg();

            if (!vm.curPs.new) {
                setSitePi();
                appendStatuses();
            }

            configurePsInvList();
            watchContactTypeSelection();
            watchInvContactSelection();
            watchPersonContactSelection()
        }

        // Redirect to search page if this user is not allowed to mange sites
        function allowPermittedAction() {
            if ($state.$current.name.indexOf('manage') > -1 && vm.curTrial.actions.indexOf('manage-sites') < 0) {
                $state.go('main.trials', null, {reload: true});
            }
        }

        /**
         * Append a 'new' key to the vm.curPs to
         * indicate this is a new trial, not an trial
         * for editing/curating
         *
         */
        function appendNewPsFlag() {
            if ($state.$current.name.indexOf('add') > -1 || $state.$current.name.indexOf('manage') > -1) {
                vm.curPs.new = true;
            } else {
                vm.curPs.new = false;
            }
        }

        function setManageScreenFlag() {
            if ($state.$current.name.indexOf('manage') > -1) {
                vm.isManageScreen = true;
            } else {
                vm.isManageScreen = false;
            }
        }

        // Populate available organization list
        function populateOrgs() {
            if (vm.curUser.role === 'ROLE_SITE-SU') {
                vm.availableOrgs = vm.curTrial.available_family_orgs;
            } else {
                vm.availableOrgs.push(vm.curUser.organization);
            }
        }

        // Set the default organization
        function setDefaultOrg() {
            if (vm.availableOrgs.length > 0) {
                vm.curPs.organization_id = vm.availableOrgs[0].id;
            }
        }

        // Set the Site PI from many participating_site_investigators
        function setSitePi() {
            for (var i = 0; i < vm.curPs.participating_site_investigators.length; i++) {
                if (vm.curPs.participating_site_investigators[i].investigator_type === 'Principal Investigator') {
                    vm.sitePiIdx = i;
                }
            }
            $timeout( function() {
                vm.selectedPiArray.push(vm.curPs.participating_site_investigators[vm.sitePiIdx].person);
            }, 1000);
        }

        // Append site recruitment statuses for existing participating site
        function appendStatuses() {
            for (var i = 0; i < vm.curPs.site_rec_status_wrappers.length; i++) {
                var statusWrapper = {};
                statusWrapper.id = vm.curPs.site_rec_status_wrappers[i].id;
                statusWrapper.status_date = vm.curPs.site_rec_status_wrappers[i].status_date;
                statusWrapper.site_recruitment_status_id = vm.curPs.site_rec_status_wrappers[i].site_recruitment_status_id;
                // For displaying status name in the table
                _.each(vm.srStatusArr, function (status) {
                    if (status.id == vm.curPs.site_rec_status_wrappers[i].site_recruitment_status_id) {
                        statusWrapper.sr_status_name = status.name;
                        statusWrapper.sr_status_code = status.code;
                    }
                });
                statusWrapper.comments = vm.curPs.site_rec_status_wrappers[i].comments;
                statusWrapper._destroy = false;
                TrialService.addStatus(vm.addedStatuses, statusWrapper);
                vm.srsNum++;
            }
            vm.validateStatus();
        }

        /* Add temporary first name/last name property for each investigator 'person' object */
        function configurePsInvList(configType) {
            var invList = vm.curPs.participating_site_investigators;

            if (configType === 'delete') {
                _.each(invList, function(inv) {
                    delete inv.person.fullname;
                });
            } else {
                _.each(invList, function(inv) {
                    inv.person['fullname'] = PersonService.extractFullName(inv.person);
                });
            }
        }

        /* Watches */
        function watchContactTypeSelection() {
            $scope.$watch(function() {return vm.curPs.contact_type;}, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    vm.curPs.contact_name = null;
                    vm.curPs.contact_phone = null;
                    vm.curPs.extension = null;
                    vm.curPs.contact_email = null;
                    vm.selectedInvContact = null;
                }

                if (newVal === 'General') {

                }

                if (newVal === 'Person') {

                }

                if (newVal === 'PI') {

                }
            });
        }

        function watchInvContactSelection() {
            $scope.$watch(function() {return vm.selectedInvContact;}, function(newVal, oldVal) {
                var selectedInv;

                if (newVal) {
                    selectedInv = newVal;
                    vm.curPs.contact_phone = vm.curPs.contact_phone ? vm.curPs.contact_phone : selectedInv.person.phone
                    vm.curPs.extension = vm.curPs.extension ? vm.curPs.extension : selectedInv.person.extension;
                    vm.curPs.contact_email = vm.curPs.contact_email ? vm.curPs.contact_email : selectedInv.person.email;
                } else {
                    vm.curPs.contact_phone = null;
                    vm.curPs.extension = null;
                    vm.curPs.contact_email = null;
                }
            });
        }

        function watchPersonContactSelection() {
            $scope.$watch(function() {return vm.selectedPersonContactArray;}, function(newVal, oldVal) {
                var selectedPerson;

                if (newVal.length) {
                    selectedPerson = newVal[0];
                    console.log('selected person obj is: ', newVal);
                    vm.curPs.contact_name = PersonService.extractFullName(selectedPerson);
                    vm.curPs.contact_phone = selectedPerson.phone;
                    vm.curPs.extension = selectedPerson.extension;
                    vm.curPs.contact_email = selectedPerson.email;
                }
            });
        }
    }
})();
