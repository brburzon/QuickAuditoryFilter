'use strict';

describe('Service: answersHandler', function () {

    // load the service's module
    beforeEach(module('qafApp'));

    // instantiate service
    var answersHandler;
    beforeEach(inject(function (_answersHandler_) {
        answersHandler = _answersHandler_;
    }));

    it('should do something', function () {
        expect(!!answersHandler).toBe(true);
    });

    describe('when generateRandomAnswers is called, it', function() {
        it('should save an array of size save as the count provided', function() {
            var count = 5;
            answersHandler.storeNewRandomAnswers(count);
            var arraySize = answersHandler.getSize();
            expect(arraySize).toBe(count);
        });

        it('should fill the saved array with values between 0 and 2', function() {
            var count = 5;
            answersHandler.storeNewRandomAnswers(count);
            for(var i = 0; i < count; i++) {
                var answer = answersHandler.getAnswerForIndex(i);
                expect(answer).toBeLessThan(3);
                expect(answer).toBeGreaterThan(-1);
            }
        });
    });

    describe('when getAnswersForIndex is called, it', function() {
        it('should return the answer for the given index', function() {
            var count = 1;
            answersHandler.storeNewRandomAnswers(count);
            var answer = answersHandler.getAnswerForIndex(0),
                shouldBeTheSame = answersHandler.getAnswerForIndex(0);
            expect(answer).toEqual(shouldBeTheSame);
        });

        it('should throw error given an index less than 0', function() {
            var count = 1;
            answersHandler.storeNewRandomAnswers(count);
            function shouldThrowError() {
                return answersHandler.getAnswerForIndex(-1);
            }
            expect(shouldThrowError)
                .toThrow('answersHandler.getAnswerForIndex: invalid index');
        });

        it('should throw error given an index greater than its size', function() {
            var count = 1;
            answersHandler.storeNewRandomAnswers(count);
            function shouldThrowError() {
                return answersHandler.getAnswerForIndex(count);
            }
            expect(shouldThrowError)
                .toThrow('answersHandler.getAnswerForIndex: invalid index');
        });
    });

    describe('when getSize is called, it', function() {
        it('should return the length of answers array', function() {
            var count = 5;
            answersHandler.storeNewRandomAnswers(count);
            var size = answersHandler.getSize();
            expect(size).toEqual(count);           
        });
    });
});

