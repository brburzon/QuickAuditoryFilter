(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.bufferGenerator
     * @description
     * # bufferGenerator
     * Factory in the qafApp.
     */
    angular.module('qafApp')
        .factory('bufferGenerator', bufferGenerator);

    /** @ngInject */
    function bufferGenerator(webAudioContextFactory, signalProcessor, snrSuplier) {
        var audioContext = webAudioContextFactory.getInstance(),
            sampleRate = audioContext.sampleRate,
            snrList = snrSuplier.getPreparedSnr(),
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

        function getNumberOfSignalBuffers() {
            return snrSuplier.getPreparedSnr().length;
        }

        function getBufferDuration() {
            return durationInMilliSeconds;
        }

        function generateSignalBuffer(round) {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate),
                currentSnr = snrList[round];

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel, currentSnr);
                signalProcessor.populateSignalBuffer(bufferData, currentSnr, sampleRate);
            }
            return buffer;
        }

        function generateNoSignalBuffer(round) {
            var buffer = audioContext.createBuffer(channels, bufferSize, sampleRate),
                currentSnr = snrList[round];

            for(var channel = 0; channel < channels; channel++) {
                var bufferData = buffer.getChannelData(channel, currentSnr);
                signalProcessor.populateNoSignalBuffer(bufferData, currentSnr, sampleRate);
            }
            return buffer;
        }
    }
}());
