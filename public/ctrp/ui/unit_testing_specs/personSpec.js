/**
 * Created by wangg5 on 6/30/15.
 */

//'use strict';
//
//describe('Testing person service', function() {
//
//    beforeEach(function() {
//        module('Constants');
//        module('LocalCacheModule');
//        module('CommonTools');
//        module('ctrp.module.PromiseService');
//        module('ctrpApp');
//
//        // Provide will help us create fake implementations for our dependencies
//        module(function($provide) {
//
//            // Fake StoreService Implementation returning a promise
//            $provide.value('PersonService', {
//                getAllPeople: function() {
//                    return {
//                        then: function(callback) {return callback([{ some: "thing", hoursInfo: {isOpen: true}}]);}
//                    };
//                },
//                updatePerson: function() { return null;}
//            });
//
//            // Fake Contact Implementation return an empty object
//            $provide.value('Contact', {
//                retrieveContactInfo: function() {
//                    return {
//                        then: function(callback) { return callback({});}
//                    };
//                }
//            });
//
//            return null;
//        }); //$provide
//    });
//
//    beforeEach(function() {
//        inject(function($injector, $rootScope, Common, $httpBackend) {
//
//        });
//    });
//
//
//
//    it('should have three numbers in the orgDetailCtrl', function() {
//
//        var ctrl = $controllerConstructor('orgDetailCtrl', {
//            Common : Common,
//            $scope : scope,
//            orgDetailObj : {data: ''},
//            countryList: {data : ''},
//            sourceStatusObj: {data: ''}
//        });
//        expect(ctrl.numbers.length).toBe(3);
//    });
//
//    /*
//     it('Common is truthy or not', function() {
//     expect(Common).toBeTruthy();
//     });
//     */
//
//
//
//});


describe('Person service testing', function() {
    'use strict';
    var personService;
    var queue;

    beforeEach(module('ctrpApp'));

    describe('person service unit test', function() {
        beforeEach(inject(function() {
                var $injector = angular.injector(['ctrpApp']);
                personService = $injector.get('PersonService');
            //    personService = PersonService;

        }
        ));

        it('Should have called getAllPeople', inject(function($q, personService) {
            var deferred = $q.defer();
            spyOn(personService, 'getAllPeople').andReturn(deferred.promise);

            expect(personService.getAllPeople).toHaveBeenCalled();
        }));

    });


});