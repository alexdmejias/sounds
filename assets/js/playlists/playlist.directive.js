(function() {
  angular.module('playlists').directive('playlist', playlist);

  playlist.$inject = [];

  function playlist() {
    return {
      scope: {
        playlist: '=playlistProp',
        onDelete: '&onDelete'
      },
      restrict: 'A',
      templateUrl: 'js/playlists/playlist.tmpl.html',
      controller: playlistController,
      controllerAs: 'playlistCtrl',
      link: playlistLink
    };
  }

  playlistController.$inject = ['$scope'];

  function playlistController($scope) {
    var self = this;

    self.name = $scope.playlist.name;
    // TODO:this is wrong
    self.songs = angular.copy($scope.playlist.songs);

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
