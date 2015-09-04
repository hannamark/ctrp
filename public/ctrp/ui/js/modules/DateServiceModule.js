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

        var monthsDict = {
          1 : 'January', 2 : 'February', 3 : 'March', 4 : 'April',
          5 : 'May', 6 : 'June', 7 : 'July', 8 : 'August', 9 : 'September',
          10 : 'October', 11 : 'November', 12 : 'December'
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


        /**
         * Convert ISO Date format to Locale String (e.g. January 20, 2015)
         *
         * @param isoDate (e.g. '2011-06-02T09:34:29+02:00')
         */
        this.convertISODateToLocaleDateStr = function(isoDate) {
            var dateStr = '';
            if (!!isoDate) {
                var date = new Date(isoDate);
                var day = date.getDate();
                var year = date.getFullYear();
                var monthNum = date.getMonth() + 1;
                var month = monthsDict[monthNum];
                dateStr = month + " " + day + ", " + year;
            }
            return dateStr;
        }; //convertISODateToLocale

    }

})();