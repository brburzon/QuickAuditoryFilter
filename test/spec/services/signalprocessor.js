'use strict';

describe('Service: signalProcessor', function () {
    var signalProcessor,
        qafUtil,
        mathjsInstanceFactory,
        mathjs;

    beforeEach(module('qafApp', function($provide) {
        qafUtil =
            jasmine.createSpyObj('qafUtil',
                                 [
                                     'applyRamp',
                                     'roundUpToPowerOfTwo',
                                     'inverseFastFourierTransform',
                                     'applyRootMeanSquare'
                                 ]);
        mathjsInstanceFactory =
            jasmine.createSpyObj('mathjsInstanceFactory', ['getInstance']);
        mathjs =
            jasmine.createSpyObj('mathjs', ['eval']);

        mathjsInstanceFactory.getInstance.and.returnValue(mathjs);
        mathjs.eval.and.returnValue(Math.random());

        $provide.value('qafUtil', qafUtil);
        $provide.value('mathjsInstanceFactory', mathjsInstanceFactory);
    }));

    beforeEach(inject(function (_signalProcessor_) {
        signalProcessor = _signalProcessor_;
    }));

    it('should do something', function () {
        expect(!!signalProcessor).toBe(true);
    });

    describe('when populateSignalBuffer is called, it', function() {
        var bufferArray = [],
            snr = 0,
            frequency = 1000,
            sampleRate = 8;

        beforeEach(function() {
            signalProcessor.populateSignalBuffer(bufferArray, snr, frequency, sampleRate);
        });

        it('should call qafUtil.roundUpToPowerOfTwo', function() {
            expect(qafUtil.roundUpToPowerOfTwo).toHaveBeenCalled();
        });

        it('should call qafUtil.inverseFastFourierTransform', function() {
            expect(qafUtil.inverseFastFourierTransform).toHaveBeenCalled();
        });

        it('should call qafUtil.applyRootMeanSquare', function() {
            expect(qafUtil.applyRootMeanSquare).toHaveBeenCalled();
        });

        it('should call qafUtil.applyRamp', function() {
            expect(qafUtil.applyRamp).toHaveBeenCalled();
        });

        it('should not put NaN to the passed in bufferArray', function(){
            for(var i = 0; i < bufferArray.length; i++) {
                expect(bufferArray[i]).toBe(jasmine.any(Number));
                expect(isNaN(bufferArray[i])).toBe(false);
            }
        });
    });


    describe('when populateNoSignalBuffer is called, it', function() {
        var bufferArray = [],
            sampleRate = 8;

        beforeEach(function() {
            signalProcessor.populateNoSignalBuffer(bufferArray, sampleRate);
        });

        it('should call qafUtil.roundUpToPowerOfTwo', function() {
            expect(qafUtil.roundUpToPowerOfTwo).toHaveBeenCalled();
        });

        it('should call qafUtil.inverseFastFourierTransform', function() {
            expect(qafUtil.inverseFastFourierTransform).toHaveBeenCalled();
        });

        it('should call qafUtil.applyRootMeanSquare', function() {
            expect(qafUtil.applyRootMeanSquare).toHaveBeenCalled();
        });

        it('should call qafUtil.applyRamp', function() {
            expect(qafUtil.applyRamp).toHaveBeenCalled();
        });

        it('should not put NaN to the passed in bufferArray', function(){
            for(var i = 0; i < bufferArray.length; i++) {
                expect(bufferArray[i]).toBe(jasmine.any(Number));
                expect(isNaN(bufferArray[i])).toBe(false);
            }
        });
    });
});
