(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('CommentService', CommentService);

    CommentService.$inject = ['URL_CONFIGS', '$log', '_', 'Common', 'PromiseTimeoutService'];

    function CommentService(URL_CONFIGS, $log, _, Common, PromiseTimeoutService) {
      //TODO: data services for comments

    }

})();
