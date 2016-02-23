'use strict';

describe('Service: fftFactory', function () {

    // load the service's module
    beforeEach(module('qafApp'));

    // instantiate service
    var fftFactory;
    beforeEach(inject(function (_fftFactory_) {
        fftFactory = _fftFactory_;
    }));

    it('should do something', function () {
        expect(!!fftFactory).toBe(true);
    });

    describe('when getInstance is called, it', function() {
        it('should return an instance of FFT from digital sound processing (dsp.js) library', function() {
            var bufferSize = 100,
                sampleRate = 44100,
                newInstance = fftFactory.getInstance(bufferSize, sampleRate);
            expect(newInstance).toBeDefined();
        });

        it('should only create a single instance of FFT', function() {
            var bufferSize = 100,
                sampleRate = 44100,
                newInstance = fftFactory.getInstance(bufferSize, sampleRate),
                otherInstance = fftFactory.getInstance(bufferSize, sampleRate);
            expect(newInstance).toBe(otherInstance);
        });
    });

});
