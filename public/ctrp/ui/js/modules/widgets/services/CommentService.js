(function () {
    'use strict';

    angular.module('ctrpApp')
        .factory('CommentService', CommentService);

    CommentService.$inject = ['URL_CONFIGS', '$http', '$log', '_', 'Common', 'PromiseTimeoutService', '$q'];

    function CommentService(URL_CONFIGS, $http, $log, _, Common, PromiseTimeoutService, $q) {
      //TODO: data services for comments

      return {
        getCommentCounts: getCommentCounts,
        createComment: createComment,
        getComments: getComments,
        editComment: editComment,
        deleteComment: deleteComment
      };

      ///// implementations

      function getCommentCounts(instanceUuid) {
        if (instanceUuid) {
          var url = URL_CONFIGS.COMMENTS.COUNTS_FOR_INSTANCE.replace(/\s*\{.*?\}\s*/g, instanceUuid);
          $log.info('get comment counts with url: ' + url);
          return PromiseTimeoutService.getData(url);
        }
        var deferred = $q.defer();
        deferred.reject(null);
        return deferred.promise; //failed promise
      } //getCommentCounts

      /**
      * POST commentObj to API
      */
      function createComment(commentObj) {
        $log.info('posting comment: ' + JSON.stringify(commentObj));
        $log.info('url: ' + URL_CONFIGS.COMMENTS.CREATE);
        return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.COMMENTS.CREATE, commentObj);
      } //createComment


      function getComments(instanceUuid) {
        if (instanceUuid) {
          var url = URL_CONFIGS.COMMENTS.FOR_INSTANCE.replace(/\s*\{.*?\}\s*/g, instanceUuid);
          $log.info('get comment list with url: ' + url);
          return PromiseTimeoutService.getData(url);
        }
        var deferred = $q.defer();
        deferred.reject(null);
        return deferred.promise; //failed promise
      } //getComments

      function editComment(editedCommentObj) {
        //TODO: check commentId
      } //editComment

      function deleteComment(commentId) {

      } //deleteComment

    }

})();
