/**
 * Created by wus4 on 7/6/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['personDetailObj', 'PersonService', 'toastr', 'MESSAGES',
        '$scope', 'Common', 'sourceStatusObj', '$state', '$modal', 'OrgService', '$timeout'];

    function personDetailCtrl(personDetailObj, PersonService, toastr, MESSAGES,
                           $scope, Common, sourceStatusObj, $state, $modal, OrgService, $timeout) {
        var vm = this;
        vm.curPerson = personDetailObj || {name: ""}; //personDetailObj.data;
        vm.curPerson = vm.curPerson.data || vm.curPerson;
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        //console.log('received personDetailObj: ' + JSON.stringify(personDetailObj));
        vm.orgsSearchParams = OrgService.getInitialOrgSearchParams();
        console.log("search params: " + JSON.stringify(vm.orgsSearchParams));


        //update person (vm.curPerson)
        vm.updatePerson = function() {
            PersonService.upsertPerson(vm.curPerson).then(function(response) {
                toastr.success('Person ' + vm.curPerson.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating person " + JSON.stringify(vm.curPerson));
            });
        }; // updatePerson


        vm.foundOrgs = [];
        var orgsPromise = '';
        vm.searchOrgs = function() {
            if (orgsPromise) {
                $timeout.cancel(orgsPromise);
            }

            orgsPromise = $timeout(function() {
                if (vm.orgsSearchParams.name) {
                    OrgService.searchOrgs(vm.orgsSearchParams).then(function(res) {
                        vm.foundOrgs = res.orgs; //an array
                        console.log("received orgs: " + JSON.stringify(res));
                    }).catch(function(error) {
                        console.log("error in retrieving orgs: " + JSON.stringify(error));
                    })
                } else {
                    vm.foundOrgs = [];
                }
            }, 250); //250 ms
        }; //searchOrgs



        activate()


        /****************** implementations below ***************/
        function activate() {
            appendNewPersonFlag();

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
                        personId: function() {
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



    }


})();