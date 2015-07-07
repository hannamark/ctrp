/**
 * Created by wus4 on 7/6/15.
 */

(function () {
    'use strict';

    angular.module('ctrpApp')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['personDetailObj', 'PersonService', 'toastr', 'MESSAGES',
        '$scope', 'Common', 'sourceStatusObj', '$state', '$modal'];

    function personDetailCtrl(personDetailObj, PersonService, toastr, MESSAGES,
                           $scope, Common, sourceStatusObj, $state, $modal) {
        var vm = this;
        vm.curPerson = personDetailObj || {name: ""}; //personDetailObj.data;
        vm.curPerson = vm.curPerson.data || vm.curPerson;
        vm.sourceStatusArr = sourceStatusObj.data;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        //console.log('received personDetailObj: ' + JSON.stringify(personDetailObj));

        //update person (vm.curPerson)
        vm.updatePerson = function() {
            PersonService.upsertPerson(vm.curPerson).then(function(response) {
                toastr.success('Person ' + vm.curPerson.name + ' has been recorded', 'Operation Successful!');
            }).catch(function(err) {
                console.log("error in updating person " + JSON.stringify(vm.curPerson));
            });
        }; // updatePerson



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