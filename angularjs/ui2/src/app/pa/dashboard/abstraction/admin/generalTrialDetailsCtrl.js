/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('generalTrialDetailsCtrl', generalTrialDetailsCtrl);

    generalTrialDetailsCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES'];

    function generalTrialDetailsCtrl($scope, TrialService, MESSAGES) {
      var vm = this;
      vm.generalTrialDetailsObj = {};
      vm.saveGeneralTrialDetails = saveGeneralTrialDetails;
      vm.resetGeneralTrialDetails = resetGeneralTrialDetails;

      activate();

      function activate() {

      }

      /**
       * Get trial detail object from parent scope
       */
      function getTrialDetailObj() {
          $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
              //get the processing info from parent scope
              // TODO:
              vm.generalTrialDetailsObj = {

              };
              // vm.trialProcessingObj = {
              //     trialId: $scope.$parent.paTrialOverview.trialDetailObj.id,
              //     priority: $scope.$parent.paTrialOverview.trialDetailObj.process_priority || '2 - Normal',
              //     comment: $scope.$parent.paTrialOverview.trialDetailObj.process_comment
              // };
          });
      } //getTrialDetailObj


      /* implementations below */
      function saveGeneralTrialDetails() {

          var updatedTrial = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
          // TODO:
          //updatedTrial.process_priority = vm.trialProcessingObj.priority;
          // updatedTrial.process_comment = vm.trialProcessingObj.comment;

          TrialService.upsertTrial(updatedTrial).then(function(res) {
              console.log('priority and commented updated: ', res);
          });
      }

      function resetGeneralTrialDetails() {
          vm.generalTrialDetailsObj = {};
      }


    } //generalTrialDetailCtrl

})();
