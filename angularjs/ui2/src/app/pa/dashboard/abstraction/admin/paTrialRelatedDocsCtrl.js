/**
 * Created by wangg5, February 16, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialRelatedDocsCtrl', paTrialRelatedDocsCtrl);

    paTrialRelatedDocsCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'Common', 'DateService', '$timeout', 'CommentService',
        'UserService', 'toastr', 'HOST', 'acceptedFileTypesObj'];

        function paTrialRelatedDocsCtrl($scope, _, PATrialService, TrialService,
            Common, DateService, $timeout, CommentService,
            UserService, toastr, HOST, acceptedFileTypesObj) {

            var vm = this;
            console.log('acceptedFileTypesObj: ', acceptedFileTypesObj);
            vm.acceptedFileExtensions = acceptedFileTypesObj.accepted_file_extensions;
            vm.acceptedFileTypes = acceptedFileTypesObj.accepted_file_types;
            vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';
            vm.curTrialDetailObj = {};
            vm.curDoc = {};
            // TODO: this is served from app settings
            vm.documentTypes = ['Protocol Document', 'IRB Approval',
                    'Informed Consent', 'Change Memo Document',
                    'Other Document', 'List of Participating Sites',
                    'Protocol Highlighted Document'];

            // actions
            vm.saveDocuments = saveDocuments;
            vm.deleteDoc = deleteDoc;
            vm.editDoc = editDoc;

            activate();
            function activate() {
                _getTrialDetailCopy();
            }

            /**
             * get a data clone of the trial detail object from Local Cache
             * @return {Void}
             */
            function _getTrialDetailCopy() {
                $timeout(function() {
                    vm.curTrialDetailObj = PATrialService.getCurrentTrialFromCache();
                }, 0);
            } //getTrialDetailCopy

            function saveDocuments() {
                console.info('saving documents');
            }

            function deleteDoc(index) {
                if (index < vm.curTrialDetailObj.trial_documents.length) {
                    vm.curTrialDetailObj.trial_documents[index]._destroy = !vm.curTrialDetailObj.trial_documents[index]._destroy
                }
            }

            function editDoc(index) {
                if (index < vm.curTrialDetailObj.trial_documents.length) {
                    vm.curDoc = Object.assign({}, vm.curTrialDetailObj.trial_documents[index], {edit: true});
                    console.log('curDoc: ', vm.curDoc);
                    //  angular.copy(vm.curTrialDetailObj.trial_documents[index]);
                }
            }


        } // paTrialRelatedDocsCtrl

})();
