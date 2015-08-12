/**
 * Created by dullam on 7/20/2015.
 */

(function () {
    'use strict';
    angular.module('ctrpApp')
        .controller('familyDetailCtrl', familyDetailCtrl);
    familyDetailCtrl.$inject = ['familyDetailObj', 'FamilyService', 'familyStatusObj','familyTypeObj','familyRelationshipObj','OrgService','DateService','$timeout','toastr', 'MESSAGES',
        '$scope', 'Common', '$state', '$modal'];
    function familyDetailCtrl(familyDetailObj, FamilyService, familyStatusObj,familyTypeObj,familyRelationshipObj,OrgService,DateService,$timeout,toastr, MESSAGES,
                              $scope, Common, $state, $modal) {
        var vm = this;
        //console.log("in details controller ......."+JSON.stringify(familyDetailObj));
        vm.curFamily = familyDetailObj || {name: ""}; //familyDetailObj.data;
        vm.curFamily = vm.curFamily.data || vm.curFamily;
        vm.familyStatusArr = familyStatusObj.data;
        vm.familyTypeArr = familyTypeObj.data;
        vm.familyRelationshipArr = familyRelationshipObj.data;
        console.log("helo@@@ "+JSON.stringify(familyRelationshipObj));
        //Organization Affiliations
        vm.orgsSearchParams = OrgService.getInitialOrgSearchParams();
        vm.foundOrgs = [];
        vm.selectedOrgs = [];
        vm.savedSelection = []; //save selected organizations
        vm.selectedOrgFilter = "";
        console.log("family: " + JSON.stringify(vm.curFamily));


        vm.updateFamily = function() {
            vm.curFamily.family_memberships_attributes = prepareFamilyMembershipsArr(vm.savedSelection); //append an array of affiliated organizations
            _.each(vm.curFamily.family_memberships_attributes, function (aff, idx) {
                //convert the ISO date to Locale Date String
                aff['effective_date'] = aff.effective_date ? DateService.convertISODateToLocaleDateStr(aff['effective_date']) : '';
                aff['expiration_date'] = aff.expiration_date ? DateService.convertISODateToLocaleDateStr(aff['expiration_date']) : '';
                vm.curFamily.family_memberships_attributes[idx] = aff; //update the family memberships with the correct data format
            });

            //create a nested Person object
            var newFamily = {};
            newFamily.new = vm.curFamily.new || '';
            newFamily.id = vm.curFamily.id || '';
            newFamily.family = vm.curFamily;

            console.log("newFamily is: " + JSON.stringify(newFamily));
            FamilyService.upsertFamily(newFamily).then(function(response) {
                toastr.success('Family ' + vm.curFamily.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating family " + JSON.stringify(vm.curFamily));
            });
        }; // updateFamily

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
                    if (OrgService.indexOfOrganization(vm.savedSelection, org) == -1) {
                        vm.savedSelection.unshift(initSelectedOrg(org));
                    }
                    cb();
                }, function (err) {
                    if (err) {
                        console.log("an error occurred when iterating the organizations");
                    }
                });
            } else {
                //vm.savedSelection.length = 0;
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


        activate()
        /****************** implementations below ***************/
        function activate() {
            appendNewFamilyFlag();
            watchSelectedOrgs();

            //prepare the modal window for existing families
            if (!vm.curFamily.new) {
                prepareModal();
            }
            if (vm.curFamily.family_memberships && vm.curFamily.family_memberships.length > 0) {
                populateFamilyMemberships();
            }
        }

        /**
         * Append a 'new' key to the vm.curFamily to
         * indicate this is a new family, not an family
         * for editing/curating
         *
         */
        function appendNewFamilyFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curFamily.new = true;  //
            }
        }


        function prepareModal() {
            vm.confirmDelete = function (size) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'delete_confirm_template.html',
                    controller: 'ModalInstanceFamilyCtrl as vm',
                    size: size,
                    resolve: {
                        familyId: function() {
                            return vm.curFamily.id;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log("about to delete the familyDetail " + vm.curFamily.id);
                    $state.go('main.families');
                }, function () {
                    console.log("operation canceled")
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

                        if (OrgService.indexOfOrganization(vm.savedSelection, org) == -1) {
                            vm.savedSelection.unshift(initSelectedOrg(org));
                        }
                    });
                } //if

            }, true);
        }


        /**
         * Clean up the organization by keeping the essential fields
         * (org_id, affiliate_status, effective_date, expiration_date)
         *
         *
         * @param savedSelectionArr
         * @returns {Array}
         */
        function prepareFamilyMembershipsArr(savedSelectionArr) {
            var results = [];
            _.each(savedSelectionArr, function (org) {
                var cleanedOrg = {
                    "organization_id": org.id,
                    "family_relationship_id": org.family_relationship_id,
                    "effective_date": org.effective_date,
                    "expiration_date": org.expiration_date,
                    "id" : org.family_membership_id || '',
                    "_destroy" : org._destroy
                };
                results.push(cleanedOrg);
            });
            console.log("log is "+JSON.stringify(results));

            return results;
        } //prepareFamilyMembershipsArr


        /**
         * Initialize the selected organization for its affiliation status, family_membership_effective_date
         * family_memebership_expiration_date, etc
         *
         * @param org
         * @returns org
         */
        function initSelectedOrg(org) {
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
        function populateFamilyMemberships() {
            //find the organization name with the given id
            var findOrgName = function(familyAff, cb) {
                OrgService.getOrgById(familyAff.organization_id).then(function(organization) {
                    var curOrg = {"id" : familyAff.organization_id, "name": organization.name};
                    curOrg.effective_date = DateService.convertISODateToLocaleDateStr(familyAff.effective_date);
                    curOrg.expiration_date = DateService.convertISODateToLocaleDateStr(familyAff.expiration_date);
                    curOrg.family_membership_id = familyAff.id; //family affiliation id
                    curOrg.family_relationship_id=familyAff.family_relationship_id;
                    curOrg._destroy = familyAff._destroy || false;
                    vm.savedSelection.push(curOrg);
                    console.log("@@@@@@ "+JSON.stringify(curOrg));
                }).catch(function(err) {
                    console.log("error in retrieving organization name with id: " + familyAff.organization_id);
                });
                cb();
            };

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };

            async.eachSeries(vm.curFamily.family_memberships, findOrgName, retOrgs);
        } //populateFamilyMemberships


    }

})();