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
      if (self.settings.globalSound === true) {
        self.currentlyPlaying = self.getCurrentlyPlaying();
        angular.forEach(self.currentlyPlaying, function(value) {
          self.setVolume(value, 0);
        });

        settings.set('globalSound', false);
      } else {
        angular.forEach(self.currentlyPlaying, function(value) {
          self.setVolume(value, value.lastVolume);
        });
        settings.set('globalSound', true);
      }
    };

  }

  function songListLink($scope, $element, $attrs, songListController) {
    $scope.toggleGlobalSound = function() {
      songListController.toggleGlobalSound();
    }
  }
})();
