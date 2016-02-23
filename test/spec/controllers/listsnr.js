'use strict';

describe('Controller: ListSnrCtrl', function () {

  // load the controller's module
  beforeEach(module('qafApp'));

  var ListSnrCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListSnrCtrl = $controller('ListSnrCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
