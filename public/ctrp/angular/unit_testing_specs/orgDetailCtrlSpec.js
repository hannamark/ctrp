/**
 * Created by wangg5 on 6/30/15.
 */

'use strict';

describe('Testing Organization Details Controller', function() {
    var $controllerConstructor;
    var scope;
    var Common;

    beforeEach(module('Constants'));
    beforeEach(module('LocalCacheModule'));
    beforeEach(module('ctrpApp'));
    beforeEach(module('CommonTools'));
    beforeEach(module('PromiseServiceModule'));


    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();

        var $injector = angular.injector(['CommonTools']); //module name
        /*
        Common = function() {
            return $injector.get('Common');
        }

        console.log('injected Common: ' + JSON.stringify(Object.keys(Common)));
        */

    }));



    it('should have three numbers in the orgDetailCtrl', function() {


        var ctrl = $controllerConstructor('orgDetailCtrl', {
//            Common : Common,
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