// 'use strict';

/**
 * @ngdoc function
 * @name soundsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soundsApp
 */
 function newSong(songName) {
  var song = new Audio(songName);
  song.loop = true;

  return song;
 }

angular.module('soundsApp')
  .constant('soundsBase', '/sounds/')
  .service('newSong', [newSong])
  .controller('MainCtrl', function ($scope, $filter, $localStorage, soundsBase) {
    var self = this;

    // boolean, whether there the sound is currently on
    self.globalSound = true;

    self.playing = [];

    self.playlists = [
      {
        name: 'one',
        songs: ['rain', 'birds']
      }
    ];

    self.startPlaylist = function(songs) {
      // var songsInPlaylist = $filter(self.available, )
    };

    self.available = [
      {
        name: 'rain',
        title: 'Rain',
        url: 'rain.mp3',
      }, {
        name: 'birds',
        title: 'Birds',
        url: 'test.mp3',
      }
    ];

    /**
    /**
     * Set the volume of a song to its own volume property
     * @param {object} song Song object from array of songs
     */
    self.setVolume = function(songObj) {
      songObj.audio.volume = songObj.volume;
    };

    /**
     * Toggles all of the currently playing songs in the application
     */
    self.toggleGlobalSound = function() {
      self.currentlyPlaying = $filter('filter')(self.available, {playing: true}, true);
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

    /**
     * Plays or pauses a song. Creates the songs Audio element if necessary
     * @param {string} Name of the song to toggle, from array of songs
     */
    self.toggleSong = function(name) {
      var song = $filter('filter')(self.available, {name:name}, true)[0];
      if (typeof(song.audio) == 'undefined') {
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
     * Creates the Audio object for a song and then plays it
     * @param {object} songObj Song object for which to create the Audio element
     */
    self.songAdd = function(songObj) {
      songObj.audio = newSong(soundsBase + songObj.url);
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

});
