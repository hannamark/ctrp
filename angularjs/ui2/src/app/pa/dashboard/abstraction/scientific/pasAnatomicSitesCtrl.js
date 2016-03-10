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

        vm.selectedDeleteAnatomicSiteList = [];
        vm.anatomic_sites_selected = [];
        vm.selected_anatomic_site = {};

        // injected objects
        vm.curTrial = trialDetailObj;
        vm.anatomicSitesArr = anatomicSitesObj;

        // actions
        vm.setAddMode = setAddMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.saveSelection = saveSelection;
        vm.reset = reset();

        //console.log('IN pasAnatomicSitesCtrl anatomicView.curTrial.anatomic_sites='+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

       // console.log("vm.curTrial.anatomic_sites="+ JSON.stringify(vm.curTrial.anatomic_site_wrappers));

        /**
         *  Set Add Mode. This causes the dropdown of Anatomic Sites to appear for selection
         **/
        function setAddMode() {
            //console.log("SETTING TO ADDMODE");
            vm.addMode = true;
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
        }

        function saveSelection() {
            console.log("Selected anatomic sites = " + JSON.stringify(vm.anatomic_sites_selected));
            if (vm.anatomic_sites_selected.length > 0) {
                vm.curTrial.anatomic_site_wrappers_attributes = [];
                _.each(vm.anatomic_sites_selected, function (selected_anatomic_site) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.anatomic_site_wrappers.length; i++) {
                        if (vm.curTrial.anatomic_site_wrappers[i].anatomic_site_id == selected_anatomic_site.id){
                            exists = true;
                        }
                    }
                    console.log("update Trial exists ="+exists);
                    if (!exists){
                        var anatomicSiteToBeAddedToDb = {};
                        anatomicSiteToBeAddedToDb.new = true;
                        anatomicSiteToBeAddedToDb.anatomic_site_id = selected_anatomic_site.id;
                        anatomicSiteToBeAddedToDb.trial_id = vm.curTrial.id;
                        anatomicSiteToBeAddedToDb._destroy = false;
                        vm.curTrial.anatomic_site_wrappers_attributes.push(anatomicSiteToBeAddedToDb);
                    }
                });
            }
            console.log(" vm.curTrial.anatomic_site_wrappers_attributes="+ JSON.stringify(vm.curTrial.anatomic_site_wrappers_attributes));
            vm.anatomic_sites_selected = [];
            vm.saveTrial();
        }
        function reset() {
            console.log("IN RESET");
            $scope.anatomic_sites_selected = [];
        }

    } //pasAnatomicSitesCtrl

})();
