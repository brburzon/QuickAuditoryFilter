'use strict';

describe('Service: mathInstanceFactory', function () {

  // load the service's module
  beforeEach(module('qafApp'));

  // instantiate service
  var mathInstanceFactory;
  beforeEach(inject(function (_mathInstanceFactory_) {
    mathInstanceFactory = _mathInstanceFactory_;
  }));

  it('should do something', function () {
    expect(mathInstanceFactory).toBeDefined();
  });

});
