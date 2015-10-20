(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentModal', ctrpCommentModal);

  ctrpCommentModal.$inject = ['$compile', '$log', '$mdDialog'];

  function ctrpCommentModal($compile, $log, $mdDialog) {

    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      console.log('uuid is: ' + attrs.uuid);
      attrs.$observe('uuid', function(newVal) {
        if (newVal) {
          scope.uuid = newVal;
        }

      }, true);

      //TODO: get counts and change button label

      element.bind('click', function(e) {
        $mdDialog.show({
          templateUrl: '/ctrp/ui/js/modules/widgets/ctrp.widgets.comment.directive.template.html',
          targetEvent: e,
          locals: {
            instanceUuid: attrs.uuid
          },
          clickOutsideToClose: true,
          scope: scope.$new(), //create a child scope based on the directive's scope
          controller: commentPanelCtrl
        }); //$mdDialog.show
      }); //bind
    } //link


    function commentPanelCtrl($scope, $mdDialog, instanceUuid) {
      $scope.showCommentForm = false;
      $scope.postComment = postComment;
      $scope.comment = {
      content: "xxx",
      username: "userX",
      field: "unknown_field",
      instance_uuid: instanceUuid,
      parent_id: ''
      };

      console.log('dialog received instance uuid: ' + instanceUuid);
      console.log('accessing the parent scope for the uuid: ' + $scope.$parent.uuid);

      $scope.toggleCommentFormShown = function() {
        $scope.showCommentForm = !$scope.showCommentForm;
      };
      $scope.close = function() {
        $mdDialog.hide();
      };

      /*
      dataservices.getCommentsByParentUUID(instanceUuid).then(function(data) {
        //vm.commentList = data;
        var numComments = data.length;
        $scope.commentList = data;

      });
      */



      function postComment() {
        /*
        dataservices.postComment($scope.comment).then(function(newCommentList) {
          $scope.commentList = newCommentList;
          $scope.comment.content = '';
        }).catch(function(err) {
          console.log('new list of comments error!!');
        });
        */
      } //postComment

    } //commentPanelCtrl



  }

})();
