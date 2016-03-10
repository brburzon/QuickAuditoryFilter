'use strict';

describe('Controller: CalibrationCtrl', function () {

  // load the controller's module
  beforeEach(module('qafApp'));

  var CalibrationCtrl,
      scope,
      webAudioContextFactory,
      audioContext;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    audioContext = jasmine.createSpyObj('AudioContext', ['createBuffer', 'createBufferSource']);
    webAudioContextFactory = jasmine.createSpyObj('webAudioContextFactory', ['getInstance']);
    webAudioContextFactory.getInstance.and.returnValue(audioContext);

    CalibrationCtrl = $controller('CalibrationCtrl', {
      $scope: scope,
      audioContext: audioContext,
      webAudioContextFactory: webAudioContextFactory
    });
  }));

  it('should set isCalibrating to true when the calibration starts', function() {
    CalibrationCtrl.calibrate();
    expect(CalibrationCtrl.isCalibrating).toBe(true);
  });

  it('should set isCalibrating to false when the calibration ends', function() {
    CalibrationCtrl.calibrate();
    CalibrationCtrl.endCalibration();
    expect(CalibrationCtrl.isCalibrating).toBe(false);
  });

  it('should increase the levelThreshold by 5 when the user clicks No', function() {
    CalibrationCtrl.levelThreshold = 30;
    CalibrationCtrl.iterateCalibration('no');
    expect(CalibrationCtrl.levelThreshold).toEqual(35);
  });

  it('should decrease the levelThreshold by 10 when the user clicks Yes', function() {
    CalibrationCtrl.levelThreshold = 30;
    CalibrationCtrl.iterateCalibration('yes');
    expect(CalibrationCtrl.levelThreshold).toEqual(20);
  });

  it('should end the calibration if the levelThreshold is greater than 60', function() {
    CalibrationCtrl.calibrate();
    CalibrationCtrl.levelThreshold = 61;
    CalibrationCtrl.iterateCalibration('foo');
    expect(CalibrationCtrl.isCalibrating).toBe(false);
  });

  it('should end the calibration once a level has been heard 3 times', function() {
    CalibrationCtrl.calibrate();
    for (var i = 0; i < 3; i++) {
      CalibrationCtrl.levelThreshold = 40;
      CalibrationCtrl.iterateCalibration('yes');
    }
    expect(CalibrationCtrl.isCalibrating).toBe(false);
  });

});