'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:ResponsebtnCtrl
 * @description
 * # ResponsebtnCtrl
 * Controller of the appApp
 */
angular
    .module('appApp')
    .controller('ResponseBtnCtrl', ResponseBtnCtrl);

/** @ngInject */
function ResponseBtnCtrl($scope, $timeout) {
    var PLAYING = 0,
        CORRECT = 1,
        WRONG = 2;

    var vm = this;

    vm.isPlaying = isPlaying;
    vm.isCorrect = isCorrect;
    vm.isWrong = isWrong;
    vm.setResponse = setResponse;

    $scope.$watch(isActive, blinkListener);

    function isActive() {
        return Number(vm.value) === vm.activeBtn;
    }

    function blinkListener(currentActiveBtn) {
        if(currentActiveBtn) {
            $timeout(function() {
                vm.activeBtn = -1;
            }, Number(vm.blinkDuration), 1);
        }
    }

    function isPlaying() {
        return (isActive() && vm.state === PLAYING);
    }

    function isCorrect() {
        return (isActive() && vm.state === CORRECT);
    }

    function isWrong() {
        return (isActive() && vm.state === WRONG);
    }

    function setResponse() {
        if(vm.isEnable) {
            vm.submit({response: Number(vm.value)});
        }
    }
}
