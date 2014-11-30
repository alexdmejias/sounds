'use strict';

/**
 * @ngdoc service
 * @name soundsApp.songsAvailable
 * @description
 * # songsAvailable
 * Factory in the soundsApp.
 */
angular.module('soundsApp')
  .factory('songsAvailable', function ($http, $q) {
    var service = {};

    service.getSongs = function() {
      var deferred = $q.defer();
      $http.get('http://localhost:9000/data.json')
        .success(function(data) {
          deferred.resolve(data);
        });
      return deferred.promise
    };

    return service;

  });
