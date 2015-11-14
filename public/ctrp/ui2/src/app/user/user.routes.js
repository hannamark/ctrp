/**
 * Configure routes for person component
 */

(function() {
    'use strict';
    angular.module('ctrp.app.user').config(userRoutes);

    userRoutes.$inject = ['$stateProvider'];
    function userRoutes($stateProvider) {
        $stateProvider
            .state('main.test_user', {
                url: '/user_test',
                templateUrl: 'app/user/test_user.html'
            })

            .state('main.sign_in', {
                    url: '/sign_in',
                    templateUrl: 'app/user/sign_in.html',
                    controller: 'userCtrl as userView',
                    /*
                    resolve: {
                        UserService: 'UserService',
                        loginBulletin: function(UserService, $q) {

                            return UserService.getLoginBulletin();
                        }
                    },
                    onEnter: function($state, UserService, toastr) {
                        if (UserService.isLoggedIn()) {
                            toastr.warning('Redirected ...', 'You are already signed in')
                            $state.go('main.defaultContent');
                        }
                    },
                    */
                    ncyBreadcrumb: {
                        parent: '',
                        label: 'CTRP Sign In',
                        skip: true,
                    }
                })
                .state('main.signup', {
                    url: '/sign_up',
                    templateUrl: 'app/user/sign_up.html',
                    controller: 'userSignupCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    }
                })

                .state('main.welcome_signup', {
                    url: '/welcome_signup',
                    templateUrl: 'app/user/welcome_signup.html'
                })

                .state('main.gsa', {
                    url: '/gsa',
                    templateUrl: 'app/user/gsa.html',
                    controller: 'gsaCtrl as gsaView',
                    resolve: {
                        UserService: 'UserService',
                        gsaObj : function(UserService) {
                            return UserService.getGsa();
                        },
                    }
                })

                .state('main.users', {
                    url: '/users',
                    templateUrl: 'app/user/user_list.html',
                    controller: 'userListCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    }
                })
                .state('main.changePassword', {
                    url: '/change_password',
                    templateUrl: 'app/user/changePassword.html',
                    controller: 'userChangePasswordCtrl as userView',
                    resolve: {
                        UserService: 'UserService'
                    },
                    username : function(UserService) {
                        return UserService.getLoggedInUsername();
                    }
                })

                .state('main.userDetail', {
                    url: '/userDetail/username',
                    templateUrl: 'app/user/userDetails.html',
                    controller: 'userDetailCtrl as userDetailView',
                    resolve: {
                        UserService: 'UserService',
                        GeoLocationService : 'GeoLocationService',
                        countryList : function(GeoLocationService) {
                            return GeoLocationService.getCountryList();
                        },
                        userDetailObj : function(UserService) {
                            return UserService.getUserDetailsByUsername();
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        label: 'User Profile'
                    }
                });
    } //userRoutes

})();
