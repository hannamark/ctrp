(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentModal', ctrpCommentModal);

  ctrpCommentModal.$inject = ['$compile', '$log', 'CommentService', '$mdDialog', 'UserService'];

  function ctrpCommentModal($compile, $log, CommentService, $mdDialog) {

    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {

      attrs.$observe('uuid', function(newVal) {
        if (newVal) {
          scope.uuid = newVal;
          element.show();
          getCommentCounts();
        } else {
          scope.uuid = '';
          element.hide();
        }
      }, true);

      element.bind('click', function(e) {
        $mdDialog.show({
          templateUrl: '/ctrp/ui/js/modules/widgets/ctrp.widgets.comment.directive.template.html',
          targetEvent: e,
          locals: {
            instanceUuid: attrs.uuid,
            field: attrs.field || ''
          },
          clickOutsideToClose: true,
          scope: scope.$new(), //create a child scope
          controller: commentPanelCtrl
        }).then(getCommentCounts);
      }); //bind click event


      function getCommentCounts() {
        CommentService.getCommentCounts(scope.uuid).then(function(data) {
          scope.numComments = data.count;
          if (scope.numComments > 0) {
            // element.text(scope.numComments);
            element.html('<span><strong>' + scope.numComments + '</strong></span> <i class="glyphicon glyphicon-comment" style="vertical-align: middle;"></i>');
          }
        });
      } //getCommentCounts

    } //link







    function commentPanelCtrl($scope, $mdDialog, instanceUuid, field, UserService, CommentService) {
      $scope.showCommentForm = false;
      $scope.postComment = postComment;
      $scope.commentList = []; //container of comments

      $scope.comment = {
      content: "",
      fullname: "", //TODO: get user full name from UserService
      model: "", //TODO: get model name
      username: UserService.getLoggedInUsername(),
      field: field || '',
      instance_uuid: instanceUuid,
      parent_id: ''
      };

      console.log('dialog received instance uuid: ' + instanceUuid);
      console.log('dialog received field name: ' + field);
      console.log('accessing the parent scope for the uuid: ' + $scope.$parent.uuid);

      $scope.toggleCommentFormShown = function() {
        $scope.showCommentForm = !$scope.showCommentForm;
      };
      $scope.close = function() {
        $mdDialog.hide();
      };

      activate();


      function activate() {
        fetchComments();
      }

      function fetchComments() {
        CommentService.getComments(instanceUuid).then(function(data) {
          console.log('received comments data: ' + JSON.stringify(data));
          $scope.commentList = data.comments;
        }).catch(function(error) {
          $log.error('error in retrieving comments for instance uuid: ' + instanceUuid);
        });
      } //fetchComments

      function postComment() {
        CommentService.createComment($scope.comment).then(function(response) {
          $scope.comment.content = '';
          if (response.server_response.status == 201) {
            fetchComments(); //fetch the latest comments
          }
          // console.log('created comment response: ' + JSON.stringify(response));
        }).catch(function(err) {
          $log.error('error in creating comments: ' + JSON.stringify($scope.comment));
        });
      } //postComment

      //TODO: edit and delete comment



    } //commentPanelCtrl



  }

})();
