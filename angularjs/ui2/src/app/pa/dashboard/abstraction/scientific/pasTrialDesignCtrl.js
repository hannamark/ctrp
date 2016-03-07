(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDesignCtrl', pasTrialDesignCtrl);

    pasTrialDesignCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'groupedTrialDesignData'];

    function pasTrialDesignCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, groupedTrialDesignData) {
        var vm = this;
        // partial templates for different fields
        var INTERVENTIONAL_FIELDS = 'app/pa/dashboard/abstraction/scientific/partials/_design_view_interventional.html';
        var OBSERVATIONAL_FIELDS = 'app/pa/dashboard/abstraction/scientific/partials/_design_view_observational.html';
        var ANCILLARY_FIELDS = 'app/pa/dashboard/abstraction/scientific/partials/_design_view_ancillary.html';
        var EXPANDEDACCESS_FIELDS = 'app/pa/dashboard/abstraction/scientific/partials/_design_view_expanded_access.html';
        vm.curSpecificFieldsPartial = '';

        console.info('groupedTrialDesignData: ', groupedTrialDesignData);
        vm.trialDetailObj = {};
        vm.trialPhases = [];
        vm.researchCategories = [];
        vm.primaryPurposes = [];
        vm.secondaryPurposes = [];
        vm.interventionModels = [];
        vm.maskings = [];
        vm.allocations = [];
        vm.studyClassifications = [];
        vm.isOtherPrimaryPurpose = false;
        vm.isOtherSecondaryPurpose = false;
        vm.trialDetailObj.showMaskingRoles = false;

        activate();
        function activate() {
            _unpackPromisedData();
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _watchSecondaryPurpose();
            _watchResearchCategory();
            _watchMasking();
        }

        // break down the grouped promised data as arrays
        function _unpackPromisedData() {
            if (groupedTrialDesignData.length === 4) {
                vm.trialPhases = groupedTrialDesignData[0];
                vm.researchCategories = groupedTrialDesignData[1];
                vm.primaryPurposes = groupedTrialDesignData[2];
                vm.secondaryPurposes = groupedTrialDesignData[3];
            }
        }

        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            }, 0);
        } // _getTrialDetailCopy

        function _watchResearchCategory() {
            $scope.$watch(function() {return vm.trialDetailObj.research_category_id;},
                function(newVal, oldVal) {
                    var curResearchCategoryObj = _.findWhere(vm.researchCategories, {id: newVal});
                    vm.researchCategoryTitle = !!curResearchCategoryObj ? ' - ' + curResearchCategoryObj.name : '';
                    vm.isExpandedAccess = vm.researchCategoryTitle.toLowerCase().indexOf('expand') > -1;
                    vm.isInterventional = vm.researchCategoryTitle.toLowerCase().indexOf('intervention') > -1;
                    vm.isObservational = vm.researchCategoryTitle.toLowerCase().indexOf('observation') > -1;
                    vm.isAncillary = vm.researchCategoryTitle.toLowerCase().indexOf('ancillary') > -1;

                    // fetch intervention models
                    if (vm.isInterventional && vm.interventionModels.length === 0) {
                        _fetchInterventionModels();
                    }

                    // fetch maskings
                    if (vm.isInterventional && vm.maskings.length === 0) {
                        _fetchMaskings();
                    }

                    if (vm.isInterventional && vm.allocations.length === 0) {
                        _fetchAllocations();
                    }

                    if (vm.isInterventional && vm.studyClassifications.length == 0) {
                        _fetchStudyClassifications()
                    }

                    vm.curSpecificFieldsPartial = vm.isInterventional ? INTERVENTIONAL_FIELDS : '';
                    vm.curSpecificFieldsPartial = vm.isExpandedAccess ? EXPANDEDACCESS_FIELDS : '';
                    vm.curSpecificFieldsPartial = vm.isObservational ? OBSERVATIONAL_FIELDS : '';
                    vm.curSpecificFieldsPartial = vm.isAncillary ? ANCILLARY_FIELDS : '';
                });
        } // _watchResearchCategory

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposes, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // console.info('isOtherPrimaryPurpose: ', vm.isOtherPrimaryPurpose);
                }
            });
        } // _watchPrimaryPurpose

        function _watchSecondaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.secondary_purpose_id;},
                function(newVal, oldVal) {
                    if (newVal !== undefined && newVal !== null) {
                        var curSecondaryPurposeObj = _.findWhere(vm.secondaryPurposes, {id: newVal});
                        console.info('curSecondaryPurposeObj: ', curSecondaryPurposeObj);
                        vm.isOtherSecondaryPurpose = curSecondaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    }
                });
        }

        /**
         * Fetch intervention models
         * @return {[type]} [description]
         */
        function _fetchInterventionModels() {
            PATrialService.getInterventionModels().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.interventionModels = res.models.sort() || [];
                    console.info('models: ', vm.interventionModels);
                }
            });
        }

        function _fetchMaskings() {
            PATrialService.getMaskings().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.maskings = res.maskings.sort() || [];
                    console.info(vm.maskings);
                }
            });
        } // _fetchMaskings

        function _fetchAllocations() {
            PATrialService.getAllocations().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.allocations = res.allocations || [];
                    vm.allocations.sort();
                }
            })
        }

        function _fetchStudyClassifications() {
            PATrialService.getStudyClassifications().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.studyClassifications = res.data || [];
                    vm.studyClassifications.sort();
                }
            })
        }

        function _watchMasking() {
            $scope.$watch(function() {return vm.trialDetailObj.masking_id;}, function(newVal) {
                var curMasking = _.findWhere(vm.maskings, {id: newVal});
                var maskingName = !!curMasking ? curMasking.name : '';
                vm.trialDetailObj.showMaskingRoles = maskingName.toLowerCase().indexOf('blind') > -1;
            })
        }



    } //pasTrialDesignCtrl

})();
