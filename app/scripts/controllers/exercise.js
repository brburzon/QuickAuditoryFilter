(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:ExerciseCtrl
     * @description
     * # ExerciseCtrl
     * Starts the exercise. Checks if audio data is available then proceeds with
     * the experiment. If the audio data is not available, then the use must have
     * skipped the setup phase so we redirect the user back to the setup page.
     */
    angular.module('qafApp')
        .controller('ExerciseCtrl', ExerciseCtrl);

    /** @ngInject */
    function ExerciseCtrl($interval, $location, audioHandler, resultRecorder) {
        /**
         * Used by the responseBtn directive to know when to flash each buttons.
         */
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
            setInstructions('After the tone, click the box or use the ' +
                            'keyboard to choose your answer.');
            audioHandler.playSounds(vm.gapDuration);
            setBtnStateForEach(PLAYING_STATE)
                .then(enableUserResponse);
        }

        /**
         * Restricts the user from submitting a response.
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
         * Cycles through each buttons and change their state for the directive
         * to know when to change the button
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

        /**
         * Starts the timer and allows the user to submit response.
         */
        function enableUserResponse() {
            resultRecorder.startRecordTimer();
            vm.isResponseEnable = true;
        }

        /**
         * Records the user response, checks if it is correct, then check if
         * the experiment is over.
         * @param {number} response - user submitted response
         */
        function setResponse(response) {
            resultRecorder.setRecords(response);
            checkResponse(response)
                .then(function() {
                    checkIfOver();
                });
        }

        /**
         * Takes a response and checks if it is correct.
         */
        function checkResponse(response) {
            var rightAnswer = resultRecorder.getCorrectAnswer();
            if(rightAnswer === response)
                return setSingleBtnState(rightAnswer, CORRECT_STATE);
            else
                return setSingleBtnState(rightAnswer, WRONG_STATE);
        }

        /**
         * Takes an id and a new state then sets the state of the button.
         * @param {number} btnId - button id 
         * @param {string} newState - new state to assign to the button
         */
        function setSingleBtnState(btnId, newState) {
            return $interval(function() {
                vm.btnState = newState;
                vm.activeBtn = btnId;
            }, 0, 1);
        }

        /**
         * If the experiment is over, redirect to result page; otherwise, play
         * the sounds for the next round.
         */
        function checkIfOver() {
            if(audioHandler.isOver())
                $location.path('/result');
            else
                play();
        }
    }
}());
