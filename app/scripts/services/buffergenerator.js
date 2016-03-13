(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.bufferGenerator
     * @description
     * # bufferGenerator
     * Responsible for creating noise and signal buffer that will be used to play sound.
     * This factory used by services/audiohandler.js.
     */
    angular.module('qafApp')
        .factory('bufferGenerator', bufferGenerator);

    /** @ngInject */
    function bufferGenerator(webAudioContextFactory, signalProcessor, userConfig) {
        var audioContext = webAudioContextFactory.getInstance(),
            sampleRate = audioContext.sampleRate,
            durationInMilliSeconds = 250,
            durationInSeconds = durationInMilliSeconds / 1000,
            bufferSize = durationInSeconds * sampleRate,
            channels = 2,
            signalLevel = userConfig.getSignalLevel(),
            signalFrequency = userConfig.getSignalFrequency();

        var generator = {};

        generator.getNumberOfSignals = getNumberOfSignals;
        generator.getBufferDuration = getBufferDuration;
        generator.generateSignalBuffer = generateSignalBuffer;
        generator.generateNoSignalBuffer = generateNoSignalBuffer;

        return generator;

        /**
         * Returns the number of signal that will be presented to the
         * user during the experiment.
         * @param {number} - number of signal
         */
        function getNumberOfSignals() {
            return userConfig.getNumberOfTrials();
        }

        /**
         * Returns the buffer duration in milliseconds
         * @return {number} - durationInMilliseconds
         */
        function getBufferDuration() {
            return durationInMilliSeconds;
        }

        /**
         * Generates a signal buffer based on userConfig values
         * @return {array} - buffer
         */
        function generateSignalBuffer() {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate);

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel);
                signalProcessor.populateSignalBuffer(bufferData, signalLevel, signalFrequency, sampleRate);
            }
            return buffer;
        }

        /**
         * Generates a no-signal buffer based on userConfig values
         * @return {array} - buffer
         */
        function generateNoSignalBuffer() {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate);

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel);
                signalProcessor.populateNoSignalBuffer(bufferData, signalLevel, signalFrequency, sampleRate);
            }
            return buffer;
        }
    }
}());
