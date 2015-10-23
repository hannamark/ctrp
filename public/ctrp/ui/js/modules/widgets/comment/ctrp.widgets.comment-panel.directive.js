(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentPanel', ctrpCommentPanel);

  ctrpCommentPanel.$inject = ['$compile', '$log', '$mdSidenav', '$mdUtil', 'UserService'];

  function ctrpCommentPanel($compile, $log, $mdSidenav, $mdUtil, UserService) {
    var directiveObj = {
      restrict: 'EA',
      transclude: true,
      scope: {},
      link: link,
      templateUrl: '/ctrp/ui/js/modules/widgets/comment/ctrpCommentPanelTemplate.html',
//      controllerAs: 'commentPanelView',
      controller: panelController
    };
    return directiveObj;

    function link(scope, element, attrs) {

    } //link

    function panelController($scope, $element, $attrs) {
      this.toggleRight = buildToggler('right');
      this.closeSideNav = closeSideNav;
      $scope.closeSideNav = closeSideNav;
      $scope.showCommentForm = false;

      $scope.comment = {
      content: "",
      fullname: "", //TODO: get user full name from UserService
      model: "", //TODO: get model name
      username: UserService.getLoggedInUsername(),
      field: '',
      instance_uuid: '',
      parent_id: ''
      };


      /**
      * empty the commentList
      */
      this.clearCommentList = function() {
        $scope.commentList = [];
      };

      /**
      * params commentList, array of comment objects
      */
      this.pushComments = function(commentList) {
        $scope.commentList = commentList;
      };

      this.setInstanceUuid = function(uuid) {
        $scope.comment.instance_uuid = uuid;
      };

      this.setField = function(fieldName) {
        $scope.comment.field = fieldName;
      };

      //TODO: show, create comments...

      /* clean up the scope */
      $scope.$on('$destroy', function() {
        $scope.commentList = [];
      });


    } //panelController



    //// helper functions below
    /* toggler for the panel */
    function buildToggler(navId) {
      var debounceFn = $mdUtil.debounce(function() {
        $mdSidenav(navId).toggle().then(function() {
          $log.info('toggled ' + navId + ' is completed');
        });
      }, 300);
      return debounceFn;
    }

    /* close the slide-in panel */
    function closeSideNav() {
      $mdSidenav('right').close().then(function() {
        $log.info('closing right slide-in panel');
      });
    }


  } //ctrpCommentPanel

})();
