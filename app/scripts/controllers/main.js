'use strict';

/**
 * @ngdoc function
 * @name soundsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soundsApp
 */
 function newSong(songName) {
    console.log(songName || 'no song nmae');
    var song = new Audio(songName);
    song.loop = true;
    song.play();
    return song;
 }

angular.module('soundsApp')
  .constant('soundsBase', '/sounds/')
  .service('newSong', [newSong])
  .controller('MainCtrl', function (soundsBase) {
  	var self = this;

    // songs currently being played
    self.playing = [];
    // boolean, whether there the sound is currently on
    self.songsPlaying = false;


    self.songs = [
        {
            name: 'rain',
            title: 'Rain',
            url: 'rain.mp3'
        }, {
            name:'birds',
            title: 'Birds',
            url: 'birds.mp3'
        }
    ];

    self.onClick = function(title) {
    	self.toggleSong(title);
    };

    self.toggleSong = function(name) {
        for (var i = 0; i < self.songs.length; i++) {
            if (self.songs[i].name == name) {
                if (!self.songs[i].status) {
                    // self.playing[name] = new Audio(soundsBase + self.songs[i].url);
                    self.playing[name] = newSong(soundsBase + self.songs[i].url);
                    // self.playing[name].play();
                    self.songs[i].status = true;
                } else {
                    self.playing[name].pause();
                    var index = self.playing.indexOf(name);
                    self.playing.splice(i, 1);
                    self.songs[i].status = false;
                }
            }
        };
    };

    self.playToggle = function() {

    }


  //   self.playToggle = function() {
		// console.log(self.status);
		// if (self.status) {
	 //    	for (var i = 0; i < self.playlist.length; i++) {
	 //    		self.playing[i].pause();
	 //    	}
		// } else {
	 //    	for (var j = 0; j < self.playlist.length; j++) {
	 //    		self.playing[j].play();
  //   		}
  //   	}
  //   	self.status = !self.status;
  //   };

    // function Sound(name) {
    //     var sound = new Audio('sounds/' + self.songs[name].url );
    //     return sound;
    // };



  });
