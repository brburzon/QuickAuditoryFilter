'use strict';

describe('Service: qafUtil', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var qafUtil;
  beforeEach(inject(function (_qafUtil_) {
    qafUtil = _qafUtil_;
  }));

  it('should do something', function () {
    expect(!!qafUtil).toBe(true);
  });

});
