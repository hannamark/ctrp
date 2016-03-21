/**
 * Created by schintal, Mar 15, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasArmsGroupsCtrl', pasArmsGroupsCtrl);

    pasArmsGroupsCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj'];

    function pasArmsGroupsCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.selectedDeleteAnatomicSiteList = [];

        console.log("trialDetailObj.interventions = " + JSON.stringify(trialDetailObj.interventions));

        vm.updateTrial = function() {
            if(vm.currentArmsGroup) {
                vm.curTrial.arms_groups_attributes = [];
                if (vm.currentArmsGroup.edit || vm.currentArmsGroup.new || (vm.currentArmsGroup._destroy && vm.currentArmsGroup.id)) {
                    vm.curTrial.arms_groups_attributes.push(vm.currentArmsGroup);
                }
            }
            console.log("vm.curTrial.arms_groups_attributes " + JSON.stringify(vm.curTrial.arms_groups_attributes));
            vm.saveTrial();
        }
        vm.saveTrial = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            console.log("vm.curTrial.arms_groups_attributes " + JSON.stringify(vm.curTrial.arms_groups_attributes));
            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                $scope.$emit('updatedInChildScope', {});
                vm.curTrial = response;
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        }//saveTrial

        function setAddMode() {
            vm.addEditMode = true;
            vm.currentArmsGroup = {};
            vm.currentArmsGroup.new = true;
            vm.currentArmsGroupIndex = null;
        }


        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentArmsGroup = vm.curTrial.arms_groups[idx];
            vm.currentArmsGroup.edit = true;
                vm.currentArmsGroupIndex = idx;
            console.log("In setEditModel vm.currentArmsGroup = " + JSON.stringify(vm.currentArmsGroup));
        }

        function deleteListHandler(armsGroupsInCheckboxes){
            console.log("In deleteListHandler armsGroupsInCheckboxes"+JSON.stringify(armsGroupsInCheckboxes));
            var deleteList = [];
            angular.forEach(armsGroupsInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteArmsGroupsList = deleteList ;
            console.log("In vm.selectedDeleteArmsGroupsList=" + JSON.stringify(vm.selectedDeleteArmsGroupsList));

        };

        function deleteSelected(){
            vm.curTrial.arms_groups_attributes=[];
            for (var i = 0; i < vm.selectedDeleteArmsGroupsList.length; i++) {
                var armsGroupsToBeDeletedFromDb = {};
                armsGroupsToBeDeletedFromDb.id = vm.selectedDeleteArmsGroupsList[i].id;
                armsGroupsToBeDeletedFromDb._destroy = true;
                console.log("armsGroupsToBeDeletedFromDb="+JSON.stringify(armsGroupsToBeDeletedFromDb));
                vm.curTrial.arms_groups_attributes.push(armsGroupsToBeDeletedFromDb);
            }
            vm.saveTrial();

        };


    } //pasArmsGroupsCtrl

})();
