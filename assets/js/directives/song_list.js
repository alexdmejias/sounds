'use strict';

/**
* @ngdoc directive
* @name soundsApp.directive:songList
* @description
* # songList
*/
angular.module('soundsApp')
  .directive('songList', function ($filter, songsAvailable, soundsDir) {
    return {
      templateUrl: 'views/song_list.html',
      restrict: 'A',
      scope: {},
      controller: function($scope) {
        $scope.songsAvailable = '';
        $scope.globalSound = true;

        songsAvailable.getSongs()
          .then(function(data) {
            $scope.songsAvailable = data;
          });
        /**
         * creates a new song object
         * @param  {string} The name of the song object to create. 
         *  Which corresponds with the name in the data file.
         * @return {Object}
         */
        var _newSong = function(songName) {
          var song = new Audio(songName);
          song.loop = true;
          return song;
        };

        $scope.getCurrentlyPlaying = function() {
          return $filter('filter')($scope.songsAvailable, {playing: true}, true);
        };

        /**
         * Creates the Audio object for a song and then plays it
         * @param {object} songObj Song object for which to create the Audio element
         */
        $scope.songAdd = function(songObj) {
          songObj.audio = _newSong(soundsDir + songObj.url);
          songObj.ready = true;
          $scope.songPlay(songObj);
        };

        /**
         * Play a song
         * @param {object} song Song object from list of songs
         */
        $scope.songPlay = function(songObj) {
          songObj.playing = true;
          // only start playing if global sound is on
          if ($scope.globalSound === true) {
            songObj.audio.play();
          }
        };

        /**
         * Pause a song
         * @param {object} song Song object from list of songs
         */
        $scope.songPause = function(songObj) {
          songObj.playing = false;
          if (songObj.ready) {
            songObj.audio.pause();
          }
        };
      },

      link: function($scope, $element, $attrs) {
        /**
         * Plays or pauses a song. Creates the songs Audio element if necessary
         * @param {string} Name of the song to toggle, from array of songs
         */
        $scope.toggleSong = function(name) {
          var song = $filter('filter')($scope.songsAvailable, {name:name}, true)[0];
          if (typeof(song.audio) === 'undefined') {
            $scope.songAdd(song);
          } else {
            if (song.playing === true) {
              $scope.songPause(song);
            } else {
              $scope.songPlay(song);
            }
          }
        };

        /**
         * Set the volume of a song to its own volume property
         * @param {object} song Song object from array of songs
         */
        $scope.setVolume = function(songObj) {
          songObj.audio.volume = songObj.volume;
        };

        /**
         * Toggles all of the currently playing songs in the application
         */
        $scope.toggleGlobalSound = function() {
          $scope.currentlyPlaying = $scope.getCurrentlyPlaying();
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
        };

      } // end of link function
    };
});
