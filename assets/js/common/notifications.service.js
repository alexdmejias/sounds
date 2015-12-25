(function() {
  angular.module('soundsApp').factory('notifications', notifications);

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

})();
