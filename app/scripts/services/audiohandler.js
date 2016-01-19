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
    function audioHandler(audioPlayer, audioFilesCollector, answersHandler) {
        var signalAudioDataList = audioFilesCollector.getSignalAudioData(),
            noSignalAudioDataList = audioFilesCollector.getNoSignalAudioData(),
            round = 0;

        var handler = {};

        handler.prepAnswers = prepAnswers;
        handler.playSounds = playSounds;
        handler.getSoundDuration = getSoundDuration;
        handler.isOver = isOver;

        return handler;

        function prepAnswers() {
            var numberOfSingalFiles = signalAudioDataList.length;
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
            return signalAudioDataList[round].duration;
        }

        function isOver() {
            if(round >= answersHandler.getSize())
                return true;
            else
                return false;
        }

        function getSignalBuffer() {
            return signalAudioDataList[round];
        }

        function getRandomNoSignalBuffer() {
            var randomIndex = getRandomIndex();
            return noSignalAudioDataList[randomIndex];
        }

        function getRandomIndex() {
            var maxIndex = noSignalAudioDataList.length - 1;
            return Math.floor(Math.random() * maxIndex);
        }
    }
})();
