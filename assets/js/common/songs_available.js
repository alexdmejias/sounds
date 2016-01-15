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
    var _songs = [];
    var _currentlyPlaying = [];
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

    service.setCurrentlyPlaying = function(songs) {
      _currentlyPlaying = songs;
    }

    service.getCurrentlyPlaying = function(getObj) {
      if (getObj && _songs.length) {
        return _songs.filter(function(s) {
          return _currentlyPlaying.indexOf(s.name) >= 0;
        });
      } else {
        return _currentlyPlaying;
      }
    }



    return service;

  }
})();
