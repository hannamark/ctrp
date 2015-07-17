/**
 * Created by wangg5 on 7/17/15.
 */

(function() {

    'use strict';
    angular.module('DateServiceMod', [])

        .service('DateService', DateService);

        DateService.$inject = [];

    function DateService() {

        var dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        //'MMMM dd, yyyy',
        var formats = ['MMMM dd, yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

        this.getDateOptions = function() {
            return dateOptions;
        }; //getDateOptions


        this.getFormats = function() {
            return formats;
        }; //getFormats


        this.tomorrow = function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        };


        this.today = function() {
            return new Date();
        }; //today

    }

})();