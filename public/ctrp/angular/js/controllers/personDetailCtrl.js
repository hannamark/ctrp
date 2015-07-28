/**
 * Created by wus4 on 7/6/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['personDetailObj', 'PersonService', 'toastr', 'MESSAGES', 'DateService',
        '$scope', 'Common', 'sourceStatusObj', '$state', '$modal', 'OrgService', '$timeout', 'poAffStatuses', '_'];

    function personDetailCtrl(personDetailObj, PersonService, toastr, MESSAGES, DateService,
                              $scope, Common, sourceStatusObj, $state, $modal, OrgService, $timeout, poAffStatuses, _) {
        var vm = this;
        console.log("in person detail controller now");
        vm.curPerson = personDetailObj || {name: ""}; //personDetailObj.data;
        vm.curPerson = vm.curPerson.data || vm.curPerson;
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        vm.orgsSearchParams = OrgService.getInitialOrgSearchParams();
        vm.foundOrgs = [];
        vm.selectedOrgs = [];
        vm.savedSelection = []; //save selected organizations
        vm.selectedOrgFilter = "";
        console.log("person: " + JSON.stringify(vm.curPerson));

        //update person (vm.curPerson)
        vm.updatePerson = function () {
            vm.curPerson.po_affiliations_attributes = preparePOAffiliationArr(vm.savedSelection); //append an array of affiliated organizations
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

            console.log("newPerson is: " + JSON.stringify(newPerson));

            PersonService.upsertPerson(newPerson).then(function (response) {
                toastr.success('Person ' + vm.curPerson.name + ' has been recorded', 'Operation Successful!');
            }).catch(function (err) {
                console.log("error in updating person " + JSON.stringify(newPerson));
            });
        }; // updatePerson


        var orgsPromise = '';
        vm.searchOrgs = function () {
            if (orgsPromise) {
                $timeout.cancel(orgsPromise);
            }

            orgsPromise = $timeout(function () {
                if (vm.orgsSearchParams.name) {
                    OrgService.searchOrgs(vm.orgsSearchParams).then(function (res) {
                        vm.foundOrgs = res.orgs; //an array
                        // vm.selectedOrgs = res.orgs;
                        // console.log("received orgs: " + JSON.stringify(res));
                    }).catch(function (error) {
                        console.log("error in retrieving orgs: " + JSON.stringify(error));
                    })
                } else {
                    vm.foundOrgs = [];
                }
            }, 250); //250 ms
        }; //searchOrgs


        //delete the affiliated organization from table view
        vm.toggleSelection = function (index) {
            if (index < vm.savedSelection.length) {
                vm.savedSelection[index]._destroy = !vm.savedSelection[index]._destroy;
               // vm.savedSelection.splice(index, 1);
            }
        };// toggleSelection

        //select or de-select all organizations form affiliations
        vm.batchSelect = function (intention) {
            if (intention == "selectAll") {
                //iterate the organizations asynchronously
                async.each(vm.foundOrgs, function (org, cb) {
                    if (!isOrgSaved(vm.savedSelection, org)) {
                        vm.savedSelection.unshift(initSelectedOrg(org));
                    }
                    cb();
                }, function (err) {
                    if (err) {
                        console.log("an error occurred when iterating the organizations");
                    }
                });
            } else {
                vm.savedSelection.length = 0;
                _.each(vm.savedSelection, function(org, index) {
                   vm.savedSelection[index]._destroy = true; //mark it for destroy
                });
            }
        }; //batchSelect


        vm.dateFormat = DateService.getFormats()[0]; // January 20, 2015
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


        activate();


        /****************** implementations below ***************/
        function activate() {
            appendNewPersonFlag();
            watchSelectedOrgs();

            //prepare the modal window for existing people
            if (!vm.curPerson.new) {
                prepareModal();
            }

            if (vm.curPerson.po_affiliations && vm.curPerson.po_affiliations.length > 0) {
                populatePoAffiliations();
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
                    // $state.go('main.personDetail', {personId: vm.curPerson.id});
                });

            } //confirmDelete
        }; //prepareModal


        function watchSelectedOrgs() {
            $scope.$watch(function () {
                return vm.selectedOrgs;
            }, function (newVal, oldVal) {

                if (!!newVal) {
                    angular.forEach(newVal, function (org, idx) {
                        org = JSON.parse(org);

                        if (!isOrgSaved(vm.savedSelection, org)) {
                            vm.savedSelection.unshift(initSelectedOrg(org));
                        }
                    });
                } //if

            }, true);
        }


        /**
         * Check if targetOrgsArr contains orgObj by checking the 'id' field
         *
         * @param targetOrgsArr
         * @param orgObj
         * @returns {boolean}
         */
        function isOrgSaved(targetOrgsArr, orgObj) {
            var exists = false;
            _.each(targetOrgsArr, function (org, idx) {
                if (org.id == orgObj.id) { //what if the user deletes the po_affiliation accidentally???
                    exists = true;  //exists and not targeted for destroy
                    return exists;
                }
            });
            return exists;
        } //isOrgSaved


        /**
         * Clean up the organization by keeping the essential fields
         * (org_id, affiliate_status, effective_date, expiration_date)
         *
         *
         * @param savedSelectionArr
         * @returns {Array}
         */
        function preparePOAffiliationArr(savedSelectionArr) {
            var results = [];
            _.each(savedSelectionArr, function (org) {
                var cleanedOrg = {
                    "organization_id": org.id,
                    "po_affiliation_status_id": org.po_affiliation_status_id,
                    "effective_date": org.effective_date,
                    "expiration_date": org.expiration_date,
                    "id" : org.po_affiliation_id || '',
                    "_destroy" : org._destroy
                };
                results.push(cleanedOrg);
            });

            return results;
        } //preparePOAffiliationArr


        /**
         * Initialize the selected organization for its affiliation status, po_effective_date
         * po_expiration_date, etc
         *
         * @param org
         * @returns org
         */
        function initSelectedOrg(org) {
            org.po_affiliation_status_id = '';
            org.effective_date = new Date(); //today as the effective date
            org.expiration_date = "";
            org.opened_effective = false;
            org.opened_expiration = false;
            org._destroy = false;

            return org;
        } //initSelectedOrg


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
                    curOrg._destroy = poAff._destroy || false;
                    vm.savedSelection.push(curOrg);
                }).catch(function(err) {
                    console.log("error in retrieving organization name with id: " + poAff.organization_id);
                });
                cb();
            };

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };

            async.eachSeries(vm.curPerson.po_affiliations, findOrgName, retOrgs);
        } //populatePoAffiliations


    }


})();
