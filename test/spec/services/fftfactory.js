'use strict';

describe('Service: fftFactory', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var fftFactory;
  beforeEach(inject(function (_fftFactory_) {
    fftFactory = _fftFactory_;
  }));

  it('should do something', function () {
    expect(!!fftFactory).toBe(true);
  });

});
