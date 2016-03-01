(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.signalProcessor
     * @description
     * # signalProcessor
     * Factory in the qafApp.
     * This is used by services/buffergenerator.js
     * Provides functions to populate signal and no-signal buffers.
     */
    angular.module('qafApp')
        .factory('signalProcessor', signalProcessor);

    /** @ngInject */
    function signalProcessor(qafUtil) {
        var sigma = 1,
            rampSize = 500;

        var processor = {};

        processor.populateSignalBuffer = populateSignalBuffer;
        processor.populateNoSignalBuffer = populateNoSignalBuffer;

        return processor;

        /**
         * Populates a given buffer with a signal.
         * @param {array} bufferArray
         * @param {number} snr - signal level
         * @param {number} frequency - signal frequency
         * @param {number} sampleRate
         */
        function populateSignalBuffer(bufferArray, snr, frequency, sampleRate) {
            var noise = createNoise(bufferArray.length, sampleRate),
                rampValues = [],
                noiseWithTone;

            for(var i = 1; i < bufferArray.length; i++) {
                noiseWithTone = noise[i] + calculateToneValueForIndex(i, snr, frequency, sampleRate);
                bufferArray[i] = noiseWithTone;
            }
            qafUtil.applyRamp(bufferArray, rampSize);
        }

        /**
         * Populates a given buffer with just noise.
         * @param {array} bufferArray
         * @param {number} sampleRate
         */
        function populateNoSignalBuffer(bufferArray, sampleRate) {
            var noise = createNoise(bufferArray.length, sampleRate),
                rampValues = [];

            for(var i = 1; i < bufferArray.length; i++) {
                bufferArray[i] = noise[i];
            }
            qafUtil.applyRamp(bufferArray, rampSize);
        }

        /**
         * Calculates a tone for a given index.
         * @param {number} i - index
         * @param {number} amplitude
         * @param {number} frequency
         * @param {number} sampleRate
         * @return {number} tone
         */
        function calculateToneValueForIndex(i, amplitude, frequency, sampleRate) {
            return amplitude * Math.sin(2 * Math.PI * frequency * (i / sampleRate));
        }

        /**
         * Returns an array of samples to create noise
         * @param {array} bufferSize
         * @param {number} sampleRate
         * @return {array} noise array
         */
        function createNoise(bufferSize, sampleRate) {
            var real = [0],
                imag = [0],
                powerOfTwoLength = qafUtil.roundUpToPowerOfTwo(bufferSize),
                duration = powerOfTwoLength / sampleRate,
                j = 0;

            for(var i = 1; i <= powerOfTwoLength / 2; i++) {
                var frequency = i / duration,
                    amplitude = getNoiseAmplitude(frequency);
                real[i] = amplitude.re;
                imag[i] = amplitude.im;
                // j = index used for mirroring values to the other half
                j = powerOfTwoLength - i;
                real[j] = amplitude.re;
                imag[j] = -amplitude.im;
            }
            var inverse = qafUtil.inverseFastFourierTransform(real, imag, bufferSize, sampleRate);
            return qafUtil.applyRootMeanSquare(inverse, sigma);
        }

        /**
         * Gets noise amplitude. Called by createNoise.
         * @param {number} frequency
         * @return {object} result containing real and imaginary number
         */
        function getNoiseAmplitude(frequency) {
            if(frequency < 900 || frequency > 1500) {
                return {re: 0, im: 0 };
            } else {
                var g1 = Math.randomGaussian(0, sigma).toString(),
                    g2 = Math.randomGaussian(0, sigma).toString(),
                    result = math.eval('sqrt('+g1+'^2 + '+g2+'^2) * E^(i * (random() * (2 * PI)))');
                return result;
            }
        }

    }

}());
