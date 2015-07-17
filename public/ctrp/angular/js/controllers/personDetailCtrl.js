/**
 * Created by wus4 on 7/6/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['personDetailObj', 'PersonService', 'toastr', 'MESSAGES', 'DateService',
        '$scope', 'Common', 'sourceStatusObj', '$state', '$modal', 'OrgService', '$timeout'];

    function personDetailCtrl(personDetailObj, PersonService, toastr, MESSAGES, DateService,
                              $scope, Common, sourceStatusObj, $state, $modal, OrgService, $timeout) {
        var vm = this;
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
            angular.forEach(vm.curPerson.po_affiliations_attributes, function(aff, idx) {
                console.log(typeof aff.expiration_date);

                //convert the ISO date to Locale Date String
                aff['effective_date'] = DateService.convertISODateToLocaleDateStr(aff['effective_date']);
                aff['expiration_date'] = DateService.convertISODateToLocaleDateStr(aff['expiration_date']);
                console.log(JSON.stringify(aff));
                vm.curPerson.po_affiliations_attributes[idx] = aff;
            });

            PersonService.upsertPerson(vm.curPerson).then(function (response) {
                toastr.success('Person ' + vm.curPerson.name + ' has been recorded', 'Operation Successful!');
            }).catch(function (err) {
                console.log("error in updating person " + JSON.stringify(vm.curPerson));
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
        vm.deleteSelection = function(index) {
            if (index < vm.savedSelection.length) {
                vm.savedSelection.splice(index,1);
            }
        };// deleteSelection

        //select or de-select all organizations form affiliations
        vm.batchSelect = function(intention) {

            if (intention == "selectAll") {
                vm.savedSelection = vm.foundOrgs.slice(); //clone
            } else {
                vm.savedSelection.length = 0;
            }

        }; //batchSelect

        vm.dateFormat = DateService.getFormats()[0]; // January 20, 2015
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function($event, index, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == "effective") {
                vm.savedSelection[index].opened_effective = true;
            } else {
                vm.savedSelection[index].opened_expiration = true;
            }


        }; //openCalendar



        activate()


        /****************** implementations below ***************/
        function activate() {
            appendNewPersonFlag();
            watchSelectedOrgs();

            //prepare the modal window for existing people
            if (!vm.curPerson.new) {
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
                          //  org.affiliate_status = "";
                            org.effective_date = new Date(); //if not existent
                            org.expiration_date = "";
                            org.opened_effective = false;
                            org.opened_expiration = false;
                            vm.savedSelection.push(org);
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
            for (var i = 0; i < targetOrgsArr.length; i++) {
                var curOrg = targetOrgsArr[i];
                if (curOrg.id == orgObj.id) {
                    exists = true;
                    break;
                }
            }
            return exists;
        }


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
            angular.forEach(savedSelectionArr, function (org, index) {

                //cleaned fields of Organization object
                var cleanedOrg = {
                    "organization_id": org.id,
                  //  "affiliate_status": org.affiliate_status,
                    "effective_date": org.effective_date,
                    "expiration_date": org.expiration_date
                };
                results.push(cleanedOrg);
            });

            return results;
        } //preparePOAffiliationArr


    }


})();