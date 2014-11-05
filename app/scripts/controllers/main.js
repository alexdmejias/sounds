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
  .controller('MainCtrl', function ($filter, soundsBase) {
  var self = this;

  // boolean, whether there the sound is currently on
  self.globalSound = false;

  self.playing = [];

  self.available = {
    rain: {
      title: 'Rain',
      url: 'rain.mp3',
      used: false,
      playing: false
    },
    birds: {
      title: 'Birds',
      url: 'test.mp3',
      used: false,
      playing: false
    }
  };

  self.toggleGlobalSound = function() {
    // get all the songs that are currently playing
    self.playing = $filter('filter')(self.available, function(a) {
      a.playing
    }, true);
    console.log($filter('filter')(self.available, function(song) {
      return song.playing === true;
    }, true));
    console.info('wasd')

    self.paused = [];
    angular.forEach(self.playing, function(value, key) {
    });

    if (self.globalSound === false) {
      for (sound in self.available) {
        if (self.available[sound].playing) {
          self.songPause(sound);
        }
      }
    } else {
      for (sound in self.available) {
        if (self.available[sound].playing) {
          self.songPlay(sound);
        }
      }
    }
    self.globalSound = !self.globalSound;
  }

  // toggles the used of a song. Creates it if necessary
  self.toggleSong = function(name) {
    if (typeof(self.available[name]['song']) == 'undefined') {
      self.songAdd(name);
    } else {
      if (self.available[name].playing) {
        self.songPause(name);
      } else {
        self.songPlay(name);
      }
    }
  }

  // adds a song to the self.playing model
  self.songAdd = function(name) {
    self.available[name].song = newSong(soundsBase + self.available[name].url);
    self.available[name].used = true;
    self.songPlay(name);
  }

  self.songPlay = function(name) {
    self.available[name].playing = true;
    self.available[name].song.play();
  }

  // removes a song from the self.playing model
  self.songPause = function(name) {
    self.available[name].playing = false;
    self.available[name].song.pause();
    // self.available[name].used = !self.available[name].used;
  }

  // toggles play/pause of the application
  self.playToggle = function() {
    self.toggleGlobalSound();
  }

});
