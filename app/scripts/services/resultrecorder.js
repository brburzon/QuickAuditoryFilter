(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.resultRecorder
     * @description
     * # resultRecorder
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('resultRecorder', resultRecorder);

    /** @ngInject*/
    function resultRecorder(answersHandler, responseTimer, audioFilesCollector) {
        var round = 0,
            responses = [],
            audioFiles = audioFilesCollector.getSignalAudioData();

        var recorder = {};

        recorder.setRecords = setRecords;
        recorder.getRecords = getRecords;
        recorder.getCorrectAnswer = getCorrectAnswer;
        recorder.startRecordTimer = startRecordTimer;

        return recorder;

        function setRecords(userResponse) {
            responseTimer.pause();
            var record = {};

            record.filename = audioFiles[round].filename;
            record.correctAnswer = answersHandler.getAnswerForIndex(round);
            record.userResponse = userResponse;
            record.correctness = record.userResponse === record.correctAnswer;
            record.timer = responseTimer.getTime();

            responses.push(record);
            round++;
        }

        function getRecords() {
            return responses.slice(0);
        }

        function getCorrectAnswer() {
            var currentRound = round - 1;
            return answersHandler.getAnswerForIndex(currentRound);
        }

        function startRecordTimer() {
            responseTimer.restart();
        }
    }
})();
