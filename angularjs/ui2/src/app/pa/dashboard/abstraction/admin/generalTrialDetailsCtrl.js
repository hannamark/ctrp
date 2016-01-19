/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('generalTrialDetailsCtrl', generalTrialDetailsCtrl);

    generalTrialDetailsCtrl.$inject = ['$scope', 'TrialService', 'PATrialService',
            'MESSAGES', 'protocolIdOriginObj', '_', '$timeout', 'centralContactTypes'];

    function generalTrialDetailsCtrl($scope, TrialService, PATrialService,
        MESSAGES, protocolIdOriginObj, _, $timeout, centralContactTypes) {
      var vm = this;
      var _defaultCountry = 'United States'; // for phone number validation
      var _curCentralContactId = ''; // for comparing with the new central contact id
      vm.generalTrialDetailsObj = {};
      vm.saveGeneralTrialDetails = saveGeneralTrialDetails;
      vm.resetGeneralTrialDetails = resetGeneralTrialDetails;
      vm.addOtherIdentifier = addOtherIdentifier;
      vm.deleteOtherIdentifier = deleteOtherIdentifier;
      vm.updateOtherId = updateOtherId;
      vm.isValidPhoneNumber = isValidPhoneNumber;
      vm.addAltTitle = addAltTitle;
      vm.updateAlternateTitle = updateAlternateTitle;
      vm.updateLeadProtocolId = updateLeadProtocolId;
      vm.deleteAltTitle = deleteAltTitle;
      vm.leadOrg = [];
      vm.principalInvestigator = [];
      vm.sponsors = [];
      vm.leadProtocolId = '';

      // TODO: the categories and sources come from app settings
      vm.altTitleCategories = [{id: 1, title: 'Spelling/Format'}, {id: 2, title: 'Other'}];
      vm.altTitleSources = [{id: 1, title: 'Protocol'}, {id: 2, title: 'Complete Sheet'},
                            {id: 3, title: 'IRB'}, {id: 4, title: 'Other'}];

      vm.curAlternateTitleObj = {category: '', source: '', title: '', _destroy: false};
      vm.centralContactType = ''; // from the first central contact type id
      vm.otherIdentifier = {protocol_id_origin_id: '', protocol_id: ''};
      vm.protocolIdOriginArr = protocolIdOriginObj;
      vm.centralContactTypes = centralContactTypes.types;

      console.log('protocolIdOriginArr: ', vm.protocolIdOriginArr);
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
          if (JSON.stringify(vm.generalTrialDetailsObj.central_contacts[0]) !== '{}') {
              vm.generalTrialDetailsObj.central_contacts_attributes = vm.generalTrialDetailsObj.central_contacts; // new field
          }
          // reset the central_contact_id if changed
          if (_curCentralContactId != vm.generalTrialDetailsObj.central_contacts[0].id) {
              vm.generalTrialDetailsObj.central_contacts[0].id = _curCentralContactId;
          }

          vm.generalTrialDetailsObj.other_ids_attributes = vm.generalTrialDetailsObj.other_ids; // for updating the attributes in Rails
          vm.generalTrialDetailsObj.alternate_titles_attributes = vm.generalTrialDetailsObj.alternate_titles;
          vm.generalTrialDetailsObj.central_contacts_attributes = vm.generalTrialDetailsObj.central_contacts;

          outerTrial.new = false;
          outerTrial.id = vm.generalTrialDetailsObj.id;
          outerTrial.trial = vm.generalTrialDetailsObj;

          TrialService.upsertTrial(outerTrial).then(function(res) {
              console.log('central_contact: ', vm.generalTrialDetailsObj.central_contact);
              console.log('updated general trial details: ', res);
              // vm.generalTrialDetailsObj.lock_version = res.lock_version;

              PATrialService.setCurrentTrial(vm.generalTrialDetailsObj); // update to cache
              $scope.$emit('updatedInChildScope', {});

              getTrialDetailCopy();
          });
      }

      function resetGeneralTrialDetails() {
          vm.leadOrg = [];
          vm.principalInvestigator = [];
          vm.sponsors = [];
         // vm.centralContact = [];
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
              vm.leadOrg[0] = vm.generalTrialDetailsObj.lead_org;
              vm.sponsors[0] = vm.generalTrialDetailsObj.sponsor;
              vm.principalInvestigator = [].concat(vm.generalTrialDetailsObj.pi);
              vm.leadProtocolId = vm.generalTrialDetailsObj.lead_protocol_id;

              if (vm.generalTrialDetailsObj.central_contacts.length > 0) {
                  _curCentralContactId = vm.generalTrialDetailsObj.central_contacts[0].id || '';
                  var _centralContactTypeId = vm.generalTrialDetailsObj.central_contacts[0].central_contact_type_id;
                  vm.centralContactType = (_.findWhere(vm.centralContactTypes, {id: _centralContactTypeId})).name || 'None';
              }
              console.log('vm.generalTrialDetailsObj.alternate_titles: ', vm.generalTrialDetailsObj.alternate_titles);

              // transform the other_ids array
              vm.generalTrialDetailsObj.other_ids = _.map(vm.generalTrialDetailsObj.other_ids, function(id, idx) {
                  var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {id: id.protocol_id_origin_id});
                  id.identifierName = otherIdentifierNameObj.name || '';
                  id._destroy = id._destroy || false; // default to false if not set
                  return id;
              });

          }, 1);
      } //getTrialDetailCopy


      /**
       * Add other identifier to the trial,
       * This function prevents adding duplicate other identifier
       *
       * @return {Void}
       */
      function addOtherIdentifier() {
          vm.otherIdErrorMsg = '';

          // parse to integer
          vm.otherIdentifier.protocol_id_origin_id = parseInt(vm.otherIdentifier.protocol_id_origin_id);
          // boolean
          var condition = {'protocol_id_origin_id': vm.otherIdentifier.protocol_id_origin_id};
          var otherIdExists = _.findIndex(vm.generalTrialDetailsObj.other_ids, condition) > -1;
          if (otherIdExists) {
              // if the identifier exists, return
              vm.otherIdErrorMsg = 'Identifier already exists';
              return;
          }
          
          var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {'id': vm.otherIdentifier.protocol_id_origin_id});
          // vm.otherIdentifier.id = vm.generalTrialDetailsObj.id; // trial Id
          vm.otherIdentifier.trial_id = vm.generalTrialDetailsObj.id;
          vm.otherIdentifier.identifierName = otherIdentifierNameObj.name;
          vm.otherIdentifier._destroy = false;
          if (otherIdentifierNameObj.code === 'NCT' ||
                otherIdentifierNameObj.code === 'ONCT') {
              // force to upper case
              vm.otherIdentifier.protocol_id = vm.otherIdentifier.protocol_id.toUpperCase();
          }
          // validation on other identifier
          var errorMsg = TrialService.checkOtherId(vm.otherIdentifier.protocol_id_origin_id,
                otherIdentifierNameObj.code, vm.otherIdentifier.protocol_id,
                vm.generalTrialDetailsObj.other_ids);

          if (!errorMsg) {
              vm.generalTrialDetailsObj.other_ids.unshift(angular.copy(vm.otherIdentifier));
              // clean up
              vm.otherIdentifier.protocol_id = ''; // empty it
              vm.otherIdentifier.identifierName = '';
              vm.otherIdErrorMsg = '';
          } else {
              vm.otherIdErrorMsg = errorMsg;
          }

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
                 vm.generalTrialDetailsObj.lead_org_id = newVal[0].id; // update lead organization
             }
          });
      }

      function watchPISelection() {
        $scope.$watchCollection(function() {return vm.principalInvestigator;}, function(newVal, oldVal) {
          if (angular.isArray(newVal) && newVal.length > 0 && !newVal[0].fullName) {
              var firstName = newVal[0].fname || '';
              var middleName = newVal[0].mname || '';
              var lastName = newVal[0].lname || '';
              vm.principalInvestigator[0].fullName = firstName + ' ' + middleName + ' ' + lastName;
              vm.generalTrialDetailsObj.pi = vm.principalInvestigator[0];
              vm.generalTrialDetailsObj.pi_id = vm.principalInvestigator[0].id; // update PI
          }
        });
      }

      function watchSponsor() {
          $scope.$watchCollection(function() {return vm.sponsors;}, function(newVal, oldVal) {
             if (angular.isArray(newVal) && newVal.length > 0) {
                 vm.generalTrialDetailsObj.sponsor = newVal[0];
                 vm.generalTrialDetailsObj.sponsor_id = newVal[0].id; // update sponsor
             }
          });
      }

      function watchCentralContact() {
        $scope.$watchCollection(function() {return vm.generalTrialDetailsObj.central_contacts;}, function(newVal, oldVal) {
          if (angular.isArray(newVal) && newVal.length > 0 && !newVal[0].fullName) {
              vm.generalTrialDetailsObj.central_contacts[0] = newVal[0];
              var firstName = newVal[0].fname || '';
              var middleName = newVal[0].mname || '';
              var lastName = newVal[0].lname || '';
              vm.generalTrialDetailsObj.central_contacts[0].fullName = firstName + ' ' + middleName + ' ' + lastName;
              vm.generalTrialDetailsObj.central_contacts[0].person_id = newVal[0].id;
          }
        });
      }

      function watchCentralContactType() {
        $scope.$watch(function() { return vm.centralContactType;}, function(newVal, oldVal) {

          if (newVal === 'PI') {
                _usePIAsCentralContact();
            } else if (newVal === 'None' && !!vm.generalTrialDetailsObj.central_contacts &&
                    vm.generalTrialDetailsObj.central_contacts.length > 0) {

                vm.generalTrialDetailsObj.central_contacts[0]._destroy = true; //
            } else {
                vm.generalTrialDetailsObj.central_contacts = [].concat({});
            }
              var typeObject = _.findWhere(vm.centralContactTypes, {"name": newVal});
              vm.generalTrialDetailsObj.central_contacts[0].central_contact_type_id = !!typeObject ? typeObject.id : '';
              // console.log('contact type id: ', vm.generalTrialDetailsObj.central_contacts[0].central_contact_type_id);
          });
      }

      function isValidPhoneNumber() {
          vm.isPhoneValid = isValidNumberPO(vm.generalTrialDetailsObj.central_contacts[0].phone, _defaultCountry);
      }

      /**
      * Use the Trial's PI as the central contact      *
      */
      function _usePIAsCentralContact() {
        vm.generalTrialDetailsObj.central_contacts = [].concat(angular.copy(vm.principalInvestigator));
        vm.generalTrialDetailsObj.central_contacts[0]._destroy = false;
        var regex = new RegExp('-', 'g');
        vm.generalTrialDetailsObj.central_contacts[0].phone = vm.generalTrialDetailsObj.central_contacts[0].phone.replace(regex, '');
        vm.isPhoneValid = true;
      }


      /**
       * Add alternative titles
       * Return {Void}
       */
      function addAltTitle() {
          var _clonedAltTitle = {
              title: vm.curAlternateTitleObj.title,
              source: vm.curAlternateTitleObj.source.title,
              category: vm.curAlternateTitleObj.category.title,
              _destroy: false
          };
          vm.curAlternateTitleObj.title = ''; // clear up
          vm.generalTrialDetailsObj.alternate_titles.unshift(_clonedAltTitle);
      }

      /**
       * Update alternative title in the array at the position idx
       * @param  {String} newTitle [new alternative title]
       * @param  {Int} idx      [index of the title in the array]
       * @return {Void}
       */
      function updateAlternateTitle(newTitle, idx) {
          if (idx < vm.generalTrialDetailsObj.alternate_titles.length) {
              vm.generalTrialDetailsObj.alternate_titles[idx].title = newTitle;
          }
      }

      /**
       * Delete alternative title at position idx in the array
       * @param  {Int} idx      [index of the title in the array]
       * @return {Void}
       */
      function deleteAltTitle(idx) {
          if (idx < vm.generalTrialDetailsObj.alternate_titles.length) {
              vm.generalTrialDetailsObj.alternate_titles[idx]._destroy = !vm.generalTrialDetailsObj.alternate_titles[idx]._destroy;
          }
      }

      function updateLeadProtocolId() {
          if (!vm.leadProtocolId) {
              vm.leadProtocolId = vm.generalTrialDetailsObj.lead_protocol_id;
          } else {
              vm.generalTrialDetailsObj.lead_protocol_id = vm.leadProtocolId.trim();
          }
      }

    } //generalTrialDetailCtrl

})();
