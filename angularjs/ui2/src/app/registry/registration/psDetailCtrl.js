/**
 * Created by wus4 on 2/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('psDetailCtrl', psDetailCtrl);

    psDetailCtrl.$inject = ['trialDetailObj', 'userDetailObj', 'TrialService', 'toastr', '$state', 'srStatusObj',
        'DateService'];

    function psDetailCtrl(trialDetailObj, userDetailObj, TrialService, toastr, $state, srStatusObj,
                          DateService) {

        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.curUser = userDetailObj;
        vm.curPs = {};
        vm.availableOrgs = [];
        vm.srStatusArr = srStatusObj;
        vm.status_date_opened = false;
        vm.addedStatuses = [];
        vm.srsNum = 0;

        vm.updateTrial = function() {

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
                newStatus.status_date = DateService.convertISODateToLocaleDateStr(vm.status_date);
                newStatus.sr_status_id = vm.sr_status_id;
                // For displaying status name in the table
                _.each(vm.srStatusArr, function (status) {
                    if (status.id == vm.sr_status_id) {
                        newStatus.sr_status_name = status.name;
                        newStatus.trial_status_code = status.code;
                    }
                });
                newStatus.comment = vm.status_comment;
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

            TrialService.validateStatus({"statuses": noDestroyStatusArr}).then(function(response) {
                vm.statusValidationMsgs = response.validation_msgs;

                // Add empty object to positions where _destroy is true
                for (var i = 0; i < vm.addedStatuses.length; i++) {
                    if (vm.addedStatuses[i]._destroy) {
                        vm.statusValidationMsgs.splice(i, 0, {});
                    }
                }
            }).catch(function(err) {
                console.log("Error in validating trial status: " + err);
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            populateOrgs();
            setDefaultOrg();
        }

        // Populate available organization list
        function populateOrgs() {
            if (vm.curUser.role === 'ROLE_SITE-SU') {
                vm.availableOrgs = vm.curUser.family_orgs;
            } else {
                vm.availableOrgs.push(vm.curUser.organization);
            }
        }

        // Set the default organization
        function setDefaultOrg() {
            vm.curPs.organization_id = vm.availableOrgs[0].id;
        }
    }
})();

