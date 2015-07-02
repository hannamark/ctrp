/**
 * Created by wangg5 on 7/2/15
 *
 * Improved PromiseService with $timeout and $resource
 *
 */



(function () {
    'use strict';
    angular.module('PromiseServiceModule', ['ngResource'])
        .service('PromiseWithTimeoutService', PromiseWithTimeoutService);

    PromiseWithTimeoutService.$inject = ['$q', '$resource', '$timeout', '$log'];

    function PromiseWithTimeoutService($q, $resource, $timeout, $log) {


        var services = {
            createResource: createResource
        };

        return services;


        /**
         *
         * @param config (config.actions: get, post, update, delete, etc
         *                config.options,
         *                config.url
         *                )
         */
        function createResource(config) {
            var actions = config.actions || {};
            var outstanding = [];
            var resource = $resource(config.url, config.options, actions);

            angular.forEach(Object.keys(actions), function(action, index) {
                var method = resource[action];
                resource[action] = function() {
                    var deferred = $q.defer();
                    var promise = method.apply(null, arguments).$promise; //promise object

                    abortablePromiseWrap(promise, deferred, outstanding); //abort promise

                    var abortFn = function() {
                        deferred.reject('abort');
                    };

                    return {
                      promise: deferred.promise,
                      abort: abortFn
                    };
                };
            });

            resource.abortAll = function() {
                _.invoke(outstanding, 'reject', 'Aborted all');
                outstanding = [];
            };

            return resource;

        } //createResource



        function abortablePromiseWrap(promise, deferred, outstanding) {
            promise.then(function() {
                deferred.resolve.apply(deferred, arguments);
            })
                .catch(function() {
                deferred.reject.apply(deferred, arguments);
            })
                .finally(function() {
                    array.remove(outstanding, deferred);
                });
            outstanding.push(deferred);
        }







    } //PromiseWithTimeoutService

})();
