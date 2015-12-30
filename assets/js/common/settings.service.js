(function() {

  angular.module('common').factory('settings', settings);

  settings.$inject = ['$rootScope'];

  function settings($rootScope) {
    var _settings = {
      globalSound: true
    };
    var service = {};

    service.set = function(settingName, settingValue) {
      if (!settingValue) {
        _settings = settingName;
      } else {
        _settings[settingName] = settingValue;
      }

      console.log(settingName, settingValue);
      $rootScope.$broadcast('settingsChanged', _settings);
    };

    service.get = function(settingName) {
      if (!settingName) {
        return _settings;
      } else {
        return _settings[settingName];
      }
    };

    return service;
  }

})();
