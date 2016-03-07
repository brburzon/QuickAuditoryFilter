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

    describe('when saveGainValue is called, it', function() {
        it('should call $cookies.put with the provided value', function() {
            var value = 123,
                key = jasmine.anything(),
				options = jasmine.anything();
            calibrationStorage.saveGainValue(value);
            expect($cookies.put).toHaveBeenCalledWith(key, value, options);
        });
    });

    describe('when getGainValue is called, it', function() {
        it('should call $cookies.get', function() {
            var value = 123;
            $cookies.get.and.returnValue(value);
            calibrationStorage.getGainValue();
            expect($cookies.get.calls.count()).toBe(1);
        });

        it('should throw an error if nothing is previously saved', function() {
            function shouldThrowError() {
                calibrationStorage.getGainValue();
            }
            expect(shouldThrowError).toThrow(jasmine.anything());
        });
    });

    describe('when saveToneLevel is called, it', function() {
        it('should call $cookies.put with the provided value', function() {
            var value = 123,
                key = jasmine.anything(),
				options = jasmine.anything();
            calibrationStorage.saveToneLevel(value);
            expect($cookies.put).toHaveBeenCalledWith(key, value, options);
        });
    });

    describe('when getGainValue is called, it', function() {
        it('should call $cookies.get', function() {
            var value = 123;
            $cookies.get.and.returnValue(value);
            calibrationStorage.getGainValue();
            expect($cookies.get.calls.count()).toBe(1);
        });

        it('should throw an error if nothing is previously saved', function() {
            function shouldThrowError() {
                calibrationStorage.getGainValue();
            }
            expect(shouldThrowError).toThrow(jasmine.anything());
        });
    });
});

