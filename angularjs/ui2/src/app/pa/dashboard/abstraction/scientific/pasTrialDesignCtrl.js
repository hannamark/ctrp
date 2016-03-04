(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDesignCtrl', pasTrialDesignCtrl);

    pasTrialDesignCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'groupedTrialDesignData'];

    function pasTrialDesignCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, groupedTrialDesignData) {
        var vm = this;
        console.info('groupedTrialDesignData: ', groupedTrialDesignData);
        vm.trialDetailObj = {};
        vm.trialPhases = [];
        vm.researchCategories = [];
        vm.primaryPurposes = [];
        vm.secondaryPurposes = [];
        vm.isOtherPrimaryPurpose = false;

        activate();
        function activate() {
            _unpackPromisedData();
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
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
                var researchCategoryTitle = !!vm.trialDetailObj.research_category ? vm.trialDetailObj.research_category.name.toLowerCase() : '';
                vm.isExpandedAccess = researchCategoryTitle.indexOf('expand') > -1;
                vm.isInterventional = researchCategoryTitle.indexOf('intervention') > -1;
                vm.isObservational = researchCategoryTitle.indexOf('observation') > -1;
                vm.isAncillary = researchCategoryTitle.indexOf('ancillary') > -1;
            }, 0);
        } // _getTrialDetailCopy

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {

                if (!!newVal) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposes, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    console.info('isOtherPrimaryPurpose: ', vm.isOtherPrimaryPurpose);
                }
            })
        }

    } //pasTrialDesignCtrl

})();
