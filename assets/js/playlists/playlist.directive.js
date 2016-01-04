(function() {
  angular.module('playlists').directive('playlist', playlist);

  function playlist() {
    return {
      templateUrl: 'js/playlists/playlist.tmpl.html',
      restrict: 'AE',
      scope: {
        data: '=data'
      },
      controller: playlistController,
      controllerAs: 'playlistCtrl',
      link: playlistLink
    };
  }
  playlistController.$inject = ['$scope'];

  function playlistController($scope) {
    var self = this;
  }

  function playlistLink($scope, elem, attrs, controller) {
  }
})();
