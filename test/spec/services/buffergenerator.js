'use strict';

describe('Service: bufferGenerator', function () {


  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var bufferGenerator;
  beforeEach(inject(function (_bufferGenerator_) {
    bufferGenerator = _bufferGenerator_;
  }));

  it('should do something', function () {
    expect(!!bufferGenerator).toBe(true);
  });

});
