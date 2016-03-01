(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.resultRecorder
     * @description
     * # resultRecorder
     * Stores the record of the experiment.
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

        /**
         * Takes a user respons for the current round and adds it the the experiment record.
         * @param {number} userResponse - number between 0 and 2
         */
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

        /**
         * Returns a copy of the record.
         * @return {object} - copy of the record
         */
        function getRecords() {
            return responses.slice(0);
        }

        /**
         * Returns the answer for the current round.
         * @return {number} - answer between 0 and 2
         */
        function getCorrectAnswer() {
            var currentRound = round - 1;
            return answersHandler.getAnswerForIndex(currentRound);
        }

        /**
         * Restarts the response timer.
         */
        function startRecordTimer() {
            responseTimer.restart();
        }
    }
})();
