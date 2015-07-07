/**
 * Created by wangg5 on 6/30/15.
 */

'use strict';

describe('Testing Organization Details Controller', function() {
    var $controllerConstructor;
    var $httpBackend;
    var scope;
    var Common;

    beforeEach(function() {
       module('Constants');
        module('LocalCacheModule');
        module('CommonTools');
        module('PromiseServiceModule');
        module('ctrpApp');
        inject(function($injector, $rootScope, Common, $httpBackend) {
           // Common = $injector.get('Common');
            $controllerConstructor = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            scope = $rootScope.$new();
            Common.a2zComparator = function() {
                var compare = function(a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                };
                return compare;
            };
            scope.$injector = ['Common'];
        })
    });



    it('should have three numbers in the orgDetailCtrl', function() {

        var ctrl = $controllerConstructor('orgDetailCtrl', {
            Common : Common,
            $scope : scope,
            orgDetailObj : {data: ''},
            countryList: {data : ''},
            sourceStatusObj: {data: ''}
        });
        expect(ctrl.numbers.length).toBe(3);
    });

    /*
    it('Common is truthy or not', function() {
        expect(Common).toBeTruthy();
    });
    */



});