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

        /* Initialize global properties unaffected by permissions */
        vm.isManageScreen = $state.$current.name.indexOf('manage') > -1 ? true : false;
        vm.curUser = userDetailObj;
        vm.centralContactTypes = centralContactTypes.types;
        vm.centralContactTypes.shift(); // Remove 'None' value as done in PA
        vm.availableOrgs = [];
        vm.srStatusArr = srStatusObj;
        vm.status_date_opened = false;
        vm.addedStatuses = [];
        vm.srsNum = 0;
        vm.selectedPiArray = [];
        vm.selectedPersonContactArray = [];
        vm.editMode = false; // Flag used in manage sites screen
        vm.addMode = false;
        vm.selectedInvContact;
        vm.invContactArray = [];
        vm.itemsPerPage = 1;

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

            /* Set PI as contact in curPs.participating_site_investigators if needed */
            setContactPiAsContact();

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

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.ps_form.$setPristine();
                   }, 1);

                   // Response needs to refresh PS list
                }
            }).catch(function(err) {
                console.log('error in updating trial ' + JSON.stringify(outerPs));
            }).finally(function() {
                vm.disableBtn = false;
                configurePsInvList();
            });
        };

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        vm.reset = function() {
            vm.availableOrgs = [];
            vm.srStatusArr = srStatusObj;
            vm.status_date_opened = false;
            vm.addedStatuses = [];
            vm.srsNum = 0;
            vm.selectedPiArray = [];
            vm.selectedPersonContactArray = [];
            vm.selectedInvContact;
            vm.invContactArray = [];

            //vm.curPs = angular.copy(vm.curPsOriginal);
            setupPs('reset');
            $scope.ps_form.$setPristine();

            /* Execute in a $timeout because Angular 'contact_type' watch needs to run before these values are reset */
            $timeout(function() {
               vm.curPs.contact_name = vm.curPsOriginal.contact_name;
               vm.curPs.contact_email = vm.curPsOriginal.contact_email;
               vm.curPs.contact_phone = vm.curPsOriginal.contact_phone;
               vm.curPs.extension = vm.curPsOriginal.extension;
           }, 1);

        }

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
            vm.addMode = true;
            vm.curPs = {};
            vm.curPs.new = true;
            vm.addedStatuses = [];
            vm.srsNum = 0;
            vm.selectedPiArray = [];
            //setDefaultOrg();
            setupPs();
        };

        vm.editPs = function(psIdx) {
            vm.editMode = true;
            vm.addMode = false;
            vm.curPs = vm.curTrial.participating_sites[psIdx];
            //vm.curPs = vm.curTrial.sitesu_sites[psIdx];
            vm.addedStatuses = [];
            vm.srsNum = 0;
            vm.selectedPiArray = [];

            //setSitePi();
            //appendStatuses();
            setupPs();
        };

        activate();

        /****************************** implementations **************************/
        function activate() {
            if (vm.isManageScreen) {
                activateManage();
            } else {
                vm.curPs = psDetailObj || {};
                vm.curPs = vm.curPs.data || vm.curPs;
                vm.curTrial = trialDetailObj || vm.curPs.trial;

                allowPermittedAction();
                setupPs();
            }
        }

        function activateManage() {
            vm.curTrial = trialDetailObj;
            vm.curPs = {};
            //vm.psGridOptions.data = vm.curTrial.participating_sites;

            allowPermittedAction();
            console.log('trial and ps are: ', vm.curTrial, vm.curPs);
        }


        function setupPs(mode) {
            if (mode === 'reset') {
                vm.curPs = angular.copy(vm.curPsOriginal);
            } else {
                vm.curPsOriginal = angular.copy(vm.curPs);
                watchContactTypeSelection();
                watchInvContactSelection();
                watchPersonContactSelection();
            }

            vm.curPs.contact_type = vm.curPs.contact_type ? vm.curPs.contact_type : 'General';

            appendNewPsFlag();
            populateOrgs();
            setDefaultOrg();

            if (!vm.curPs.new || vm.editMode) {
                setSitePi();
                appendStatuses();
            }

            configurePsInvList();

            _.each(vm.curPs.participating_site_investigators, function(inv) {
                if (inv.set_as_contact) {
                    var invContact = inv;
                    _.each(vm.invContactArray, function(contactPi) {
                        if (contactPi.id === invContact.id) {
                            vm.selectedInvContact = contactPi;
                        }
                    });
                }
            });
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

        /* Create UI relevant array with obj properties needed in the UI */
        function configurePsInvList() {
            var invList = vm.curPs.participating_site_investigators;
            vm.invContactArray = [];

            _.each(invList, function(inv) {
                var invObj = {
                    id: inv.id,
                    name: inv.person.fname + ' ' + inv.person.lname,
                    email: inv.person.email,
                    phone: inv.person.phone,
                    extension: inv.person.extension
                };

                vm.invContactArray.push(invObj);
            });
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

                if (newVal === 'PI') {
                    console.log('pi: ', oldVal, newVal);
                }
            });
        }

        function watchInvContactSelection() {
            $scope.$watch(function() {return vm.selectedInvContact;}, function(newVal, oldVal) {
                var selectedInv;

                if (vm.curPs.contact_type === 'PI') {
                    if (newVal) {
                        selectedInv = newVal;
                        vm.curPs.contact_name = vm.curPs.contact_name ? vm.curPs.contact_name : selectedInv.name;
                        vm.curPs.contact_phone = vm.curPs.contact_phone ? vm.curPs.contact_phone : selectedInv.phone;
                        vm.curPs.extension = vm.curPs.extension ? vm.curPs.extension : selectedInv.extension;
                        vm.curPs.contact_email = vm.curPs.contact_email ? vm.curPs.contact_email : selectedInv.email;
                    } else {
                        vm.curPs.contact_name = null;
                        vm.curPs.contact_phone = null;
                        vm.curPs.extension = null;
                        vm.curPs.contact_email = null;
                    }
                }
            });
        }

        function watchPersonContactSelection() {
            $scope.$watch(function() {return vm.selectedPersonContactArray;}, function(newVal, oldVal) {
                var selectedPerson;

                if (newVal.length) {
                    selectedPerson = newVal[0];
                    vm.curPs.contact_name = PersonService.extractFullName(selectedPerson);
                    vm.curPs.contact_phone = selectedPerson.phone;
                    vm.curPs.extension = selectedPerson.extension ? selectedPerson.extension : null;
                    vm.curPs.contact_email = selectedPerson.email;
                }
            });
        }

        function setContactPiAsContact() {
            var selectedInv = vm.selectedInvContact;

            if (selectedInv) {
                _.each(vm.curPs.participating_site_investigators, function(inv) {
                    if (selectedInv.id === inv.id) {
                        inv.set_as_contact = true;
                    } else {
                        inv.set_as_contact = false;
                    }
                });
            }
        }
    }
})();
