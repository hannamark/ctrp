/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('generalTrialDetailsCtrl', generalTrialDetailsCtrl);

    generalTrialDetailsCtrl.$inject = ['$scope', 'TrialService', 'MESSAGES',
            'protocolIdOriginObj', '_'];

    function generalTrialDetailsCtrl($scope, TrialService, MESSAGES,
        protocolIdOriginObj, _) {
      var vm = this;
      vm.generalTrialDetailsObj = {};
      vm.saveGeneralTrialDetails = saveGeneralTrialDetails;
      vm.resetGeneralTrialDetails = resetGeneralTrialDetails;
      vm.leadOrg = [];
      vm.protocolIdOriginArr = protocolIdOriginObj;

      console.log('protocolIdOriginArr: ', vm.protocolIdOriginArr);

      activate();

      function activate() {
          getTrialDetailCopy();
          watchTrialDetailObj();
      }

      /**
       * Get trial detail object from parent scope
       */
      function watchTrialDetailObj() {
          $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
              getTrialDetailCopy();
          });
      } //watchTrialDetailObj

      /* implementations below */
      function saveGeneralTrialDetails() {

          TrialService.upsertTrial(vm.generalTrialDetailCtrl).then(function(res) {
              console.log('updated general trial details');
          });
      }

      function resetGeneralTrialDetails() {
          vm.generalTrialDetailsObj = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
      }

      /**
       * get a data clone of the trial detail object from parent scope
       * @return {[type]} [description]
       */
      function getTrialDetailCopy() {
          vm.generalTrialDetailsObj = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
          vm.leadOrg[0] = vm.generalTrialDetailsObj.lead_org;
          // transform the other_ids array
          vm.generalTrialDetailsObj.other_ids = _.map(vm.generalTrialDetailsObj.other_ids, function(id, idx) {
              //append the identifier name to this 'other_identifier'
              var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {id: id.protocol_id_origin_id});
              id.identifierName = otherIdentifierNameObj.name;
              return id;
          });
          console.log('new other_ids: ', vm.generalTrialDetailsObj.other_ids);
      }


    } //generalTrialDetailCtrl

})();
