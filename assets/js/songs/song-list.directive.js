'use strict';

/**
* @ngdoc directive
* @name soundsApp.directive:songList
* @description
* # songList
*/
(function(app) {
  app.directive('songList', songList);

  songList.$inject= [];

  function songList() {
      return {
        templateUrl: 'js/songs/song-list.tmpl.html',
        restrict: 'A',
        scope: {},
        controller: songListController,
        controllerAs: 'songListCtrl',
        link: songListLink
      }
  }

  songListController.$inject = ['songsAvailable', '$filter', 'soundsDir'];

  function songListController(songsAvailable, $filter, soundsDir) {
    var self = this;
    self.songsAvailable = '';
    self.globalSound = true;

    songsAvailable.getSongs()
      .then(function(data) {
        self.songsAvailable = data;
        angular.forEach(self.songsAvailable, function(song) {
          song.volume = 0.5;
        })
      });
    /**
     * creates a new song object
     * @param  {string} songName The name of the song object to create.
     *  Which corresponds with the name in the data file.
     * @return {Object}
     */
    var _newSong = function(songName) {
      var song = new Audio(songName);
      song.loop = true;
      return song;
    };

    self.getCurrentlyPlaying = function() {
      return $filter('filter')(self.songsAvailable, {playing: true}, true);
    };

    /**
     * Creates the Audio object for a song and then plays it
     * @param {object} songObj Song object for which to create the Audio element
     */
    self.songAdd = function(songObj) {
      songObj.audio = _newSong(soundsDir + songObj.url);
      songObj.ready = true;
      self.songPlay(songObj);
    };

    /**
     * Play a song
     * @param {object} song Song object from list of songs
     */
    self.songPlay = function(songObj) {
      songObj.playing = true;
      // only start playing if global sound is on
      if (self.globalSound === true) {
        songObj.audio.play();
      }
    };

    /**
     * Pause a song
     * @param {object} song Song object from list of songs
     */
    self.songPause = function(songObj) {
      songObj.playing = false;
      if (songObj.ready) {
        songObj.audio.pause();
      }
    };

    self.getSongByName = function(name) {
      return $filter('filter')(self.songsAvailable, {name:name}, true)[0];
    };

    /**
     * Plays or pauses a song. Creates the songs Audio element if necessary
     * @param {string} name Name of the song to toggle, from array of songs
     */
    self.toggleSong = function(name) {
      var song = self.getSongByName(name);
      if (typeof(song.audio) === 'undefined') {
        self.songAdd(song);
      } else {
        if (song.playing === true) {
          self.songPause(song);
        } else {
          self.songPlay(song);
        }
      }
    };

    /**
     * Toggles all of the currently playing songs in the application
     */
    self.toggleGlobalSound = function() {
      self.currentlyPlaying = self.getCurrentlyPlaying();
      if (self.globalSound === true) {
        angular.forEach(self.currentlyPlaying, function(value) {
          value.audio.pause();
        });
      } else {
        angular.forEach(self.currentlyPlaying, function(value) {
          value.audio.play();
        });
      }
      // toggle global sound
      self.globalSound = !self.globalSound;
    };

  }

  function songListLink($scope, $element, $attrs, songListController) {

    $scope.toggleSong = function(name) {
      songListController.toggleSong(name);
    };

    /**
     * Set the volume of a song to its own volume property
     * @param {object} song Song object from array of songs
     */
    $scope.setVolume = function(songObj) {
      songObj.audio.volume = songObj.volume;
    };

    $scope.toggleGlobalSound = function() {
      songListController.toggleGlobalSound();
    }
  }
}(angular.module('songs')));
