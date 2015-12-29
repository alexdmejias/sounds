'use strict';

/**
 * @ngdoc service
 * @name soundsApp.dataPath
 * @description
 * # dataPath
 * Constant in the soundsApp.
 */

(function() {
  // var path = 'https://s3-us-west-2.amazonaws.com/alexdmejias-sounds/data/data.json';
  // if (window.location.hostname === 'localhost') {
    var path = './data/data.json';
  // }
  angular.module('common').constant('dataPath', path);
})();
