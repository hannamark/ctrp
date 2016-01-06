/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('generalTrialDetailsCtrl', generalTrialDetailsCtrl);

    generalTrialDetailsCtrl.$inject = ['$scope', 'TrialService', 'PATrialService',
            'MESSAGES', 'protocolIdOriginObj', '_'];

    function generalTrialDetailsCtrl($scope, TrialService, PATrialService,
        MESSAGES, protocolIdOriginObj, _) {
      var vm = this;
      vm.generalTrialDetailsObj = {};
      vm.saveGeneralTrialDetails = saveGeneralTrialDetails;
      vm.resetGeneralTrialDetails = resetGeneralTrialDetails;
      vm.addOtherIdentifier = addOtherIdentifier;
      vm.deleteOtherIdentifier = deleteOtherIdentifier;
      vm.leadOrg = [];
      vm.otherIdentifier = {protocol_id_origin_id: '', protocol_id: ''};
      vm.protocolIdOriginArr = protocolIdOriginObj;

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
          vm.generalTrialDetailsObj.other_ids_attributes = vm.generalTrialDetailsObj.other_ids; // for updating the attributes in Rails
          TrialService.upsertTrial(vm.generalTrialDetailCtrl).then(function(res) {
              console.log('updated general trial details');
          });
      }

      function resetGeneralTrialDetails() {
          getTrialDetailCopy();
          // vm.generalTrialDetailsObj = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
      }

      /**
       * get a data clone of the trial detail object from Local Cache
       * @return {[type]} [description]
       */
      function getTrialDetailCopy() {
          vm.generalTrialDetailsObj = PATrialService.getCurrentTrialFromCache(); // angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
          vm.leadOrg[0] = vm.generalTrialDetailsObj.lead_org;
          // transform the other_ids array
          vm.generalTrialDetailsObj.other_ids = _.map(vm.generalTrialDetailsObj.other_ids, function(id, idx) {
              //append the identifier name to this 'other_identifier'
              var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {id: id.protocol_id_origin_id});
              id.identifierName = otherIdentifierNameObj.name;
              return id;
          });
      } //getTrialDetailCopy


      /**
       * Add other identifier to the trial,
       * This function prevents adding duplicate other identifier
       */
      function addOtherIdentifier() {
          // parse to integer
          vm.otherIdentifier.protocol_id_origin_id = parseInt(vm.otherIdentifier.protocol_id_origin_id);
          // boolean
          var otherIdExists = _.findIndex(vm.generalTrialDetailsObj.other_ids, {'protocol_id_origin_id': vm.otherIdentifier.protocol_id_origin_id}) > -1;
          if (otherIdExists) {
              // if the identifier exists, return
              return;
          }
          var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {'id': vm.otherIdentifier.protocol_id_origin_id});
          vm.otherIdentifier.id = vm.generalTrialDetailsObj.id; // trial Id
          vm.otherIdentifier.trialId = vm.generalTrialDetailsObj.id;
          vm.otherIdentifier.identifierName = otherIdentifierNameObj.name;

          vm.generalTrialDetailsObj.other_ids.unshift(angular.copy(vm.otherIdentifier));
          //clean up
          vm.otherIdentifier.protocol_id = ''; // empty it
          vm.otherIdentifier.identifierName = '';
      } // addOtherIdentifier


      /**
       * Toggle the identifier for destroy or restore for the
       * specified identifier with index 'idx'
       * @param  {Int} idx [Index for the other identifier in other_ids array]
       * @return {Void}
       */
      function deleteOtherIdentifier(idx) {
          if (idx < vm.generalTrialDetailsObj.other_ids.length) {
              vm.generalTrialDetailsObj.other_ids[idx]._destroy = !vm.generalTrialDetailsObj.other_ids[idx]._destroy;
          }
      }

    } //generalTrialDetailCtrl

})();
