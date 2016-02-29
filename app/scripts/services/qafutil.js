(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.qafUtil
     * @description
     * # qafUtil
     * Contains utility functions for processing signal.
     * Used by SignalProcessor service.
     */
    angular.module('qafApp')
        .factory('qafUtil', qafUtil);

    /** @ngInject */
    function qafUtil(fftFactory) {
        var qaf = {};

        qaf.applyRamp = applyRamp;
        qaf.roundUpToPowerOfTwo = roundUpToPowerOfTwo ;
        qaf.inverseFastFourierTransform = inverseFastFourierTransform ;
        qaf.applyRootMeanSquare = applyRootMeanSquare;

        return qaf;

        /**
         * Takes an array and size of ramp then applies the ramping to the
         * given array.
         * @param {array} bufferArray - buffer array
         * @param {number} rampSize - size of ramp up and ramp down
         */
        function applyRamp(bufferArray, rampSize) {
            var endIndex = bufferArray.length - 1;

            for(var i = 1; i <= rampSize; i++) {
                var rampValue = getRamp(i, rampSize);
                bufferArray[i] = bufferArray[i] * rampValue;
                bufferArray[endIndex] = bufferArray[endIndex--] * rampValue;
            }
        }

        /**
         * Takes a value, and ramp size then calculates the appropriate ramp
         * value.
         * @param {number} val - value
         * @param {number} rampSize - size of ramp up and ramp down
         */
        function getRamp(val, rampSize) {
            return (1 - Math.cos((val/rampSize) * Math.PI))/2;
        }

        /**
         * Takes a number x and returns the nearest 2 to the x number.
         * @param {number} number - number to round
         */
        function roundUpToPowerOfTwo(number) {
            return Math.pow(2, Math.ceil(Math.log(number) / Math.log(2)));
        }

        /**
         * Applies inverse Fast Fourier Transform to arrays of real and imaginary numbers.
         * @param {array} real - array of real numbers
         * @param {array} imag - array of imaginary numbers
         * @param {number} bufferSize - size of buffer array
         * @param {number} sampleRate - sample rate of the user's computer
         */
        function inverseFastFourierTransform(real, imag, bufferSize, samplingRate) {
            var powerOfTwo = roundUpToPowerOfTwo(bufferSize);
            var fft = fftFactory.getInstance(powerOfTwo, samplingRate),
                result = fft.inverse(real, imag);
            return result;
        }

        /**
         * Takes an array of samples and a number sigma then applies "Root Mean Square (RMS)"
         * the the array of samples.
         * @param {array} samples - array of samples
         * @param {number} sigma - used to determine the amplitude of noise
         * @return {array} - result of applying RMS to the samples array
         */
        function applyRootMeanSquare(samples, sigma) {
            var square = samples.map(function(x) { return x * x; }),
                sum = square.reduce(function(prev, curr) { return prev + curr; } ),
                avg = sum / samples.length,
                rms = Math.sqrt(avg);

            return samples.map(function(x) { return x / rms * sigma; });
        }
    }

}());
