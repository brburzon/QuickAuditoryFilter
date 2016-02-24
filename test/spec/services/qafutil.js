'use strict';

describe('Service: qafUtil', function () {
    var qafUtil,
        fftFactory,
        fftInstance;

    beforeEach(module('qafApp', function($provide) {
        fftFactory = jasmine.createSpyObj('fftFactory', ['getInstance']);
        fftInstance = jasmine.createSpyObj('fft', ['inverse']);
        $provide.value('fftFactory', fftFactory);
    }));

    beforeEach(inject(function (_qafUtil_) {
        qafUtil = _qafUtil_;
    }));

    it('should do something', function () {
        expect(!!qafUtil).toBe(true);
    });

    describe('when applyRamp is called, it', function() {
        var bufferArray = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            rampSize = 3;

        beforeEach(function() {
            qafUtil.applyRamp(bufferArray, rampSize);
        });

        it('should ignore the first element', function() {
            expect(bufferArray[0]).toBe(0);
        });

        it('should only update the first and last three', function() {
            expect(bufferArray[4]).toBe(1);
            expect(bufferArray[5]).toBe(1);
            expect(bufferArray[6]).toBe(1);
        });

        it('should multilpy by the ramp value', function() {
            expect(bufferArray).toEqual([ 0,
                                          0.01562499999999999,
                                          0.42187499999999983,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          0.42187499999999983,
                                          0.01562499999999999 ]);
        });
    });

    describe('when roundUpToPowerOfTwo is calle, it', function() {
        it('should round the given number to the next power of two', function() {
            var powerOfTwo = qafUtil.roundUpToPowerOfTwo(3000000000),
                roundTo32bit = 4294967296;
            expect(powerOfTwo).toBe(roundTo32bit); 
        });
    });

    describe('when inverseFastFourierTransform is called, it', function() {
        var real = [0, 0, 0, 0],
            imag = [1, 1, 1, 1],
            bufferSize = 16,
            sampleRate = 32;

        beforeEach(function() {
            fftFactory.getInstance.and.returnValue(fftInstance);
            qafUtil.inverseFastFourierTransform(real, imag, bufferSize, sampleRate);
        });
        
        it('should call fftFactory.getInstance', function() {
            expect(fftFactory.getInstance).toHaveBeenCalledWith(bufferSize, sampleRate);
        });

        it('should call fft.inverse', function() {
            expect(fftInstance.inverse).toHaveBeenCalledWith(real, imag);
        });
    });

    describe('when applyRootMeanSquare is called, it', function() {
        var samples = [1, 3, 5, 7, 10, 2];
        it('should apply root mean square value to each element of the samples', function() {
            var newSamples = qafUtil.applyRootMeanSquare(samples, 1);
            expect(newSamples).toEqual([ 0.1786474002526241,
                                         0.5359422007578724,
                                         0.8932370012631206,
                                         1.2505318017683686,
                                         1.7864740025262411,
                                         0.3572948005052482 ]);
        });
    });
});
