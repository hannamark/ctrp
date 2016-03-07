(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDesignCtrl', pasTrialDesignCtrl);

    pasTrialDesignCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'groupedTrialDesignData', 'Common'];

    function pasTrialDesignCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, groupedTrialDesignData, Common) {
        var vm = this;
        console.info('groupedTrialDesignData: ', groupedTrialDesignData);
        vm.trialDetailObj = {};
        vm.trialPhases = [];
        vm.researchCategories = [];
        vm.primaryPurposes = [];
        vm.secondaryPurposes = [];
        vm.interventionModels = [];
        vm.studyModels = [];
        vm.maskings = [];
        vm.allocations = [];
        vm.studyClassifications = [];
        vm.isOtherPrimaryPurpose = false;
        vm.isOtherSecondaryPurpose = false;
        vm.isOtherStudyModel = false;
        vm.trialDetailObj.showMaskingRoles = false;

        activate();
        function activate() {
            _unpackPromisedData();
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _watchSecondaryPurpose();
            _watchResearchCategory();
            _watchStudyModel();
            _watchMasking();
        }

        // break down the grouped promised data as arrays
        function _unpackPromisedData() {
            if (groupedTrialDesignData.length === 4) {
                vm.trialPhases = groupedTrialDesignData[0].sort(Common.a2zComparator());
                vm.researchCategories = groupedTrialDesignData[1].sort(Common.a2zComparator());
                vm.primaryPurposes = groupedTrialDesignData[2].sort(Common.a2zComparator());
                vm.secondaryPurposes = groupedTrialDesignData[3].sort(Common.a2zComparator());
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
                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.interventionModels.length === 0) {
                        _fetchInterventionModels();
                    }

                    // fetch maskings
                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.maskings.length === 0) {
                        _fetchMaskings();
                    }

                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.allocations.length === 0) {
                        _fetchAllocations();
                    }

                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.studyClassifications.length === 0) {
                        _fetchStudyClassifications()
                    }

                    if ((vm.isObservational || vm.isAncillary) && vm.studyModels.length === 0) {
                        _fetchStudyModels();
                    }
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

        function _watchStudyModel() {
            $scope.$watch(function() {return vm.trialDetailObj.study_model_id;},
                function(newVal, oldVal) {
                    if (newVal !== undefined && newVal !== null) {
                        var curStudyModel = _.findWhere(vm.studyModels, {id: newVal});
                        console.info('curStudyModel: ', curStudyModel);
                        vm.isOtherStudyModel = curStudyModel.name.toLowerCase().indexOf('other') > -1;
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
                    vm.interventionModels = res.models.sort(Common.a2zComparator()) || [];
                    console.info('models: ', vm.interventionModels);
                }
            });
        }

        function _fetchMaskings() {
            PATrialService.getMaskings().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.maskings = res.maskings.sort(Common.a2zComparator()) || [];
                    console.info(vm.maskings);
                }
            });
        } // _fetchMaskings

        function _fetchAllocations() {
            PATrialService.getAllocations().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.allocations = res.allocations || [];
                    vm.allocations.sort(Common.a2zComparator());
                }
            })
        }

        function _fetchStudyClassifications() {
            PATrialService.getStudyClassifications().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.studyClassifications = res.data || [];
                    vm.studyClassifications.sort(Common.a2zComparator());
                }
            })
        }

        function _fetchStudyModels() {
            PATrialService.getStudyModels().then(function(res) {
                vm.studyModels = res.data || [];
                vm.studyModels.sort(Common.a2zComparator());
            });
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
