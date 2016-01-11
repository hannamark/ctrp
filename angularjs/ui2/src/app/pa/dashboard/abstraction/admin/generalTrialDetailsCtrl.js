/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('generalTrialDetailsCtrl', generalTrialDetailsCtrl);

    generalTrialDetailsCtrl.$inject = ['$scope', 'TrialService', 'PATrialService',
            'MESSAGES', 'protocolIdOriginObj', '_', '$timeout'];

    function generalTrialDetailsCtrl($scope, TrialService, PATrialService,
        MESSAGES, protocolIdOriginObj, _, $timeout) {
      var vm = this;
      var _defaultCountry = 'United States'; // for phone number validation
      vm.generalTrialDetailsObj = {};
      vm.saveGeneralTrialDetails = saveGeneralTrialDetails;
      vm.resetGeneralTrialDetails = resetGeneralTrialDetails;
      vm.addOtherIdentifier = addOtherIdentifier;
      vm.deleteOtherIdentifier = deleteOtherIdentifier;
      vm.updateOtherId = updateOtherId;
      vm.isValidPhoneNumber = isValidPhoneNumber;
      vm.leadOrg = []; // TODO: insert it into the trial detail object
      vm.principalInvestigator = []; // TODO:
      vm.sponsors = []; // TODO:
      vm.centralContact = [];
      vm.centralContactType = '';
      // vm.centralContactTypes = [{id: 0, 'None'}, {id: 1, 'PI'}, {id: 2, 'Person'}, {id: 3, 'General'}];
      vm.otherIdentifier = {protocol_id_origin_id: '', protocol_id: ''};
      vm.protocolIdOriginArr = protocolIdOriginObj;

      activate();

      function activate() {
          getTrialDetailCopy();
          watchTrialDetailObj();
          watchLeadOrg();
          watchPISelection();
          watchCentralContactType();
          watchCentralContact();
          watchSponsor();
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
          var outerTrial = {};
          vm.generalTrialDetailsObj.central_contact = vm.centralContact[0]; // new field
          vm.generalTrialDetailsObj.other_ids_attributes = vm.generalTrialDetailsObj.other_ids; // for updating the attributes in Rails

          outerTrial.new = false;
          outerTrial.id = vm.generalTrialDetailsObj.id;
          outerTrial.trial = vm.generalTrialDetailsObj;

          TrialService.upsertTrial(outerTrial).then(function(res) {
              console.log('central_contact: ', vm.generalTrialDetailsObj.central_contact);
              console.log('updated general trial details: ', res);
              vm.generalTrialDetailsObj.lock_version = res.lock_version;
              // update the general trial details obj with server response
              /*
              Object.keys(res).forEach(function(key) {
                 if (!vm.generalTrialDetailsObj.hasOwnProperty(key)) {
                     vm.generalTrialDetailsObj[key] = res[key];
                 }
              });
              */
              PATrialService.setCurrentTrial(vm.generalTrialDetailsObj); // update to cache
              $scope.$emit('updatedInChildScope', {});
          });
      }

      function resetGeneralTrialDetails() {
          vm.leadOrg = [];
          vm.principalInvestigator = [];
          vm.sponsors = [];
          vm.centralContact = [];
          vm.centralContactType = '';
          $timeout(function() {
             getTrialDetailCopy();
          }, 0);
          // vm.generalTrialDetailsObj = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
      }

      /**
       * get a data clone of the trial detail object from Local Cache
       * @return {Void}
       */
      function getTrialDetailCopy() {
          $timeout(function() {
              vm.generalTrialDetailsObj = PATrialService.getCurrentTrialFromCache();
              // console.log('general trialDetailObj: ', vm.generalTrialDetailsObj);
              vm.leadOrg[0] = vm.generalTrialDetailsObj.lead_org;
              vm.sponsors[0] = vm.generalTrialDetailsObj.sponsor;
              vm.principalInvestigator = [].concat(vm.generalTrialDetailsObj.pi);
              // transform the other_ids array
              vm.generalTrialDetailsObj.other_ids = _.map(vm.generalTrialDetailsObj.other_ids, function(id, idx) {
                  var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {id: id.protocol_id_origin_id});
                  id.identifierName = otherIdentifierNameObj.name || '';
                  id._destroy = id._destroy || false; // default to false if not set
                  return id;
              });
              console.log('updated trial lock version: ', vm.generalTrialDetailsObj.lock_version);

          }, 0);
      } //getTrialDetailCopy


      /**
       * Add other identifier to the trial,
       * This function prevents adding duplicate other identifier
       *
       * @return {Void}
       */
      function addOtherIdentifier() {
          // parse to integer
          vm.otherIdentifier.protocol_id_origin_id = parseInt(vm.otherIdentifier.protocol_id_origin_id);
          // boolean
          var condition = {'protocol_id_origin_id': vm.otherIdentifier.protocol_id_origin_id, '_destroy': undefined || false};
          var otherIdExists = _.findIndex(vm.generalTrialDetailsObj.other_ids, condition) > -1;
          if (otherIdExists) {
              // if the identifier exists, return
              return;
          }
          var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {'id': vm.otherIdentifier.protocol_id_origin_id});
          vm.otherIdentifier.id = vm.generalTrialDetailsObj.id; // trial Id
          vm.otherIdentifier.trialId = vm.generalTrialDetailsObj.id;
          vm.otherIdentifier.identifierName = otherIdentifierNameObj.name;
          vm.otherIdentifier._destroy = false;

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

      function updateOtherId(protocolIdVal, index) {
          if (index < vm.generalTrialDetailsObj.other_ids.length) {
              vm.generalTrialDetailsObj.other_ids[index].protocol_id = protocolIdVal;
          }
      }

      function watchLeadOrg() {
          $scope.$watchCollection(function() {return vm.leadOrg;}, function(newVal, oldVal) {
             if (angular.isArray(newVal) && newVal.length > 0) {
                 // console.log('new lead org: ', newVal[0]);
                 vm.generalTrialDetailsObj.lead_org = newVal[0];
             }
          });
      }

      function watchPISelection() {
        $scope.$watchCollection(function() {return vm.principalInvestigator;}, function(newVal, oldVal) {
            console.log('new PI: ', newVal);
          if (angular.isArray(newVal) && newVal.length > 0 && !newVal[0].fullName) {
              var firstName = newVal[0].fname || '';
              var middleName = newVal[0].mname || '';
              var lastName = newVal[0].lname || '';
              vm.principalInvestigator[0].fullName = firstName + ' ' + middleName + ' ' + lastName;
              vm.generalTrialDetailsObj.pi = vm.principalInvestigator[0];
          }
        });
      }

      function watchSponsor() {
          $scope.$watchCollection(function() {return vm.sponsors;}, function(newVal, oldVal) {
             if (angular.isArray(newVal) && newVal.length > 0) {
                 vm.generalTrialDetailsObj.sponsor = newVal[0];
             }
          });
      }

      function watchCentralContact() {
        $scope.$watchCollection(function() {return vm.centralContact;}, function(newVal, oldVal) {
          if (angular.isArray(newVal) && newVal.length > 0 && !newVal[0].fullName) {
              var firstName = newVal[0].fname || '';
              var middleName = newVal[0].mname || '';
              var lastName = newVal[0].lname || '';
              vm.centralContact[0].fullName = firstName + ' ' + middleName + ' ' + lastName;

          }
          // new field in trial detial object
          // vm.generalTrialDetailsObj.central_contact = vm.centralContact[0];
        });
      }

      function watchCentralContactType() {
        $scope.$watch(function() { return vm.centralContactType;}, function(newVal, oldVal) {
          if (newVal === 'PI') {
            _usePIAsCentralContact();
          } else {
            // re-initialize the array of centralContact
            vm.centralContact = [].concat({});
          }
        });
      }

      function isValidPhoneNumber() {
          vm.isPhoneValid = isValidNumberPO(vm.centralContact[0].phone, _defaultCountry);
      }

      /**
      * Use the Trial's PI as the central contact      *
      */
      function _usePIAsCentralContact() {
        vm.centralContact = [].concat(angular.copy(vm.principalInvestigator));
        var regex = new RegExp('-', 'g');
        vm.centralContact[0].phone = vm.centralContact[0].phone.replace(regex, '');
        vm.isPhoneValid = true;


      }

    } //generalTrialDetailCtrl

})();
