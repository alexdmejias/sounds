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

  songListController.$inject = ['$scope', 'songsAvailable', 'settings'];

  function songListController($scope, songsAvailable, settings) {
    var self = this;
    self.songsAvailable = '';
    self.globalSound = true;
    self.settings = settings.get();


    $scope.$on('settingsChanged', function(event, args) {
      console.log(args);
      self.settings = args;
    });

    songsAvailable.getSongs()
      .then(function(data) {
        self.songsAvailable = data;
        angular.forEach(self.songsAvailable, function(song) {
          song.volume = 50;
        })
      });

    self.getCurrentlyPlaying = function() {
      return songsAvailable.getCurrentlyPlaying();
    };

    /**
     * Play a song
     * @param {object} songObj Song object from list of songs
     */
    self.songPlay = function(songObj) {
      songsAvailable.songPause(songObj);
    };

    /**
     * Pause a song
     * @param {object} songObj Song object from list of songs
     */
    self.songPause = function(songObj) {
      songsAvailable.songPause(songObj);
    };

    /**
     * Plays or pauses a song. Creates the songs Audio element if necessary
     * @param {string} songObj Name of the song to toggle, from array of songs
     */
    self.toggleSong = function(songObj) {
      if (self.settings.globalSound === false) {
        settings.set('globalSound', true);
      }

      songsAvailable.toggleSong(songObj);
    };

    /**
     * Toggles all of the currently playing songs in the application
     */
    self.toggleGlobalSound = function() {
      if (self.settings.globalSound === true) {
        self.currentlyPlaying = self.getCurrentlyPlaying();
        angular.forEach(self.currentlyPlaying, function(value) {
          self.setVolume(value, 0);
        });

        settings.set('globalSound', false);
      } else {
        angular.forEach(self.currentlyPlaying, function(value) {
          self.setVolume(value, value.lastVolume);
        });
        settings.set('globalSound', true);
      }
    };

    self.setVolume = function(song, newVolume) {
      songsAvailable.setVolume(song, newVolume);
    };

  }

  function songListLink($scope, $element, $attrs, songListController) {

    $scope.toggleSong = function(name) {
      songListController.toggleSong(name);
    };

    /**
     * Set the volume of a song to its own volume property
     * @param {object} songObj Song object from array of songs
     */
    $scope.setVolume = function(songObj) {
      songObj.audio.volume = songObj.volume / 100;
    };

    $scope.toggleGlobalSound = function() {
      songListController.toggleGlobalSound();
    }
  }
}(angular.module('songs')));
