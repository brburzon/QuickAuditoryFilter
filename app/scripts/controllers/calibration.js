'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:CalibrationCtrl
 * @description
 * # CalibrationCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('CalibrationCtrl', CalibrationCtrl);

function CalibrationCtrl($timeout, webAudioContextFactory) {
  // private contants and variables
  const INITIAL_GAIN_VALUE = 0.5,
        GAIN_PRECISION = 3,
        ADJUSTER_PRECISION = 4,
        MINIMUM_ADJUSTER_VALUE = 0.0001,
        TONE_HERTZ = 1000,
        TONE_TIME_LENGTH = 1000,
        DELAY_TIME_LENGTH = 1000;

  var adjusterValue;
  var audioContext = webAudioContextFactory.getInstance();
  var gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);

  // public variables and functions
  var vm = this;
  vm.gainValue = 'Not Calibrated';
  vm.isCalibrating = false;
  vm.isPlaying = false;
  vm.calibrate = calibrate;
  vm.iterateCalibration = iterateCalibration;
  vm.endCalibration = endCalibration;

  function calibrate() {
    vm.isCalibrating = true;
    vm.gainValue = INITIAL_GAIN_VALUE;
    adjusterValue = INITIAL_GAIN_VALUE;
    iterateCalibration('start');
  }

  function iterateCalibration(response) {
    if (response !== 'start') {
      adjusterValue = roundTo(adjusterValue/2, ADJUSTER_PRECISION);
      if (adjusterValue <= MINIMUM_ADJUSTER_VALUE) {
        endCalibration();
      } else {
        if (response === 'yes') {
          vm.gainValue = roundTo(vm.gainValue-adjusterValue, GAIN_PRECISION);
        }
        if (response === 'no') {
          vm.gainValue = roundTo(vm.gainValue+adjusterValue, GAIN_PRECISION);
        }
      }
    }

    $timeout(function() {
      playOscillator(TONE_HERTZ, vm.gainValue, TONE_TIME_LENGTH);
    }, DELAY_TIME_LENGTH);
  }

  function endCalibration() {
    vm.gainValue = roundTo(vm.gainValue+0.01, GAIN_PRECISION);
    vm.isCalibrating = false;
  }

  // private functions
  function playOscillator(hertz, gain, ms) {
    var oscillator = createTone(hertz);
    gainNode.gain.value = gain;
    vm.isPlaying = true;
    oscillator.start();
    $timeout(function() {
      oscillator.stop();
      vm.isPlaying = false;
    }, ms);
  }

  function createTone(hertz) {
    var tone = audioContext.createOscillator();
    tone.connect(gainNode);
    tone.type = 'sine';
    tone.frequency.value = hertz;
    return tone;
  }

  function roundTo(num, decimalPoints) {
    var d = Math.pow(10, decimalPoints);
    return Math.round(num*d)/d;
  }

}