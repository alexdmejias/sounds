'use strict';

/**
 * @ngdoc directive
 * @name soundsApp.directive:playlist
 * @description
 * # playlist
 */
angular.module('soundsApp')
  .directive('playlistsList', function ($filter, $localStorage) {
    return {
    	templateUrl: 'views/playlists_list.html',
      restrict: 'A',
      scope: {
        editMode: '='
      },
      link: function postLink($scope, $element, $attrs) {
        $scope.$storage = $localStorage;
        $scope.editMode = false;

        $scope.playlists = $scope.$storage.playlists || [];
        $scope.samplePlaylists = [
          {
            name: 'one',
            songs: ['rain', 'birds']
          },
          {
            name: 'rain only',
            songs: ['rain']
          }
        ];

        /**
         * Save current playlists and their content to localstorage
         */
        var _savePlaylists = function() {
          console.log('saved playlist');
          $scope.$storage.playlists = $scope.playlists;
        };

        /**
         * Find a song object given the song name
         * @param {string} name Name of a song
         */
        var _findSongByName = function(name) {
          return $filter('filter')($scope.available, {name:name});
        };

        /**
         * finds the index number of a playlist
         * @param {string} playlistName Name of the desired playlist
         */
        var _findPlaylistByName = function(playlistName) {
          var playlistsLen = $scope.playlists.length;
          for (var i = 0; i < playlistsLen - 1 ; i++) {
            if ($scope.playlists[i].name == playlistName) {
              break;
            }
          }
          return i;
        };

        /**
         * Add a sample set of playlists
         */
        $scope.copySampleLists = function() {
          angular.copy($scope.samplePlaylists, $scope.playlists);
        }

        /**
         * Toggles the edit mode for the playlists
         */
        $scope.playlistToggleEditMode = function() {
          $scope.editMode = !$scope.editMode;
        };

        /**
         * delete a playlist and save it to localStorage
         * @param {string} playlistName [description]
         */
        $scope.playlistDelete = function(playlistName) {
          var playlistIndex = _findPlaylistByName(playlistName);
          $scope.playlists.splice(playlistIndex, 1);
          _savePlaylists();
        };

        /**
         * Edit the current playlist to the currently selected songs
         * @param {string} playlistName Name of the playlist
         */
        $scope.playlistEdit = function(playlistName) {
          var playlistIndex = _findPlaylistByName(playlistName);
          console.log(playlistIndex);

          $scope.playlists[playlistIndex].songs = [];

          angular.forEach($scope.available, function(sound) {
            if(sound.playing == true) {
              $scope.playlists[playlistIndex].songs.push(sound.name);
            }
          });
          _savePlaylists();
        };

        /**
         * Cycle through the songs in a playlist and play them
         * @param {array} songs Array of song names to play
         */
        $scope.startPlaylist = function(songs) {
          angular.forEach($scope.available, function(song) {
            $scope.songPause(song);
          });
          angular.forEach(songs, function(song) {
            var songObj = _findSongByName(song);
            $scope.songAdd(songObj[0]);
          });
        };



      } // end link function
    };
  });
