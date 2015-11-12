/**
 * Created by wangg5 on 6/30/15.
 */

'use strict';

describe('Testing Organization Details Controller', function() {
    var $controllerConstructor;
    var $httpBackend;
    var scope;
    var commoner;
    var ctrl;

    beforeEach(module('ctrpApp'));
    beforeEach(module('CommonTools'));
    beforeEach(module('Constants'));
    beforeEach(module('LocalCacheModule'));
    beforeEach(module('ctrp.module.PromiseTimeoutService'));
    beforeEach(module('LocalCacheModule'));

    beforeEach(inject(function($injector, $controller, $rootScope, Common, $httpBackend, LocalCacheService) {
            commoner = Common; //$injector.get('Common');
            $controllerConstructor = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            scope = $rootScope.$new();
        spyOn(commoner, 'a2zComparator');

        //build the controller
        ctrl = $controllerConstructor('orgDetailCtrl', {
            Common : commoner,
            $scope : scope,
            orgDetailObj : '',
            countryList: '',
            sourceStatusObj: ''
        });



    }));



    it('should have three numbers in the orgDetailCtrl', function() {
        expect(ctrl.numbers.length).toBe(3);
    });

    it('name should be tony in the orgDetailCtrl', function() {
        expect(ctrl.name).toBe("tony");
    });

});