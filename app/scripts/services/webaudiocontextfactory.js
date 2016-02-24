'use strict';

/**
 * @ngdoc service
 * @name qafApp.webAudioContextFactory
 * @description
 * # webAudioContextFactory
 * Factory in the qafApp.
 */
angular.module('qafApp')
  .factory('webAudioContextFactory', webAudioContextFactory);

function webAudioContextFactory($window) {
  var audioContext;

  var service = {
    getInstance: getInstance
  };

  return service;

  ///////////////

  /**
   * Initializes and returns the audio context. If the audio context 
   * already exist then it simply returns it.
   * 
   * @return {Object} Audio Context from the Web Audio API
   */
  function getInstance() {
    if(!audioContext) {
      audioContext = unlockAudioContext();
    }
    return audioContext;
  }

  /**
   * In IOS, the first audio must be a result of the user interaction.
   * This is a workaround to allow audio to be played in IOS devices.
   * This will play a silent tone when user interacts with the app.
   */
  function unlockAudioContext() {
    var context; 
    try {
      var getAudioContext = $window.AudioContext || $window.webkitAudioContext;
      context = new getAudioContext();
    } 
    catch (err) {
      $window.alert("Your browser does not suppor WebAudio API. Update your browser" +
                    " or use the latest verion of Chrome, Safari, or Firefox.");
    }
    var oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 0; // value in hertz
    oscillator.connect(context.destination);
    oscillator.start(0);
    oscillator.stop(0);
    return context;
  }
}
