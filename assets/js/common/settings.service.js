(function(app) {

  app.factory('settings', settings);

  settings.$inject = ['$rootScope'];

  function settings($rootScope) {
    var _settings = {
      globalSound: true
    };
    var service = {};

    service.set = function(settingName, settingValue) {
      if (_.isUndefined(settingValue)) {
        _settings = settingName;
      } else {
        _settings[settingName] = settingValue;
      }

      console.log(settingName, settingValue);
      $rootScope.$broadcast('settingsChanged', _settings);
    };

    service.get = function(settingName) {
      if (_.isUndefined(settingName)) {
        return _settings;
      } else {
        return _settings[settingName];
      }
    };

    return service;
  }

})(angular.module('soundsApp'));
