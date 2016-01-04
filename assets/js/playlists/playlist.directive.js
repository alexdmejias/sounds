(function() {
  angular.module('playlists').directive('playlist', playlist);

  function playlist() {
    return {
      templateUrl: 'js/playlists/playlist.tmpl.html',
      restrict: 'AE',
      scope: {
        playlist: '=playlistObj',
        onDelete: '&onDelete'
      },
      controller: playlistController,
      controllerAs: 'playlistCtrl',
      link: playlistLink
    };
  }
  playlistController.$inject = ['$scope'];

  function playlistController($scope) {
    var self = this;

    self.play = function() {
      console.log('play');
    }

    self.edit = function() {
      console.log('edit');
    }

  }

  function playlistLink($scope, elem, attrs, controller) {
  }
})();
