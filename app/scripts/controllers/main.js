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
  song.play();

  return song;
 }

angular.module('soundsApp')
  .constant('soundsBase', '/sounds/')
  .service('newSong', [newSong])
  .controller('MainCtrl', function (soundsBase, Playing) {
  var self = this;

  // songs currently being played
  self.playing = {};
  // boolean, whether there the sound is currently on
  self.globalSound = false;

  self.available = {
    rain: {
      title: 'Rain',
      url: 'rain.mp3',
      status: false,
    },
    birds: {
      title: 'Birds',
      url: 'test.mp3',
      status: false,
    }
  };

  self.toggleGlobalSound = function() {
    if (self.globalSound === false) {

      self.playing['rain'].play();
    } else {
      self.playing['rain'].pause();
    }
    self.globalSound = !self.globalSound;
  }

  // cycle through the available songs, and find
  // return the index of the song that matches the 
  // object name with the given param.
  self._findbyName = function(name) {
    for (var i = 0; i < self.available.length; i++) {
      if (self.available[i].name == name) {
        break;
      }
    }
    return i;
  }

  // toggles the status of a song. Creates it if necessary
  self.toggleSong = function(name) {
    if (typeof(self.available[name]['song']) == 'undefined') {
        self.songAdd(name);
    } else {
        if (self.available[name].status) {
            self.songRemove(name);
        } else {
            self.available[name].song.play();
            self.available[name].status = !self.available[name].status;
        }
    }
  }

  // adds a song to the self.playing model
  self.songAdd = function(name) {
    self.available[name].song = newSong(soundsBase + self.available[name].url);
    self.available[name].status = !self.available[name].status;
  }
  // removes a song from the self.playing model
  self.songRemove = function(name) {
    self.available[name].song.pause();
    self.available[name].status = !self.available[name].status;
  }

  // toggles play/pause of the application
  self.playToggle = function() {
    self.toggleGlobalSound();
  }

  // event callback to when a song is clicked
  // title: the title property of the song clicked
  self.onClick = function(title) {
    self.toggleSong(title);
  };

});
