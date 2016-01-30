(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name appApp.fftFactory
     * @description
     * # fftFactory
     * Factory in the appApp.
     */
    angular
        .module('appApp')
        .factory('fftFactory', fftFactory);

    function fftFactory() {
        var onlyInstance;

        var fft = {
            getInstance: getInstance
        };

        return fft;

        function getInstance(bufferSize, sampleRate) {
            if(!onlyInstance) {
                onlyInstance = new FFT(bufferSize, sampleRate);
            }
            return onlyInstance;
        }
    };
}());
