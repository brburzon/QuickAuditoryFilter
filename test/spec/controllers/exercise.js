'use strict';

describe('Controller: ExerciseCtrl', function () {

    // load the controller's module
    beforeEach(module('qafApp'));

    var ExerciseCtrl,
        interval,
        location,
        audioHandler,
        resultRecorder;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $interval) {
        interval = $interval;
        location = jasmine.createSpyObj('$location', ['path']);
        audioHandler = jasmine.createSpyObj('audioHandler', [
            'getSoundDuration',
            'prepAnswers',
            'playSounds',
            'isOver'
        ]);
        audioHandler.getSoundDuration.and.returnValue(300);
        resultRecorder = jasmine.createSpyObj('resultRecorder', [
            'startRecordTimer',
            'setRecords',
            'getCorrectAnswer'
        ]);

        ExerciseCtrl = $controller('ExerciseCtrl', {
            $interval: interval,
            $location: location,
            audioHandler: audioHandler,
            resultRecorder: resultRecorder
        });
    }));


    it('should be able to get an instance', function () {
        expect(ExerciseCtrl).toBeDefined();
    });

    describe('when play is called, it', function() {
        beforeEach(function() {
            ExerciseCtrl.isResponseEnable = true;
            ExerciseCtrl.play();
        });

        it('should disable user response while the sounds are palying', function() {
            var responseEnabled = ExerciseCtrl.isResponseEnable;
            expect(responseEnabled).toBe(false);
        });

        it('should call audioHandler.playSounds', function() {
            expect(audioHandler.playSounds.calls.count()).toBe(1);
        });

        it('should change btnState to PLAYING', function() {
            var PLAYING_STATE = 0;
            var stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.btnState).toEqual(PLAYING_STATE);
        });

        it('should loop through activeBtn', function() {
            var stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.activeBtn).toEqual(0);

            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.activeBtn).toEqual(1);

            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.activeBtn).toEqual(2);
        });
    });

    describe('when setResponse is called, it', function() {
        it('should call resultRecorder.setRecords', function() {
            ExerciseCtrl.setResponse(0);
            expect(resultRecorder.setRecords).toHaveBeenCalled();
        });

        it('should call resultRecorder.getCorrectAnswer', function() {
            ExerciseCtrl.setResponse(0);
            expect(resultRecorder.getCorrectAnswer).toHaveBeenCalled();
        });

        it('should change btn state to CORRECT_STATE of correct answer', function() {
            resultRecorder.getCorrectAnswer.and.returnValue(0);
            ExerciseCtrl.setResponse(0);
            var CORRECT_STATE = 1,
                stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.btnState).toBe(CORRECT_STATE);
        });

        it('should change btn state to WRONG_STATE of wrong answer', function() {
            resultRecorder.getCorrectAnswer.and.returnValue(1);
            ExerciseCtrl.setResponse(0);
            var WRONG_STATE = 2,
                stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.btnState).toBe(WRONG_STATE);
        });

        it('should change active btn to the correct answer', function() {
            resultRecorder.getCorrectAnswer.and.returnValue(0);
            ExerciseCtrl.setResponse(0);
            var correctBtn = 0,
                stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(ExerciseCtrl.activeBtn).toBe(correctBtn);
        });

        it('should call audioHandler.isOver', function() {
            ExerciseCtrl.setResponse(0);
            var stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(audioHandler.isOver).toHaveBeenCalled();
        });

        it('should change location path if the exercise is over', function() {
            audioHandler.isOver.and.returnValue(true);
            ExerciseCtrl.setResponse(0);
            var stateChangeDuration = ExerciseCtrl.soundDuration + ExerciseCtrl.gapDuration;
            interval.flush(stateChangeDuration);
            expect(location.path).toHaveBeenCalledWith('/result');
        });
    });
});
