'use strict';

describe('Service: calibrationStorage', function () {
    var calibrationStorage,
        $cookies;

    // load the service's module
    beforeEach(module('qafApp', function($provide) {
        $cookies = jasmine.createSpyObj('$cookies', ['put', 'get']);

        $provide.value('$cookies', $cookies);
    }));

    // instantiate service
    beforeEach(inject(function (_calibrationStorage_) {
        calibrationStorage = _calibrationStorage_;
    }));

    describe('when saveLevelThreshold is called, it', function() {
        it('should call $cookies.put with the provided value', function() {
            var value = 123,
                key = jasmine.anything(),
				options = jasmine.anything();
            calibrationStorage.saveLevelThreshold(value);
            expect($cookies.put).toHaveBeenCalledWith(key, value, options);
        });
    });

    describe('when getLevelThreshold is called, it', function() {
        it('should call $cookies.get', function() {
            var value = 123;
            $cookies.get.and.returnValue(value);
            calibrationStorage.getLevelThreshold();
            expect($cookies.get.calls.count()).toBe(1);
        });

        it('should throw an error if nothing is previously saved', function() {
            function shouldThrowError() {
                calibrationStorage.getLevelThreshold();
            }
            expect(shouldThrowError).toThrow(jasmine.anything());
        });
    });
});

