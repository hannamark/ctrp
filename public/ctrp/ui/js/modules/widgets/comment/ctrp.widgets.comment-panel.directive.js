(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentPanel', ctrpCommentPanel);

  ctrpCommentPanel.$inject = ['$compile', '$log', '$mdSidenav', '$mdUtil'];

  function ctrpCommentPanel($compile, $log, $mdSidenav, $mdUtil) {
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
      }

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
