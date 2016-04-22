/**
 * Created by wus4 on 4/1/16.
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasDiseaseCtrl', pasDiseaseCtrl);

    pasDiseaseCtrl.$inject = ['$scope', '$state', 'toastr', 'DiseaseService', '$window', 'trialDetailObj', 'TrialService', '$anchorScroll', '$location'];

    function pasDiseaseCtrl($scope, $state, toastr, DiseaseService, $window, trialDetailObj, TrialService, $anchorScroll, $location) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.addMode = false;
        vm.searchParams = {};
        vm.searchParams.disease_name = '';
        vm.addedDiseases = [];
        vm.existingDiseases = [];
        vm.selectedAll = false;
        vm.selectedNum = 0;
        vm.showPrimaryRequired = false;
        vm.showPrimaryOnlyOne = false;
        vm.showSecondaryOnlyOne = false;
        vm.disableBtn = false;
        vm.searching = false;

        vm.setAddMode = function(mode) {
            vm.addMode = mode;
            $scope.added_disease_form.$setPristine();

            if (!mode) {
                $location.hash('section_top');
                $anchorScroll();
            }
        };

        vm.toggleAll = function() {
            angular.forEach(vm.existingDiseases, function (disease) {
                disease._destroy = vm.selectedAll;
            });
            countSelected();
        };

        vm.toggleOne = function() {
            vm.selectedAll = false;
            countSelected();
        };

        vm.updateValidationVar = function() {
            updateValidationVar();
        };

        vm.deleteSelected = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.diseases_attributes = [];
            angular.forEach(vm.existingDiseases, function (disease) {
                if (disease._destroy) {
                    var diseaseObj = {};
                    diseaseObj.id = disease.id;
                    diseaseObj._destroy = disease._destroy;
                    vm.curTrial.diseases_attributes.push(diseaseObj);
                }
            });

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    $state.go('main.pa.trialOverview.disease', {}, {reload: true});
                    toastr.success('Record(s) deleted', 'Operation Successful!');
                    vm.disableBtn = false;
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                console.log("Error in deleting diseases " + JSON.stringify(outerTrial));
            });
        };

        vm.updateRank = function() {
            // Prevent multiple submissions
            vm.disableBtn = true;

            vm.curTrial.diseases_attributes = [];
            angular.forEach(vm.existingDiseases, function (disease) {
                var diseaseObj = {};
                diseaseObj.id = disease.id;
                diseaseObj.rank = disease.rank;
                vm.curTrial.diseases_attributes.push(diseaseObj);
            });

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    $state.go('main.pa.trialOverview.disease', {}, {reload: true});
                    toastr.success('Diseases have been updated', 'Operation Successful!');
                    vm.disableBtn = false;
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                console.log("Error in updating diseases " + JSON.stringify(outerTrial));
            });
        };

        vm.searchDiseases = function() {
            vm.searching = true;
            DiseaseService.searchDiseases(vm.searchParams).then(function(response) {
                vm.searchResult = response.diseases;
                vm.infoUrl = response.info_url;
                vm.treeUrl = response.tree_url;
                vm.searching = false;
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
            angular.forEach(vm.existingDiseases, function (disease) {
                if (disease.thesaurus_id === vm.searchResult[index].nt_term_id) {
                    vm.searchResult[index].exists = true;
                }
            });

            // Add it only when it's not added before
            if (!vm.searchResult[index].exists) {
                vm.addedDiseases.push(vm.searchResult[index]);
                vm.searchResult[index].added = true;
            }
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
                angular.forEach(vm.addedDiseases, function (disease) {
                    var diseaseObj = {};
                    diseaseObj.preferred_name = disease.preferred_name;
                    diseaseObj.code = disease.disease_code;
                    diseaseObj.thesaurus_id = disease.nt_term_id;
                    diseaseObj.display_name = disease.menu_display_name;

                    var parent_preferred = '';
                    angular.forEach(disease.parents, function(parent) {
                        if (parent_preferred.length > 0) {
                            parent_preferred += ' | ';
                        }
                        parent_preferred += parent.preferred_name;
                    });
                    diseaseObj.parent_preferred = parent_preferred;

                    diseaseObj.rank = '';

                    vm.curTrial.diseases_attributes.push(diseaseObj);
                });
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    $state.go('main.pa.trialOverview.disease', {}, {reload: true});
                    toastr.success('Diseases have been recorded', 'Operation Successful!');
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                console.log("Error in saving diseases " + JSON.stringify(outerTrial));
            });
        };

        vm.resetDiseases = function() {
            vm.searchParams = {};
            vm.searchResult = [];
            vm.addedDiseases = [];
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            appendDiseases();
            updateValidationVar();
        }

        // Append associations for existing Trial
        function appendDiseases() {
            for (var i = 0; i < vm.curTrial.diseases.length; i++) {
                var disease = {};
                disease.id = vm.curTrial.diseases[i].id;
                disease.preferred_name = vm.curTrial.diseases[i].preferred_name;
                disease.code = vm.curTrial.diseases[i].code;
                disease.thesaurus_id = vm.curTrial.diseases[i].thesaurus_id;
                disease.display_name = vm.curTrial.diseases[i].display_name;
                disease.parent_preferred = vm.curTrial.diseases[i].parent_preferred;
                disease.rank = vm.curTrial.diseases[i].rank;
                disease._destroy = false;
                vm.existingDiseases.push(disease);
            }
        }

        // Return the number of the selected disease
        function countSelected() {
            var c = 0;

            angular.forEach(vm.existingDiseases, function(disease) {
                if (disease._destroy) {
                    c++;
                }
            });

            vm.selectedNum = c;
        }

        // Update variables for rank validation
        function updateValidationVar() {
            var primaryNum = 0, secondaryNum = 0;
            angular.forEach(vm.existingDiseases, function (disease) {
                if (disease.rank === 'Primary') {
                    primaryNum++;
                } else if (disease.rank === 'Secondary') {
                    secondaryNum++;
                }
            });

            if (primaryNum === 0) {
                vm.showPrimaryRequired = true;
                vm.showPrimaryOnlyOne = false;
            } else if (primaryNum === 1) {
                vm.showPrimaryRequired = false;
                vm.showPrimaryOnlyOne = false;
            } else {
                vm.showPrimaryRequired = false;
                vm.showPrimaryOnlyOne = true;
            }

            if (secondaryNum <= 1) {
                vm.showSecondaryOnlyOne = false;
            } else {
                vm.showSecondaryOnlyOne = true;
            }
        }
    } //pasDiseaseCtrl
})();
