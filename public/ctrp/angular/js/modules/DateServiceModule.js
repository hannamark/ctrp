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


        /**
         * Convert ISO Date format to Locale String (e.g. January 20, 2015)
         *
         * @param isoDate (e.g. '2011-06-02T09:34:29+02:00')
         */
        this.convertISODateToLocale = function(isoDate) {
            function(){
                var D= new Date(isoDate);
                if(!D || +D!==1307000069000){
                    Date.fromISO= function(s){
                        var day, tz,
                            rx=/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
                            p= rx.exec(s) || [];
                        if(p[1]){
                            day= p[1].split(/\D/);
                            for(var i=0,L=day.length;i<L;i++){
                                day[i]=parseInt(day[i], 10) || 0;
                            };
                            day[1]-= 1;
                            day= new Date(Date.UTC.apply(Date, day));
                            if(!day.getDate()) return NaN;
                            if(p[5]){
                                tz= (parseInt(p[5], 10)*60);
                                if(p[6]) tz+= parseInt(p[6], 10);
                                if(p[4]== '+') tz*= -1;
                                if(tz) day.setUTCMinutes(day.getUTCMinutes()+ tz);
                            }
                            return day;
                        }
                        return NaN;
                    }
                    // shim implemented;
                }
                else{
                    Date.fromISO= function(s){
                        return new Date(s);
                    }
                    //native ISO Date implemented;
                }
            }
        }; //convertISODateToLocale

    }

})();