/**
 * Created by wangg5 on 9/8/15.
 */

(function() {
    'use strict';

    angular.module('ctrpApp')
        .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['UserService', '$scope'];

    function FooterCtrl(UserService, $scope) {

        //var vm = this;
        $scope.appVersion = $scope.$parent.appVersion || '4.0.0';

        if (UserService.isLoggedIn()) {
            UserService.getAppVerFromDMZ().then(function(data) {
                //console.log('retrieved data from dmz: ' + JSON.stringify(data));
                $scope.appVersion = data.appver;
            }).catch(function(err) {
                   console.log('error in retrieving data from dmz utils');
            });
        }

        console.log($scope.$parent.$id);
        console.log($scope.$id);
        console.log($scope.$parent);

    } //FooterCtrl

})();