/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialStatusCtrl', paTrialStatusCtrl);

    paTrialStatusCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'trialStatuses', 'Common', 'DateService', '$timeout'];

    function paTrialStatusCtrl($scope, _, PATrialService, TrialService,
        trialStatuses, Common, DateService, $timeout) {

        var vm = this;
        vm.trialStatuses = trialStatuses.sort(Common.a2zComparator()); // array of trial statuses
        vm.statusObj = _initStatusObj();
        vm.dateFormat = DateService.getFormats()[1];
        vm.statusDateOpened = false;
        vm.dateOptions = DateService.getDateOptions();
        vm.trialDetailObj = {};
        vm.tempTrialStatuses = [];

        // actions
        vm.addTrialStatus = addTrialStatus;
        vm.openCalendar = openCalendar;
        vm.deleteTrialStatus = deleteTrialStatus;
        vm.editTrialStatus = editTrialStatus;
        vm.cancelEdit = cancelEdit;
        vm.commitEdit = commitEdit;

        activate();
        function activate() {
            _getTrialDetailCopy();
        } // activate

        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                // convert the trial_status_id to status name
                vm.tempTrialStatuses = _.map(vm.trialDetailObj.trial_status_wrappers, function(status) {
                    var curStatusObj = _.findWhere(vm.trialStatuses, {id: status.trial_status_id});
                    status.trial_status_name = curStatusObj.name || '';
                    status.trial_status_code = curStatusObj.code || '';
                    status._destroy = false;
                    // status.status_date is in this format "YYYY-mm-DD" (e.g. "2009-12-03")
                    // change it to the format ("DD-MMM-YYYY", e.g. "03-Dec-2009")
                    status.status_date = moment(status.status_date).format("DD-MMM-YYYY")
                    delete status.trial_status // delete the trial_status object
                    delete status.updated_at
                    delete status.created_at
                    return status;
                });

                validateStatuses();
            }, 0);
        } // _getTrialDetailCopy

        /**
         * Generate a new status object
         * @return {JSON} [fields: status_date, etc (see below)]
         */
        function _initStatusObj() {
            var statusObj = {
                status_date: '',
                trial_status_id: '',
                comment: '',
                why_stopped: '',
                _destroy: false
            };
            return statusObj;
        }

        function openCalendar($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.statusDateOpened = !vm.statusDateOpened;
        } // openCalendar

        function addTrialStatus() {

            if (vm.statusObj.status_date && vm.statusObj.trial_status_id) {
                var statusExists = _.findIndex(vm.tempTrialStatuses, {trial_status_id: vm.statusObj.trial_status_id}) > -1;
                if (statusExists) {
                    vm.statusErrorMsg = 'Status already exists';
                    return;
                }
                var clonedStatusObj = angular.copy(vm.statusObj);
                // clonedStatusObj.status_date = clonedStatusObj.status_date.toISOString(); // ISOString for POST to backend
                clonedStatusObj.status_date = DateService.convertISODateToLocaleDateStr(clonedStatusObj.status_date); // for display in table
                var selectedStatus = _.findWhere(vm.trialStatuses, {id: clonedStatusObj.trial_status_id});

                if (!!selectedStatus) {
                    clonedStatusObj.trial_status_name = selectedStatus.name;
                    clonedStatusObj.trial_status_code = selectedStatus.code;
                }
                console.log('vm.tempTrialStatuses: ', vm.tempTrialStatuses);
                vm.tempTrialStatuses.push(clonedStatusObj);

                // Validate statuses:
                validateStatuses();
                // re-initialize the vm.statusObj
                vm.statusObj = _initStatusObj();
            }
        }

        function validateStatuses() {
            vm.statusValidationMsgs = [];
            var activeStatuses = []; // statuses not to be destroyed
            activeStatuses = _.filter(vm.tempTrialStatuses, function(status) {
                return !status._destroy;
            });
            return _validateStatusesDelegate(activeStatuses);
        }

        /**
         * Delegate for validating trial statuses
         * @param  {[type]} statusArr [array of trial statuses]
         * @return {[type]}           [description]
         */
        function _validateStatusesDelegate(statusArr) {
            if (statusArr.length === 0) return;

            TrialService.validateStatus({"statuses": statusArr}).then(function(res) {
                if (res.validation_msgs && angular.isArray(res.validation_msgs)) {
                    vm.statusValidationMsgs = res.validation_msgs;
                    _.each(vm.tempTrialStatuses, function(status, index) {
                        if (status._destroy) {
                            vm.statusValidationMsgs.splice(index, 0, {});
                        }
                    });
                }
            }).catch(function(err) {
                console.log('error in validating status');
            });
        } // _validateStatusesDelegate

        function deleteTrialStatus(index) {
            if (index < vm.tempTrialStatuses.length) {
                vm.tempTrialStatuses[index]._destroy = !vm.tempTrialStatuses[index]._destroy;
                // empty the edit fields if it's targeted for destroy
                if (vm.tempTrialStatuses[index]._destroy && vm.statusObj.edit) {
                    vm.statusObj = _initStatusObj();
                }
            }
        } // deleteTrialStatus

        function editTrialStatus(index) {
            if (index < vm.tempTrialStatuses.length) {
                vm.statusObj = angular.copy(vm.tempTrialStatuses[index]);
                vm.statusObj.edit = true;
                vm.statusObj.index = index;
                // vm.tempTrialStatuses.splice(index, 1);
            }
        }

        function commitEdit() {
            if (vm.statusObj.edit) {
                // vm.statusObj.status_date = moment(vm.statusObj.status_date).format("DD-MMM-YYYY"); // e.g. 03-Feb-2016
                vm.statusObj.status_date = DateService.convertISODateToLocaleDateStr(vm.statusObj.status_date);
                var selectedStatus = _.findWhere(vm.trialStatuses, {id: vm.statusObj.trial_status_id});
                if (!!selectedStatus) {
                    vm.statusObj.trial_status_name = selectedStatus.name;
                    vm.statusObj.trial_status_code = selectedStatus.code;
                }
                // vm.tempTrialStatuses.splice(vm.statusObj.index, 0, vm.statusObj);
                vm.tempTrialStatuses[vm.statusObj.index] = vm.statusObj;
                console.log('vm.tempTrialStatuses: ', vm.tempTrialStatuses);
                // validateStatuses();
                vm.statusObj = _initStatusObj();
            }
        } // commitEdit

        function cancelEdit() {
            if (vm.statusObj.edit) {
                vm.statusObj = _initStatusObj();
            }
        }


    } // paTrialStatusCtrl



})();
