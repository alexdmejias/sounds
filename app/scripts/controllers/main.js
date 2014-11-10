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
    // var $scope = this;

    // boolean, whether there the sound is currently on
    $scope.globalSound = true;

    $scope.playing = [];

    $scope.playlists = [
      {
        name: 'one',
        songs: ['rain', 'birds']
      }
    ];

    $scope.startPlaylist = function(songs) {
      // var songsInPlaylist = $filter($scope.available, )
    };

    $scope.available = [
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

    $scope.setVolume = function(name) {
      name.audio.volume = name.volume;
    }

    $scope.toggleGlobalSound = function() {
      $scope.currentlyPlaying = $filter('filter')($scope.available, {playing: true}, true);
      if ($scope.globalSound === true) {
        angular.forEach($scope.currentlyPlaying, function(value) {
          value.audio.pause();
        });
      } else {
        angular.forEach($scope.currentlyPlaying, function(value) {
          value.audio.play();
        });
      }
      // toggle global sound
      $scope.globalSound = !$scope.globalSound;
    }

    // toggles the used of a song. Creates it if necessary
    $scope.toggleSong = function(name) {
      var song = $filter('filter')($scope.available, {name:name}, true)[0];
      if (typeof(song.audio) == 'undefined') {
        $scope.songAdd(song);
      } else {
        if (song.playing === true) {
          $scope.songPause(song);
        } else {
          $scope.songPlay(song);
        }
      }
    }

    // adds a song to the $scope.playing model
    $scope.songAdd = function(song) {
      song.audio = newSong(soundsBase + song.url);
      song.ready = true;
      $scope.songPlay(song);
      console.log('wasd');
    }

    $scope.songPlay = function(song) {
      song.playing = true;
      // only start playing if global sound is on
      if ($scope.globalSound === true) {
        song.audio.play();
      }
    }

    // removes a song from the $scope.playing model
    $scope.songPause = function(song) {
      song.playing = false;
      song.audio.pause();
    }

    // toggles play/pause of the application
    $scope.playToggle = function() {
      $scope.toggleGlobalSound();
    }

});
