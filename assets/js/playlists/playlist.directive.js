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
  playlistController.$inject = [];

  function playlistController() {
    var self = this;

    self.editMode = false;


  }

  function playlistLink($scope, elem, attrs, controller) {
    $scope.editMode = controller.editMode;

    $scope.edit = function() {
      console.log('editing');
      controller.editMode = !controller.editMode;
      console.log(controller.editMode );
    }
  }
})();
