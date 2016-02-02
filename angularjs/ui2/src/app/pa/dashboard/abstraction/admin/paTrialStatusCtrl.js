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
                    status.status_name = curStatusObj.name || '';
                    return status;
                });
                console.log('vm.trialDetailObj: ', vm.trialDetailObj);
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
                status_comment: '',
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
                clonedStatusObj.status_name = !!selectedStatus ? selectedStatus.name : ''; // assign the status name
                console.log('cloned status obj: ', clonedStatusObj);
                vm.tempTrialStatuses.unshift(clonedStatusObj);
                // vm.trialDetailObj.trial_status_wrappers.unshift(clonedStatusObj);

                // TODO: validate statuses:
                // validateStatuses();
                //
                // re-initialize the vm.statusObj
                vm.statusObj = _initStatusObj();
            }
        }

        function validateStatuses() {
            var activeStatuses = []; // statuses not to be destroyed
            activeStatuses = _.filter(vm.tempTrialStatuses, function(status) {
                return !status._destroy;
            });
            return activeStatuses.length === 0 ? '' : _validateStatuses(activeStatuses);

        }

        function _validateStatuses(statusArr) {
            return TrialService.validateStatus({statuses: statusArr}).then(function(res) {
                console.log('_validatestatuses: ', res.validation_msgs);
            })
        }


    } // paTrialStatusCtrl



})();
