(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:ExerciseCtrl
     * @description
     * # ExerciseCtrl
     * Controller of the qafApp
     */
    angular.module('qafApp')
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

        activate();


        /**
         * Initializes the answers and makes sure the audio data is prepared.
         * If the user reloads the page, redirect to setup page.
         */
        function activate() {
            try {
                vm.soundDuration = audioHandler.getSoundDuration();
                audioHandler.prepAnswers();
            } catch(e) {
                $location.path('/');
                location.reload();
            }
        };

        /**
         * Plays the set of sounds for the current round.
         */
        function play() {
            disableUserResponse();
            setInstructions('After the tone, click the box or use the keyboard to choose your answer.');
            audioHandler.playSounds(vm.gapDuration);
            setBtnStateForEach(PLAYING_STATE)
                .then(enableUserResponse);
        }

        /**
         * When called, user will not be able to submit a response.
         */
        function disableUserResponse() {
            vm.isResponseEnable = false;
        }

        /**
         * Takes a string sets the new instruction for the user.
         * @param {string} msg - instruction
         */
        function setInstructions(msg) {
            vm.message = msg;
        }

        /**
         * Cycles through each buttons and change their state for the directive to know when to change the button
         * colors.
         * @param {string}
         */
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
