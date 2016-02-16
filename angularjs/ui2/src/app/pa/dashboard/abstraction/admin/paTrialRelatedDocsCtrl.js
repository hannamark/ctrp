/**
 * Created by wangg5, February 16, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialRelatedDocsCtrl', paTrialRelatedDocsCtrl);

    paTrialRelatedDocsCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'trialStatuses', 'Common', 'DateService', '$timeout', 'CommentService',
        'UserService', 'toastr'];

        function paTrialRelatedDocsCtrl($scope, _, PATrialService, TrialService,
            trialStatuses, Common, DateService, $timeout, CommentService,
            UserService, toastr) {

            var vm = this;

        } // paTrialRelatedDocsCtrl

})();
