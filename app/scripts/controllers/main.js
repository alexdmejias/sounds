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

    self.$storage = $localStorage;

    self.editMode = false;
    // boolean, whether there the sound is currently on
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

    self.available = [
      {
        name: 'rain',
        title: 'Rain',
        url: 'rain.mp3',
      }, {
        name: 'birds',
        title: 'Birds',
        url: 'test.mp3',
      }, {
        name: 'other1',
        title: 'Other 1',
        url: 'test.mp3'
      }, {
        name: 'other2',
        title: 'Other 2',
        url: 'test.mp3'
      }, {
        name: 'other3',
        title: 'Other 3',
        url: 'test.mp3'
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
     * creates new playlists with the currently playing songs
     */
    self.createPlaylist = function() {

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
