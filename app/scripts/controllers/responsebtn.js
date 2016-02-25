(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:ResponsebtnCtrl
     * @description
     * # ResponsebtnCtrl
     * Responsible for changing the colors of one response button.
     * Each buttons get their own instance of this controller.
     * Used by responseBtn
     * See ExerciseCtrl.
     */
    angular
        .module('qafApp')
        .controller('ResponseBtnCtrl', ResponseBtnCtrl);

    /** @ngInject */
    function ResponseBtnCtrl($scope, $timeout) {
        /**
         * Possible states for the button.
         */
        var PLAYING = 0,
            CORRECT = 1,
            WRONG = 2;

        var vm = this;

        vm.isPlaying = isPlaying;
        vm.isCorrect = isCorrect;
        vm.isWrong = isWrong;
        vm.setResponse = setResponse;

        $scope.$watch(isActive, blinkListener);

        /**
         * Checks if each the button is active.
         * @return {boolean} - true if active, otherwise false
         */
        function isActive() {
            return Number(vm.value) === vm.activeBtn;
        }

        /**
         * Listens for changes in the current active button. After the blink
         * duration, it resets the active button to -1 to change the color back to
         * the default color.
         */
        function blinkListener(currentActiveBtn) {
            if(currentActiveBtn) {
                $timeout(function() {
                    vm.activeBtn = -1;
                }, Number(vm.blinkDuration), 1);
            }
        }

        /**
         * Used by the responseBtn directive to determine whether it should change
         * the button color to blue or not.
         * @return {boolean} - true if button is active and currently playing;
         *                     otherwise returns false
         */
        function isPlaying() {
            return (isActive() && vm.state === PLAYING);
        }

        /**
         * Used by the responseBtn directive to determine whether it should change
         * the button color to green or not.
         * @return {boolean} - true if button is active and user response is correct;
         *                     otherwise returns false
         */
        function isCorrect() {
            return (isActive() && vm.state === CORRECT);
        }

        /**
         * Used by the responseBtn directive to determine whether it should change
         * the button color to red or not.
         * @return {boolean} - true if button is active and user response is wrong;
         *                     otherwise returns false
         */
        function isWrong() {
            return (isActive() && vm.state === WRONG);
        }

        /**
         * If there are no sounds playing, it submits the response by calling
         * vm.submit of the parent scope.
         */
        function setResponse() {
            if(vm.isEnable) {
                vm.submit({response: Number(vm.value)});
            }
        }
    }

}());
