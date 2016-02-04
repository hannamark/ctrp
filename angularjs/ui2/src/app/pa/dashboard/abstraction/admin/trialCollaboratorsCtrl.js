
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
        vm.deleteCollaborator = deleteCollaborator;
        vm.curTrial = trialDetailObj;
        console.log("trialDetailObj = " + JSON.stringify(trialDetailObj));
        console.log("pa_editable = " + JSON.stringify(trialDetailObj["pa_editable"]));
        vm.addedCollaborators = [];
        vm.selectedCollaborators = [];
        vm.collaboratorsNum = 0;

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            if (vm.addedCollaborators.length > 0) {
                vm.curTrial.collaborators_attributes = [];
                _.each(vm.addedCollaborators, function (collaborator) {
                    vm.curTrial.collaborators_attributes.push(collaborator);
                    if (!vm.addedCollaborators[index]._destroy) {
                        vm.curTrial.collaborators.push(collaborator);
                    }
                });
            }

            console.log("outertrial IN SAVE! " + JSON.stringify(outerTrial));


            TrialService.upsertTrial(outerTrial).then(function(response) {
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });

        } // updateTrial

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

        /****************** implementations below ***************/
        function activate() {
            appendCollaborators();
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

        /**
         * Toggle the identifier for destroy or restore for the
         * specified identifier with index 'idx'
         * @param  {Int} idx [Index for the other identifier in other_ids array]
         * @return {Void}
         */
        function deleteCollaborator(idx) {
            console.log("idx="+idx);
            console.log("curTrial.collaborators[idx]="+vm.curTrial.collaborators[idx]);
            if (idx < vm.curTrial.collaborators.length) {
                vm.curTrial.collaborators[idx]._destroy = !vm.curTrial.collaborators[idx]._destroy;
            }
        }


        function appendCollaborators() {
            for (var i = 0; i < vm.curTrial.collaborators.length; i++) {
                var viewCollaborator = {};
                viewCollaborator.id = vm.curTrial.collaborators[i].id;
                viewCollaborator.organization_id = vm.curTrial.collaborators[i].organization_id;
                viewCollaborator.org_name = vm.curTrial.collaborators[i].org_name;
                viewCollaborator._destroy = false;
                vm.addedCollaborators.push(viewCollaborator);
                vm.collaboratorsNum++;
            }
        }

    } //trialCollaboratorsCtrl

})();
