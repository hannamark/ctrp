
/**
 * Created by schintal, January 07, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialFundingCtrl', trialFundingCtrl);

    trialFundingCtrl.$inject = ['TrialService', '$scope', 'toastr', 'trialDetailObj', 'instituteCodeObj', 'fundingMechanismObj', 'nciObj']//, 'studySourceObj', 'nciDivObj', 'nciProgObj'];

    function trialFundingCtrl(TrialService, $scope, toastr, trialDetailObj, instituteCodeObj, fundingMechanismObj, nciObj){// studySourceObj, nciDivObj, nciProgObj) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.grantorArr = [];
        vm.fundingMechanismArr = fundingMechanismObj;
        vm.nihNciArr = [];
        vm.nciArr = nciObj;
        vm.instituteCodeArr = instituteCodeObj;
        vm.addedIndIdes = [];
        console.log('Trial ' + vm.holderTypeObj + ' has been recorded', 'Operation Successful!');

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

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

        }

        // Delete the associations
        vm.toggleSelection = function (index, type) {
        };// toggleSelection


        vm.watchOption = function(type) {
        };

        activate();

        /****************** implementations below ***************/
        function activate() {

        }


    } //trialRegIndCtrl

})();
