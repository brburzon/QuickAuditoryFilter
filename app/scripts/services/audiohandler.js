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
    function audioHandler(audioPlayer, snrSuplier, bufferGenerator, answersHandler) {
        var snrList = snrSuplier.getPreparedSnr(),
            round = 0,
            duration;

        var handler = {};

        handler.prepAnswers = prepAnswers;
        handler.playSounds = playSounds;
        handler.getSoundDuration = getSoundDuration;
        handler.isOver = isOver;

        return handler;

        function prepAnswers() {
            var numberOfSingalFiles = snrList.length;
            answersHandler.storeNewRandomAnswers(numberOfSingalFiles);
        }

        function playSounds(gapDuration) {
            var buffers = getBuffersInPlayOrder();

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

        function getBuffersInPlayOrder() {
            var signalPosition = answersHandler.getAnswerForIndex(round),
                numOfSoundsToPlay = 3,
                buffers = [];

            for(var i = 0; i < numOfSoundsToPlay; i++) {
                if(i === signalPosition)
                    buffers[i] = getSignalBuffer();
                else
                    buffers[i] = getRandomNoSignalBuffer();
            }
            return buffers;
        }

        function getSoundDuration() {
            return duration;
        }

        function isOver() {
            if(round >= answersHandler.getSize())
                return true;
            else
                return false;
        }

        function getSignalBuffer() {
            return bufferGenerator.generateSignalBuffer();
        }

        function getRandomNoSignalBuffer() {
            return bufferGenerator.generateNoSignalBuffer();
        }
    }
})();
