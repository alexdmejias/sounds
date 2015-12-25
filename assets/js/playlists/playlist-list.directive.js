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

  playlistsController.$inject = ['songsAvailable', 'playlists'];

  function playlistsController(songsAvailable, playlists) {
    var self = this;

    self.playlists = angular.copy(playlists.get());

    self.editMode = false;

    function _init() {
    }

    _init();

    function _updatePlaylists() {
      angular.copy(playlists.get(), self.playlists);
    }

    self.createPlaylist = function() {
      var currentlyPlaying = songsAvailable.getCurrentlyPlaying();
      var playlist = {name: new Date(), songs: _.pluck(currentlyPlaying, 'name')};
      playlist.editMode = false;
      playlists.create(playlist);
      _updatePlaylists();
    };

    self.toggleEditMode = function() {
      self.editMode = !self.editMode;
      console.log(self.editMode);
      return self.editMode;
    };

    self.playlistDelete = function(playlistObj) {
      playlists.delete(playlistObj);
    }

  }

  function playlistsLink($scope, element, attributes, playlistCtrl) {
    $scope.playlists = playlistCtrl.playlists;
    $scope.editMode = false;

    $scope.playlistCreate = function() {
      playlistCtrl.createPlaylist();
    };

    $scope.editPlaylist = function(playlistObj) {
      //$scope.editMode = playlistCtrl.toggleEditMode();
      playlistObj.editMode = !playlistObj.editMode;
      console.log(playlistObj.editMode);
    };

    $scope.editPlaylist = function() {

    };

    $scope.playlistDelete = function(playlistObj) {
      console.log('11');
      playlistCtrl.playlistDelete(playlistObj);
    }

  }
})();
