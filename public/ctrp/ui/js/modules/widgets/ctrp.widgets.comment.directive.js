(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentModal', ctrpCommentModal);

  ctrpCommentModal.$inject = ['$compile', '$log', '$mdDialog', 'UserService'];

  function ctrpCommentModal($compile, $log, $mdDialog) {

    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {

      attrs.$observe('uuid', function(newVal) {
        if (newVal) {
          scope.uuid = newVal;
          element.show();
          //TODO: get comment counts and change butotn label
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
        }); //$mdDialog.show
      }); //bind

    } //link




    function commentPanelCtrl($scope, $mdDialog, instanceUuid, field, UserService) {
      $scope.showCommentForm = false;
      $scope.postComment = postComment;
      $scope.comment = {
      content: "",
      username: UserService.getLoggedInUsername(), //TODO: get from UserService
      field: field,
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
