'use strict';

/**
 * @ngdoc directive
 * @name soundsApp.directive:playlist
 * @description
 * # playlist
 */
angular.module('soundsApp')
  .directive('playlistsList', function () {
    return {
    	templateUrl: 'views/playlists_list.html',
      restrict: 'A',
      link: function postLink($scope, $element, $attrs) {
      }
    };
  });
