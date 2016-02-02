'use strict';

describe('Service: audioPlayer', function () {

    var audioPlayer,
        $timeout,
        webAudioContextFactory,
        audioContext,
        bufferSource,

        audioData = { buffer: new ArrayBuffer(), duation: 300 },
        pauseDuration = 250,
        overAllDuration = audioData.duration + pauseDuration;

    webAudioContextFactory = {
        getInstance: function() {
            return audioContext;
        }
    };

    audioContext = {
        destination: 'foo destination',
        createBufferSource: function() {
            return befferSource;
        }
    };

    bufferSource = {
        buffer: 'foo buffer',
        connect: function(destination) {
            this.destination = destination;
        },
        start: function(pos) {
            this.pos = pos;
        }
    };

    beforeEach(function() {
        module('appApp', function($provide) {
            $provide.value('webAudioContextFactory', webAudioContextFactory);
        });
        inject(function(_audioPlayer_, _$timeout_) {
            audioPlayer = _audioPlayer_;
            $timeout = _$timeout_;
        });
        spyOn(audioContext, 'createBufferSource').and.returnValue(bufferSource);
        spyOn(bufferSource, 'connect');
        spyOn(bufferSource, 'start');
    });

    afterEach(function() {
        bufferSource.buffer = 'reset value';
    });

    it('should do something', function () {
        expect(!!audioPlayer).toBe(true);
    });

    describe('when play is called, it', function() {
        it('should create new bufferSource', function() {
            audioPlayer.play(audioData, pauseDuration);
            $timeout.flush(pauseDuration);
            expect(audioContext.createBufferSource.calls.count()).toBe(1);
        });

        it('should connect source to destination', function() {
            audioPlayer.play(audioData, pauseDuration);
            $timeout.flush(pauseDuration);
            expect(bufferSource.connect.calls.count()).toBe(1);
            expect(bufferSource.connect)
                .toHaveBeenCalledWith(audioContext.destination);
        });

        it('should set source buffer', function() {
            audioPlayer.play(audioData, pauseDuration);
            $timeout.flush(pauseDuration);
            expect(bufferSource.buffer).toBe(audioData);
        });

        it('should call start', function() {
            audioPlayer.play(audioData, pauseDuration);
            $timeout.flush(pauseDuration);
            expect(bufferSource.start.calls.count()).toBe(1);
            expect(bufferSource.start).toHaveBeenCalledWith(0);
        });

        it('should return a promise', function() {
            var promise = audioPlayer.play(audioData, pauseDuration);
            expect(typeof promise.then).toEqual('function');
        });

        it('should use pauseDuration', function() {
            audioPlayer.play(audioData, pauseDuration);
            expect(audioContext.createBufferSource).not.toHaveBeenCalled();
            expect(bufferSource.connect).not.toHaveBeenCalled();
            expect(bufferSource.start).not.toHaveBeenCalled();
            $timeout.flush(pauseDuration);
            expect(audioContext.createBufferSource).toHaveBeenCalled();
            expect(bufferSource.connect).toHaveBeenCalled();
            expect(bufferSource.start).toHaveBeenCalled();
        });
    });

});
