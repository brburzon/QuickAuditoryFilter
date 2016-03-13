'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:CalibrationCtrl
 * @description
 * # CalibrationCtrl
 * Handles user interaction and adjusting the level threshold for the calibration procedure
 */
angular.module('qafApp')
  .controller('CalibrationCtrl', CalibrationCtrl);

function CalibrationCtrl($window, $timeout, webAudioContextFactory, calibrationStorage) {
  var audioContext = webAudioContextFactory.getInstance();
  var visitMap = [];

  var vm = this;
  vm.levelThreshold = 'Not Calibrated';
  vm.isCalibrating = false;
  vm.isPlaying = false;
  vm.calibrate = calibrate;
  vm.iterateCalibration = iterateCalibration;
  vm.endCalibration = endCalibration;

  /**
   * Starts the calibration procedure
   */
  function calibrate() {
    vm.isCalibrating = true;
    vm.levelThreshold = 30;
    visitMap = [];
    iterateCalibration('start');
  }

  /**
   * Handles responses and adjusts the levelThreshold accordingly
   */
  function iterateCalibration(response) {
    if (response === 'yes') {
      if (updateVisitMap() === 3) {
        endCalibration('success', 'Calibration successful. Continue to the exercise.');
      } else {
        vm.levelThreshold = vm.levelThreshold - 10;
      }
    }
    if (response === 'no') {
      vm.levelThreshold = vm.levelThreshold + 5;
    }

    if (vm.levelThreshold > 60) {
      endCalibration('failure', 'Calibration level cannot go beyond 60. Read the instructions and re-calibrate.')
    } else {
      $timeout(function() {
        playTone(1000, 1, vm.levelThreshold);
      }, 1000);
    }
  }

  /**
   * Called when calibration is ended, displays a message to the user
   */
  function endCalibration(result, message) {
    vm.isCalibrating = false;
    if (result === 'success') {
      calibrationStorage.saveLevelThreshold(vm.levelThreshold);
    }
    if (result === 'failure') {
      vm.levelThreshold = 'Not Calibrated';
    }
    $window.alert(message);
  }

  /**
   * Private function, increases the count of a visited levelThreshold value
   * @return {number} - the visit count of the levelThreshold
   */
  function updateVisitMap() {
    var currentLevelCount = visitMap[vm.levelThreshold];
    if (isNaN(currentLevelCount)) {
      visitMap[vm.levelThreshold] = 1;
    } else {
      visitMap[vm.levelThreshold] = currentLevelCount + 1;
    }
    return visitMap[vm.levelThreshold];
  }

  /**
   * Private function, creates buffer source and plays sound
   */
  function playTone(frequency, timeInSeconds, Ltone) {
    var source = audioContext.createBufferSource();
    source.buffer = generateBuffer(frequency, timeInSeconds, Ltone);
    source.connect(audioContext.destination);
    vm.isPlaying = true;
    source.start();
    $timeout(function() {
      vm.isPlaying = false;
    }, timeInSeconds*1000);
  }

  /**
   * Private function, called by playTone to generate an audio buffer
   * @return {object} - audio buffer
   */
  function generateBuffer(frequency, timeInSeconds, Ltone) {
    var channels = 2,
        sampleRate = audioContext.sampleRate,
        bufferLength = sampleRate * timeInSeconds,
        audioBuffer = audioContext.createBuffer(channels, bufferLength, sampleRate);

    for (var ch = 0; ch < channels; ch++) {
      var nowBuffering = audioBuffer.getChannelData(ch);
      for (var i = 0; i < bufferLength; i++) {
        nowBuffering[i] = calculateToneAtIndex(i, sampleRate, frequency, Ltone);
      }
    }

    return audioBuffer;
  }

  /**
   * Private function, calculates value at index i of a buffer
   * @return {number} - tone value at index i
   */
  function calculateToneAtIndex(i, sampleRate, frequency, Ltone){
    return 0.05*Math.pow(10,(Ltone-80)/20)*Math.sqrt(2)*Math.sin(2*Math.PI*frequency*(i/sampleRate));
  }

}