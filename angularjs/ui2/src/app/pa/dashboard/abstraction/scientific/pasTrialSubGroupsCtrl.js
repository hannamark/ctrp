(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialSubGroupsCtrl', pasTrialSubGroupsCtrl);

    pasTrialSubGroupsCtrl.$inject = ['$scope', 'TrialService', 'PATrialService','OutcomeMeasureService', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants','trialDetailObj'];

    function pasTrialSubGroupsCtrl($scope, TrialService, PATrialService,OutcomeMeasureService, toastr,
                                         MESSAGES, _, $timeout, uiGridConstants,trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.currentSubGroup= {};
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.setCopyMode = setCopyMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.resetSubGroup = resetSubGroup;

        vm.trialDetailObj = {};

        activate();
        function activate() {
            //submit();
            getTrialDetailCopy();
        }

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };


        vm.saveSubGroup = function(){
            // Prevent multiple submissions
            vm.disableBtn = true;
            if (!vm.currentSubGroup.id) {
                vm.currentSubGroup.new = true;
            }
            vm.currentSubGroup.trial_id = trialDetailObj.id;
            vm.curTrial.sub_groups_attributes=[];
            vm.curTrial.sub_groups_attributes.push(vm.currentSubGroup);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                var newSubGroup = false;
                if(!vm.currentSubGroup.id){
                    // New OutcomeMeasure
                    newSubGroup = true;
                    // vm.currentSubGroup.id = response.id;
                }
                vm.curTrial.lock_version = response.lock_version || '';
                //vm.curTrial.grants = response["grants"];
                PATrialService.setCurrentTrial(vm.curTrial);
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                })
                vm.addEditMode=false;

            }).catch(function(err) {
                console.log("error in creating or updating outcome measures trial " + JSON.stringify(outerTrial));
            });
        };//saveSubGroup

        function deleteListHandler(outcomeMeasuresSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(outcomeMeasuresSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteOutcomeMeasuresList = deleteList ;
            // console.log("In vm.selectedDeleteParticipatingSitesList=" + JSON.stringify(vm.selectedDeleteParticipatingSitesList));

            console.log(deleteList)
        };

        function deleteSelected(){
            vm.curTrial.outcome_measures_attributes=[];
            for (var i = 0; i < vm.selectedDeleteOutcomeMeasuresList.length; i++) {
                vm.deleteOutcomeMeasure( vm.selectedDeleteOutcomeMeasuresList[i].id);
            }
        };

        vm.deleteOutcomeMeasure = function(psId){
            vm.disableBtn = true;

            TrialService.deleteOutcomeMeasure(psId).then(function(response) {

                vm.curTrial.lock_version = response.lock_version || '';
                $scope.$emit('updatedInChildScope', {});
                for (var j = 0; j < vm.curTrial.outcome_measures.length; j++) {
                    if (vm.curTrial.outcome_measures[j].id == psId){
                        vm.curTrial.outcome_measures.splice(j, 1);
                    }
                }
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                toastr.clear();
                toastr.success('Outcome Measure ' + psId + ' for' + vm.curTrial.lead_protocol_id + ' has been deleted', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in deleting outcome measure =" + psId);
            });

        }//saveTrial


        /**
         *  Set Add Mode.
         **/
        function setAddMode() {
            vm.addEditMode = true;
            vm.currentSubGroup= {};
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentSubGroup = vm.curTrial.outcome_measures[idx];
        }

        /**
         *  Set Copy Mode.
         **/
        function setCopyMode(idx) {
            vm.addEditMode = true;
            vm.currentSubGroup ={}
            vm.copyOM =vm.curTrial.outcome_measures[idx];
            vm.currentSubGroup.title = vm.copyOM.title
            vm.currentSubGroup.time_frame = vm.copyOM.time_frame
            vm.currentSubGroup.description = vm.copyOM.description
            vm.currentSubGroup.outcome_measure_type_id = vm.copyOM.outcome_measure_type_id
            vm.currentSubGroup.safety_issue = vm.copyOM.safety_issue
            vm.currentSubGroup.new=true;
            vm.currentSubGroup.id=null;
        }

        function resetSubGroup() {
            if(vm.currentSubGroup.id > 0){
                for (var i = 0; i < vm.curTrial.outcome_measures.length; i++) {
                    if(vm.curTrial.outcome_measures[i].id == vm.currentSubGroup.id){
                        vm.currentSubGroup = vm.curTrial.outcome_measures[i];
                        vm.setEditMode(i);
                    }
                }
            } else {
                vm.setAddMode();
            }

            $timeout(function() {
                getTrialDetailCopy();
            }, 0);

        }

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy

    }

})();
