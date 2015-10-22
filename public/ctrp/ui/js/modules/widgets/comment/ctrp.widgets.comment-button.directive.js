(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentButton', ctrpCommentButton);

  ctrpCommentButton.$inject = ['$log', '$compile', 'CommentService'];

  function ctrpCommentButton($log, $compile, CommentService) {

    var directive = {
      link: link,
      restrict: 'EA',
      //template: '<button class="btn btn-default">New Comment</button>',
      require: '^ctrpCommentPanel'
    };

    return directive;

    /**
    * attrs should include 'uuid', 'field' (?), 'model' (?)
    */
    function link(scope, element, attrs, ctrpCommentPanelCtrl) {
      //$log.info('in comment butotn, model = ' + attrs.model); //TODO: how to get the model?
      scope.uuid = '';
      scope.commentList = [];

      //watcher for the uuid attribute, hide the element if uuid missing
      attrs.$observe('uuid', function(newVal) {
        if (newVal) {
          scope.uuid = newVal;
          element.show();

          element.bind('click', function() {
            $log.info('openning the slide-in panel for comments');
            ctrpCommentPanelCtrl.toggleRight();
          });

          // element.text('New Comment');

          //show the counts on the element label
          getCommentCounts();
          //fetch comments and push them to comment panel scope
          fetchComments(scope.uuid);

        } else {
          scope.uuid = '';
          scope.numComments = 0;
          scope.commentList = [];
          ctrpCommentPanelCtrl.clearCommentList();
          element.hide();
        }
      }, true);



      /**
      * Get the number of comments for the given uuid
      */
      function getCommentCounts() {
        //TODO: include model and field in getting the counts (from the backend)
        CommentService.getCommentCounts(scope.uuid).then(function(data) {
          scope.numComments = data.count;
          if (scope.numComments >= 0) {
            var newHtml = '<span><strong>' + scope.numComments + '</strong></span> <i class="glyphicon glyphicon-comment" style="vertical-align: middle;"></i>';
            element.append($compile(newHtml)(scope));
            // element.html('<span><strong>' + scope.numComments + '</strong></span> <i class="glyphicon glyphicon-comment" style="vertical-align: middle;"></i>');
          }
        });
      } //getCommentCounts


      /**
      * fetch comments for the instanceUuid
      //TODO: include field and model in fetching comments (?)
      */
      function fetchComments(instanceUuid) {
        CommentService.getComments(instanceUuid).then(function(data) {
          console.log('received comments data: ' + JSON.stringify(data));
          scope.commentList = data.comments;
          ctrpCommentPanelCtrl.pushComments(scope.commentList); //push to the panel scope
        }).catch(function(error) {
          $log.error('error in retrieving comments for instance uuid: ' + instanceUuid);
        });
      } //fetchComments


    } //link




  } //ctrpCommentButton


})();
