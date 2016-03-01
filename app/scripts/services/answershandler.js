(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.answersHandler
     * @description
     * # answersHandler
     * Generates and saves a set of answers for the exercise.
     */
    angular.module('qafApp')
        .factory('answersHandler', answersHandler);

    /** @ngInject */
    function answersHandler() {
        var answerList = [];

        var handler = {};

        handler.storeNewRandomAnswers = storeNewRandomAnswers;
        handler.getAnswerForIndex = getAnswerForIndex;
        handler.getSize = getSize;

        return handler;

        /**
         * Takes a number and fill answerList with new random numbers answers
         * between 0 and 2.
         * @param {number} numberOfAnswers - size of generated answer list
         */
        function storeNewRandomAnswers(numberOfAnswers) {
            answerList.length = 0;
            for(var i = 0; i < numberOfAnswers; i++) {
                answerList[i] = randomInRange(0, 2);
            }
        }

        /**
         * Takes an minimum and maximum range, then returns a random number
         * within the range.
         * @param {number} min - minimum possible value
         * @param {number} max - maximum possible value
         * @return {number} - random number between min and max
         */
        function randomInRange(min, max) {
            return Math.floor(Math.random() * (max + 1 - min) + min);
        }

        /**
         * Takes an index and uses it to find the current round's correct
         * answer from the generated answerList.
         * @param {number} index - current round
         * @return {number} - answer for the current round
         * @throws {error} - if given an invalid index
         */
        function getAnswerForIndex(index) {
            if(index >= 0 && index < getSize())
                return answerList[index];
            else
                throw 'answersHandler.getAnswerForIndex: invalid index';
        }

        /**
         * Returns the length of the generated answer list.
         * @return {number} - number of answers in answerList
         */
        function getSize() {
            return answerList.length; 
        }
    }
})();
