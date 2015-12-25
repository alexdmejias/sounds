'use strict';

/**
 * @ngdoc service
 * @name soundsApp.soundsDir
 * @description
 * # soundsDir
 * Constant in the soundsApp.
 */
(function() {
	var path = 'https://s3-us-west-2.amazonaws.com/alexdmejias-sounds/sounds/';
  if (window.location.hostname === 'localhost') {
    path = './sounds/';
  }
  angular.module('soundsApp').constant('soundsDir', path);
})();

