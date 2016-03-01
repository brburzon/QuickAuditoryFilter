(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.fftFactory
     * @description
     * # fftFactory
     * Factory for creating an instance of Fast Fourier Transform.
     */
    angular
        .module('qafApp')
        .factory('fftFactory', fftFactory);

    function fftFactory() {
        var onlyInstance;

        var fft = {
            getInstance: getInstance
        };

        return fft;

        /**
         * Creates and returns a single instance of Fast Fourier Transform object.
         * @param {number} bufferSize - size of buffer array
         * @param {number} sampleRate - sampleRate of the user's computer
         * @return {object} onlyInstance - FFT is only created once
         */
        function getInstance(bufferSize, sampleRate) {
            if(!onlyInstance) {
                onlyInstance = new FFT(bufferSize, sampleRate);
            }
            return onlyInstance;
        }
    };
}());
