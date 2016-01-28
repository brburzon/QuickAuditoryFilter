'use strict';

describe('Service: signalProcessor', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var signalProcessor;
  beforeEach(inject(function (_signalProcessor_) {
    signalProcessor = _signalProcessor_;
  }));

  it('should do something', function () {
    expect(!!signalProcessor).toBe(true);
  });

});
