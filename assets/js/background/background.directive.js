'use strict';

/**
 * @ngdoc directive
 * @name soundsApp.directive:playlist
 * @description
 * # playlist
 */
(function() {

  angular.module('backgroundModule').directive('background', background);

  function background() {
    return {
      template: '<div></div>',
      restrict: 'EA',
      scope: {},
      controller: backgroundController,
      controllerAs: 'backgroundCtrl',
      link: backgroundLink
    };
  }

  backgroundController.$inject = [];

  function backgroundController() {
  }

  function backgroundLink($scope, $element, attributes, backgroundCtrl) {
    var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
    });

    console.log($element[0]);
    pattern.canvas($element[0])
    // $element[0].appendChild(pattern.canvas());
    // console.log($element[0]);
  }
})();
