(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasBioMarkersCtrl', pasBioMarkersCtrl);

    pasBioMarkersCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants','trialDetailObj','assayTypes','evaluationTypes','specimenTypes','biomarkerUses','biomarkerPurposes'];

    function pasBioMarkersCtrl($scope, TrialService, PATrialService, toastr,
                                   MESSAGES, _, $timeout, uiGridConstants,trialDetailObj,assayTypes,evaluationTypes,specimenTypes,biomarkerUses,biomarkerPurposes) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.currentBioMarker= {};
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.resetBioMarker = resetBioMarker;
        vm.trialDetailObj = {};
        vm.selOrganization = {name: '', array: []};
        vm.showOrgFields = true;
        vm.disableBtn = false;

        vm.assayTypes=assayTypes;
        vm.checked_assay_types=[];

        vm.evalTypes=evaluationTypes;
        vm.checked_eval_types=[];


        vm.specTypes=specimenTypes;
        vm.checked_spec_types=[];

        vm.biomarkerPurposes=biomarkerPurposes;
        console.log(vm.biomarkerPurposes);
        vm.checked_biomarker_purposes=[];

        vm.biomarkerUses=biomarkerUses;




        $scope.toggle = function (item, list,type) {

            var idx = -1;
            for(var i = 0; i < list.length; i++){
                if(list[i].id == item.id) {
                    idx=i;
                    break;
                }
            };

            if (item.code == "Other" && idx > -1) {
                switch (type) {
                    case 'AT':
                        vm.isAssayTypeOtherChecked=false;
                        break;
                    case 'ET':
                        vm.isEvalTypeOtherChecked=false;
                        break;
                    case 'ST':
                        vm.isSpecTypeOtherChecked=false;
                        break;
                    default:

                }
            } else if (item.code == "Other") {
                switch (type) {
                    case 'AT':
                        vm.isAssayTypeOtherChecked=true;
                        break;
                    case 'ET':
                        vm.isEvalTypeOtherChecked=true;
                        break;
                    case 'ST':
                        vm.isSpecTypeOtherChecked=true;
                        break;
                    default:

                }
            }

            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };

        $scope.exists = function (item, list) {

            for(var i = 0; i < list.length; i++){
                if(list[i].id == item.id) {
                    return true;
                }
            };
            return false;
        };

        //

        activate();
        function activate() {
            //submit();
            getTrialDetailCopy();
            watchOrganization();

        }

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };




        vm.saveBioMarker = function(){
            // Prevent multiple submissions
            vm.disableBtn = true;
            if (!vm.currentBioMarker.id) {
                vm.currentBioMarker.new = true;
            }

            vm.currentBioMarker.marker_eval_type_associations_attributes=[];
            vm.currentBioMarker.marker_assay_type_associations_attributes=[];
            vm.currentBioMarker.marker_spec_type_associations_attributes=[];
            vm.currentBioMarker.marker_biomarker_purpose_associations_attributes=[];


            if (vm.currentBioMarker.id) {

                if (vm.currentBioMarker.eval_type_associations) {
                    for (var i = 0; i < vm.currentBioMarker.eval_type_associations.length; i++) {
                        var evalHash = {}
                        var marker_eval_types_association_id = vm.currentBioMarker.eval_type_associations[i].id;
                        var eval_type_id = vm.currentBioMarker.eval_type_associations[i].evaluation_type_id;
                        evalHash._destroy = true;
                        evalHash.id = marker_eval_types_association_id; //marker_eval_types_association_id

                        //if()
                        vm.currentBioMarker.marker_eval_type_associations_attributes.push(evalHash);
                    }
                }
                if (vm.currentBioMarker.asay_type_associations) {
                    for (var i = 0; i < vm.currentBioMarker.assay_type_associations.length; i++) {
                        var evalHash = {}
                        evalHash._destroy = true;
                        evalHash.id = vm.currentBioMarker.assay_type_associations[i].id;
                        vm.currentBioMarker.marker_assay_type_associations_attributes.push(evalHash);
                    }
                }
                if(vm.currentBioMarker.spec_type_associations) {
                    for (var i = 0; i < vm.currentBioMarker.spec_type_associations.length; i++) {
                        var evalHash = {}
                        evalHash._destroy = true;
                        evalHash.id = vm.currentBioMarker.spec_type_associations[i].id;
                        vm.currentBioMarker.marker_spec_type_associations_attributes.push(evalHash);
                    }
                }

                if(vm.currentBioMarker.biomarker_purpose_associations) {
                    for (var i = 0; i < vm.currentBioMarker.biomarker_purpose_associations.length; i++) {
                        var evalHash = {}
                        evalHash._destroy = true;
                        evalHash.id = vm.currentBioMarker.biomarker_purpose_associations[i].id;
                        vm.currentBioMarker.marker_biomarker_purpose_associations_attributes.push(evalHash);
                    }
                }

            }


            vm.isEvalTypeOtherChecked=false;
            vm.isAssayTypeOtherChecked=false;
            vm.isSpecTypeOtherChecked=false;


            for (var i = 0; i < vm.checked_eval_types.length; i++) {
               if(vm.checked_eval_types[i].code =="Other")
               {
                   vm.isEvalTypeOtherChecked=true;
               }
                var evalHash={}
                evalHash.evaluation_type_id=vm.checked_eval_types[i].id; //eval_type_id
                vm.currentBioMarker.marker_eval_type_associations_attributes.push(evalHash);
            }




            for (var i = 0; i < vm.checked_assay_types.length; i++) {
                if(vm.checked_assay_types[i].code =="Other")
                {
                    vm.isAssayTypeOtherChecked=true;
                }
                var evalHash={}
                evalHash.assay_type_id=vm.checked_assay_types[i].id;
                vm.currentBioMarker.marker_assay_type_associations_attributes.push(evalHash);
            }

            for (var i = 0; i < vm.checked_biomarker_purposes.length; i++) {
                var evalHash={}
                evalHash.biomarker_purpose_id=vm.checked_biomarker_purposes[i].id;
                vm.currentBioMarker.marker_biomarker_purpose_associations_attributes.push(evalHash);
            }



            for (var i = 0; i < vm.checked_spec_types.length; i++) {
                if(vm.checked_spec_types[i].code =="Other")
                {
                    vm.isSpecTypeOtherChecked=true;
                }

                var evalHash={}
                evalHash.specimen_type_id=vm.checked_spec_types[i].id;
                vm.currentBioMarker.marker_spec_type_associations_attributes.push(evalHash);
            }

            if(!vm.isEvalTypeOtherChecked)  { vm.currentBioMarker.evaluation_type_other  = ""; }
            if(!vm.isAssayTypeOtherChecked) { vm.currentBioMarker.assay_type_other = ""; }
            if(!vm.isSpecTypeOtherChecked)  { vm.currentBioMarker.specimen_type_other  = ""; }

            vm.currentBioMarker.trial_id = trialDetailObj.id;
            vm.curTrial.markers_attributes=[];
            vm.curTrial.markers_attributes.push(vm.currentBioMarker);

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {

                vm.curTrial.lock_version = response.lock_version || '';
                vm.curTrial.bio_markers = response["bio_markers"];
                PATrialService.setCurrentTrial(vm.curTrial);
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                })
                vm.addEditMode=false;
                vm.disableBtn = false;

            }).catch(function(err) {
                vm.disableBtn = false;
                console.log("error in creating or updating sub group " + JSON.stringify(outerTrial));
            });
        };//saveBioMarker

        function deleteListHandler(BioMarkersSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(BioMarkersSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteBioMarkersList = deleteList ;

        };

        function deleteSelected(){
            vm.disableBtn = true;

            vm.curTrial.markers_attributes=[];

            for (var i = 0; i < vm.selectedDeleteBioMarkersList.length; i++) {
                var obj={};
                obj.id = vm.selectedDeleteBioMarkersList[i].id;
                obj._destroy=true;
                vm.curTrial.markers_attributes.push(obj);
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {

                vm.curTrial.lock_version = response.lock_version || '';
                vm.curTrial.bio_markers = response["bio_markers"];
                PATrialService.setCurrentTrial(vm.curTrial);
                $scope.$emit('updatedInChildScope', {});

                toastr.clear();
                toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!', {
                    extendedTimeOut: 1000,
                    timeOut: 0
                })

            }).catch(function(err) {
                vm.disableBtn = false;
                console.log("error in creating or updating Trial sub group " + JSON.stringify(outerTrial));
            });
        };


        // Add Participating to a temp array
        function watchOrganization() {
            $scope.$watchCollection(function() {return vm.selOrganization.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    console.log("newVal = "+ JSON.stringify(newVal));
                    vm.currentBioMarker.name = newVal[0].name;
                    vm.currentBioMarker.organization = newVal[0];
                    vm.currentBioMarker.organization_id = newVal[0].id;
                    vm.city = newVal[0].city;
                    vm.selOrganization = {name: vm.currentBioMarker["po_name"], array: []};
                    //console.log("vm.currentParticipatingSite =" + JSON.stringify(vm.currentParticipatingSite));
                }
            });
        }


        /**
         *  Set Add Mode.
         **/
        function setAddMode() {
            vm.addEditMode = true;
            vm.currentBioMarker= {};
            vm.checked_assay_types=[];
            vm.checked_eval_types=[];
            vm.checked_spec_types=[];
            vm.checked_biomarker_purposes=[];
            vm.selOrganization = {name: '', array: []};
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentBioMarker = vm.curTrial.bio_markers[idx];

            if (vm.currentBioMarker.assay_type_other && vm.currentBioMarker.assay_type_other.length > 0) {
                vm.isAssayTypeOtherChecked=true;
            }
            if (vm.currentBioMarker.evaluation_type_other && vm.currentBioMarker.evaluation_type_other.length > 0) {
                vm.isEvalTypeOtherChecked=true;
            }
            if (vm.currentBioMarker.specimen_type_other && vm.currentBioMarker.specimen_type_other.length > 0) {
                vm.isSpecTypeOtherChecked=true;
            }

            vm.checked_assay_types=[];
            vm.checked_assay_types = vm.curTrial.bio_markers[idx].assay_types;
            vm.old_checked_assay_types = angular.copy(vm.checked_assay_types);

            vm.checked_eval_types=[];
            vm.checked_eval_types = vm.curTrial.bio_markers[idx].eval_types;

            vm.checked_spec_types=[];
            vm.checked_spec_types = vm.curTrial.bio_markers[idx].spec_types;

            vm.checked_biomarker_purposes=[];
            vm.checked_biomarker_purposes=vm.curTrial.bio_markers[idx].biomarker_purposes;

        }

        function resetBioMarker() {
            if(vm.currentBioMarker.id > 0){
                var cachedTrial = PATrialService.getCurrentTrialFromCache();
                for (var i = 0; i < cachedTrial.bio_markers.length; i++) {
                    if(cachedTrial.bio_markers[i].id == vm.currentBioMarker.id){
                        vm.currentBioMarker = cachedTrial.bio_markers[i];
                    }
                }


            } else {
                vm.setAddMode();
            }

            $timeout(function() {
                getTrialDetailCopy();
            }, 0);

        }

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy

    }

})();

