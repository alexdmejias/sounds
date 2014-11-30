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
  .service('newSong', [newSong])
  .controller('MainCtrl', function ($scope, $filter, $localStorage, songsAvailable) {
    var self = this;
    
    songsAvailable.getSongs()
      .then(function(data) {
        console.log(data);
        self.available = data;
      });

    self.$storage = $localStorage;

    self.editMode = false;
    self.globalSound = true;

    self.playing = [];

    self.playlists = self.$storage.playlists || [];
    self.samplePlaylists = [
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
     * Find a song object given the song name
     * @param {string} name Name of a song
     */
    _findByName = function(name) {
      return $filter('filter')(self.available, {name:name});
    };

    /**
     * finds the index number of a playlist
     * @param {string} playlistName Name of the desired playlist
     */
    _findPlaylistByName = function(playlistName) {
      var playlistsLen = self.playlists.length;
      for (var i = 0; i < playlistsLen - 1 ; i++) {
        if (self.playlists[i].name == playlistName) {
          break;
        }
      }
      return i;
    };

    /**
     * Add a sample set of playlists
     */
    self.copySampleLists = function() {
      angular.copy(self.samplePlaylists, self.playlists);
    }

    /**
     * Toggles the edit mode for the playlists
     */
    self.playlistToggleEditMode = function() {
      self.editMode = !self.editMode;
    };

    /**
     * delete a playlist and save it to localStorage
     * @param {string} playlistName [description]
     */
    self.playlistDelete = function(playlistName) {
      var playlistIndex = _findPlaylistByName(playlistName);
      self.playlists.splice(playlistIndex, 1);
      _savePlaylists();
    };

    /**
     * Edit the current playlist to the currently selected songs
     * @param {string} playlistName Name of the playlist
     */
    self.playlistEdit = function(playlistName) {
      var playlistIndex = _findPlaylistByName(playlistName);
      console.log(playlistIndex);

      self.playlists[playlistIndex].songs = [];

      angular.forEach(self.available, function(sound) {
        if(sound.playing == true) {
          self.playlists[playlistIndex].songs.push(sound.name);
        }
      });
      _savePlaylists();
    };

    /**
     * Save current playlists and their content to localstorage
     */
    _savePlaylists = function() {
      console.log('saved playlist');
      self.$storage.playlists = self.playlists;
    };

    /**
     * Cycle through the songs in a playlist and play them
     * @param {array} songs Array of song names to play
     */
    self.startPlaylist = function(songs) {
      angular.forEach(self.available, function(song) {
        self.songPause(song);
      });
      angular.forEach(songs, function(song) {
        var songObj = _findByName(song);
        self.songAdd(songObj[0]);
      });
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

});
