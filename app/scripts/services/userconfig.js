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
        var signalLevel = 1,
            signalFrequency = 1000;

        var config = {};

        config.saveConfig = saveConfig;
        config.getSignalLevel = getSignalLevel;
        config.getSignalFrequency = getSignalFrequency;
        config.reset = reset;

        return config;

        /**
         * Validates and saves a signal level, and frequency.
         * @param {number} level - signal level
         * @param {number} frequency - signalFrequency
         */
        function saveConfig(level, frequency) {
            if(!level || isNaN(level))
                throw new TypeError('Expected a valid number level, but got', level.toString());
            if(!frequency || isNaN(frequency))
                throw new TypeError('Expected a valid number for frequency, but got', frequency.toString());

            signalLevel = level;
            signalFrequency = frequency;
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
         * Resets the signal level and frequency to their default values.
         */
        function reset() {
            signalLevel = 1;
            signalFrequency = 1000;
        }
    }

}());
