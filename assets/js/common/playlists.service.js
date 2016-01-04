(function() {
  angular.module('common').factory('playlists', playlists);

  playlists.$inject = ['$localStorage', '$mdToast'];

  function playlists($localStorage, $mdToast) {
    var _playlists = $localStorage.playlists || [];

    var service = {};

    function init() {
      if (!$localStorage.playlists) {
        $localStorage.playlists = [];
      }
    }

    init();

    var _set = function(data) {
      _playlists = data;
    };

    service.get = function() {
      return _playlists;
    };

    service.getByName = function(name) {
      return _.findWhere(_get(), {name: name});
    };

    service.create = function(options) {
      var success;
      if (options.songs && options.songs.length > 0) {
        if (!options.name) {
          options.name = options.songs.join(', ');
        }

        // options.index

        $localStorage.playlists.push(options);
        _set($localStorage.playlists);
        $mdToast.showSimple('Created Playlist: ' + options.songs.join(', '));
      } else if (!options.songs) {
        $mdToast.showSimple('the playlist did not have any songs');
      }

      return success;
    };

    service.delete = function(index) {
      // var without = _.without(service.get(), _.findWhere(service.get(), {name: playlistObj.name}));
      // console.log(without);
      _playlists.splice(index, 1);
      return _playlists;
      // _set(without);
    };

    return service;
  }
})();
