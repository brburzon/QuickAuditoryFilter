'use strict';

/**
 * @ngdoc service
 * @name appApp.audioDataDecoder
 * @description
 * # audioDataDecoder
 * Factory in the appApp.
 */
angular.module('appApp')
    .factory('audioDataDecoder', audioDataDecoder);

function audioDataDecoder($q, webAudioContextFactory) {
    var audioContext = webAudioContextFactory.getInstance();

    var service = {
        decode: decode
    };

    return service;

    ///////////////
    
    function decode(filename, arrayBuffer) {
        var deferred = $q.defer();

        audioContext
            .decodeAudioData(arrayBuffer, onSuccess, onFailure);

        function onSuccess(buffer) {
            var audioData = {},
                durationInMilliSeconds = Math.floor(buffer.duration * 1000);

            audioData.buffer = buffer;
            audioData.duration = durationInMilliSeconds;
            audioData.filename = filename;
            deferred.resolve(audioData);
        }

        function onFailure(err) {
            deferred.reject(err);
        }

        return deferred.promise;
	}
}
