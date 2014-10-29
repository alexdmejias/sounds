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

// var someOBj = {
//   rain: rainObjWMethods,
//   birds: birdObjWMethods
// }

// someOBj[key].play()
angular.module('soundsApp')
  .constant('soundsBase', '/sounds/')
  .service('newSong', [newSong])
  .controller('MainCtrl', function (soundsBase, Playing) {
  var self = this;

  // songs currently being played
  self.playing = {};
  // boolean, whether there the sound is currently on
  self.globalSound = false;

  self.available = [
    {
      name: 'rain',
      title: 'Rain',
      url: 'rain.mp3',
      status: false
    }, {
      name:'birds',
      title: 'Birds',
      url: 'test.mp3'
    }
  ];

  self.toggleGlobalSound = function() {
    if (self.globalSound === false) {

      self.playing['rain'].play();
      // self.playing[0].play();
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
    var songIndex = self._findbyName(name);
    if (!self.available[songIndex].status) {
      self.songAdd(name);
    } else {
      self.songRemove(name);
    }
  }

  // adds a song to the self.playing model
  self.songAdd = function(name) {
    var songIndex = self._findbyName(name);

    self.playing[name] = { song: newSong(soundsBase + self.available[songIndex].url ), status: false };
    self.available[songIndex].status = true;
  }
  // removes a song from the self.playing model
  self.songRemove = function(name) {
    self.playing[name].song.pause();
    delete self.playing[name];

    self.available.forEach(function(a,b,c) {
      a.status = false;
    });

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
