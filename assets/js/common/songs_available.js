/* global angular */
/* global _ */
'use strict';

/**
 * @ngdoc service
 * @name soundsApp.songsAvailable
 * @description
 * # songsAvailable
 * Factory in the soundsApp.
 */

(function() {
  angular.module('common').factory('songsAvailable', songsAvailable);

  songsAvailable.$inject = ['$http', '$q', 'dataPath', 'soundsDir'];

  function songsAvailable($http, $q, dataPath, soundsDir) {
    var _songs;
    var _playing;
    var service = {};

    // API ////////////////////////

    service.getSongs = function() {
      var deferred = $q.defer();
      $http.get(dataPath)
        .success(function(data) {
          _songs = data;
          angular.forEach(_songs, function(value) {
            value.fullUrl = soundsDir + value.url;
          });
          deferred.resolve(_songs);
        });
      return deferred.promise;
    };

    service.get = function() {
      return _songs;
    };

    service.set = function(songs) {
      _songs = songs;
    };

    service.setPlaying = function(playing) {
      _playing = playing;
    };

    service.getPlaying = function() {
      return _playing;
    }

    return service;

  }
})();
