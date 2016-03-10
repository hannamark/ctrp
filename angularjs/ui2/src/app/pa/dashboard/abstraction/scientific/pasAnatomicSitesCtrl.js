/**
 * Created by schintal, Mar 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAnatomicSitesCtrl', pasAnatomicSitesCtrl);

    pasAnatomicSitesCtrl.$inject = ['$scope', '$state', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'trialDetailObj','anatomicSitesObj'];

    function pasAnatomicSitesCtrl($scope, $state, TrialService, PATrialService, toastr,
                                     MESSAGES, _, $timeout, trialDetailObj, anatomicSitesObj) {
        var vm = this;

        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;

        vm.selectedDeleteAnatomicSiteList = [];

        console.log('IN pasAnatomicSitesCtrl='+ JSON.stringify(anatomicSitesObj));
        // injected objects
        vm.curTrial = trialDetailObj;

        console.log('IN pasAnatomicSitesCtrl anatomicView.curTrial.anatomic_sites='+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

        console.log("vm.curTrial.anatomic_sites="+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

        vm.saveTrial = function(){
            vm.disableBtn = true;

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

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


        function deleteListHandler(anatomicSitesSelectedInCheckboxes){
            console.log("In deleteListHandler anatomicSitesSelectedInCheckboxes" + JSON.stringify(anatomicSitesSelectedInCheckboxes));
            var deleteList = [];
            angular.forEach(anatomicSitesSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteAnatomicSiteList = deleteList ;
            console.log("In vm.selectedDeleteAnatomicSiteList=" + JSON.stringify(vm.selectedDeleteAnatomicSiteList));

        };

        function deleteSelected() {
            vm.curTrial.anatomic_site_wrappers_attributes = [];
            //console.log(vm.selectedDeleteAnatomicSiteList);
            for (var i = 0; i < vm.selectedDeleteAnatomicSiteList.length; i++) {
                var anatomicSiteToBeDeletedFromDb = {};
                anatomicSiteToBeDeletedFromDb.id = vm.selectedDeleteAnatomicSiteList[i].id;
                anatomicSiteToBeDeletedFromDb._destroy = true;
                vm.curTrial.anatomic_site_wrappers_attributes.push(anatomicSiteToBeDeletedFromDb);
            }
            vm.saveTrial();
            /*
            for (var i = 0; i < vm.selectedDeleteCollaboratorsList.length; i++) {
                for (var j = 0; j < vm.curTrial.collaborators.length; j++) {
                    if (vm.curTrial.collaborators[j].organization_id == vm.selectedDeleteCollaboratorsList[i].organization_id) {
                        var collaboratorToBeDeletedFromView = vm.curTrial.anatomic_site_wrappers[j];
                        console.log("coll to be delview =" + JSON.stringify(collaboratorToBeDeletedFromView));
                        vm.curTrial.collaborators.splice(j, 1);
                    }
                }
            }*/
        }

    } //pasAnatomicSitesCtrl

})();
