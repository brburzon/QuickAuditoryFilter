(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.userConfig
     * @description
     * # userConfig
     * Responsible for storing and sharing signal level, as well as signal frequency between services.
     * Both the signal level and the signal frequency are set by the user before the experiment starts.
     */
    angular.module('qafApp')
        .factory('userConfig', userConfig);

    /** @ngInject */
    function userConfig() {
        var signalLevel = 20,
            signalFrequency = 1000,
            numberOfTrials = 50;

        var config = {};

        config.saveConfig = saveConfig;
        config.getSignalLevel = getSignalLevel;
        config.getSignalFrequency = getSignalFrequency;
        config.getNumberOfTrials = getNumberOfTrials;

        return config;

        /**
         * Stores the signal level, frequency, and numberOfTrials. These are
         * set by the user while in setup page.
         * @param {number} level - signal level
         * @param {number} frequency - signalFrequency
         * @param {number} numTrials - numberOfTrials
         */
        function saveConfig(level, frequency, numTrials) {
            signalLevel = level;
            signalFrequency = frequency;
            numberOfTrials = numTrials;
        }

        /**
         * Returns the signal level.
         * @return {number} - signal level
         */
        function getSignalLevel() {
            return signalLevel;
        }

        /**
         * Returns the signal frequency.
         * @return {number} - signal frequency
         */
        function getSignalFrequency() {
            return signalFrequency;
        }

       /**
        * Returns the number of trials
        * @return {number} - number of trials
        */ 
        function getNumberOfTrials() {
            return numberOfTrials;
        }


    }

}());
