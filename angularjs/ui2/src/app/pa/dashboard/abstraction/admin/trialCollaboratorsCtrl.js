
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialCollaboratorsCtrl', trialCollaboratorsCtrl);

    trialCollaboratorsCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj'];

    function trialCollaboratorsCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj) {

        var vm = this;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.setAddMode = setAddMode;
        vm.curTrial = trialDetailObj;
        console.log("trialDetailObj = " + JSON.stringify(trialDetailObj));
        console.log("pa_editable = " + JSON.stringify(trialDetailObj["pa_editable"]));
        vm.curTrial.collaborators_attributes = [];
        vm.addedCollaborators = [];
        vm.selectedCollaborators = [];
        vm.selectedDeleteCollaboratorsList = [];
        vm.collaboratorsNum = 0;
        vm.addMode=false;

        /*
         * This function is invoked when the organizations are added and saved
         */
        vm.updateTrial = function() {
            // Prevent multiple submissions
            console.log("update Trial ");
            if (vm.addedCollaborators.length > 0) {
                vm.curTrial.collaborators_attributes = [];
                _.each(vm.addedCollaborators, function (collaborator) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.collaborators.length; i++) {
                        if (vm.curTrial.collaborators[i].id) {
                            if (vm.curTrial.collaborators[i].organization_id == collaborator.organization_id) {
                                exists = true;
                            }
                        }
                    }
                    console.log("update Trial exists ="+exists);
                    if (!exists){
                        vm.curTrial.collaborators_attributes.push(collaborator);
                    }
                });
            }
            console.log("vm.curTrial.collaborators_attributes " + JSON.stringify(vm.curTrial.collaborators_attributes));
            vm.saveTrial();
            vm.addedCollaborators = [];

        } // updateTrial


        vm.saveTrial = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                $scope.$emit('updatedInChildScope', {});
                vm.curTrial.collaborators = response["collaborators"];
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        }//saveTrial

        /**
         * The in-line editing of the Organization name for Organizations without PO_ID
         * @param org_name
         * @param idx
         */
        vm.updateCollaborator = function(org_name, idx) {
            vm.curTrial.collaborators_attributes=[];
            var collaborator = vm.curTrial.collaborators[idx];
            vm.curTrial.collaborators_attributes.push(collaborator);
            console.log("vm.curTrial.collaborators_attributes " + JSON.stringify(vm.curTrial.collaborators_attributes));
            vm.saveTrial();
        } // updateCollaborator


        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Delete the associations
        vm.toggleSelection = function (index) {
            if (index < vm.addedCollaborators.length) {
                vm.addedCollaborators[index]._destroy = !vm.addedCollaborators[index]._destroy;
                if (vm.addedCollaborators[index]._destroy) {
                    vm.collaboratorsNum--;
                } else {
                    vm.collaboratorsNum++;
                }
            }
        }


        // Add Collaborator to a temp array
        $scope.$watch(function() {
            //console.log("1curTrial =" + JSON.stringify(vm.curTrial));
            return vm.selectedCollaborators.length;
        }, function(newValue, oldValue) {
            if (newValue == oldValue + 1) {
                var newCollaborator = {};
                newCollaborator.organization_id = vm.selectedCollaborators[vm.selectedCollaborators.length - 1].id;
                newCollaborator.org_name = vm.selectedCollaborators[vm.selectedCollaborators.length - 1].name;
                newCollaborator._destroy = false;
                vm.addedCollaborators.push(newCollaborator);
                vm.collaboratorsNum++;
            }
        });

        activate();

        /****************** implementations below ***************/
        function activate() {
            getTrialDetailCopy();
            watchTrialDetailObj();
        }

        /**
         * Get trial detail object from parent scope
         */
        function watchTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                getTrialDetailCopy();
            });
        } //watchTrialDetailObj

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy


        function deleteListHandler(collaboratorsSelectedInCheckboxes){
            console.log("In deleteListHandler");
            var deleteList = [];
            angular.forEach(collaboratorsSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteCollaboratorsList = deleteList ;
            console.log("In vm.selectedDeleteCollaboratorsList=" + JSON.strigify(vm.selectedDeleteCollaboratorsList));

        };

        function deleteSelected(){
            vm.curTrial.collaborators_attributes=[];
            //console.log(vm.selectedDeleteCollaboratorsList);
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                var collaboratorToBeDeletedFromDb = {};
                collaboratorToBeDeletedFromDb.id =  vm.selectedDeleteCollaboratorsList[i].id;
                collaboratorToBeDeletedFromDb.organization_id = vm.selectedDeleteCollaboratorsList[i].organization_id;
                collaboratorToBeDeletedFromDb.org_name = vm.selectedDeleteCollaboratorsList[i].org_name;
                collaboratorToBeDeletedFromDb._destroy = true;
                vm.curTrial.collaborators_attributes.push(collaboratorToBeDeletedFromDb);
            }
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                for (var j = 0; j < vm.curTrial.collaborators.length; j++) {
                    if (vm.curTrial.collaborators[j].organization_id == vm.selectedDeleteCollaboratorsList[i].organization_id){
                        var collaboratorToBeDeletedFromView = vm.curTrial.collaborators[j];
                        console.log("coll to be delview ="+ JSON.stringify(collaboratorToBeDeletedFromView));
                        vm.curTrial.collaborators.splice(j, 1);
                    }
                }
            }

            vm.saveTrial();
        };



        function setAddMode() {
            vm.addMode = true;
        }


    } //trialCollaboratorsCtrl

})();
