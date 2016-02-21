(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.resultRecorder
     * @description
     * # resultRecorder
     * Factory in the qafApp.
     */
    angular.module('qafApp')
        .factory('resultRecorder', resultRecorder);

    /** @ngInject*/
    function resultRecorder(answersHandler, responseTimer, snrSuplier) {
        var round = 0,
            responses = [],
            snrList = snrSuplier.getPreparedSnr();

        var recorder = {};

        recorder.setRecords = setRecords;
        recorder.getRecords = getRecords;
        recorder.getCorrectAnswer = getCorrectAnswer;
        recorder.startRecordTimer = startRecordTimer;

        return recorder;

        function setRecords(userResponse) {
            responseTimer.pause();
            var record = {};

            record.snr = snrList[round];
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
