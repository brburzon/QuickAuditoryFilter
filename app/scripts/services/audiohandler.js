(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.audioHandler
     * @description
     * # audioHandler
     * Factory in the appApp.
     */
    angular
        .module('appApp')
        .factory('audioHandler', audioHandler);

    /** @ngInject */
    function audioHandler(audioPlayer, bufferGenerator, answersHandler) {
        var numberOfRounds = bufferGenerator.getNumberOfSignalBuffers(),
            round = 0;

        var handler = {};

        handler.prepAnswers = prepAnswers;
        handler.playSounds = playSounds;
        handler.getSoundDuration = getSoundDuration;
        handler.isOver = isOver;

        return handler;

        function prepAnswers() {
            answersHandler.storeNewRandomAnswers(numberOfRounds);
        }

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

        function getSoundDuration() {
            return bufferGenerator.getBufferDuration();
        }

        function isOver() {
            if(round >= numberOfRounds)
                return true;
            else
                return false;
        }
    }
})();
