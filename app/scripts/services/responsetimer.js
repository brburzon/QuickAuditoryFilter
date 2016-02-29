(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name qafApp.responseTimer
     * @description
     * # responseTimer
     * Responsible for timing the user's response.
     */
    angular.module('qafApp')
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

        /**
         * Resets the time and restarts the timer incrementing time every
         * one millisecond.
         */
        function restart() {
            var millisecond = 1;
            $interval.cancel(loop);
            time = 0;
            loop = $interval(incrementTime, millisecond);
        }

        /**
         * Increments the time by one.
         */
        function incrementTime() {
            ++time;
        }

        /**
         * Returns a string representation of the timer.
         */
        function getTime() {
            return time + 'ms';
        }

        /**
         * Pauses the timer.
         */
        function pause() {
            $interval.cancel(loop);
        }
    }

})();
