
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
        vm.addedGrants = [];
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

        $scope.refreshGrants = function(serial_number) {

            if (vm.funding_mechanism && vm.institute_code) {
                var queryObj = {
                    funding_mechanism: vm.funding_mechanism,
                    institute_code: vm.institute_code,
                    serial_number: serial_number
                };
                return TrialService.getGrantsSerialNumber(queryObj).then(function(res) {
                    var snums=[];
                    var uniquesnums= [];

                    snums= res.tempgrants.map(function (tempgrant) {
                        return tempgrant.serial_number;
                    });
                    uniquesnums = snums.filter(function (name) {
                        return uniquesnums.indexOf(name) === -1;
                    });

                    $scope.addresses = uniquesnums;
                    console.log($scope.addresses);

                });

            }
        }

        // Add grant to a temp array
        vm.addGrant = function () {
            if (vm.funding_mechanism && vm.institute_code && vm.serial_number && vm.nci) {
                var newGrant = {};
                newGrant.funding_mechanism = vm.funding_mechanism;
                newGrant.institute_code = vm.institute_code;
                newGrant.serial_number = vm.serial_number;
                newGrant.nci = vm.nci;
                newGrant._destroy = false;
                vm.addedGrants.push(newGrant);
                vm.grantNum++;
                vm.funding_mechanism = null;
                vm.institute_code = null;
                vm.serial_number = null;
                vm.nci = null;
                vm.showAddGrantError = false;
                $scope.addresses=null;
            } else {
                vm.showAddGrantError = true;
            }
        };

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
