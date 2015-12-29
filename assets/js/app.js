'use strict';

/**
 * @ngdoc overview
 * @name soundsApp
 * @description
 * # soundsApp
 *
 * Main module of the application.
 */
(function() {
    angular.module('common', []);
    angular.module('songs', []);
    angular.module('playlists', []);

    angular
      .module('soundsApp', [
        'ngStorage',
        'ngMaterial',
        'ngAnimate',
        'ngMdIcons',
        //'templates-dist',
        'common',
        'playlists',
        'songs'
      ])
      .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue-grey')
          .accentPalette('orange');
      });
})();
