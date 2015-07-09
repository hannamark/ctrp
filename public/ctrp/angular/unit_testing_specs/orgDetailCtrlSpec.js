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

    beforeEach(
        module('ctrpApp')
        //module('Constants');
        //module('LocalCacheModule');
        //module('CommonTools');
        //module('PromiseServiceModule');
        //module('PromiseTimeoutModule');
    );
    beforeEach(module('CommonTools'));
    beforeEach(module('Constants'));
    beforeEach(module('LocalCacheModule'));
    beforeEach(module('PromiseTimeoutModule'));

    beforeEach(inject(function($injector, $controller, $rootScope, Common, $httpBackend) {
            commoner = Common; //$injector.get('Common');
            $controllerConstructor = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            scope = $rootScope.$new();
        spyOn(commoner, 'a2zComparator');

        commoner.a2zComparator = function() {
            return function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            }
        };

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
        expect(ctrl.name).toBe("tony");
    });



});