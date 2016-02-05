/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialStatusCtrl', paTrialStatusCtrl);

    paTrialStatusCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'trialStatuses', 'Common', 'DateService', '$timeout', 'CommentService',
        'UserService', 'toastr'];

    function paTrialStatusCtrl($scope, _, PATrialService, TrialService,
        trialStatuses, Common, DateService, $timeout, CommentService,
        UserService, toastr) {

        var vm = this;
        vm.trialStatuses = trialStatuses.sort(Common.a2zComparator()); // array of trial statuses
        vm.statusObj = _initStatusObj();
        vm.dateFormat = DateService.getFormats()[1];
        vm.statusDateOpened = false;
        vm.startDateOpened = false;
        vm.primaryCompDateOpened = false;
        vm.compDateOpened = false;
        vm.amendmentDateOpened = false;
        vm.showWhyStoppedField = false;

        vm.dateOptions = DateService.getDateOptions();
        vm.trialDetailObj = {};
        vm.tempTrialStatuses = [];
        vm.commentList = [];
        var commentField = 'trial-status'; // for marking comment entry
        var commentModel = 'Trial'; // model name for comment
        vm._date_opened = false;

        // actions
        vm.addTrialStatus = addTrialStatus;
        vm.openCalendar = openCalendar;
        vm.deleteTrialStatus = deleteTrialStatus;
        vm.editTrialStatus = editTrialStatus;
        vm.cancelEdit = cancelEdit;
        vm.commitEdit = commitEdit;
        vm.createComment = createComment;
        vm.updateComment = updateComment;
        vm.updateTrialStatuses = updateTrialStatuses;
        vm.resetForm = resetForm;
        vm.watchTrialStatusChanges = watchTrialStatusChanges;

        activate();
        function activate() {
            watchTrialStatusChanges();
            _getTrialDetailCopy();
        } // activate

        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                // load comments for the trial with the field name {commentField}
                vm.commentObj = _initCommentObj();
                _loadComments(commentField);
                _convertDates();

                // convert the trial_status_id to status name
                vm.tempTrialStatuses = _.map(vm.trialDetailObj.trial_status_wrappers, function(status) {
                    var curStatusObj = _.findWhere(vm.trialStatuses, {id: status.trial_status_id});
                    status.trial_status_name = curStatusObj.name || '';
                    status.trial_status_code = curStatusObj.code || '';
                    status._destroy = false;
                    // status.status_date is in this format "YYYY-mm-DD" (e.g. "2009-12-03")
                    // transform it to the format ("DD-MMM-YYYY", e.g. "03-Dec-2009")
                    status.status_date = moment(status.status_date).format("DD-MMM-YYYY");
                    delete status.trial_status; // delete the trial_status object
                    delete status.updated_at;
                    delete status.created_at;
                    return status;
                });

                validateStatuses();
            }, 0);
        } // _getTrialDetailCopy

        /**
         * Generate a new status object
         * @return {JSON} [fields: status_date, etc (see below)]
         */
        function _initStatusObj() {
            var statusObj = {
                status_date: '',
                trial_status_id: '',
                comment: '',
                why_stopped: '',
                _destroy: false
            };
            return statusObj;
        }

        function addTrialStatus() {
            vm.statusErrorMsg = '';
            if (vm.statusObj.status_date && vm.statusObj.trial_status_id) {
                var statusExists = _.findIndex(vm.tempTrialStatuses, {trial_status_id: vm.statusObj.trial_status_id}) > -1;
                if (statusExists) {
                    vm.statusErrorMsg = 'Status already exists';
                    return;
                }
                var clonedStatusObj = angular.copy(vm.statusObj);
                // clonedStatusObj.status_date = clonedStatusObj.status_date.toISOString(); // ISOString for POST to backend
                clonedStatusObj.status_date = DateService.convertISODateToLocaleDateStr(clonedStatusObj.status_date); // for display in table
                var selectedStatus = _.findWhere(vm.trialStatuses, {id: clonedStatusObj.trial_status_id});

                if (!!selectedStatus) {
                    clonedStatusObj.trial_status_name = selectedStatus.name;
                    clonedStatusObj.trial_status_code = selectedStatus.code;
                }
                vm.tempTrialStatuses.push(clonedStatusObj);

                // Validate statuses:
                validateStatuses();
                // re-initialize the vm.statusObj
                vm.statusObj = _initStatusObj();
            } else {
                vm.statusErrorMsg = 'Both status date and trial status are required';
            }
        }

        function validateStatuses() {
            vm.statusValidationMsgs = [];
            var activeStatuses = []; // statuses not to be destroyed
            activeStatuses = _.filter(vm.tempTrialStatuses, function(status) {
                return !status._destroy;
            });
            return _validateStatusesDelegate(activeStatuses);
        }

        /**
         * Delegate for validating trial statuses
         * @param  {[type]} statusArr [array of trial statuses]
         * @return {[type]}           [description]
         */
        function _validateStatusesDelegate(statusArr) {
            if (statusArr.length === 0) return;

            TrialService.validateStatus({"statuses": statusArr}).then(function(res) {
                if (res.validation_msgs && angular.isArray(res.validation_msgs)) {
                    vm.statusValidationMsgs = res.validation_msgs;
                    _.each(vm.tempTrialStatuses, function(status, index) {
                        if (status._destroy) {
                            vm.statusValidationMsgs.splice(index, 0, {});
                        }
                    });
                }
            }).catch(function(err) {
                console.log('error in validating status');
            });
        } // _validateStatusesDelegate

        function deleteTrialStatus(index) {
            if (index < vm.tempTrialStatuses.length) {
                vm.tempTrialStatuses[index]._destroy = !vm.tempTrialStatuses[index]._destroy;
                // empty the edit fields if it's targeted for destroy
                if (vm.tempTrialStatuses[index]._destroy && vm.statusObj.edit) {
                    vm.statusObj = _initStatusObj();
                }
            }
        } // deleteTrialStatus

        function editTrialStatus(index) {
            if (index < vm.tempTrialStatuses.length) {
                vm.statusObj = angular.copy(vm.tempTrialStatuses[index]);
                vm.statusObj.edit = true;
                vm.statusObj.index = index;
                // vm.tempTrialStatuses.splice(index, 1);
            }
        }

        function commitEdit() {
            if (vm.statusObj.edit) {
                // vm.statusObj.status_date = moment(vm.statusObj.status_date).format("DD-MMM-YYYY"); // e.g. 03-Feb-2016
                // format date from 'yyyy-mm-DD' to 'yyyy-MMM-DD' (e.g. from 2009-12-03 to 03-Feb-2009)
                vm.statusObj.status_date = DateService.convertISODateToLocaleDateStr(vm.statusObj.status_date);
                var selectedStatus = _.findWhere(vm.trialStatuses, {id: vm.statusObj.trial_status_id});
                if (!!selectedStatus) {
                    vm.statusObj.trial_status_name = selectedStatus.name;
                    vm.statusObj.trial_status_code = selectedStatus.code;
                }
                // vm.tempTrialStatuses.splice(vm.statusObj.index, 0, vm.statusObj);
                vm.tempTrialStatuses[vm.statusObj.index] = vm.statusObj;
                console.log('vm.tempTrialStatuses: ', vm.tempTrialStatuses);
                validateStatuses();
                vm.statusObj = _initStatusObj();
            }
        } // commitEdit

        function cancelEdit() {
            if (vm.statusObj.edit) {
                vm.statusObj = _initStatusObj();
            }
        }

        /**
         * Fetch comments for the trial with its uuid and the fieldName
         * @param  {String} fieldName [field name for the comment, e.g. trial-status]
         * @return {Promise}           [resolved to an array of comments]
         */
        function _loadComments(fieldName) {
            CommentService.getComments(vm.trialDetailObj.uuid, fieldName)
                .then(function(res) {
                    vm.commentList = CommentService.annotateCommentIsEditable(res.comments);
                    vm.commentList.reverse();
                })
                .catch(function(err) {
                    console.log('error in retrieving comments');
                });
        }

        /**
        * POST commentObj to API
        */
        function createComment() {
            if (vm.commentObj.content === '') return;
            CommentService.createComment(vm.commentObj)
              .then(function(res) {
                 console.log('posted comment, res: ', res);
                 vm.commentObj = _initCommentObj();
                 _loadComments(commentField);
              });
        } //createComment

        function updateComment(newContent, index) {
            if (index < vm.commentList.length) {
                var editedComment = vm.commentList[index];
                editedComment.content = newContent;
                CommentService.updateComment(editedComment);
            }
        }

        function _initCommentObj() {
            return {
              content: '',
              username: UserService.getLoggedInUsername(),
              field: commentField,
              model: commentModel,
              instance_uuid: vm.trialDetailObj.uuid,
              parent_id: ''
            };
        }

        function _convertDates() {
            // format the trial-associated date fields
            vm.trialDetailObj.start_date = !!vm.trialDetailObj.start_date ? moment(vm.trialDetailObj.start_date).format("DD-MMM-YYYY") : '';
            // DateService.convertISODateToLocaleDateStr()
            vm.trialDetailObj.primary_comp_date = !!vm.trialDetailObj.primary_comp_date ? moment(vm.trialDetailObj.primary_comp_date).format("DD-MMM-YYYY") : '';
            vm.trialDetailObj.comp_date = !!vm.trialDetailObj.comp_date ? moment(vm.trialDetailObj.comp_date).format("DD-MMM-YYYY") : '';
            vm.trialDetailObj.amendment_date = !!vm.trialDetailObj.amendment_date ? moment(vm.trialDetailObj.amendment_date).format("DD-MMM-YYYY") : '';
        }

        function openCalendar ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'status_date') {
                vm.statusDateOpened = !vm.statusDateOpened;
            } else if (type === 'start_date') {
                vm.startDateOpened = !vm.startDateOpened;
            } else if (type === 'primary_comp_date') {
                vm.primaryCompDateOpened = !vm.primaryCompDateOpened;
            } else if (type === 'comp_date') {
                vm.compDateOpened = !vm.compDateOpened;
            } else if (type === 'amendment_date') {
                vm.amendmentDateOpened = !vm.amendmentDateOpened;
            }
        }; //openCalendar

        function updateTrialStatuses() {
            createComment(); // if the user did not save the comment, save it here
            vm.trialDetailObj.trial_status_wrappers_attributes = vm.tempTrialStatuses;
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailObj.id;
            outerTrial.trial = vm.trialDetailObj;

            TrialService.upsertTrial(outerTrial).then(function(res) {
                vm.trialDetailObj = res;
                vm.trialDetailObj.lock_version = res.lock_version;

                PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Trial statuses has been updated', 'Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                });
                _getTrialDetailCopy();
            });

        } // updateTrialStatuses

        function resetForm() {
            _getTrialDetailCopy();
        }

        function watchTrialStatusChanges() {
            $scope.$watch(function() {return vm.statusObj.trial_status_id;}, function(newVal, oldVal) {
                if (newVal) {
                    vm.statusObj.why_stopped = '';
                    var selectedStatus = _.findWhere(vm.trialStatuses, {id: newVal});
                    var statusName = selectedStatus.name || '';
                    var statusesForStop = ['administratively complete', 'withdrawn', 'temporarily closed'];
                    if (_.contains(statusesForStop, statusName.toLowerCase())) {
                        vm.showWhyStoppedField = true;
                    } else {
                        vm.showWhyStoppedField = false;
                    }
                }
            });


        }
    } // paTrialStatusCtrl



})();
