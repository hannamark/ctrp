
/**
 * Created by aasheer, February 10, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialReportSummaryCtrl', trialReportSummaryCtrl);

    trialReportSummaryCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
        '$timeout', '_', 'PATrialService', 'toastr', 'FileSaver','Blob','HOST','$window'];

    function trialReportSummaryCtrl($scope, TrialService, MESSAGES,
        $timeout, _, PATrialService, toastr, FileSaver, Blob,HOST,$window) {
        var vm = this;

        $scope.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download_tsr_in_rtf/';
        var trialId = $scope.$parent.paTrialOverview.trialDetailObj.id || vm.trialProcessingObj.trialId;


        vm.tsrCode = '<table class="table table-striped table-bordered"><thead><th colspan="2" class="text-center">Trial Summary Report</th></thead><tbody><tr><td colspan="2"><h5>Trial Identification</h5></td></tr><tr><td>Trial Category</td><td>Complete</td></tr><tr><td>Trial Type</td><td>Interventional</td></tr><tr><td>NCI Trial Identifier</td><td>NCI-2014-01810</td></tr><tr><td colspan="2">Other Trial Identifiers</td></tr><tr><td>Lead Organization Identifier</td><td>NRG-BR002</td></tr><tr><td>ClinicalTrials.gov Identifier</td><td>NCT02364557</td></tr><tr><td>DCP Identifier</td><td>No DAta Available</td></tr><tr><td>CTEP Identifier</td><td>NRG-BR002</td></tr><tr><td>CCER Identifier</td><td>No Data Available</td></tr></tbody></table>'

        vm.formatMap = {
            'rtf':  { mimetype: 'application/rtf', name: 'tsr.rtf'},
            'word': { mimetype: 'application/msword', name:'tsr.doc'},
            'html': { mimetype: 'text/html', name: 'tsr.html'}
        };

        vm.format = 'html';
        vm.formatType = vm.formatMap[vm.format].mimetype;
        vm.fileName = vm.formatMap[vm.format].name;

        vm.getFormatDownload = function() {
           if(vm.format == "rtf") {
               $window.location.href = $scope.downloadBaseUrl + trialId;
           } else  {
               var data = new Blob([vm.tsrCode], { type: vm.formatType });
               FileSaver.saveAs(data, vm.fileName);
           }
        };

        $scope.$watch(function() { return vm.format; }, function(newValue, oldValue) {
            vm.formatType = vm.formatMap[newValue].mimetype;
            vm.fileName = vm.formatMap[newValue].name;
            console.log(vm.formatType, vm.fileName);
        });
    } //trialReportSummaryCtrl
})();
