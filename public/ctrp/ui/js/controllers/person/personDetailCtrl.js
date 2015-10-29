/**
 * Created by wus4 on 7/6/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['personDetailObj', 'PersonService', 'toastr', 'DateService', 'UserService',
        '$scope', 'Common', 'sourceStatusObj','sourceContextObj', '$state', '$modal', 'OrgService', 'poAffStatuses', '_'];

    function personDetailCtrl(personDetailObj, PersonService, toastr, DateService, UserService,
                              $scope, Common, sourceStatusObj,sourceContextObj, $state, $modal, OrgService, poAffStatuses, _) {
        var vm = this;
        vm.curPerson = personDetailObj || {lname: ""}; //personDetailObj.data;
        vm.curPerson = vm.curPerson.data || vm.curPerson;
        vm.masterCopy= angular.copy(vm.curPerson);
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        vm.sourceContextArr = sourceContextObj;
        vm.savedSelection = [];
        vm.orgsArrayReceiver = []; //receive selected organizations from the modal
        vm.selectedOrgFilter = '';


        if(!angular.isObject(personDetailObj))
        {
            //default source status is 'Pending', as identified by the 'code' value (hard coded allowed as per the requirements)
            var activeStatusIndex = Common.indexOfObjectInJsonArray(vm.sourceStatusArr, 'code', 'ACT');
            vm.activeStatusName = vm.sourceStatusArr[activeStatusIndex].name || '';
            vm.curPerson.source_status_id = vm.curPerson.source_status_id || vm.sourceStatusArr[activeStatusIndex].id;
        }

        //update person (vm.curPerson)
        vm.updatePerson = function () {
            vm.curPerson.po_affiliations_attributes = OrgService.preparePOAffiliationArr(vm.savedSelection); //append an array of affiliated organizations
            _.each(vm.curPerson.po_affiliations_attributes, function (aff, idx) {
                //convert the ISO date to Locale Date String
                aff['effective_date'] = aff.effective_date ? DateService.convertISODateToLocaleDateStr(aff['effective_date']) : '';
                aff['expiration_date'] = aff.expiration_date ? DateService.convertISODateToLocaleDateStr(aff['expiration_date']) : '';
                var affStatusIndex = -1; //PoAffiliationStatus index
                if (aff.effective_date && !aff.expiration_date) {
                    affStatusIndex = _.findIndex(poAffStatuses, {'name': 'Active'});
                } else if (aff.expiration_date) {
                    affStatusIndex = _.findIndex(poAffStatuses, {'name': 'Inactive'});
                }
                aff.po_affiliation_status_id = affStatusIndex == -1 ? '' : poAffStatuses[affStatusIndex].id;
                vm.curPerson.po_affiliations_attributes[idx] = aff; //update the po_affiliation with the correct data format
            });

            //create a nested Person object
            var newPerson = {};
            newPerson.new = vm.curPerson.new || '';
            newPerson.id = vm.curPerson.id || '';
            newPerson.person = vm.curPerson;

            PersonService.upsertPerson(newPerson).then(function (response) {
                //console.log('response: ' + JSON.stringify(response));
                vm.savedSelection = [];
                if (newPerson.new) {
                    vm.resetForm();
                } else {
                    $state.go('main.people', {}, {reload: true});
                }
                toastr.success('Person ' + vm.curPerson.lname + ' has been recorded', 'Operation Successful!');
            }).catch(function (err) {
                console.log("error in updating person " + JSON.stringify(newPerson));
            });
        }; // updatePerson


        vm.resetForm = function() {
            angular.copy(vm.masterCopy,vm.curPerson);
        };

        vm.clearForm = function() {
            $scope.person_form.$setPristine();

            var excludedKeys = ['new', 'po_affiliations', 'source_status_id', 'cluster'];
            Object.keys(vm.curPerson).forEach(function(key) {
                if (excludedKeys.indexOf(key) == -1) {
                    vm.curPerson[key] = angular.isArray(vm.curPerson[key]) ? [] : '';
                }
            });
            //default context to ctrp
            vm.curPerson.source_context_id = OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP');
        };

        //delete the affiliated organization from table view
        vm.toggleSelection = function (index) {
            if (index < vm.savedSelection.length) {
                vm.savedSelection[index]._destroy = !vm.savedSelection[index]._destroy;
               // vm.savedSelection.splice(index, 1);
            }
        };// toggleSelection

        //select or de-select all organizations form affiliations
        vm.batchSelect = function (intention, selectedOrgsArr) {
            if (intention == "selectAll") {
                //iterate the organizations asynchronously
                async.each(selectedOrgsArr, function (org, cb) {
                    if (OrgService.indexOfOrganization(vm.savedSelection, org) == -1) {
                        vm.savedSelection.unshift(OrgService.initSelectedOrg(org));
                    }
                    cb();
                }, function (err) {
                    if (err) {
                        console.log("an error occurred when iterating the organizations");
                    }
                });
            } else {
               // vm.savedSelection.length = 0;
                _.each(vm.savedSelection, function(org, index) {
                   vm.savedSelection[index]._destroy = true; //mark it for destroy
                });
            }
            // console.log("vm.savedSelection.length = " + vm.savedSelection.length);
        }; //batchSelect


        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, index, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == "effective") {
                vm.savedSelection[index].opened_effective = !vm.savedSelection[index].opened_effective;
            } else {
                vm.savedSelection[index].opened_expiration = !vm.savedSelection[index].opened_expiration;
            }
        }; //openCalendar

        // Swap context when different tab is selected
        $scope.$watch(function() {
            return vm.tabIndex;
        }, function(newValue, oldValue) {
            if (!vm.curPerson.new) {
                PersonService.getPersonById(vm.curPerson.cluster[newValue].id).then(function (response) {
                    vm.curPerson = response.data;
                    vm.savedSelection = [];
                    populatePoAffiliations();
                    vm.masterCopy= angular.copy(vm.curPerson);
                }).catch(function (err) {
                    console.log("Error in retrieving person during tab change.");
                });
            }
        });

        activate();

        /****************** implementations below ***************/
        function activate() {
            //default context to ctrp, if not set
            vm.curPerson.source_context_id = !vm.curPerson.source_context_id ?
                OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP') : vm.curPerson.source_context_id;

            appendNewPersonFlag();
            setTabIndex();
            watchOrgReceiver();
            if (vm.curPerson.po_affiliations && vm.curPerson.po_affiliations.length > 0) {
                populatePoAffiliations();
            }
            if(!vm.curPerson.new) {
                prepareModal();
            }
        }


        /**
         * Append a 'new' key to the vm.curPerson to
         * indicate this is a new person, not an person
         * for editing/curating
         *
         */
        function appendNewPersonFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curPerson.new = true;  //
            }
        }

        function setTabIndex() {
            if (vm.curPerson.new) {
                vm.curPerson.cluster = [{"context": "CTRP"}];
            } else {
                for (var i = 0; i < vm.curPerson.cluster.length; i++) {
                    if (vm.curPerson.cluster[i].id == vm.curPerson.id) {
                        vm.tabIndex = i;
                    }
                }
            }
        }

        /**
         * watch organizations selected from the modal
         */
        function watchOrgReceiver() {
            $scope.$watchCollection(function() {return vm.orgsArrayReceiver;}, function(selectedOrgs, oldVal) {
                _.each(selectedOrgs, function(anOrg, index) {
                    //prevent pushing duplicated org
                    if (Common.indexOfObjectInJsonArray(vm.savedSelection, "id", anOrg.id) == -1) {
                        vm.savedSelection.unshift(OrgService.initSelectedOrg(anOrg));
                    }
                });

            }, true);
        } //watchOrgReceiver



        /**
         * Asynchronously populate the vm.savedSelection array for presenting
         * the existing po_affiliation with the person being presented
         *
         */
        function populatePoAffiliations() {
            //find the organization name with the given id
            var findOrgName = function(poAff, cb) {
                OrgService.getOrgById(poAff.organization_id).then(function(organization) {
                    var curOrg = {"id" : poAff.organization_id, "name": organization.name};
                    curOrg.effective_date = DateService.convertISODateToLocaleDateStr(poAff.effective_date);
                    curOrg.expiration_date = DateService.convertISODateToLocaleDateStr(poAff.expiration_date);
                    curOrg.po_affiliation_status_id = poAff.po_affiliation_status_id;
                    curOrg.po_affiliation_id = poAff.id; //po affiliation id
                    curOrg.lock_version = poAff.lock_version;
                    curOrg._destroy = poAff._destroy || false;
                    vm.savedSelection.push(curOrg);
                }).catch(function(err) {
                    console.error("error in retrieving organization name with id: " + poAff.organization_id);
                });
                cb();
            };

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };

            async.eachSeries(vm.curPerson.po_affiliations, findOrgName, retOrgs);
        } //populatePoAffiliations

        function prepareModal() {
            vm.confirmDelete = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'delete_confirm_template.html',
                    controller: 'ModalInstancePersonCtrl as vm',
                    size: size,
                    resolve: {
                        personId: function () {
                            return vm.curPerson.id;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log("about to delete the personDetail " + vm.curPerson.id);
                    $state.go('main.people');
                }, function () {
                    console.log("operation canceled")
                });

            } //prepareModal
        }; //confirmDelete


        //Function that checks if a user name - based on First & Last names is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the person/unique Rails end point.
        $scope.checkForNameUniqueness = function(){

            var ID = 0;
            if(angular.isObject(personDetailObj))
                ID = vm.curPerson.id;

            var searchParams = {"person_fname": vm.curPerson.fname, "person_lname": vm.curPerson.lname, "source_context_id": vm.curPerson.source_context_id, "person_exists": angular.isObject(personDetailObj), "person_id": ID};
            console.log('First name is ' + vm.curPerson.fname);
            console.log('Last name is ' + vm.curPerson.lname);
            console.log('Source context is ' + vm.curPerson.source_context_id);
            console.log('Person exists? ' + angular.isObject(personDetailObj));
            console.log('Person ID ' + vm.curPerson.id);

            vm.showUniqueWarning = false

            var result = PersonService.checkUniquePerson(searchParams).then(function (response) {
                vm.name_unqiue = response.name_unique;

                if(!response.name_unique && vm.curPerson.lname.length > 0 && vm.curPerson.fname.length > 0)
                    vm.showUniqueWarning = true

                console.log("Is person name unique: " +  vm.name_unqiue);
                console.log(JSON.stringify(response));
            }).catch(function (err) {
                console.log("error in checking for duplicate person name " + JSON.stringify(err));
            });
        };
    }


})();
