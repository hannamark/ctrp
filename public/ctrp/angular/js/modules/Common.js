/**
 * Created by wangg5 on 6/23/15.
 */

(function() {

    'use strict';

    angular.module('CommonTools', [])
        .factory('Common', Common);

    Common.$inject = [];

    function Common() {

        var commonTools = {
            a2zComparator : a2zComparator
        };


        return commonTools;


        /********************* implementations below ****************************/

        /**
         * A-Z Comparator for sorting an array of JSON objects
         * by the 'name' field in each JSON object
         *
         */
        function a2zComparator() {
            var compare = function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            }

            return compare;
        } //a2zComparator


    }

})();