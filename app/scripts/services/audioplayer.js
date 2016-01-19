(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.audioPlayer
     * @description
     * # audioPlayer
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('audioPlayer', audioPlayer);

    function audioPlayer($q, $timeout, webAudioContextFactory) {
        var audioContext = webAudioContextFactory.getInstance();

        var player = {};

        player.play = play;

        return player;

        function play(audioData, pauseDuration) {
            var deferred = $q.defer(),
                limitToOnce = 1,
                overAllDuration = audioData.duration + pauseDuration; 

            $timeout(function() {
                var bufferSource = audioContext.createBufferSource(); 
                bufferSource.buffer = audioData.buffer;
                bufferSource.connect(audioContext.destination);
                bufferSource.start(0);
                deferred.resolve('done'); 
            }, overAllDuration, limitToOnce);

            return deferred.promise;
        }
    }
})();
