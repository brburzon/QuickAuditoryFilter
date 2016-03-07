(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.calibrationStorage
     * @description
     * # calibrationStorage
     * Responsible for storing the calibration in a browser cookie, and
     * getting it back.
     *
     * Used by CalibrationCtrl.
     */
    angular.module('qafApp')
        .factory('calibrationStorage', calibrationStorage);

    /** @ngInject */
    function calibrationStorage($cookies) {
        var GAIN_KEY = "qAF calibration gain value",
            TONE_LEVEL_KEY = "qAF calibration tone level",
            nextYear = new Date(),
            options = {};

        var storage = {};

        storage.saveGainValue = saveGainValue;
        storage.getGainValue = getGainValue;
        storage.saveToneLevel = saveToneLevel;
        storage.getToneLevel = getToneLevel;

        return storage;

        nextYear.setFullYear(nextYear.getFullYear() + 1);
        options['expires'] = nextYear;

        isCookieEnabled();

        /**
         * Checks if the browser supports or enabled cookie.
         */
        function isCookieEnabled() {
            var cookieEnabled=(navigator.cookieEnabled)? true : false;

            //if not IE4+ nor NS6+
            if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){
                document.cookie="testcookie";
                cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
            }
        }

        /**
         * Takes a gain value, and saves it inside browser cookies.
         * @param {number} value - calibration value
         */
        function saveGainValue(value) {
            $cookies.put(GAIN_KEY, value, options);
        }

        /**
         * Returns the previously saved gain value;
         * @throws {error} - if no gain value is found
         * @return {number} - gain value
         */
        function getGainValue() {
            var gainValue = parseFloat($cookies.get(GAIN_KEY));
            if(!gainValue || isNaN(gainValue))
                throw "No valid value was found!";
            return gainValue;
        }

        /**
         * Takes a tone level, and saves it inside browser cookies.
         * @param {number} value - calibration value
         */
        function saveToneLevel(value) {
            $cookies.put(TONE_LEVEL_KEY, value, options);
        }

        /**
         * Returns the previously saved tone level;
         * @throws {error} - if no tone level is found
         * @return {number} - tone level
         */
        function getToneLevel() {
            var toneLevel = parseFloat($cookies.get(TONE_LEVEL_KEY));
            if(!toneLevel || isNaN(toneLevel))
                throw "No valid value was found!";
            return toneLevel;
        }
    }

}());
