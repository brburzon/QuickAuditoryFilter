(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.qafUtil
     * @description
     * # qafUtil
     * Factory in the qafApp.
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

        function applyRamp(bufferArray, rampSize) {
            var endIndex = bufferArray.length - 1;

            for(var i = 1; i <= rampSize; i++) {
                var rampValue = getRamp(i, rampSize);
                bufferArray[i] = bufferArray[i] * rampValue;
                bufferArray[endIndex] = bufferArray[endIndex--] * rampValue;
            }
        }

        function getRamp(val, rampSize) {
            return (1 - Math.cos((val/rampSize) * Math.PI))/2;
        }

        function roundUpToPowerOfTwo(number) {
            return Math.pow(2, Math.ceil(Math.log(number) / Math.log(2)));
        }

        function inverseFastFourierTransform(real, imag, bufferSize, samplingRate) {
            var powerOfTwo = roundUpToPowerOfTwo(bufferSize);
            var fft = fftFactory.getInstance(powerOfTwo, samplingRate),
                result = fft.inverse(real, imag);
            return result;
        }

        function applyRootMeanSquare(samples, sigma) {
            var square = samples.map(function(x) { return x * x; }),
                sum = square.reduce(function(prev, curr) { return prev + curr; } ),
                avg = sum / samples.length,
                rms = Math.sqrt(avg);

            return samples.map(function(x) { return x / rms * sigma; });
        }
    }

}());
