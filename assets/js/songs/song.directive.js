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
    }

    self.setVolume = function() {
      console.log(self.audio.volume);
    };

    self.toggle = function() {
      if (!self.playedBefore) {
        _songInit();
      }

      if (self.playing) {
        self.audio.pause();
      } else {
        self.audio.play();
        self.playedBefore = true;
      }

      self.playing = !self.playing;
    };

  }

  function songLink($scope, $element, $attrs, songController) {
  }
})();
