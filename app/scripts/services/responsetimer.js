(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name appApp.responseTimer
     * @description
     * # responseTimer
     * Factory in the appApp.
     */
    angular.module('appApp')
        .factory('responseTimer', responseTimer);

    /** @ngInject */
    function responseTimer($interval) {
        var time = 0,
            loop; 

        var timer = {};

        timer.restart = restart;
        timer.getTime = getTime;
        timer.pause = pause;

        return timer;

        function restart() {
            var millisecond = 1;
            $interval.cancel(loop);
            time = 0; 
            loop = $interval(incrementTime, millisecond);
        }

        function incrementTime() {
            ++time;
        }

        function getTime() {
            return time + 'ms';
        }

        function pause() {
            $interval.cancel(loop);
        }
    }

})();    
