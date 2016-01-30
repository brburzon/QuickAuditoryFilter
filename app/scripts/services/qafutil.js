(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name appApp.qafUtil
     * @description
     * # qafUtil
     * Factory in the appApp.
     * Used by SignalProcessor service.
     */
    angular.module('appApp')
        .factory('qafUtil', qafUtil);

    /** @ngInject */
    function qafUtil(fftFactory) {
        var qaf = {};

        qaf.applyRamp = applyRamp;
        qaf.getRamp = getRamp;
        qaf.roundUpToPowerOfTwo = roundUpToPowerOfTwo ;
        qaf.inverseFastFourierTransform = inverseFastFourierTransform ;
        qaf.applyRootMeanSquare = applyRootMeanSquare;

        return qaf;

        function applyRamp(bufferArray, rampSize) {
            var endIndex = bufferArray.length -1;

            for(var i = 1; i < rampSize; i++) {
                var rampValue = getRamp(i, rampSize);
                bufferArray[i] = bufferArray[i] * rampValue;

                rampValue = getRamp(endIndex, rampSize);
                bufferArray[endIndex] = bufferArray[endIndex] * rampValue;

                endIndex = endIndex - 1;
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

        function applyRootMeanSquare(samples) {
            var square = samples.map(function(x) { return x * x; }),
                sum = square.reduce(function(prev, curr) { return prev + curr; } ),
                avg = sum / samples.length,
                rms = Math.sqrt(avg);

            return samples.map(function(x) { return x / rms; }); // suppose to be(x / rms * sigma) but sigma is 1
        }
    }

}());
