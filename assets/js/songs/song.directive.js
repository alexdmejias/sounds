(function() {
  angular.module('songs').directive('song', song);

  song.$inject = [];

  function song() {
    return {
      scope: {
        song: '=songObj',
      },
      restrict: 'A',
      templateUrl: 'js/songs/song.tmpl.html',
      require: '^songList',
      controller: songController,
      controllerAs: 'songCtrl',
      link: songLink
    };
  }

  songController.$inject = ['$scope'];

  function songController($scope) {
    var self = this;

    self.playing = false;
    self.playedBefore = false;
    self.pausedByGlobal = false;

    var _songInit = function() {
      self.audio = new Audio($scope.song.fullUrl);
      self.audio.loop = true;
      self.audio.volume = 0;
      self.audio.previousVolume = 0;
    };

    var _setVolume = function(volume) {
      self.audio.previousVolume = self.audio.volume;
      self.audio.volume = volume;
    };

    var _pauseSong = function() {
      self.audio.pause();
      _setVolume(0);
    };

    var _playSong = function() {
      self.audio.play();
      self.playedBefore = true;
      if (self.audio.previousVolume === 0) {
        _setVolume(.5);
      } else {
        _setVolume(self.audio.previousVolume);
      }
    };

    $scope.$on('toggleGlobalSounds', function(){
      if (self.playing) {
        self.pausedByGlobal = true;
        self.toggle();
      } else if (self.pausedByGlobal) {
        self.pausedByGlobal = false;
        self.toggle();
      }
    });

    self.onVolumeChanged = function() {
      console.debug('song: %s, changed its volume to %f', $scope.song.name, self.audio.volume);
    };

    self.toggle = function() {
      if (!self.playedBefore) {
        _songInit();
      }

      if (self.playing) {
        _pauseSong();
      } else {
        _playSong();
      }

      self.playing = !self.playing;
      $scope.$emit('songToggled', {
        songName: $scope.song.name,
        playing: self.playing
      });
    };

  }

  function songLink($scope, $element, $attrs, songListController) {
  }
})();
