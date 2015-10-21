(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpComment', ctrpComment);

  ctrpComment.$inject = ['$compile', '$log', '$mdSidenav', '$mdUtil'];

  function ctrpComment($compile, $log, $mdSidenav, $mdUtil) {
    var directive = {
      link: link,
      restrict: 'E',
      scope: {
        instanceUuid: '@',
        buttonType: '@', //icon or btn
        field: '@'
      },
      controller: commentCtrl,
      controllerAs: 'commentView',
      templateUrl: '/ctrp/ui/js/modules/widgets/ctrp-comment-template.html',
    };

    return directive;

    function link(scope, element, attrs) {
      //element.text('hello world from comment directive');
    } //link

    function commentCtrl($scope, $log) {
      $log.info('in the comment directive!!');
      var vm = this;
      vm.commentList = [];
      vm.showCommentForm = false;
      vm.comment = {content: "", username: "", field: "", instance_uuid: $scope.instanceUuid, parent_id: ""};

      //functions:
      vm.toggleRight = buildToggler('right');
      vm.closeSideNav = closeSideNav;
      vm.postComment = postComment;
      vm.toggleCommentFormShown = toggleCommentFormShown;


      activate();

      function activate() {
        watchInstanceUuid();
      }


      //implementations below

      function watchInstanceUuid() {
        $scope.$watch(function() {return $scope.instanceUuid;}, function(newVal, oldVal) {
          if (newVal) {
            //TODO: use data service to fetch the number of comments for the instanceUuid
            console.log('received instance uuid: ' + $scope.instanceUuid);
            // dataservices.getCommentsByParentUUID($scope.instanceUuid).then(function(data) {
            //   vm.commentList = data;
            //   console.log('received comments from services: ' + JSON.stringify(data));
            // })
            // .catch(function(err) {
            //   console.log('error in getting comments ' + err);
            // });
          }
        }, true);
      } //watchInstanceUuid

      function postComment() {
        dataservices.postComment(vm.comment).then(function(newCommentList) {
          vm.commentList = newCommentList;
          /*
          Object.keys(vm.comment).forEach(function(key, idx) {
            vm.comment[key] = '';
          });
          */

        }).catch(function(err) {
          console.log('new list of comments error!!');
        });
      }

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
