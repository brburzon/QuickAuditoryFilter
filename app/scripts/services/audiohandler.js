(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.audioHandler
     * @description
     * # audioHandler
     * Responsible for playing signal and no signal interval tones.
     */
    angular
        .module('qafApp')
        .factory('audioHandler', audioHandler);

    /** @ngInject */
    function audioHandler(audioPlayer, bufferGenerator, answersHandler) {
        var numberOfRounds = bufferGenerator.getNumberOfSignals(),
            round = 0;

        var handler = {};

        handler.prepAnswers = prepAnswers;
        handler.playSounds = playSounds;
        handler.getSoundDuration = getSoundDuration;
        handler.isOver = isOver;

        return handler;

        /**
         * Prepares the answers for the current exercise.
         */
        function prepAnswers() {
            answersHandler.storeNewRandomAnswers(numberOfRounds);
        }

        /**
         * Takes a gap duration and plays three sounds using gap duration to
         * determine the duration of pause in between the sounds. One of the
         * sounds will play the signal interval, and the other two will be
         * the no-signal interval.
         * @param {number} gapDuration - in milliseconds
         */
        function playSounds(gapDuration) {
            var buffers = getBuffersInPlayOrder(round);

            audioPlayer
                .play(buffers[0], gapDuration)
                .then(function () {
                    audioPlayer.play(buffers[1], gapDuration)
                        .then(function() {
                            audioPlayer.play(buffers[2], gapDuration);
                        });
                });

            round++;
        }

        /**
         * Takes the current round and returns a list of three audio buffers to
         * be played for the current round.
         * @param {number} rount - current round
         * @return {list} - list of playable audio buffers
         */
        function getBuffersInPlayOrder(round) {
            var signalPosition = answersHandler.getAnswerForIndex(round),
                numOfSoundsToPlay = 3,
                buffers = [];

            for(var i = 0; i < numOfSoundsToPlay; i++) {
                if(i === signalPosition)
                    buffers[i] = bufferGenerator.generateSignalBuffer(round);
                else
                    buffers[i] = bufferGenerator.generateNoSignalBuffer(round);
            }
            return buffers;
        }

        /**
         * Returns the duration of sound. All sounds will have the same
         * duration.
         * @return {number} - duration in milliseconds
         */
        function getSoundDuration() {
            return bufferGenerator.getBufferDuration();
        }

        /**
         * Returns whether the experiment is over or not.
         * @return {boolean} - true if the exercise is over; otherwise, false.
         */
        function isOver() {
            if(round >= numberOfRounds)
                return true;
            else
                return false;
        }
    }
})();
