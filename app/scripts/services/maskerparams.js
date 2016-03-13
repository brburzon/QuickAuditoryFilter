(function () {

    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.maskerParams
     * @description
     * # maskerParams
     * Factory in the qafApp.
     * Holds all the possible values for the lower notch masker, upper notch,
     * and masker level. This is used as a lookup table.
     *
     * This is used by sevices/qafcore.js
     */
    angular.module('qafApp')
        .factory('maskerParams', maskerParams);

    /** @ngInject */
    function maskerParams() {
        var maskerValues       = [-10, -6.5, -3, 0.5, 4, 7.5, 11,
                                  14.5, 18, 21.5, 25, 28.5, 32, 35.5,
                                  39, 42.5, 46, 49.5, 53, 56.5, 60],
            upperNotchValues   = [0, 0.0833, 0.1667, 0.25, 0.3333, 0.4167, 0.5],
            lowerNotchValues   = [0, 0.075, 0.15, 0.225, 0.3, 0.375, 0.45, 0.525, 0.6],
            maskerLvlSize      = maskerValues.length,
            upperNotchSize     = upperNotchValues.length,
            lowerNotchSize     = lowerNotchValues.length,
            MASKER_LEVEL_TABLE = initTable(maskerValues, 1),
            UPPER_NOTCH_TABLE  = initTable(upperNotchValues, maskerLvlSize),
            LOWER_NOTCH_TABLE  = initTable(lowerNotchValues, maskerLvlSize * upperNotchSize);

        var notch = {};

        notch.lookupMaskerLevel = lookupMaskerLevel;
        notch.lookupUpperNotch = lookupUpperNotch;
        notch.lookupLowerNotch = lookupLowerNotch;
        notch.getMaskerLevelLength = getMaskerLevelLength;
        notch.getUpperNotchLength = getUpperNotchLength;
        notch.getLowerNotchLength = getLowerNotchLength;

        return notch;


        /**
         * Initialize all the possible values for lower notch. Each element is
         * repeated n times so that we can use the same index to for the upper
         * notch, lower notch, and masker level.
         *
         * @return {array} - array of all the possible values in lower notch
         */
        function initTable(possibleValues, interval) {
            var result = [],
                maxLength = upperNotchSize * lowerNotchSize * maskerLvlSize,
                i = 0, j = 0;

            while(i < maxLength) {
                result[i] = possibleValues[j % possibleValues.length];
                i += 1;
                if(i % interval === 0) j += 1;
            }

            return result;
        }

        /**
         * Takes an index, and looks up the masker level value for the that index.
         *
         * @param {number} index - index of value to look up
         * @return {number} - masker level at the specified index
         */
        function lookupMaskerLevel(index) {
            return MASKER_LEVEL_TABLE[index];
        }

        /**
         * Takes an index, and looks up the upper notch value for the that index.
         *
         * @param {number} index - index of value to look up
         * @return {number} - upper notch at the specified index
         */
        function lookupUpperNotch(index) {
            return MASKER_LEVEL_TABLE[index];
        }

        /**
         * Takes an index, and looks up the lower notch value for the that index.
         *
         * @param {number} index - index of value to look up
         * @return {number} - lower notch at the specified index
         */
        function lookupLowerNotch(index) {
            return MASKER_LEVEL_TABLE[index];
        }

        /**
         * Returns the number of possible values inside masker level array.
         *
         * @return {number} - number of elements in masker level
         */
        function getMaskerLevelLength() {
            return maskerLvlSize;
        }

        /**
         * Returns the number of possible values inside upper notch array.
         *
         * @return {number} - number of elements in upper notch
         */
        function getUpperNotchLength() {
            return upperNotchSize;
        }

        /**
         * Returns the number of possible values inside lower notch array.
         *
         * @return {number} - number of elements in lower notch
         */
        function getLowerNotchLength() {
            return lowerNotchSize;
        }

    }
}());
