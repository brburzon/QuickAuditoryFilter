'use strict';

describe('Service: mathjsInstanceFactory', function () {

  // load the service's module
  beforeEach(module('qafApp'));

  // instantiate service
  var mathjsInstanceFactory;
  beforeEach(inject(function (_mathjsInstanceFactory_) {
    mathjsInstanceFactory = _mathjsInstanceFactory_;
  }));

  it('should do something', function () {
    expect(mathjsInstanceFactory).toBeDefined();
  });

});
