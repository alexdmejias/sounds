(function() {
  angular.module('soundsApp').factory('playlists', playlists);

  playlists.$inject = ['$localStorage', 'notifications'];

  function playlists($localStorage, notifications) {
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
      if (options.name && options.songs) {
        $localStorage.playlists.push(options);
        _set($localStorage.playlists);
        notifications.simple('playlist created');
      } else if (!options.songs) {
        console.log('wasdwasdwasd');
        notifications.simple('wasd');
      }
    };

    service.delete = function(playlistObj) {
      var without = _.without(service.get(), _.findWhere(service.get(), {name: playlistObj.name}));
      console.log(without);
      _set(without);
    };

    return service;
  }
})();
