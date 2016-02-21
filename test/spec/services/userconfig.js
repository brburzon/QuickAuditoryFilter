'use strict';

describe('Service: userConfig', function () {

    // load the service's module
    beforeEach(module('qafApp'));

    // instantiate service
    var userConfig;
    beforeEach(inject(function (_userConfig_) {
        userConfig = _userConfig_;
    }));

    describe('when setSignalLevel is called, it', function() {
        it('should set the signalLevel', function() {
            var actualLevel = 1234;
            userConfig.setSignalLevel(actualLevel);
            var level = userConfig.getSignalLevel();
            expect(level).toBe(actualLevel);
        });

        it('should throw an error if given something that is not a number', function() {
            var actualLevel = "I am not a number";
            function shouldThrowError() {
                userConfig.setSignalLevel(actualLevel);
            }
            expect(shouldThrowError).toThrow();
        });
    });

    describe('when getSignalLevel is called, it', function() {
        it('should return a default value if the level has not been set', function() {
            expect(userConfig.getSignalLevel()).toBe(1);
        });

        it('should return the signal level', function() {
            var actualLevel = 1234;
            userConfig.setSignalLevel(actualLevel);
            var level = userConfig.getSignalLevel();
            expect(level).toBe(actualLevel);
        });
    });

    describe('when setSignalFrequency is called, it', function() {
        it('should set the signalFrequency', function() {
            var actualFrequency = 1234;
            userConfig.setSignalFrequency(actualFrequency);
            var level = userConfig.getSignalFrequency();
            expect(level).toBe(actualFrequency);
        });

        it('should throw an error if given something that is not a number', function() {
            var actualFrequency = "I am not a number";
            function shouldThrowError() {
                userConfig.setSignalFrequency(actualFrequency);
            }
            expect(shouldThrowError).toThrow();
        });
    });

    describe('when getSignalFrequency is called, it', function() {
        it('should return a default value if the level has not been set', function() {
            expect(userConfig.getSignalFrequency()).toBe(1000);
        });

        it('should return the signal level', function() {
            var actualFrequency = 1234;
            userConfig.setSignalFrequency(actualFrequency);
            var level = userConfig.getSignalFrequency();
            expect(level).toBe(actualFrequency);
        });
    });
});
