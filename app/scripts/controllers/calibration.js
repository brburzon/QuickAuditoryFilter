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
  var vm = this;
  const INITIAL_GAIN_VALUE = 0.5,
        GAIN_PRECISION = 3,
        ADJUSTER_PRECISION = 4,
        MINIMUM_ADJUSTER_VALUE = 0.0001,
        TONE_HERTZ = 1000,
        TONE_TIME_LENGTH = 1000,
        DELAY_TIME_LENGTH = 1000;

  // set up audio
  vm.audioContext = webAudioContextFactory.getInstance();
  vm.gainNode = vm.audioContext.createGain();
  vm.gainNode.connect(vm.audioContext.destination);

  // public variables and functions
  vm.oscillator = {};
  vm.gainValue = 'Not Calibrated';
  vm.adjusterValue = 'Not Calibrated';
  vm.isCalibrating = false;
  vm.isPlaying = false;
  vm.calibrate = calibrate;
  vm.iterateCalibration = iterateCalibration;
  vm.endCalibration = endCalibration;

  function calibrate() {
    vm.isCalibrating = true;
    vm.gainValue = INITIAL_GAIN_VALUE;
    vm.adjusterValue = INITIAL_GAIN_VALUE;
    iterateCalibration('start');
  }

  function iterateCalibration(response) {
    if (response !== 'start') {
      vm.adjusterValue = roundTo(vm.adjusterValue/2, ADJUSTER_PRECISION);
      if (vm.adjusterValue <= MINIMUM_ADJUSTER_VALUE) {
        endCalibration();
      } else {
        if (response === 'yes') {
          vm.gainValue = roundTo(vm.gainValue-vm.adjusterValue, GAIN_PRECISION);
        }
        if (response === 'no') {
          vm.gainValue = roundTo(vm.gainValue+vm.adjusterValue, GAIN_PRECISION);
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
  function createTone(hertz) {
    var tone = vm.audioContext.createOscillator();
    tone.connect(vm.gainNode);
    tone.type = 'sine';
    tone.frequency.value = hertz;
    return tone;
  }

  function playOscillator(hertz, gain, ms) {
    vm.oscillator = createTone(hertz);
    vm.gainNode.gain.value = gain;
    vm.isPlaying = true;
    vm.oscillator.start();
    $timeout(function() {
      vm.oscillator.stop();
      vm.isPlaying = false;
    }, ms);
  }

  function roundTo(num, decimalPoints) {
    var d = Math.pow(10, decimalPoints);
    return Math.round(num*d)/d;
  }

}