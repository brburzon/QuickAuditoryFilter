'use strict';

describe('Service: bufferGenerator', function () {
    var bufferGenerator,
        webAudioContextFactory,
        signalProcessor,
        snrSuplier,
        audioContext,
        sampleRate = 500;


    beforeEach(module('appApp', function injectMocks($provide) {
        audioContext =
            jasmine.createSpyObj('AudioContext', ['createBuffer']);
        audioContext.sampleRate = sampleRate;

        webAudioContextFactory =
            jasmine.createSpyObj('webAudioContextFactory', ['getInstance']);
        webAudioContextFactory.getInstance.and.returnValue(audioContext);

        signalProcessor =
            jasmine.createSpyObj('signalProcessor',
                                 [
                                     'populateNoSignalBuffer',
                                     'populateSignalBuffer'
                                 ]);
        snrSuplier = jasmine.createSpyObj('snrSuplier', ['getPreparedSnr']);
        snrSuplier.getPreparedSnr.and.returnValue(['foo', 'bar', 'baz']);

        $provide.value('webAudioContextFactory', webAudioContextFactory);
        $provide.value('signalProcessor', signalProcessor);
        $provide.value('snrSuplier', snrSuplier);
    }));

    beforeEach(inject(function (_bufferGenerator_) {
        bufferGenerator = _bufferGenerator_;
    }));

    describe('when getNumberOfSignalBuffers is called, it', function() {
        it('should return the number of prepared snr from snrSuplier', function() {
            var numberOfPreparedSnr = bufferGenerator.getNumberOfSignalBuffers();
            expect(numberOfPreparedSnr).toBe(3);
        });
    });

    describe('when getBufferDuration is called, it', function() {
        it('should return a number', function() {
            var duration = bufferGenerator.getBufferDuration();
            expect(duration).toEqual(jasmine.any(Number));
        });

        it('should return a number higher than 0', function() {
            var duration = bufferGenerator.getBufferDuration();
            expect(duration).toBeGreaterThan(0);
        });
    });

    describe('when generateSignalBuffer is called, it', function() {
        beforeEach(function() {
            var buffer = {getChannelData: function() { return []; }};
            audioContext.createBuffer.and.returnValue(buffer);
        });

        it('should call audioContext.createBuffer', function() {
            bufferGenerator.generateSignalBuffer(0);
            expect(audioContext.createBuffer.calls.count()).toBe(1);
        });

        it('should call signalProcessor.populateSignalBuffer for each channels', function() {
            bufferGenerator.generateSignalBuffer(0);
            expect(signalProcessor.populateSignalBuffer.calls.count()).toBe(2);
        });
    });

    describe('when generateNoSignalBuffer is called, it', function() {
        beforeEach(function() {
            var buffer = {getChannelData: function() { return []; }};
            audioContext.createBuffer.and.returnValue(buffer);
        });

        it('should call audioContext.createBuffer', function() {
            bufferGenerator.generateNoSignalBuffer(0);
            expect(audioContext.createBuffer.calls.count()).toBe(1);
        });

        it('should call signalProcessor.populateNoSignalBuffer for each channels', function() {
            bufferGenerator.generateNoSignalBuffer(0);
            expect(signalProcessor.populateNoSignalBuffer.calls.count()).toBe(2);
        });
    });
});
