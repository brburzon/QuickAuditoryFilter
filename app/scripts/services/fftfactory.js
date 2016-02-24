(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.fftFactory
     * @description
     * # fftFactory
     * Factory in the qafApp.
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

        function getInstance(bufferSize, sampleRate) {
            if(!onlyInstance) {
                onlyInstance = new FFT(bufferSize, sampleRate);
            }
            return onlyInstance;
        }
    };
}());
