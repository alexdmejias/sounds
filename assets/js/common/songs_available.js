'use strict';

/**
 * @ngdoc service
 * @name soundsApp.songsAvailable
 * @description
 * # songsAvailable
 * Factory in the soundsApp.
 */

(function() {
  angular.module('soundsApp').factory('songsAvailable', function ($http, $q, dataPath, soundsDir) {
    var _songs;
    var service = {};

    service.getSongs = function() {
      var deferred = $q.defer();
      $http.get(dataPath)
        .success(function(data) {
          deferred.resolve(data);
          _songs = data;
        });
      return deferred.promise
    };

    var _getByName = function(name) {
      return _.findWhere(_songs, {name: name});
    };

    /**
     * creates a new song object
     * @param  {string} songName The name of the song object to create.
     *  Which corresponds with the name in the data file.
     * @return {Object}
     */
    var _newSong = function(songName) {
      var song = songName;
      if (_.isString(songName)) {
        song = _getByName(songName);
      }

      var url = soundsDir + song.url;
      song.audio = new Audio(url);
      song.audio.loop = true;
      song.ready = true;
    };


    var _identifySong = function(param) {
      var song = param;
      if (_.isString(param)) {
        song = _getByName(param);
      }

      return song;
    };

    // API ////////////////////////

    service.get = function() {
      return _songs;
    };

    service.set = function(data) {
      _songs = data;
    };

    service.songPlay = function(songName) {
      var song = _identifySong(songName);

      song.playing = true;
      song.audio.play();
      console.log('now playing %s', song.name);
    };

    service.songPause = function(songName) {
      var song = _identifySong(songName);

      song.playing = false;
      song.audio.pause();
      console.log('now pausing %s', song.name);
    };

    service.toggleSong = function(songName) {
      var song = _identifySong(songName);

      if (!song.audio) {
        _newSong(song.name);
      }

      if (song.playing) {
        service.songPause(song);
      } else {
        service.songPlay(song);
      }
    };

    service.getCurrentlyPlaying = function() {
      return _.filter(service.get(), {'playing': true});
    };

    service.getByName = function(name) {
      _getByName(name);
    };

    service.setVolume = function(name, newVolume) {
      var song = _identifySong(name);

      if (song.volume > 0) {
        song.lastVolume = song.volume;
      }
      song.volume = newVolume;
      song.audio.volume = newVolume / 100;
    };


    return service;

  });
})();
