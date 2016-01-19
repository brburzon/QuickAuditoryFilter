'use strict';

describe('Controller: ResponseBtnCtrl', function () {

    beforeEach(module('appApp'));

    var ResponseBtnCtrl,
        scope,
        timeout,

        PENDING_STATE = -1,
        PLAYING_STATE = 0,
        CORRECT_STATE = 1,
        WRONG_STATE = 2;

    beforeEach(inject(function ($controller, $rootScope, $timeout) {
        scope = $rootScope.$new();
        timeout = $timeout;
        spyOn(scope, '$watch');
        ResponseBtnCtrl = $controller('ResponseBtnCtrl', {
            $scope: scope
        });
    }));

    function setValues(value, activeBtn, btnState) {
        ResponseBtnCtrl.value = value;
        ResponseBtnCtrl.activeBtn = activeBtn;
        ResponseBtnCtrl.state = btnState;
    }

    describe('when instancialized, it', function() {
        it('should call scope.$watch', function() {
            expect(scope.$watch).toHaveBeenCalled();
        });
    });

    describe('when isPlaying is called, it', function() {
        it('should return false if button is not active', function() {
            setValues(0, 1, PLAYING_STATE);
            var isPlaying = ResponseBtnCtrl.isPlaying();
            expect(isPlaying).toBe(false);
        });

        it('should return false if state is not PLAYING_STATE', function() {
            setValues(0, 0, WRONG_STATE);
            var isPlaying = ResponseBtnCtrl.isPlaying();
            expect(isPlaying).toBe(false);
        });

        it('should be true if button is active and state is PLAYING_STATE', function() {
            setValues(0, 0, PLAYING_STATE);
            var isPlaying = ResponseBtnCtrl.isPlaying();
            expect(isPlaying).toBe(true);
        });
    });

    describe('when isCorrect is called, it', function() {
        it('should return false if state is not CORRECT_STATE', function() {
            setValues(0, 0, PLAYING_STATE);
            var isCorrect = ResponseBtnCtrl.isCorrect();
            expect(isCorrect).toBe(false);
        });

        it('should return false if button is not active', function() {
            setValues(1, 0, CORRECT_STATE);
            var isCorrect = ResponseBtnCtrl.isCorrect();
            expect(isCorrect).toBe(false);
        });

        it('should be true if button is active and state is CORRECT_STATE', function() {
            setValues(0, 0, CORRECT_STATE);
            var isCorrect = ResponseBtnCtrl.isCorrect();
            expect(isCorrect).toBe(true);
        });
    });


    describe('when isWrong is called, it', function() {
        it('should return false if state is not WRONG_STATE', function() {
            setValues(0, 0, PLAYING_STATE);
            var isWrong = ResponseBtnCtrl.isWrong();
            expect(isWrong).toBe(false);
        });

        it('should return false if button is not active', function() {
            setValues(1, 0, WRONG_STATE);
            var isWrong = ResponseBtnCtrl.isWrong();
            expect(isWrong).toBe(false);
        });

        it('should be true if button is active and state is WRONG_STATE', function() {
            setValues(0, 0, WRONG_STATE);
            var isWrong = ResponseBtnCtrl.isWrong();
            expect(isWrong).toBe(true);
        });
    });

    describe('setResponse is called, it', function() {
        it('should call submit if response is enabled', function() {
            ResponseBtnCtrl.submit = function() {};
            spyOn(ResponseBtnCtrl, 'submit');
            ResponseBtnCtrl.isEnable = true;
            ResponseBtnCtrl.setResponse();
            expect(ResponseBtnCtrl.submit).toHaveBeenCalled();
        });

        it('should not call submit if response is not enabled', function() {
            ResponseBtnCtrl.submit = function() {};
            spyOn(ResponseBtnCtrl, 'submit');
            ResponseBtnCtrl.isEnable = false;
            ResponseBtnCtrl.setResponse();
            expect(ResponseBtnCtrl.submit).not.toHaveBeenCalled();
        });
    });
});
