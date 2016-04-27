/**
 * Created by schintal, Mar 15, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasArmsGroupsCtrl', pasArmsGroupsCtrl);

    pasArmsGroupsCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj', '$anchorScroll', '$location', 'Common'];

    function pasArmsGroupsCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj, $anchorScroll, $location, Common) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        console.log("ARMS_GROUPS = " + JSON.stringify(trialDetailObj.arms_groups));
        console.log("INTERVENTIONS = " + JSON.stringify(trialDetailObj.interventions));
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.selectListHandler = selectListHandler;
        vm.deleteSelected = deleteSelected;
        vm.selectedDeleteAnatomicSiteList = [];
        vm.currentArmsGroup = {};
        vm.currentArmsGroup.label = "";
        vm.interventionList = [];
        vm.trial_interventions = [];
        vm.interventional = false;
        vm.duplicateLabel = false;
        vm.sortableListener = {};
        vm.sortableListener.stop = dragItemCallback;
        //vm.watchArmLabel = watchArmLabel();

        if(vm.curTrial.research_category.name=='Interventional') {
            vm.interventional = true;
        }

        console.log("vm.interventional = " + JSON.stringify(vm.curTrial.research_category));
        vm.reload = function() {
            console.log("RELOAD");
            $state.go($state.$current, null, { reload: true });
        };

        activate();

        /****************** implementations below ***************/
        function activate() {
           // watchArmLabel();
        }

        vm.checkAllAG = function () {
            if (vm.selectedAllAG) {
                vm.selectedAllAG = true;
            } else {
                vm.selectedAllAG = false;
            }

            angular.forEach(vm.curTrial.arms_groups, function (item) {
                item.selected = vm.selectedAllAG;
                vm.deleteListHandler(vm.curTrial.arms_groups);
            });

        };

        vm.checkDuplicates = function () {
            var isConfirmed = false;
            var confirmMsg = 'Click OK to add a duplicate Label.  Click Cancel to abort';
            //check for duplicates
            vm.duplicateLabel = false;
            for (var j = 0; j < vm.curTrial.arms_groups.length; j++) {
                if (vm.curTrial.arms_groups[j].label == vm.currentArmsGroup.label) {
                    vm.duplicateLabel = true;
                }
            }
            if (vm.duplicateLabel) {
                // if OC exists already
                Common.alertConfirm(confirmMsg).then(function(ok) {
                    isConfirmed = ok;
                }).catch(function(cancel) {
                    // isConfirmed = cancel;
                }).finally(function() {
                    if (isConfirmed === true) {
                        // user confirmed
                        vm.updateTrial();
                    } // isConfirmed
                });
            } else {
                vm.updateTrial();
            }

        }

        vm.updateTrial = function() {
            if(vm.currentArmsGroup) {
                vm.curTrial.arms_groups_attributes = [];
                vm.currentArmsGroup.intervention_text = "";
                console.log("vm.interventionList.length ="+ vm.interventionList.length);
                console.log("vm.interventionList ="+ JSON.stringify(vm.interventionList.length));
                if(vm.interventionList.length > 0){
                    for (var i = 0; i < vm.interventionList.length; i++) {
                        vm.currentArmsGroup.intervention_text = vm.currentArmsGroup.intervention_text + vm.interventionList[i].id + ",";
                        //console.log("GOOGLE vm.currentArmsGroup.intervention_text" +vm.currentArmsGroup.intervention_text);
                    }
                }
                if (vm.currentArmsGroup.edit || vm.currentArmsGroup.new || (vm.currentArmsGroup._destroy && vm.currentArmsGroup.id)) {
                    vm.curTrial.arms_groups_attributes.push(vm.currentArmsGroup);
                }
            }
            console.log("vm.curTrial.arms_groups_attributes " + JSON.stringify(vm.curTrial.arms_groups_attributes));
            vm.saveTrial();
            vm.duplicateLabel = false;
        }
        vm.saveTrial = function(params){
            vm.disableBtn = true;

            if(vm.currentArmsGroup){
                if(!vm.currentArmsGroup.label || !vm.currentArmsGroup.description){
                    return;
                }
            }
            var successMsg = '';

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
                //console.log("response.arms_groups="+ JSON.stringify(response.arms_groups));
                vm.curTrial.arms_groups_attributes=[];
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                //if(vm.currentArmsGroup.new){
                    vm.currentArmsGroup.new =false;
                    vm.addEditMode = false;
                //}
                $state.go('main.pa.trialOverview.armsGroups');

                if (params && params.del) {
                    successMsg = 'Record(s) deleted.';
                } else {
                    successMsg = 'Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded';
                }
                toastr.clear();
                toastr.success(successMsg, 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
                vm.selectedAllAG = false;

            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        }//saveTrial



        function setAddMode(isAddMode) {
            vm.currentArmsGroup = {};
            vm.currentArmsGroup.label = "";
            vm.currentArmsGroup.new = true;
            vm.currentArmsGroupIndex = null;
            vm.trial_interventions = [];

            if (isAddMode) {
                vm.addEditMode = true;
                var tempIntervention = {};
                for (var i = 0; i < vm.curTrial.interventions.length; i++) {
                    tempIntervention.id = vm.curTrial.interventions[i].id;
                    tempIntervention.name = vm.curTrial.interventions[i].name;
                    tempIntervention.description = vm.curTrial.interventions[i].description;
                    tempIntervention.selected = false;
                    vm.trial_interventions.push(tempIntervention);
                    console.log("vm.trial_interventions="+JSON.stringify(vm.trial_interventions));
                    tempIntervention = {};
                }
            } else {
                vm.addEditMode = false;
                $location.hash('section_top');
                $anchorScroll();
            }

            //$scope.arm_form.$setPristine();
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            //vm.currentArmsGroup.label = "";
            vm.currentArmsGroup = vm.curTrial.arms_groups[idx];
            vm.interventionList = vm.currentArmsGroup.arms_groups_interventions;
            vm.currentArmsGroup.edit = true;
            vm.currentArmsGroupIndex = idx;
            vm.intervention_array = new Array();
            vm.trial_interventions = [];
            var exists = false;
            if(vm.curTrial.arms_groups[idx].intervention_text){
                vm.intervention_array =  vm.curTrial.arms_groups[idx].intervention_text.split(",");
                console.log("vm.curTrial.arms_groups[idx].intervention_text="+JSON.stringify(vm.curTrial.arms_groups[idx].intervention_text));
                console.log("vm.intervention_array="+JSON.stringify(vm.intervention_array));
            }
            // Show the list of Trial interventions with the checkbox selected if they are assigned to the Arms Group
            var temp_intervention = {};
            for (var i = 0; i < vm.curTrial.interventions.length; i++) {
               for (var j = 0; j < vm.intervention_array.length; j++) {
                   if(vm.curTrial.interventions[i].id == vm.intervention_array[j]){
                       exists = true;
                   }
               }
                temp_intervention.id = vm.curTrial.interventions[i].id;
                temp_intervention.name = vm.curTrial.interventions[i].name;
                temp_intervention.description = vm.curTrial.interventions[i].description;
               if(exists) {
                   temp_intervention.selected = true;
               } else {
                   temp_intervention.selected = false;
               }
               vm.trial_interventions.push(temp_intervention);
                temp_intervention = {};
                exists = false;
            }

            console.log("In setEditModel vm.trial_interventions = " + JSON.stringify(vm.trial_interventions));
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
            vm.saveTrial({"del": armsGroupsToBeDeletedFromDb});
            vm.selectedAllAG = false;
        };

        function selectListHandler(interventionCheckboxes){
            console.log("In selectListHandler interventionCheckboxes"+JSON.stringify(interventionCheckboxes));
            var selectList = [];
            angular.forEach(interventionCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    selectList.push(item);
                }
            });
            vm.interventionList = selectList ;
           // vm.currentArmsGroup.interventions =  vm.interventionList;
            console.log("In selectList=" + JSON.stringify(selectList));

        };

        /**
         * Callback for dragging item around
         * @param  {[type]} event [description]
         * @param  {[type]} ui    [description]
         * @return {[type]}       [description]
         */
        function dragItemCallback(event, ui) {
            var item = ui.item.scope().item;
            var fromIndex = ui.item.sortable.index;
            var toIndex = ui.item.sortable.dropindex;

            vm.curTrial.arms_groups_attributes = _labelSortableIndex(vm.curTrial.arms_groups);

            // Code for optimizing the save
            /**for (var i = 0; i < vm.curTrial.arms_groups.length; i++) {
                if(vm.curTrial.arms_groups[i].index !=i) {
                    var obj = {};
                    obj.id = vm.curTrial.arms_groups[i].id;
                    obj.index = i;
                    vm.curTrial.arms_groups_attributes.push(obj);
                }
            }**/

            vm.saveTrial();
        }

        /**
        function watchArmLabel() {
            $scope.$watch(function () {
                return vm.currentArmsGroup.label;
            }, function (newVal, oldVal) {
                console.log("InWatchLabel newVal=" + newVal);
                // Go through all the arms groups in the current trial
                for (var i = 0; i < vm.curTrial.arms_groups.length; i++) {
                    if(vm.curTrial.arms_groups[i].label == newVal){
                        vm.duplicateLabel = true;
                    }
                }
                console.log("InWatchLabel vm.duplicateLabel=" + vm.duplicateLabel);
            });
        } **/
    } //pasArmsGroupsCtrl

})();
