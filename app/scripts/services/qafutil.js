(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name appApp.qafUtil
     * @description
     * # qafUtil
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('qafUtil', qafUtil);

    /** @ngInject */
    function qafUtil(fftFactory) {
        var qaf = {};

        qaf.getRamp = getRamp;
        qaf.roundUpToPowerOfTwo = roundUpToPowerOfTwo ;
        qaf.inverseFourierTransform = inverseFourierTransform ;
        qaf.applyRootMeanSquare = applyRootMeanSquare;

        return qaf;

        function getRamp(val, rampSize) {
            return (1 - Math.cos((val/rampSize) * Math.PI))/2;
        }

        function roundUpToPowerOfTwo(number) {
		    return Math.pow(2, Math.ceil(Math.log(number) / Math.log(2)));
        }

        function inverseFourierTransform(real, imag, bufferSize, samplingRate) {
            var fft = fftFactory.getInstance(bufferSize, samplingRate);
            return fft.inverse(real, imag);
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
