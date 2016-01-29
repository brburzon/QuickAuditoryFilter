'use strict';

describe('Service: signalProcessor', function () {
    var signalProcessor,
        qafUtil;

    beforeEach(module('appApp', function($provide) {

    }));

    beforeEach(inject(function (_signalProcessor_) {
        signalProcessor = _signalProcessor_;
    }));

    it('should do something', function () {
        expect(!!signalProcessor).toBe(true);
    });

});
