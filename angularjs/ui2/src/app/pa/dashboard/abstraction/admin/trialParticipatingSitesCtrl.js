
/**
 * Created by schintal, Jan 31, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialParticipatingSitesCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj'];

    function trialParticipatingSitesCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES, trialDetailObj) {

        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.currentParticipatingSite= {};
        vm.showOrgFields = true;
        vm.city=null;
        vm.state_province=null;
        vm.country=null;
        vm.postal=null;
        //vm.saveCurrentParticipatingSite = saveGeneralTrialDetails;
        //vm.resetCurrentParticipatingSite = resetGeneralTrialDetails;
        vm.currentParticipatingSite.organization = {name: '', array: []};

        /*
         * This function is invoked when the organizations are added and saved
         */
        vm.updateTrial = function() {
            // Prevent multiple submissions
            console.log("update Trial ");
            if (vm.addedParticipatingSites.length > 0) {
                vm.curTrial.participating_sites_attributes = [];
                _.each(vm.addedParticipatingSites, function (participating_site) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.participating_sites.length; i++) {
                        if (vm.curTrial.participating_sites[i].id) {
                            if (vm.curTrial.participating_sites[i].organization_id == participating_site.organization_id) {
                                exists = true;
                            }
                        }
                    }
                    console.log("update Trial exists ="+exists);
                    if (!exists){
                        vm.curTrial.participating_sites_attributes.push(collaborator);
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


        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Add Participating to a temp array
        function watchOrganization() {
            $scope.$watchCollection(function() {return vm.currentParticipatingSite.organization.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.currentParticipatingSite.name = newVal[0].name;
                    vm.currentParticipatingSite.organization = newVal[0];
                    vm.currentParticipatingSite.organization_id = newVal[0].id;
                    vm.city = newVal[0].city;
                    vm.state_province = newVal[0].state_province;
                    vm.country = newVal[0].country;
                    vm.postal_code = newVal[0].postal_code;
                    //console.log("vm.currentParticipatingSite =" + JSON.stringify(vm.currentParticipatingSite));
                }
            });
        }

        function setAddMode() {
            console.log("SETTING TO ADDMODE");
            vm.addEditMode = true;
        }

        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentParticipatingSite = vm.curTrial.participating_sites_list[idx];
            console.log("SETTING TO EDITMODE vm.currentParticipatingSite="+JSON.stringify(vm.currentParticipatingSite));
            console.log("SETTING TO EDITMODE vm.curTrial.participating_sites_list="+JSON.stringify(vm.curTrial.participating_sites_list));
            vm.city =  vm.curTrial.participating_sites_list[idx].city;
            vm.state_province =  vm.curTrial.participating_sites_list[idx].state_province;
            vm.country = vm.curTrial.participating_sites_list[idx].country;
            vm.postal_code = vm.curTrial.participating_sites_list[idx].postal_code;
            vm.currentParticipatingSite.organization = {name: vm.currentParticipatingSite["po_name"], array: []};
        }

        activate();

        /****************** implementations below ***************/
        function activate() {
            //appendCollaborators();
            getTrialDetailCopy();
            watchTrialDetailObj();
            watchOrganization();
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


    } //trialParticipatingSitesCtrl

})();
