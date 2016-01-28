(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.bufferGenerator
     * @description
     * # bufferGenerator
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('bufferGenerator', bufferGenerator);

    /** @ngInject */
    function bufferGenerator(webAudioContextFactory, signalProcessor) {
        var audioContext = webAudioContextFactory.getInstance(),
            sampleRate = audioContext.sampleRate,
            durationInSeconds = 250 / 1000,
            bufferSize = durationInSeconds * sampleRate,
            channels = 2;

        var generator = {};

        generator.generateSignalBuffer = generateSignalBuffer;
        generator.generateNoSignalBuffer = generateNoSignalBuffer;

        return generator;

        function generateSignalBuffer(snr) {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate);

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel, snr);
                signalProcessor.populateSignalBuffer(bufferData, snr, sampleRate);
            }
            return buffer;
        }

        function generateNoSignalBuffer(snr) {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate);

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel, snr);
                signalProcessor.populateNoSignalBuffer(bufferData, snr, sampleRate);
            }
            return buffer;
        }
    }
}());
