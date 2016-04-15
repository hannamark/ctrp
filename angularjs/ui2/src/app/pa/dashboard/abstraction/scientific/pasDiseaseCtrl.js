/**
 * Created by wus4 on 4/1/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasDiseaseCtrl', pasDiseaseCtrl);

    pasDiseaseCtrl.$inject = ['$scope', '$state', 'toastr', '_', 'DiseaseService', '$window', 'trialDetailObj', 'TrialService'];

    function pasDiseaseCtrl($scope, $state, toastr, _, DiseaseService, $window, trialDetailObj, TrialService) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.addedDiseases = [];
        vm.disableBtn = false;

        vm.searchDiseases = function() {
            var searchParams = {disease_name: vm.disease_name};
            DiseaseService.searchDiseases(searchParams).then(function(response) {
                vm.searchResult = response.diseases;
                vm.infoUrl = response.info_url;
                vm.treeUrl = response.tree_url;
            }).catch(function(err) {
                console.log("Error in searching diseases: " + err);
            });
        };

        vm.openTree = function(ncitCode) {
            console.log(ncitCode);
            $window.open(vm.treeUrl + ncitCode, '_blank', 'top=100, left=100, height=740, width=680, scrollbars=yes');
        };

        vm.openInfo = function(ncitCode) {
            console.log(ncitCode);
            $window.open(vm.infoUrl + ncitCode);
        };

        vm.addDisease = function(index) {
            vm.addedDiseases.push(vm.searchResult[index]);
            vm.searchResult[index].added = true;
        };

        vm.removeDisease = function(index) {
            vm.addedDiseases[index].added = false;
            vm.addedDiseases.splice(index, 1);
        };

        vm.saveDiseases = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.addedDiseases.length > 0) {
                vm.curTrial.diseases_attributes = [];
                _.each(vm.addedDiseases, function (disease) {
                    var diseaseObj = {};
                    diseaseObj.preferred_name = disease.preferred_name;
                    diseaseObj.code = disease.disease_code;
                    diseaseObj.thesaurus_id = disease.nt_term_id;
                    diseaseObj.display_name = disease.menu_display_name;
                    vm.curTrial.diseases_attributes.push(diseaseObj);
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    toastr.success('Diseases have been recorded', 'Operation Successful!');
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                console.log("Error in saving diseases " + JSON.stringify(outerTrial));
            });
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
        }

    } //pasDiseaseCtrl
})();
