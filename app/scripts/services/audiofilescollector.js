'use strict';

/**
 * @ngdoc service
 * @name appApp.audioFilesCollector
 * @description
 * # audioFilesCollector
 * Factory in the appApp.
 */
angular.module('appApp')
    .factory('audioFilesCollector', audioFilesCollector);

function audioFilesCollector($q, audioFilesContainer) {
    var signal = new audioFilesContainer(),
        noSignal = new audioFilesContainer(),
        decodedSignal = [],
        decodedNoSignal = [];

    var collector = {};
    collector.addSignalFile = addSignalFile;
    collector.addNoSignalFile = addNoSignalFile;
    collector.removeSignalFileByIndex = removeSignalFileByIndex;
    collector.removeNoSignalFileByIndex = removeNoSignalFileByIndex;
    collector.getSignalFiles = getSignalFiles;
    collector.getNoSignalFiles = getNoSignalFiles;
    collector.getSignalAudioData = getSignalAudioData;
    collector.getNoSignalAudioData = getNoSignalAudioData;
    collector.prepAudioData = prepAudioData;
    collector.resetAll = resetAll;

    return collector;

    function addSignalFile(file) {
        signal.add(file);
    }

    function addNoSignalFile(file) {
        noSignal.add(file);
    }

    function removeSignalFileByIndex(pos) {
        signal.removeByIndex(pos);
    }

    function removeNoSignalFileByIndex(pos) {
        noSignal.removeByIndex(pos);
    }

    function getSignalFiles() {
        return signal.getFiles();
    }

    function getNoSignalFiles() {
        return noSignal.getFiles();
    }

    function getSignalAudioData() {
        return decodedSignal;
    }

    function getNoSignalAudioData() {
        return decodedNoSignal;
    }

    function resetAll() {
        signal.clearAll();
        noSignal.clearAll();
        decodedSignal.length = 0;
        decodedNoSignal.length = 0;
    }

    function prepAudioData(numberOfSignalRepetition) {
        var prepSignalPromise = prepSignalAudioData(numberOfSignalRepetition),
            prepNoSignalPromise = prepNoSignalAudioData();

        return $q.all([ prepSignalPromise, prepNoSignalPromise ]);
    }

    function prepSignalAudioData(numberOfSignalRepetition) {
        var promises = signal.getDecodedAudioData(),
            deferred = $q.defer();
        $q.all(promises)
            .then (function(files) {
                if(signal.getFiles().length === 0) {
                    deferred.reject('You need to upload at least one signal audio file.'); 
                } else if(!haveSameDuration(files)) {
                    deferred.reject('Signal audio files duration did not match.');
                } else {
                    decodedSignal
                        = resizeArrayByNreps(files, numberOfSignalRepetition);
                    decodedSignal = shuffleArray(decodedSignal);
                    deferred.resolve(decodedSignal);
                }
            });
        return deferred.promise;
    }

    function prepNoSignalAudioData() {
        var promises = noSignal.getDecodedAudioData(),
            deferred = $q.defer();
        $q.all(promises)
            .then (function(files) {
                if(noSignal.getFiles().length === 0) {
                    deferred.reject('You need to upload at least one no signal audio file.'); 
                } else if(!haveSameDuration(files)) {
                    deferred.reject('No signal audio files duration did not match.');
                } else {
                    decodedNoSignal = shuffleArray(files);
                    deferred.resolve(decodedNoSignal);
                }
            });
        return deferred.promise;
    }

    function haveSameDuration(files) {
        var duration = files[0].duration,
            returnValue = true;
        for(var i = 0; i < files.length && !returnValue; i++) {
            if(files[i].duration !== duration)
                returnValue = false;
        }
        return returnValue;
    }

    function resizeArrayByNreps(arr, nreps) {
        var resized = [];
        angular.forEach(arr, resizeIterator, resized);
        function resizeIterator(value) {
            for(var i = 0; i < nreps; i++)
                this.push(value);
        }
        return resized;
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
}
