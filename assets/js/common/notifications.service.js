(function(app) {
  app.factory('notifications', notifications);

  notifications.$inject = ['$mdToast'];

  function notifications($mdToast) {
    var service = {};

    service.simple = function(message) {
      $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom left')
            .hideDelay(3000)
        );
    };

    return service;
  }

})(angular.module('soundsApp'));
