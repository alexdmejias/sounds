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
    'ngAnimate'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('orange');
  });
