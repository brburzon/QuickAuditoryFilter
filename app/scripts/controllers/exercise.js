(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name appApp.controller:ExerciseCtrl
     * @description
     * # ExerciseCtrl
     * Controller of the appApp
     */
    angular.module('appApp')
        .controller('ExerciseCtrl', ExerciseCtrl);

    /** @ngInject */
    function ExerciseCtrl($interval, $location, audioHandler, resultRecorder) {
        var PLAYING_STATE = 0,
            CORRECT_STATE = 1,
            WRONG_STATE = 2,
            PENDING_STATE = -1,
            FIRST_BUTTON = 0,
            SECOND_BUTTON = 1,
            THIRD_BUTTON = 2,
            BUTTON_LIST = [ FIRST_BUTTON, SECOND_BUTTON, THIRD_BUTTON ];

        var vm = this;

        vm.activeBtn = 0;
        vm.btnState = PENDING_STATE;
        vm.gapDuration = 250;
        vm.isResponseEnable = false;
        vm.message = '';
        vm.play = play;
        vm.setResponse = setResponse;

        audioHandler.prepAnswers();
        ensureSafeReload();

        function ensureSafeReload() {
            try {
                vm.soundDuration = audioHandler.getSoundDuration();
            } catch(e) {
                $location.path('/');
                location.reload();
            }
        };

        function play() {
            disableUserResponse();
            setInstructions('After the tone, click the box or use the keyboard to choose your answer.');
            audioHandler.playSounds(vm.gapDuration);
            setBtnStateForEach(PLAYING_STATE)
                .then(enableUserResponse);
        }

        function disableUserResponse() {
            vm.isResponseEnable = false;
        }

        function setInstructions(msg) {
            vm.message = msg;
        }

        function setBtnStateForEach(newState) {
            var i = 0;
            return $interval(function() {
                vm.btnState =  newState;
                vm.activeBtn = BUTTON_LIST[i++];
            }, vm.soundDuration + vm.gapDuration, 3);
        }

        function enableUserResponse() {
            resultRecorder.startRecordTimer();
            vm.isResponseEnable = true;
        }

        function setResponse(response) {
            resultRecorder.setRecords(response);
            checkResponse(response)
                .then(function() {
                    checkIfOver();
                });
        }

        function checkResponse(response) {
            var rightAnswer = resultRecorder.getCorrectAnswer();
            if(rightAnswer === response)
                return setSingleBtnState(rightAnswer, CORRECT_STATE);
            else
                return setSingleBtnState(rightAnswer, WRONG_STATE);
        }

        function setSingleBtnState(btnId, newState) {
            return $interval(function() {
                vm.btnState = newState;
                vm.activeBtn = btnId;
            }, 0, 1);
        }

        function checkIfOver() {
            if(audioHandler.isOver())
                $location.path('/result');
            else
                play();
        }
    }
}());
