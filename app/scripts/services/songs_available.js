'use strict';

/**
 * @ngdoc service
 * @name soundsApp.songsAvailable
 * @description
 * # songsAvailable
 * Factory in the soundsApp.
 */
angular.module('soundsApp')
  .factory('songsAvailable', function ($http, $q, dataPath) {
    var service = {};

    service.getSongs = function() {
      var deferred = $q.defer();
      $http.get(dataPath)
        .success(function(data) {
          deferred.resolve(data);
        });
      return deferred.promise
    };

    return service;

  });
