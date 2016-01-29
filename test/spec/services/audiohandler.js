'use strict';

describe('Service: audioHandler', function () {
    var audioHandler,
        audioPlayer,
        bufferGenerator,
        answersHandler,
        deferred;

    audioPlayer = {
        play: function() {}
    };

    answersHandler = {
        storeNewRandomAnswers: function() {},
        getAnswerForIndex: function() {},
        getSize: function() {}
    };

    deferred = {
        then: function(callback) {
            callback();
            return this;
        }
    };

    beforeEach(module('appApp', function($provide) {
        spyOn(audioPlayer, 'play').and.returnValue(deferred);;

        bufferGenerator =
            jasmine.createSpyObj('bufferGenerator', [
                'getNumberOfSignalBuffers',
                'getBufferDuration',
                'generateSignalBuffer',
                'generateNoSignalBuffer'
            ]);

        bufferGenerator.getNumberOfSignalBuffers.and.returnValue(3);

        spyOn(answersHandler, 'storeNewRandomAnswers');
        spyOn(answersHandler, 'getAnswerForIndex').and.returnValues(0,1,2);
        spyOn(answersHandler, 'getSize').and.returnValue('3');

        $provide.value('audioPlayer', audioPlayer);
        $provide.value('bufferGenerator', bufferGenerator);
        $provide.value('answersHandler', answersHandler);
    }));

    beforeEach(inject(function (_audioHandler_) {
        audioHandler = _audioHandler_;
    }));

    describe('when prepAnswers is called', function() {
        it('should call answersHandler.storeNewRandomAnswers', function () {
            audioHandler.prepAnswers();
            expect(answersHandler.storeNewRandomAnswers).toHaveBeenCalled();
            expect(answersHandler.storeNewRandomAnswers).toHaveBeenCalledWith(3);
        });
    });

    describe('when playSounds is called, it', function() {
        it('should call answersHandler.getAnswerForIndex', function() {
            audioHandler.prepAnswers();
            audioHandler.playSounds();
            expect(answersHandler.getAnswerForIndex).toHaveBeenCalled();
        });

        it('should call audioPlayer.play', function() {
            audioHandler.prepAnswers();
            audioHandler.playSounds();
            expect(audioPlayer.play).toHaveBeenCalled();
        });
    });

    describe('when getSoundDuration is called, it', function() {
        it('should return the sound duration', function() {
            bufferGenerator.getBufferDuration.and.returnValue(250);
            var duration = audioHandler.getSoundDuration();
            expect(duration).toEqual(250);
        });
    });

    describe('when isOver is called, it', function() {
        it('should return false if it has not iterated over each signal files',
           function() {
               audioHandler.prepAnswers();
               audioHandler.playSounds();
               expect(audioHandler.isOver()).toBe(false);
               audioHandler.playSounds();
               expect(audioHandler.isOver()).toBe(false);
           });

        it('should return true if it has not iterated over each no signal files',
           function() {
               audioHandler.prepAnswers();
               audioHandler.playSounds();
               audioHandler.playSounds();
               audioHandler.playSounds();
               expect(audioHandler.isOver()).toBe(true);
           });
    });
});
