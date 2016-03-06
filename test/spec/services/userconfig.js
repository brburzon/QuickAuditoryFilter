'use strict';

describe('Service: userConfig', function () {

    // load the service's module
    beforeEach(module('qafApp'));

    // instantiate service
    var userConfig;
    beforeEach(inject(function (_userConfig_) {
        userConfig = _userConfig_;
    }));

    describe('when saveConfig is called, it', function() {
        it('should set the signalLevel', function() {
            var actualLevel = 1234,
                actualFrequency = 5678,
                numberOfTrials = 4;
            userConfig.saveConfig(actualLevel, actualFrequency, numberOfTrials);
            var level = userConfig.getSignalLevel();
            expect(level).toBe(actualLevel);
        });

        it('should set the signalLevel', function() {
            var actualLevel = 1234,
                actualFrequency = 5678,
                numberOfTrials = 4;
            userConfig.saveConfig(actualLevel, actualFrequency, numberOfTrials);
            var level = userConfig.getSignalLevel();
            expect(level).toBe(actualLevel);
        });

        it('should set the numberOfTrials', function() {
            var actualLevel = 1234,
                actualFrequency = 5678,
                numberOfTrials = 4;
            userConfig.saveConfig(actualLevel, actualFrequency, numberOfTrials);
            var numTrials = userConfig.getNumberOfTrials();
            expect(numTrials).toBe(numberOfTrials);
        });
    });

    describe('when getSignalLevel is called, it', function() {
        it('should return a default value if the level has not been set', function() {
            expect(userConfig.getSignalLevel()).toBe(20);
        });

        it('should return the signal level', function() {
            var actualLevel = 1234;
            userConfig.saveConfig(actualLevel, 10);
            var level = userConfig.getSignalLevel();
            expect(level).toBe(actualLevel);
        });
    });

    describe('when getSignalFrequency is called, it', function() {
        it('should return a default value if the level has not been set', function() {
            expect(userConfig.getSignalFrequency()).toBe(1000);
        });

        it('should return the signal level', function() {
            var actualFrequency = 1234;
            userConfig.saveConfig(10, actualFrequency);
            var level = userConfig.getSignalFrequency();
            expect(level).toBe(actualFrequency);
        });
    });
});
