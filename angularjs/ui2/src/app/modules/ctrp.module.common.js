/**
 * Created by wangg5 on 6/23/15.
 */

(function() {

    'use strict';

    angular.module('ctrp.module.common', [])
        .service('Common', Common);

    Common.$inject = ['$rootScope', '_', '$mdDialog'];

    function Common($rootScope, _, $mdDialog) {

        /**
         * A-Z Comparator for sorting an array of JSON objects
         * by the 'name' field in each JSON object
         *
         */
        this.a2zComparator = function() {
            var compare = function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            };

            return compare;
        }; //a2zComparator


        /**
         * Broastcast message to other components
         * @param message
         */
        this.broadcastMsg = function(message) {
            $rootScope.$broadcast(message, {});
        }; //broadcastMsg


        /**
         * Find the index of the given keyName and needleValue in the array of JSON
         * -1: not found
         * @param arrayOfJson
         * @param keyName
         * @param needleValue
         * @returns {number}
         */
        this.indexOfObjectInJsonArray = function(arrayOfJson, keyName, needleValue) {
            var queryObj = {};
            queryObj[keyName] = needleValue;
            return _.findIndex(arrayOfJson, queryObj);
        };

        this.alertConfirm = function(alertMessage) {
            var templateContent = '<md-dialog flex="35" aria-label="Confirm">' +
           '  <md-dialog-content>'+ alertMessage +
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="cancel()" class="md-primary">' +
           '      Cancel' +
           '    </md-button>' +
           '    <md-button ng-click="confirm()" class="md-primary">' +
           '      Confirm' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>';
           /*
           var confirm = $mdDialog.confirm()
                        .title('Please confirm')
                        .textContent(alertMessage)
                        .ariaLabel('Confirm')
                        .targetEvent()
                        .clickOutsideToClose(false)
                        .ok(true)
                        .cancel(false);
          return $mdDialog.show(confirm);
          */


            return $mdDialog.show({
              template: templateContent,
              targetEvent: '',
              clickOutsideToClose: false,
              controller: alertConfirmCtrl
          });

        };
    } // Common

    angular.module('ctrp.module.common')
    .controller('alertConfirmCtrl', alertConfirmCtrl);

    alertConfirmCtrl.$inject = ['$scope', '$mdDialog'];
    function alertConfirmCtrl($scope, $mdDialog) {
        $scope.confirm = function() {
            $mdDialog.hide('true');
        }; // confirm

        $scope.cancel = function() {
            $mdDialog.hide('false');
        }; // cancel
    } // alertConfirmCtrl

})();
