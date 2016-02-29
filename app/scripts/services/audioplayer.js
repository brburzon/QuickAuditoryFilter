(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.audioPlayer
     * @description
     * # audioPlayer
     * Responsible for playing audio to the user.
     */
    angular.module('qafApp')
        .factory('audioPlayer', audioPlayer);

    /** @ngInject */
    function audioPlayer($q, $timeout, webAudioContextFactory) {
        var audioContext = webAudioContextFactory.getInstance();

        var player = {};

        player.play = play;

        return player;

        /**
         * Takes a playable audio buffer, and pauseDuration then plays the
         * audio buffer to the user with a pause after.
         * @param {buffer} audioData - audio buffer
         * @param {number} pauseDuration - in milliseconds
         * @returns {object} promise - angular js promise
         */
        function play(audioData, pauseDuration) {
            var deferred = $q.defer(),
                limitToOnce = 1,
                overAllDuration = audioData.duration * 1000 + pauseDuration; 

            $timeout(function() {
                var bufferSource = audioContext.createBufferSource(); 
                bufferSource.buffer = audioData;
                bufferSource.connect(audioContext.destination);
                bufferSource.start(0);
                deferred.resolve('done'); 
            }, overAllDuration, limitToOnce);

            return deferred.promise;
        }
    }
})();
