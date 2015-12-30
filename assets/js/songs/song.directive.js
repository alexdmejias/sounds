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

    self.changedVolume = function() {
      console.log(self.audio.volume);
    };

    self.toggle = function() {
      if (!self.playedBefore) {
        _songInit();
      }

      if (self.playing) {
        self.audio.pause();
        _setVolume(0);
      } else {
        self.audio.play();
        self.playedBefore = true;
        if (self.audio.previousVolume === 0) {
          _setVolume(.5);
        } else {
          _setVolume(self.audio.previousVolume);
        }
      }

      self.playing = !self.playing;
    };

  }

  function songLink($scope, $element, $attrs, songController) {
  }
})();
