(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpComment', ctrpComment);

  ctrpComment.$inject = ['$compile', '$log', 'CommentService', 'UserService', '$mdSidenav', '$mdUtil'];

  function ctrpComment($compile, $log, CommentService, UserService, $mdSidenav, $mdUtil) {
    var directive = {
      link: link,
      restrict: 'E',
      scope: {
        instanceUuid: '@',
        buttonType: '@', //icon or btn
        field: '@',
        model: '@' 
      },
      controller: commentCtrl,
      controllerAs: 'commentView',
      templateUrl: '/ctrp/ui/js/modules/widgets/ctrp-comment-template.html',
    };

    return directive;

    function link(scope, element, attrs) {
      scope.commentList = [];
      //element.text('hello world from comment directive');
      attrs.$observe('instanceUuid', function(newVal) {
        if (newVal) {
          scope.uuid = newVal;
          element.show();
          //show the counts on the element label
          getCommentCounts();
        } else {
          scope.uuid = '';
          scope.numComments = 0;
          scope.commentList = [];
          element.hide();
        }
      }, true);



      /**
      * Get the number of comments for the given uuid
      */
      function getCommentCounts() {
        //include field in the url in getting the counts (from the backend)
        var btnTemplate = '<span>Comment</span>';
        CommentService.getCommentCounts(scope.uuid, attrs.field).then(function(data) {
          scope.numComments = data.count;
          if (scope.numComments > 0) {
            btnTemplate.replace('Comment', scope.numComments);
            // element.html('<span><strong>' + scope.numComments + '</strong></span> <i class="glyphicon glyphicon-comment" style="vertical-align: middle;"></i>');
          }
          // element.append($compile(btnTemplate)(scope));
        });
      } //getCommentCounts


    } //link

    function commentCtrl($scope, $element, $attrs) {
      $log.info('in the comment directive!!');
      var vm = this;
      vm.commentList = [];
      vm.showCommentForm = false;
      vm.comment = {
        content: "", username: UserService.getLoggedInUsername(),
        field: $scope.field, model: $scope.model || "",
        instance_uuid: $scope.instanceUuid,
        parent_id: ""
      };

      //functions:
      vm.toggleRight = buildToggler('right');
      vm.closeSideNav = closeSideNav;
      vm.postComment = postComment;
      vm.fetchComments = fetchComments;
      vm.toggleCommentFormShown = toggleCommentFormShown;


      activate();

      function activate() {
        watchInstanceUuid();
      }


      //implementations below
      function watchInstanceUuid() {
        $scope.$watch(function() {return $scope.instanceUuid;}, function(newVal, oldVal) {
          if (newVal) {
            fetchComments();
          }
        }, true);
      } //watchInstanceUuid

      function fetchComments() {
        //include the field in the url in fetching comments
        CommentService.getComments($scope.instanceUuid, $scope.field).then(function(data) {
          vm.commentList = data.comments;
        }).catch(function(error) {
          $log.error('error in retrieving comments for instance uuid: ' + instanceUuid);
        });
      } //fetchComments

      function postComment() {
        CommentService.createComment(vm.comment).then(function(response) {
          vm.comment.content = '';
          if (response.server_response.status == 201) {
            fetchComments(); //fetch the latest comments
          }
          // console.log('created comment response: ' + JSON.stringify(response));
        }).catch(function(err) {
          $log.error('error in creating comments: ' + JSON.stringify($scope.comment));
        });
      } //postComment

      //TODO: edit and delete comment

      function toggleCommentFormShown() {
        vm.showCommentForm = !vm.showCommentForm;
      }

    } //commentCtrl

    function buildToggler(navId) {
      var debounceFn = $mdUtil.debounce(function() {
        $mdSidenav(navId).toggle().then(function() {
          $log.info('toggled ' + navId + ' is completed');
        });
      }, 300);
      return debounceFn;
    }

    function closeSideNav() {
      $mdSidenav('right').close().then(function() {
        $log.info('closed RIGHT side nav');
      });
    }

  } //ctrpComment

})();
