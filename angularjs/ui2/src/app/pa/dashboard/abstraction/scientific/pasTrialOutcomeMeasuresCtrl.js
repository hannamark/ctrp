(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialOutcomeMeasuresCtrl', pasTrialOutcomeMeasuresCtrl);

    pasTrialOutcomeMeasuresCtrl.$inject = ['$scope', 'TrialService', 'PATrialService','OutcomeMeasureService','outcomeTypesObj', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants','trialDetailObj'];

    function pasTrialOutcomeMeasuresCtrl($scope, TrialService, PATrialService,OutcomeMeasureService,outcomeTypesObj, toastr,
                                MESSAGES, _, $timeout, uiGridConstants,trialDetailObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.currentOutcomeMeasure= {};

        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.resetOutcomeMeasure = resetOutcomeMeasure;

        //ui-grid plugin options
        vm.gridOptions = OutcomeMeasureService.getGridOptions();
        vm.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;

        vm.trialDetailObj = {};
        vm.om_types = outcomeTypesObj;
        vm.safety_issues=['Yes','No']

        activate();
        function activate() {
            //submit();
            getTrialDetailCopy();
        }

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };


        vm.saveOutcomeMeasure = function(){
            vm.disableBtn = true;


            if (!vm.currentOutcomeMeasure.id) {
                vm.currentOutcomeMeasure.new = true;
            }
            // An outer param wrapper is needed for nested attributes to work
            //var outerOM = {};
            //outerOM.new = vm.currentOutcomeMeasure.new;
            //outerOM.id = vm.currentOutcomeMeasure.id;
            //outerOM.outcome_measure = vm.currentOutcomeMeasure;
            vm.currentOutcomeMeasure.trial_id = trialDetailObj.id;


            TrialService.upsertOutcomeMeasure(vm.currentOutcomeMeasure).then(function(response) {
                //console.log("/n server_response="+JSON.stringify(response));
                var newOutcomeMeasure = false;
                if(!vm.currentOutcomeMeasure.id){
                    // New OutcomeMeasure
                    newOutcomeMeasure = true;
                    vm.currentOutcomeMeasure.id = response.id;
                }
                if(vm.currentOutcomeMeasure.id) {
                    if(newOutcomeMeasure){
                        vm.currentOutcomeMeasure.new = false;
                        vm.curTrial.outcome_measures.push(vm.currentOutcomeMeasure);
                    } else {
                        for (var i = 0; i < vm.curTrial.outcome_measures.length; i++) {
                            if (vm.curTrial.outcome_measures[i].id == vm.currentOutcomeMeasure.id) {
                                vm.curTrial.outcome_measures[i] = vm.currentOutcomeMeasure;
                            }
                        }
                    }

                }
            }).catch(function(err) {
                console.log("error in creating or updating outcome measures trial " + JSON.stringify(outerPS));
            });
        };//saveOutcomeMeasure

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


        function submit() {

                OutcomeMeasureService.getOutcomeMeasures().then(function (data) {
                    console.log('received search results: ' + JSON.stringify(data));
                    vm.gridOptions.data = data.outcome_measures;
                    vm.gridOptions.totalItems = data.outcome_measures["length"];
                }).catch(function (err) {
                    console.log('Getting audit trials failed');
                }).finally(function () {
                    console.log('search finished');
                    vm.searching = false;
                });
            }


        /**
         *  Set Add Mode. This causes the first tab to appear for a new Outcome Measure
         **/
        function setAddMode() {
            vm.addEditMode = true;
            vm.currentOutcomeMeasure= {};
        }

        /**
         *  Set Edit Mode. This causes the first tab to appear for an existing Participating Site
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentOutcomeMeasure = vm.curTrial.outcome_measures[idx];
        }

        function resetOutcomeMeasure() {
            if(vm.currentOutcomeMeasure.id > 0){
                for (var i = 0; i < vm.curTrial.outcome_measures.length; i++) {
                    if(vm.curTrial.outcome_measures[i].id == vm.currentOutcomeMeasure.id){
                        vm.currentOutcomeMeasure = vm.curTrial.outcome_measures[i];
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
