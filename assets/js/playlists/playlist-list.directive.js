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

  playlistsController.$inject = ['songsAvailable', 'PlaylistsService', '$mdToast'];

  function playlistsController(songsAvailable, PlaylistsService, $mdToast) {
    var self = this;

    self.playlistCreate = function() {
      var currentlyPlaying = songsAvailable.getPlaying();
      PlaylistsService.create({songs: currentlyPlaying});
    };

    self.updatePlaylists = function() {
      self.playlists = PlaylistsService.get();
    }

    self.onDelete = function(index) {
      console.log('on delete from parent controller', index);
      // _PlaylistsService.splice(index, 1);

      PlaylistsService.delete(index);

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
