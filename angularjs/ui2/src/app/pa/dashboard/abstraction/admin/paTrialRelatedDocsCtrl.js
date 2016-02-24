/**
 * Created by wangg5, February 16, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialRelatedDocsCtrl', paTrialRelatedDocsCtrl)
    .controller('warningToastrCtrl', warningToastrCtrl);
    warningToastrCtrl.$inject = ['$scope', '$mdToast'];
    function warningToastrCtrl($scope, $mdToast) {
        $scope.closeWarning = function() {
            $mdToast.hide();
        };
    }

    paTrialRelatedDocsCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'Common', 'DateService', '$timeout', 'CommentService', 'documentTypes', '$mdToast',
        '$document', 'UserService', 'toastr', 'HOST', 'URL_CONFIGS', 'acceptedFileTypesObj', 'Upload'];

        function paTrialRelatedDocsCtrl($scope, _, PATrialService, TrialService,
            Common, DateService, $timeout, CommentService, documentTypes, $mdToast,
            $document, UserService, toastr, HOST, URL_CONFIGS, acceptedFileTypesObj, Upload) {

            var vm = this;
            var DOC_STATUSES = ['active', 'inactive', 'deleted']; // for storing document status in database
            vm.acceptedFileExtensions = acceptedFileTypesObj.accepted_file_extensions;
            vm.acceptedFileTypes = acceptedFileTypesObj.accepted_file_types;
            vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';
            vm.curTrialDetailObj = {};
            vm.curDoc = _initCurDoc();
            vm.docSubtypeShown = false;
            vm.documentTypes = documentTypes.types;
            vm.docTypeSelectionDisabled = false;
            var immutableDocTypes = _.filter(vm.documentTypes, function(type) {
                return type.indexOf('IRB Approval') > -1 ||
                        type.indexOf('Protocol Doc') > -1 ||
                        type.indexOf('Change Memo') > -1;
            }); // array of doc types that do not allow mutation

            // actions
            vm.saveDocuments = saveDocuments;
            vm.deleteDoc = deleteDoc;
            vm.editDoc = editDoc;
            vm.cancelEdit = cancelEdit;
            vm.upsertDoc = upsertDoc; //upsertDoc;
            vm.resetForm = resetForm;

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
                    _filterActiveDocs();
                }, 0);
            } //getTrialDetailCopy

            function deleteDoc(index) {
                if (index < vm.curTrialDetailObj.trial_documents.length) {
                    var curStatus = vm.curTrialDetailObj.trial_documents[index].status || 'deleted';
                    console.log('curStatus in deleteDoc: ', curStatus);
                    vm.curTrialDetailObj.trial_documents[index].status = (curStatus === 'deleted' || curStatus === 'inactive') ? 'active' : 'deleted'; // toggle active and deleted
                    console.log('after toggle, status: ', vm.curTrialDetailObj.trial_documents[index].status);
                    if (vm.curTrialDetailObj.trial_documents[index].status === 'active') {
                        // make sure only one doc of the same document_type 'active' except for 'Other Document'
                        uniqfyDocTypes(index);
                    }
                }
            }

            var prevFile = '';
            function editDoc(index) {
                if (index < vm.curTrialDetailObj.trial_documents.length) {
                    // vm.curDoc = Object.assign({}, vm.curTrialDetailObj.trial_documents[index], {edit: true});
                    vm.curDoc = angular.copy(vm.curTrialDetailObj.trial_documents[index]);
                    vm.curDoc.edit = true;
                    vm.docTypeSelectionDisabled = _.contains(immutableDocTypes, vm.curDoc.document_type);
                    vm.curDoc.index = index;
                    prevFile = angular.copy(vm.curDoc.file);
                    vm.curDoc.file = '';
                    // vm.curDoc.file_name = '';
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
                    file: '', // File to be uploaded
                    document_subtype: '',
                    added_by: {},
                    created_at: '',
                    edit: false,
                    index: null,
                    _destroy: false,
                    status: 'active'
                };
                return doc;
            }

            function findIndices(arrayObjs, field, value) {
                var indices = []; // array of integers
                _.each(arrayObjs, function(obj, index) {
                    if (obj[field] === value) {
                        indices.push(index);
                    }
                });
                return indices;
            }

            /**
             * Make sure no duplication of the same document type except for 'Other Document'
             * @param  {Integer} index [if null, it's a new document]
             * @return {Void}       [description]
             */
            function uniqfyDocTypes(index) {
                var docType = vm.curDoc.document_type;
                if (index !== null) {
                    // if index is specified, let it be 'active'
                    vm.curTrialDetailObj.trial_documents[index].status = 'active';
                    docType = vm.curTrialDetailObj.trial_documents[index].document_type;
                }
                // indices of the same document_type in the current trial_documents
                var existingIndices = findIndices(vm.curTrialDetailObj.trial_documents, 'document_type', docType);
                console.log('existing indices: ', existingIndices);
                var foundIndex = existingIndices.indexOf(index);
                if (foundIndex > -1) {
                    existingIndices.splice(foundIndex, 1); // remove it from being labeled as 'inactive'
                }
                _.each(existingIndices, function(idx) {
                    if (vm.curTrialDetailObj.trial_documents[idx].status === 'active' &&
                        vm.curTrialDetailObj.trial_documents[idx].document_type.indexOf('Other') === -1) {
                        vm.curTrialDetailObj.trial_documents[idx].status = 'inactive';
                    }
                });
            }

            function upsertDoc(index) {
                console.info('index: ', index);
                console.info('vm.curDoc: ', vm.curDoc);
                if (index === null && vm.curDoc.file === '') {
                    console.error('null document object');
                    return;
                }

                uniqfyDocTypes(index);
                if (index !== null && !vm.curDoc.file.size) {
                    console.info('update without uploading');
                    // update without uploading
                    vm.curDoc.file = prevFile !== '' ? prevFile : vm.curDoc.file;
                    vm.curTrialDetailObj.trial_documents[index] = angular.copy(vm.curDoc);
                } else if (!!vm.curDoc.file.size) {
                    console.info('file to be uploaded: ', vm.curDoc.file);
                    // file to be uploaded
                    // replacing document id
                    vm.curDoc.replacedDocId = vm.curDoc.id || null; // what if vm.curDoc.document_type.indexOf('Other') > -1 ?????
                    vm.curDoc.file_name = vm.curDoc.file.name; // extract name from the File object
                    if (index !== null) {
                        // existing document
                        vm.curTrialDetailObj.trial_documents[index] = vm.curDoc;
                    } else {
                        // new document
                        vm.curDoc.created_at = new Date();
                        vm.curDoc.added_by = {username: UserService.getLoggedInUsername()};
                        vm.curTrialDetailObj.trial_documents.push(vm.curDoc);
                    }
                }
                // re-initialize the vm.curDoc
                vm.curDoc = _initCurDoc();
                prevFile = '';
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

            /**
             * Reset the form
             */
            function resetForm() {
                _getTrialDetailCopy();
                vm.curDoc = _initCurDoc();
            }

            /**
             * POST the updated trial to backend
             * @param  {Boolean} showToastr [show toastr or not]
             * @return {Void}
             */
            function saveDocuments(showToastr, formName) {
                formName.$valid = false;
                console.error('form validity: ', formName.$valid);
                // warning toastr for edited document
                if (vm.curDoc.edit === true) {
                    _showWarningToastr('Please cancel or commit the edited document first', 'bottom right');
                    return;
                }

                PATrialService.uploadTrialRelatedDocs(vm.curTrialDetailObj.trial_documents, vm.curTrialDetailObj.id)
                    .then(function(res) {
                        console.log('group promises res: ', res);
                        if (angular.isArray(res)) {
                            _.each(res, function(uploadedDoc, index) {
                                if (uploadedDoc !== null) {
                                    // vm.curTrialDetailObj.trial_documents[index].created_at = uploadedDoc.data.created_at;
                                    vm.curTrialDetailObj.trial_documents[index] = uploadedDoc.data;
                                    vm.curTrialDetailObj.trial_documents[index].added_by = {username: UserService.getLoggedInUsername()};
                                }
                            });
                        }
                        vm.curTrialDetailObj.trial_documents_attributes = vm.curTrialDetailObj.trial_documents;
                        var outerTrial = {};
                        outerTrial.new = false;
                        outerTrial.id = vm.curTrialDetailObj.id;
                        outerTrial.trial = vm.curTrialDetailObj;
                        // get the most updated lock_version
                        outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
                        TrialService.upsertTrial(outerTrial).then(function(res) {
                            vm.curTrialDetailObj = res;
                            console.log('in trial related documents, res: ', res);
                            vm.curTrialDetailObj.lock_version = res.lock_version;
                            PATrialService.setCurrentTrial(vm.curTrialDetailObj); // update to cache
                            $scope.$emit('updatedInChildScope', {});
                            _filterActiveDocs();
                            if (showToastr) {
                                toastr.clear();
                                toastr.success('Trial related documents have been saved', 'Successful!', {
                                    extendedTimeOut: 1000,
                                    timeOut: 0
                                });
                            }
                        });
                    }).catch(function(err) {
                        console.error('group promise err: ', err);
                    });
            } // updatedTrial

            /**
             * Filter out inactive or deleted documents from display
             * @return {Void} [description]
             */
            function _filterActiveDocs() {
                vm.curTrialDetailObj.trial_documents = _.filter(vm.curTrialDetailObj.trial_documents, function(doc) {
                    return doc.status === 'active'; // do not show soft deleted or inactive document
                });
            }

            function cancelEdit() {
                vm.curDoc = _initCurDoc();
                vm.docTypeSelectionDisabled = false;
            }

            function _showWarningToastr(message, position) {
                $mdToast.show({
                controller: 'warningToastrCtrl',
                template: '<md-toast style="background-color: #6200EA"><span flex>' + message + '</span><md-button ng-click="closeWarning()">Close</md-button></md-toast>',
                parent: $document[0].querySelector('#warning_message'),
                hideDelay: 15000,
                position: position,
                action: ''
              });
            } // _showWarningToastr


        } // paTrialRelatedDocsCtrl

})();
