'use strict';

/**
 * @ngdoc directive
 * @name soundsApp.directive:playlist
 * @description
 * # playlist
 */
(function() {

  angular.module('backgroundModule').directive('background', background);

  background.$inject = ['$window', 'songsAvailable'];

  function _getBackground(options) {
    var params = {
      width: options.width,
      height: options.height,
      cell_size: 40,
      variance: 1
    };

    if (options.colors && options.colors.length) {
      params.x_colors = options.colors;
      params.y_colors = options.colors.reverse();
    }

    var bg = Trianglify(params);

    console.log(bg.png());
    bg.canvas(options.element);
  }

  function _getColors(songObj) {
    if (songObj && songObj.length) {
      var colors = [];
      songObj.reduce(function(init, curr) {
        colors.push(curr.color)
      }, colors);
      return colors
    } else {
      return false
    }
  }

  function background($window, songsAvailable) {
    return function ($scope, $element) {
      var current = songsAvailable.getCurrentlyPlaying(true);
      var win = angular.element($window);
      var timer;

      _getBackground({
        width: $window.innerWidth,
        height: $window.innerHeight,
        element: $element[0],
        colors: _getColors(songsAvailable.getCurrentlyPlaying(true))
      });

      win.bind('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {

          var backgroundOptions = {
            width: $window.innerWidth,
            height: $window.innerHeight,
            element: $element[0],
            colors: _getColors(songsAvailable.getCurrentlyPlaying(true))
          };

          console.log('just resized, will change background with these optison', backgroundOptions);
          _getBackground(backgroundOptions);

        }, 100);

      });

    }
  }
})();
