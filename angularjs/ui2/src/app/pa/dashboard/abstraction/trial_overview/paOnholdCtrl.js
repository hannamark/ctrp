/**
 * Created by wus4 on 5/9/16.
 */

(function () {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('paOnholdCtrl', paOnholdCtrl);

    paOnholdCtrl.$inject = ['$scope', '$state', 'toastr', 'trialDetailObj', 'onholdReasonObj', 'TrialService', 'DateService'];

    function paOnholdCtrl($scope, $state, toastr, trialDetailObj, onholdReasonObj, TrialService, DateService) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.addMode = false;
        vm.onholdReasonArr = onholdReasonObj;
        vm.offhold_date_opened = false;

        vm.setAddMode = function (mode) {
            vm.addMode = mode;
            if (mode) {
                vm.onhold_date = DateService.today();
                vm.onhold_date = DateService.convertISODateToLocaleDateStr(vm.onhold_date);
            } else {
                $scope.onhold_form.$setPristine();
                vm.onhold_id = null;
                vm.onhold_reason_id = null;
                vm.onhold_desc = null;
                vm.offhold_date = null;
            }
        };

        vm.setEditMode = function (index) {
            vm.addMode = true;
            vm.onhold_id = vm.curTrial.onholds[index].id;
            vm.onhold_reason_id = vm.curTrial.onholds[index].onhold_reason.id;
            vm.onhold_desc = vm.curTrial.onholds[index].onhold_desc;
            vm.onhold_date = vm.curTrial.onholds[index].onhold_date;
            vm.offhold_date = vm.curTrial.onholds[index].offhold_date;
        };

        vm.resetOnhold = function () {
            if (vm.onhold_id) {
                vm.offhold_date = null;
            } else {
                vm.onhold_reason_id = null;
                vm.onhold_desc = null;
            }
        };

        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'offhold_date') {
                vm.offhold_date_opened = !vm.offhold_date_opened;
            }
        }; //openCalendar

        vm.saveOnhold = function () {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.onholds_attributes = [];
            var onholdObj = {};
            if (vm.onhold_id) {
                onholdObj.id = vm.onhold_id;
            }
            onholdObj.onhold_reason_id = vm.onhold_reason_id;
            onholdObj.onhold_desc = vm.onhold_desc;
            onholdObj.onhold_date = vm.onhold_date;
            onholdObj.offhold_date = vm.offhold_date;
            vm.curTrial.onholds_attributes.push(onholdObj);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function (response) {
                if (response.server_response.status < 300) {
                    $state.go('main.pa.trialOverview.onhold', {}, {reload: true});
                    toastr.success('On hold has been recorded', 'Operation Successful!');
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function (err) {
                console.log("Error in saving on hold " + JSON.stringify(outerTrial));
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            convertDate();
        }

        function convertDate() {
            angular.forEach(vm.curTrial.onholds, function (onhold) {
                if (onhold.onhold_date) {
                    onhold.onhold_date = DateService.convertISODateToLocaleDateStr(onhold.onhold_date);
                }
                if (onhold.offhold_date) {
                    onhold.offhold_date = DateService.convertISODateToLocaleDateStr(onhold.offhold_date);
                }
            });
        }
    } //paOnholdCtrl
})();
