'use strict';

describe('Service: resultRecorder', function () {
    // instantiate service
    var resultRecorder,
        snrSuplier,
        answersHandler,
        responseTimer,
        // mock values
        firstResponse = 0,
        secondUserResponse = 2,
        firstSnr = 0,
        secondSnr = 1,

        setRecords,
        getRecords,
        getCorrectAnswer;

    snrSuplier = {
        getPreparedSnr: function() {
            return [firstSnr, secondSnr];
        }
    };

    answersHandler = {
        answers: [0,1,2],
        getAnswerForIndex: function(index) {
            return this.answers[index];
        }
    };

    responseTimer = {
        restart: function() {},
        pause: function() {},
        getTime: function() {}
    };

    beforeEach(function() {
        module('appApp', function($provide) {
            $provide.value('snrSuplier', snrSuplier);
            $provide.value('answersHandler', answersHandler);
            $provide.value('responseTimer', responseTimer);
            spyOn(responseTimer, 'restart');
            spyOn(responseTimer, 'getTime').and.returnValue('1ms');
        });
    });

    beforeEach(inject(function (_resultRecorder_) {
        resultRecorder = _resultRecorder_;
        setRecords = resultRecorder.setRecords;
        getRecords = resultRecorder.getRecords;
        getCorrectAnswer = resultRecorder.getCorrectAnswer;
    }));

    describe('when getRecords is called, it', function() {
        it('should start as empty', function() {
            var responses = getRecords();
            expect(responses).toEqual([]);
        });

        it('should return a list of records in order they were added', function() {
            setRecords(firstResponse);
            setRecords(secondUserResponse);
            var records = getRecords(),
                firstResponse = records[0].userResponse,
                secondResponse = records[1].userResponse;
            expect(firstResponse).toBe(firstResponse);
            expect(secondResponse).toBe(secondUserResponse);
        });

        it('should return a copy of the list for immutability', function() {
            setRecords(firstResponse);
            var immutable = getRecords();
            immutable[0] = "no effect";
            var shouldNotHaveChanged = getRecords();

            expect(immutable).not.toBe(shouldNotHaveChanged);
            expect(shouldNotHaveChanged[0]).not.toEqual("no effect");
        });
    });

    describe('when setRecords is called, it', function() {
        it('should set the current signal filename', function() {
            setRecords(firstResponse);
            var filename = getRecords()[0].filename;
            expect(filename).toEqual(firstFilename);
        });

        it('should set the current correct answer', function() {
            setRecords(firstResponse);
            var correctAnswer = getRecords()[0].correctAnswer;
            expect(correctAnswer).toEqual(jasmine.any(Number));
        });

        it('should set the current user response', function() {
            setRecords(firstResponse);
            var userResponse = getRecords()[0].userResponse;
            expect(userResponse).toEqual(firstResponse);
        });

        it('should set the current user response correctness', function() {
            setRecords(firstResponse);
            var correctness = getRecords()[0].correctness;
            expect(correctness).toEqual(jasmine.any(Boolean));
        });

        it('should set the current timer value', function() {
            setRecords(firstResponse);
            var timer = getRecords()[0].timer;
            expect(timer).toEqual(jasmine.stringMatching('ms'));
        });

        it('should increment round for the next call of setRecords', function() {
            setRecords(firstResponse);
            setRecords(secondUserResponse);
            var accessFirstFile = getRecords()[0].filename,
                accessSecondFile = getRecords()[1].filename;
            expect(accessFirstFile).toEqual(firstFilename);
            expect(accessSecondFile).toEqual(secondFilename);
        });
    });

    describe('when getCorrectAnswer is called, it', function() {
        it('should return the answer for the current round', function() {
            setRecords(firstResponse);
            var firstAnswer = getCorrectAnswer();
            setRecords(secondUserResponse);
            var secondAnswer = getCorrectAnswer();
            expect(firstAnswer).toBe(0);
            expect(secondAnswer).toBe(1);
        });
    });

    describe('when startRecordTimer, it', function() {
        it('should call responseTimer.restart()', function() {
            resultRecorder.startRecordTimer();
            expect(responseTimer.restart.calls.count()).toBe(1);
        });
    });
});
