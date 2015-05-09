'use strict';

/**
 * @ngdoc overview
 * @name soundsApp
 * @description
 * # soundsApp
 *
 * Main module of the application.
 */
angular
  .module('soundsApp', [
  	'ngStorage',
    'ngMaterial',
    'ngAnimate',

    'playlists',
    'songs'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('orange');
  });
