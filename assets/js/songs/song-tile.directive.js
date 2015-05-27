(function(app) {
  app.directive('songTile', songTile);

  songTile.$inject = [];

  function songTile() {
    return {
      templateUrl: 'js/songs/song-tile.tmpl.html',
      restrict: 'AE',
      scope: {
        song: '=song'
      },
      controller: songTileController,
      controllerAs: 'songTileCtrl',
      link: songTileLink
    }
  }

  songTileController.$inject = ['soundsDir', 'songsAvailable'];

  function songTileController(soundsDir) {
    var self = this;

    /**
     * creates a new song object
     * @param  {string} songName The name of the song object to create.
     *  Which corresponds with the name in the data file.
     * @return {Object}
     */
    var _newSong = function(songName) {
      var song = new Audio(songName);
      song.loop = true;
      return song;
    };

    /**
     * Creates the Audio object for a song and then plays it
     * @param {object} songObj Song object for which to create the Audio element
     */
    self.songAdd = function(songObj) {
      songObj.audio = _newSong(soundsDir + songObj.url);
      songObj.ready = true;
      self.songPlay(songObj);
    };

    /**
     * Play a song
     * @param {object} songObj Song object from list of songs
     */
    self.playSong = function(songObj) {
      songsAvailable.play(songObj);
    };

    /**
     * Pause a song
     * @param {object} songObj Song object from list of songs
     */
    self.pauseSong = function(songObj) {
      songsAvailable.pause(songObj);
    };


    /**
     * Plays or pauses a song. Creates the songs Audio element if necessary
     * @param {string} name Name of the song to toggle, from array of songs
     */
    self.toggleSong = function(name) {
      songsAvailable.pause(name);
    };

  }

  function songTileLink($scope, $element, $attrs, songTileController) {
    $scope.toggleSong = function(name) {
      songTileController.toggleSong(name);
    };
  }

}(angular.module('songs')));
