'use strict';

/**
* @ngdoc directive
* @name soundsApp.directive:songList
* @description
* # songList
*/
angular.module('soundsApp')
  .directive('songList', function (songsAvailable) {
    return {
      templateUrl: 'views/song_list.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      }
    };
});
