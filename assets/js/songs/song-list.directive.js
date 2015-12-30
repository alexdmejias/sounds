'use strict';

/**
* @ngdoc directive
* @name soundsApp.directive:songList
* @description
* # songList
*/
(function() {
  angular.module('songs').directive('songList', songList);

  songList.$inject = [];

  function songList() {
    return {
      templateUrl: 'js/songs/song-list.tmpl.html',
      restrict: 'A',
      scope: {},
      controller: songListController,
      controllerAs: 'songListCtrl',
      link: songListLink
    }
  }

  songListController.$inject = ['$scope', 'songsAvailable', 'settings'];

  function songListController($scope, songsAvailable, settings) {
    var self = this;
    self.songsAvailable = '';
    self.globalSound = true;
    self.settings = settings.get();
    self.pausedSongs = [];
    self.currentlyPlayingSongs = [];

    $scope.$on('settingsChanged', function(event, args) {
      console.log(args);
      self.settings = args;
    });

    songsAvailable.getSongs()
      .then(function(data) {
        self.songsAvailable = data;
      });

    /**
     * Toggles all of the currently playing songs in the application
     */
    self.toggleGlobalSound = function() {
      self.globalSound = !self.globalSound;
      $scope.$broadcast('toggleGlobalSounds');
    };

    $scope.$on('songToggled', function(scope, args) {
      var index = self.currentlyPlayingSongs.indexOf(args.songName);
      if (index < 0 ) {
        self.currentlyPlayingSongs.push(args.songName);
      } else {
        self.currentlyPlayingSongs.splice(index, 1);
      }
    });

  }

  function songListLink($scope, $element, $attrs, songListController) {
    $scope.toggleGlobalSound = function() {
      songListController.toggleGlobalSound();
    }
  }
})();
