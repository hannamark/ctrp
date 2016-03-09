(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDesignCtrl', pasTrialDesignCtrl);

    pasTrialDesignCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'groupedTrialDesignData', 'Common', 'maskings'];

    function pasTrialDesignCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, groupedTrialDesignData, Common, maskings) {
        var vm = this;
        console.info('groupedTrialDesignData: ', groupedTrialDesignData);
        vm.trialDetailObj = {};
        vm.trialPhases = [];
        vm.researchCategories = [];
        vm.primaryPurposes = [];
        vm.secondaryPurposes = [];
        vm.interventionModels = [];
        vm.studyModels = [];
        vm.maskings = maskings.maskings.sort(Common.a2zComparator());
        vm.allocations = [];
        vm.studyClassifications = [];
        vm.timePerspectives = [];
        vm.biospecimenRetentions = [];
        vm.isOtherPrimaryPurpose = false;
        vm.isOtherSecondaryPurpose = false;
        vm.isOtherStudyModel = false;
        // vm.showMaskingRoles = false;
        vm.isOtherTimePerspective = false;
        // information sources:
        vm.isInfoSourceProtocol = false;
        vm.isInfoSourceImport = false;

        // actions:
        vm.updateTrialDesign = updateTrialDesign;
        vm.resetForm = resetForm;

        activate();
        function activate() {
            _unpackPromisedData();
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _watchSecondaryPurpose();
            _watchResearchCategory();
            _watchStudyModel();
            _watchTimePerspective();
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
                var infoSourceName = vm.trialDetailObj.internal_source.name.toLowerCase();
                vm.isInfoSourceProtocol = infoSourceName.indexOf('protocol') > -1;
                vm.isInfoSourceImport = vm.isInfoSourceProtocol && infoSourceName.indexOf('reg') === -1; // not from registry AND not protocol
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

                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.allocations.length === 0) {
                        _fetchAllocations();
                    }

                    if ((vm.isInterventional || vm.isExpandedAccess) && vm.studyClassifications.length === 0) {
                        _fetchStudyClassifications()
                    }

                    if ((vm.isObservational || vm.isAncillary) && vm.studyModels.length === 0) {
                        _fetchStudyModels();
                    }

                    if ((vm.isObservational || vm.isAncillary) && vm.timePerspectives.length === 0) {
                        _getTimePerspectives();
                    }

                    if ((vm.isObservational || vm.isAncillary) && vm.biospecimenRetentions.length === 0) {
                        _fetchBiospecimenRetention()
                    }

                });
        } // _watchResearchCategory

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposes, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // reset to original data or empty
                    vm.trialDetailObj.primary_purpose_other = _resetValueForField('primary_purpose_other');
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
                        // reset to original data or empty
                        vm.trialDetailObj.secondary_purpose_other = _resetValueForField('secondary_purpose_other');
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
                        // reset to original data or empty
                        vm.trialDetailObj.study_model_other = _resetValueForField('study_model_other');
                    }
                });
        }

        function _watchTimePerspective() {
            $scope.$watch(function() {return vm.trialDetailObj.time_perspective_id;},
                function(newVal, oldVal) {
                    if (newVal !== undefined && newVal !== null) {
                        var curTimePerspective = _.findWhere(vm.timePerspectives, {id: newVal});
                        vm.isOtherTimePerspective = curTimePerspective.name.toLowerCase().indexOf('other') > -1;
                        // reset to original data or empty
                        vm.trialDetailObj.time_perspective_other = _resetValueForField('time_perspective_other');
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
                }
            });
        }

        function _fetchAllocations() {
            PATrialService.getAllocations().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.allocations = res.allocations || [];
                    vm.allocations.sort(Common.a2zComparator());
                }
            });
        }

        function _fetchStudyClassifications() {
            PATrialService.getStudyClassifications().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.studyClassifications = res.data || [];
                    vm.studyClassifications.sort(Common.a2zComparator());
                }
            });
        }

        function _fetchStudyModels() {
            PATrialService.getStudyModels().then(function(res) {
                vm.studyModels = res.data || [];
                vm.studyModels.sort(Common.a2zComparator());
            });
        }

        function _fetchBiospecimenRetention() {
            PATrialService.getBiospecimenRetentions().then(function(res) {
                vm.biospecimenRetentions = res.data.sort(Common.a2zComparator()) || [];
            });
        }

        function _watchMasking() {
            $scope.$watch(function() {return vm.trialDetailObj.masking_id;}, function(newVal) {
                var curMasking = _.findWhere(vm.maskings, {id: newVal});
                var maskingName = !!curMasking ? curMasking.name : '';
                console.info('maskingName: ', maskingName, newVal);
                vm.showMaskingRoles = maskingName.toLowerCase().indexOf('blind') > -1;
                console.info('show roles? ', vm.showMaskingRoles);
            });
        }

        /**
         * Get the value for the fieldName in the cached trial object
         * @param  {[type]} fieldName [description]
         * @return {String}  a String value that could be a blank String
         */
        function _resetValueForField(fieldName) {
            var cachedTrial = PATrialService.getCurrentTrialFromCache();
            var val = cachedTrial[fieldName] || '';
            return val;
        }

        function _getTimePerspectives() {
            PATrialService.getTimePerspectives().then(function(res) {
                vm.timePerspectives = res.data || [];
                vm.timePerspectives.sort(Common.a2zComparator());
                console.info('time perspectives: ', res);
            });
        }

        function updateTrialDesign() {
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailObj.id;
            outerTrial.trial = vm.trialDetailObj;
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            PATrialService.upsertTrial(outerTrial).then(function(res) {

                if (res.server_response.status === 200) {
                    vm.trialDetailObj = res;
                    vm.trialDetailObj.lock_version = res.lock_version;
                    // delete vm.trialDetailObj.admin_checkout;
                    // delete vm.trialDetailObj.scientific_checkout;
                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Trial design has been updated', 'Successful!', {
                        extendedTimeOut: 1000,
                        timeOut: 0
                    });
                    _getTrialDetailCopy();
                }

            }).catch(function(err) {
                console.error('error in updating trial design: ', err);
            });
        }

        function resetForm() {
            _getTrialDetailCopy();
        }

    } //pasTrialDesignCtrl

})();
