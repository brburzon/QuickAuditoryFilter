(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.snrCollection
     * @description
     * # snrCollection
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('snrCollection', snrCollection);

    /** @ngInject */
    function snrCollection() {
        var snr = [];

        var list = {};

        list.addSnr = addSnr;
        list.removeSnrByIndex = removeSnrByIndex;
        list.getSnrList = getSnrList;
        list.resetAll = resetAll;

        return list;

        function addSnr(value) {
            snr.push(value);
            snr.sort(function(a, b) { return a - b; });
        }

        function removeSnrByIndex(index) {
            snr.splice(index, 1);
        }

        function getSnrList() {
            return snr.slice();
        }

        function resetAll() {
            snr.length = 0;
        }
    }

}());
