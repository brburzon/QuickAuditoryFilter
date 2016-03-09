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
    function calibrationStorage($cookies, $window) {
        var KEY = "tHis iS a kEy tHat nO oNe cAn gUess",
            nextYear = new Date(),
            options = {};

        var storage = {};

        storage.saveLevelThreshold = saveLevelThreshold;
        storage.getLevelThreshold = getLevelThreshold;

        return storage;

        nextYear.setFullYear(nextYear.getFullYear() + 1);
        options['expires'] = nextYear;

        /**
         * Takes a tone level threshold, and saves it inside browser cookies.
         * @param {number} value - experimenter's threshold level
         */
        function saveLevelThreshold(value) {
            $cookies.put(KEY, value, options);
        }

        /**
         * Returns the previously saved tone level threshold
         * @throws {error} - if no tone level is found
         * @return {number} - experimenter's threshold level
         */
        function getLevelThreshold() {
            var toneLevel = parseFloat($cookies.get(KEY));
            if(!toneLevel || isNaN(toneLevel))
                throw "No valid value was found!";
            return toneLevel;
        }
    }

}());
