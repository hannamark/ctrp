
/**
 * Created by schintal, Deember 22nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialNciCtrl', trialNciCtrl);

    trialNciCtrl.$inject = ['TrialService', 'PATrialService', '$scope', '$timeout','$state', 'toastr', 'MESSAGES', 'trialDetailObj', 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialNciCtrl(TrialService, PATrialService, $scope, $timeout, $state, toastr, MESSAGES,trialDetailObj, studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        console.log("trialDetailObj.send_trial_flag  =" + JSON.stringify(trialDetailObj.send_trial_flag));
        vm.nciDivArr = nciDivObj;
        console.log("nciProgObj  =" + JSON.stringify(nciProgObj));
        //console.log("trial  =" + JSON.stringify(trialDetailObj));
        console.log("nci-div  =" + JSON.stringify(trialDetailObj["nih_nci_div"]));
        console.log("nci-prog  =" + JSON.stringify(trialDetailObj["nih_nci_prog"]));
        vm.nciProgArr = nciProgObj;
        vm.studySourceArr = studySourceObj;
        vm.addedFses = [];
        vm.selectedFsArray = [];
        vm.isSponsorNci = (trialDetailObj["sponsor"]["name"] == "National Cancer Institute")? true: false;
        console.log("isSponsorNci"+ vm.isSponsorNci);
        vm.isLeadOrgNciCcr = (trialDetailObj["lead_org"]["name"] == "NCI - Center for Cancer Research")? true: false;
        console.log("isLeadOrgNciCcr"+ vm.isSponsorNci);
        //console.log("send_trial_flag="+ (vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==true) && (trialDetailObj.send_trial_flag == "No"));
        console.log( (vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==true) && (trialDetailObj.send_trial_flag == "No"));

        if (((vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==true) && (trialDetailObj.send_trial_rules_flag == "Yes"))==true) {
            vm.disable_send_trial = false;
            console.log("disable set to false");
        } else if (((vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==true) && (trialDetailObj.send_trial_rules_flag == "No"))==true){
            vm.disable_send_trial = true;
            console.log("disable set to true");
        } else if (((vm.isSponsorNci==true) && (vm.isLeadOrgNciCcr==false))==true){
            vm.disable_send_trial = true;
        } else {
            vm.disable_send_trial = true;
        }
        vm.fsNum = 0;
        //vm.nih_nci_div = trialDetailObj.nih_nci_div;
        //vm.nih_nci_prog = trialDetailObj.nih_nci_prog;

        vm.updateTrial = function () {
            // Prevent multiple submissions
            vm.disableBtn = true;
            console.log("curTrial =" + JSON.stringify(vm.curTrial));
            console.log("(vm.curTrial.study_source_id  =" + JSON.stringify(vm.curTrial.study_source_id));
            if (vm.fsNum == 0) {
                return;
            }
           // if(vm.curTrial.study_source_id == null) {
           //     return;
           // }
            if (vm.addedFses.length > 0) {
                vm.curTrial.trial_funding_sources_attributes = [];
                _.each(vm.addedFses, function (fs) {
                    var exists = false
                    for (var i = 0; i < vm.curTrial.trial_funding_sources.length; i++) {
                        if (vm.curTrial.trial_funding_sources[i].id) {
                            if (vm.curTrial.trial_funding_sources[i].organization_id == fs.organization_id) {
                                exists = true;
                            }
                        }
                    }
                    if (!exists) {
                        vm.curTrial.trial_funding_sources_attributes.push(fs);
                    }
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                vm.curTrial.lock_version = response.lock_version || '';
                //toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                vm.curTrial.trial_funding_sources = response["trial_funding_sources"];
                vm.curTrial.nih_nci_div =  response["nih_nci_div"];
                vm.curTrial.nih_nci_prog =  response["nih_nci_prog"];
                PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                $scope.$emit('updatedInChildScope', {});
                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', 'Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });


        } //updateTrial

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };


        // Delete the associations
        vm.toggleSelection = function (index, type) {
            if (type == 'funding_source') {
                if (index < vm.addedFses.length) {
                    vm.addedFses[index]._destroy = !vm.addedFses[index]._destroy;
                    if (vm.addedFses[index]._destroy) {
                        vm.fsNum--;
                    } else {
                        vm.fsNum++;
                    }
                }
            }
        }

        // Add Founding Source to a temp array
        $scope.$watch(function() {
            //console.log("1curTrial =" + JSON.stringify(vm.curTrial));
            return vm.selectedFsArray.length;
        }, function(newValue, oldValue) {
            if (newValue == oldValue + 1) {
                var newFs = {};
                newFs.organization_id = vm.selectedFsArray[vm.selectedFsArray.length - 1].id;
                newFs.organization_name = vm.selectedFsArray[vm.selectedFsArray.length - 1].name;
                newFs._destroy = false;
                vm.addedFses.push(newFs);
                vm.fsNum++;
            }
        });

        activate();

        /****************** implementations below ***************/
        function activate() {
            appendFses();
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
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy


        function appendFses() {
            for (var i = 0; i < vm.curTrial.trial_funding_sources.length; i++) {
                var tfs = {};
                tfs.id = vm.curTrial.trial_funding_sources[i].id;
                tfs.organization_id = vm.curTrial.trial_funding_sources[i].organization_id;
                _.each(vm.curTrial.funding_sources, function (fs) {
                    if (tfs.organization_id == fs.id) {
                        tfs.organization_name = fs.name;
                    }
                });
                tfs._destroy = false;
                vm.addedFses.push(tfs);
                vm.fsNum++;
            }
        }

    } //trialNciCtrl

})();
