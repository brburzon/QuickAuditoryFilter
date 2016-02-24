'use strict';

describe('Service: qafCore', function () {

  // load the service's module
  beforeEach(module('qafApp'));

  // instantiate service
  var qafCore;
  beforeEach(inject(function (_qafCore_) {
    qafCore = _qafCore_;
  }));

  it('should do something', function () {
    expect(qafCore).toBeDefined();
  });

});
