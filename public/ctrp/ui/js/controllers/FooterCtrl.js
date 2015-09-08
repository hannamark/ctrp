/**
 * Created by wangg5 on 9/8/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['UserService', '$scope'];

    function FooterCtrl(UserService, $scope) {

        var vm = this;

        vm.appVersion = 5.0;


    } //FooterCtrl

})();