(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name appApp.signalProcessor
     * @description
     * # signalProcessor
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('signalProcessor', signalProcessor);

    /** @ngInject */
    function signalProcessor(qafUtil) {
        var sigma = 1,
            rampSize = 300;

        var processor = {};

        processor.populateSignalBuffer = populateSignalBuffer;
        processor.populateNoSignalBuffer = populateNoSignalBuffer;

        return processor;

        function populateSignalBuffer(bufferArray, snr, sampleRate) {
            var noise = createNoise(bufferArray.length, sampleRate),
                rampValues = [];
            for(var i = 1; i < bufferArray.length; i++) {
                var noiseWithTone = noise[i] + calculateToneValueForIndex(i, snr, sampleRate);
                if(i > rampValues && i < (bufferArray.length - rampValues)) {
                    bufferArray[i] = noiseWithTone;
                } else if(i <= rampSize) {
                    rampValues[i] = qafUtil.getRamp(noiseWithTone, rampSize);
                    bufferArray[i] = rampValues[i] * noiseWithTone;
                } else {
                    bufferArray[i] = rampValues.pop() * noiseWithTone;
                }
            }
        }

        function populateNoSignalBuffer(bufferArray, snr, sampleRate) {
            var noise = createNoise(bufferArray.length, sampleRate),
                rampValues = [];
            for(var i = 1; i < bufferArray.length; i++) {
                if(i > rampValues && i < (bufferArray.length - rampValues)) {
                    bufferArray[i] = noise[i];
                } else if(i <= rampSize) {
                    rampValues[i] = qafUtil.getRamp(noise[i], rampSize);
                    bufferArray[i] = rampValues[i] * noise[i];
                } else {
                    bufferArray[i] = rampValues.pop() * noise[i];
                }
            }
        }

        function calculateToneValueForIndex(i, amplitude, sampleRate) {
            var frequency = 1000; // pure tone
		    return amplitude * Math.sin(2 * Math.PI * frequency * (i / sampleRate));
        }

        function createNoise(length, sampleRate) {
		    var real = [0],
			    imag = [0],
                powerOfTwoLength = qafUtil.roundUpToPowerOfTwo(length),
			    duration = powerOfTwoLength / sampleRate;

		    for(var i = 1; i <= powerOfTwoLength / 2; i++) {
			    var frequency = i / duration,
                    amplitude = getNoiseAmplitude(frequency);
			    real[i] = amplitude.re;
			    imag[i] = amplitude.im;
			    // j = index used for mirroring
			    var j = powerOfTwoLength - i;
			    real[j] = amplitude.re;
			    imag[j] = -amplitude.im;
		    }
		    var inverse = qafUtil.inverseFastFourierTransform(real, imag);
            return qafUtil.applyRootMeanSquare(inverse);
        }

        function getNoiseAmplitude(frequency) {
	        function getNoiseAmplitude(freq) {
		        if(freq < 900 || freq > 1100) {
			        return {re: 0, im: 0 };
		        } else {
			        var g1 = Math.randomGaussian(0, sigma).toString(),
				        g2 = Math.randomGaussian(0, sigma).toString();
			        return math.eval('sqrt('+g1+'^2 + '+g2+'^2) * E^(i * (random() * (2 * PI)))');
		        }
	        }
        }


    }

}());
