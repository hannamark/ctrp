/**
 * Created by wangg5, February 16, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialRelatedDocsCtrl', paTrialRelatedDocsCtrl);

    paTrialRelatedDocsCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'Common', 'DateService', '$timeout', 'CommentService',
        'UserService', 'toastr', 'HOST', 'URL_CONFIGS', 'acceptedFileTypesObj', 'Upload'];

        function paTrialRelatedDocsCtrl($scope, _, PATrialService, TrialService,
            Common, DateService, $timeout, CommentService,
            UserService, toastr, HOST, URL_CONFIGS, acceptedFileTypesObj, Upload) {

            var vm = this;
            console.log('acceptedFileTypesObj: ', acceptedFileTypesObj);
            vm.acceptedFileExtensions = acceptedFileTypesObj.accepted_file_extensions;
            vm.acceptedFileTypes = acceptedFileTypesObj.accepted_file_types;
            vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';
            vm.curTrialDetailObj = {};
            vm.curDoc = _initCurDoc();
            vm.docSubtypeShown = false;
            // TODO: this is served from app settings
            vm.documentTypes = ['Protocol Document', 'IRB Approval',
                    'Informed Consent', 'Change Memo Document',
                    'Other Document', 'List of Participating Sites',
                    'Protocol Highlighted Document'];

            // actions
            vm.saveDocuments = saveDocuments;
            vm.deleteDoc = deleteDoc;
            vm.editDoc = editDoc;
            vm.upsertDoc = upsertDoc;

            activate();
            function activate() {
                _getTrialDetailCopy();
                _watchCurDocType();
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
                    // vm.curDoc = Object.assign({}, vm.curTrialDetailObj.trial_documents[index], {edit: true});
                    vm.curDoc = angular.copy(vm.curTrialDetailObj.trial_documents[index]);
                    vm.curDoc.edit = true;
                    vm.curDoc.index = index;
                    vm.curDoc.file_name = '';
                    console.log('curDoc: ', vm.curDoc);
                }
            }

            /**
             * Initialize curDoc
             * @return {[type]} [description]
             */
            function _initCurDoc() {

                var doc = {
                    document_type: '',
                    file_name: '',
                    document_subtype: '',
                    added_by: {},
                    updated_at: '',
                    created_at: '',
                    edit: false
                };
                return doc;
            }

            /**
             * update or insert new trial related document
             * @param  {Int} index [if index is null, upload new pic; otherwise, update]
             * @return {Void}
             */
            function upsertDoc(index) {

                vm.curDoc.file_name.upload = Upload.upload({
                    url: HOST + URL_CONFIGS.TRIAL_DOCUMENT_LIST,
                    method: 'POST',
                    data: {
                        'trial_document[document_type]': vm.curDoc.document_type,
                        'trial_document[document_subtype]': vm.curDoc.document_subtype,
                        'trial_document[trial_id]': vm.curTrialDetailObj.id,
                        'trial_document[file]': vm.curDoc.file_name
                    }
                });

                vm.curDoc.file_name.upload.then(function(res) {
                    console.info('upload res: ', res);
                    var newDoc = {};
                    newDoc.id = res.data.id;
                    newDoc.document_type = res.data.document_type;
                    newDoc.file_name = res.data.file_name;
                    newDoc.document_subtype = res.data.document_subtype;
                    newDoc.updated_at = res.data.updated_at;
                    newDoc.added_by = {username: UserService.getLoggedInUsername()};
                    if (!!index && index < vm.curTrialDetailObj.trial_documents.length) {
                        vm.curTrialDetailObj.trial_documents[index] = newDoc;
                    } else {
                        vm.curTrialDetailObj.trial_documents.unshift(newDoc);
                    }
                    vm.curDoc = _initCurDoc();
                }).catch(function(err) {
                    console.error('upload error: ', err);
                });

                /*
                TrialService.uploadDocument(vm.curTrialDetailObj.id, vm.curDoc.document_type, '', vm.curDoc.file_name)
                            .then(function(res) {
                                console.info('upload res: ', res);
                            })
                            .error(function(err) {
                                console.error('upload err: ', err);
                            });
                            */

            }

            /**
             * Watch for the document type of the document to be uploaded,
             * if the document type is 'Other', show the input field 'document_subtype'
             * @return {[type]} [description]
             */
            function _watchCurDocType() {
                $scope.$watch(function() {return vm.curDoc.document_type;},
                    function(newVal, oldVal) {
                        vm.docSubtypeShown = newVal.indexOf('Other') > -1;
                        vm.curDoc.document_subtype = '';
                    });
            }


        } // paTrialRelatedDocsCtrl

})();
