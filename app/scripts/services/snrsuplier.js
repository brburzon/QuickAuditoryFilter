(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.snrSuplier
     * @description
     * # snrSuplier
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('snrSuplier', snrSuplier);

    /** @ngInject */
    function snrSuplier(snrCollection) {
        var preparedSnr = [];

        var suplier = {};

        suplier.addSnr = snrCollection.addSnr;
        suplier.removeSnrByIndex = snrCollection.removeSnrByIndex;
        suplier.getSnrList = snrCollection.getSnrList;
        suplier.prepSnr = prepSnr;
        suplier.getPreparedSnr = getPreparedSnr;
        suplier.resetAll = resetAll;

        return suplier;

        function prepSnr(numOfRepetition) {
            validateUserSetup(numOfRepetition);
            preparedSnr = snrCollection.getSnrList();
            repeatEachElement(preparedSnr, numOfRepetition);
            shuffleArray(preparedSnr);
        }

        function validateUserSetup(nreps) {
            verifyValidNreps(nreps);
            verifySnrListNotEmpty();
        }

        function verifyValidNreps(nreps) {
            if(!nreps || isNaN(nreps) || nreps < 1 || nreps > 99)  
                throw 'Invalid number of snr repetition input.';
        }

        function verifySnrListNotEmpty() {
            if(snrCollection.getSnrList().length < 1)
                throw 'Must add at least one snr value.';
        }

        function repeatEachElement(snrArray, numOfRepetition) {
            angular.forEach(snrArray, iterator, snrArray);

            function iterator(item) {
                for(var i = 1; i < numOfRepetition; i++)
                    this.push(item);
            }
        }

        function shuffleArray(arr) {
            var counter = arr.length,
                valueToSwap,
                randomIndex;

            while (counter > 0) {
                randomIndex = Math.floor(Math.random() * counter);
                counter--;
                valueToSwap = arr[counter];
                arr[counter] = arr[randomIndex];
                arr[randomIndex] = valueToSwap;
            }
            return arr;
        }

        function getPreparedSnr() {
            return preparedSnr.slice(0);
        }

        function resetAll() {
            preparedSnr.length = 0;
            snrCollection.resetAll();
        }
    }

}());
