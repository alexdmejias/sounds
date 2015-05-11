'use strict';

/**
 * @ngdoc service
 * @name soundsApp.dataPath
 * @description
 * # dataPath
 * Constant in the soundsApp.
 */
angular.module('soundsApp')
  .constant('dataPath', window.location.origin + '/data.json');
