(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.signalProcessor
     * @description
     * # signalProcessor
     * Factory in the qafApp.
     * This is used by bufferGenerator
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

        function populateSignalBuffer(bufferArray, snr, sampleRate) {
            var noise = createNoise(bufferArray.length, sampleRate),
                rampValues = [],
                noiseWithTone;

            for(var i = 1; i < bufferArray.length; i++) {
                noiseWithTone = noise[i] + calculateToneValueForIndex(i, snr, sampleRate);
                bufferArray[i] = noiseWithTone;
            }
            qafUtil.applyRamp(bufferArray, rampSize);
        }

        function populateNoSignalBuffer(bufferArray, snr, sampleRate) {
            var noise = createNoise(bufferArray.length, sampleRate),
                rampValues = [];

            for(var i = 1; i < bufferArray.length; i++) {
                bufferArray[i] = noise[i];
            }
            qafUtil.applyRamp(bufferArray, rampSize);
        }

        function calculateToneValueForIndex(i, amplitude, sampleRate) {
            var pureToneFrequency = 1000;
            return amplitude * Math.sin(2 * Math.PI * pureToneFrequency * (i / sampleRate));
        }

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
