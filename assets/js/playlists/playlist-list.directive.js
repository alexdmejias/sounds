'use strict';

/**
 * @ngdoc directive
 * @name soundsApp.directive:playlist
 * @description
 * # playlist
 */
(function() {

  angular.module('playlists').directive('playlistList', playlistList);

  function playlistList() {
    return {
      templateUrl: 'js/playlists/playlist-list.tmpl.html',
      restrict: 'A',
      scope: {},
      controller: playlistsController,
      controllerAs: 'playlistsCtrl',
      link: playlistsLink
    };
  }

  playlistsController.$inject = ['songsAvailable', 'playlists', '$mdToast'];

  function playlistsController(songsAvailable, playlists, $mdToast) {
    var self = this;

    self.playlistCreate = function() {
      var currentlyPlaying = songsAvailable.getPlaying();
      playlists.create({songs: currentlyPlaying});
    };

    self.updatePlaylists = function() {
      self.playlists = playlists.get();
    }

    self.onDelete = function(index) {
      console.log('on delete from parent controller', index);
      // _playlists.splice(index, 1);

      playlists.delete(index);

      self.updatePlaylists();
    }

    function _init() {
      self.updatePlaylists();
    }

    _init();
  }

  function playlistsLink($scope, element, attributes, playlistCtrl) {
    // $scope.playlists = playlistCtrl.getPlaylists();
  }
})();
