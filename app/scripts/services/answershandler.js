(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.answersHandler
     * @description
     * # answersHandler
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('answersHandler', answersHandler);

    function answersHandler() {
        var answerList = [];

        var handler = {};

        handler.storeNewRandomAnswers = storeNewRandomAnswers;
        handler.getAnswerForIndex = getAnswerForIndex;
        handler.getSize = getSize;

        return handler;

        function storeNewRandomAnswers(count) {
            answerList.length = 0;
            for(var i = 0; i < count; i++) {
                answerList[i] = randomInRange(0, 2);
            }
        }

        function randomInRange(min, max) {
            return Math.floor(Math.random() * (max + 1 - min) + min);
        }

        function getAnswerForIndex(index) {
            if(index >= 0 && index < getSize())
                return answerList[index];
            else
                throw 'answersHandler.getAnswerForIndex: invalid index';
        }

        function getSize() {
            return answerList.length; 
        }
    }
})();
