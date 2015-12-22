
/**
 * Created by schintal, Deember 2nd, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialNciCtrl', trialNciCtrl);

    trialNciCtrl.$inject = ['TrialService', '$scope', 'toastr', 'trialDetailObj', 'studySourceObj'];

    function trialNciCtrl(TrialService, $scope, toastr, trialDetailObj, studySourceObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        //console.log("2curTrial =" + JSON.stringify(vm.curTrial));
        vm.studySourceArr = studySourceObj;
        vm.addedFses = [];
        vm.selectedSponsorArray = [];
        vm.selectedFsArray = [];

        vm.updateTrial = function () {
            console.log("3curTrial =" + JSON.stringify(vm.curTrial));
            if (vm.addedFses.length > 0) {
                vm.curTrial.trial_funding_sources_attributes = [];
                _.each(vm.addedFses, function (fs) {
                    vm.curTrial.trial_funding_sources_attributes.push(fs);
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            });


        } //updateTrial

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
        }

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
