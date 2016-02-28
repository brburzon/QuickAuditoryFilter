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
            channels = 2;

        var generator = {};

        generator.getNumberOfSignalBuffers = getNumberOfSignalBuffers;
        generator.getBufferDuration = getBufferDuration;
        generator.generateSignalBuffer = generateSignalBuffer;
        generator.generateNoSignalBuffer = generateNoSignalBuffer;

        return generator;

        /**
         * Returns the number of signal buffer
         * @param {number} - number of signal buffer
         */
        function getNumberOfSignalBuffers() {
            // For now return 4 because we don't know when to stop.
            // The snrSuplier.getPreparedSnr() now returns undefined since we
            // are not using it.
            return 4; // snrSuplier.getPreparedSnr().length; 
        }

        function getBufferDuration() {
            return durationInMilliSeconds;
        }

        function generateSignalBuffer() {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate),
                signalLevel = userConfig.getSignalLevel(),
                signalFrequency = userConfig.getSignalFrequency();

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel);
                signalProcessor.populateSignalBuffer(bufferData, signalLevel, signalFrequency, sampleRate);
            }
            return buffer;
        }

        function generateNoSignalBuffer() {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate);

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel);
                signalProcessor.populateNoSignalBuffer(bufferData, sampleRate);
            }
            return buffer;
        }
    }
}());
