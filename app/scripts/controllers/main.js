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

    self.setVolume = function(name) {
      name.audio.volume = name.volume;
    };

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

    // toggles the used of a song. Creates it if necessary
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

    // adds a song to the self.playing model
    self.songAdd = function(song) {
      song.audio = newSong(soundsBase + song.url);
      song.ready = true;
      self.songPlay(song);
    };

    self.songPlay = function(song) {
      song.playing = true;
      // only start playing if global sound is on
      if (self.globalSound === true) {
        song.audio.play();
      }
    };

    // removes a song from the self.playing model
    self.songPause = function(song) {
      song.playing = false;
      song.audio.pause();
    };

    // toggles play/pause of the application
    self.playToggle = function() {
      self.toggleGlobalSound();
    };
});
