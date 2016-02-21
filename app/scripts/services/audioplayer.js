(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.audioPlayer
     * @description
     * # audioPlayer
     * Factory in the qafApp.
     */
    angular.module('qafApp')
        .factory('audioPlayer', audioPlayer);

    function audioPlayer($q, $timeout, webAudioContextFactory) {
        var audioContext = webAudioContextFactory.getInstance();

        var player = {};

        player.play = play;

        return player;

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
