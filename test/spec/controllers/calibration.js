'use strict';

describe('Controller: CalibrationCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CalibrationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalibrationCtrl = $controller('CalibrationCtrl', {
      $scope: scope
      // place here mocked dependencies
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

  it('should increase the gainValue by adjusterValue when the user clicks No', function() {
    CalibrationCtrl.gainValue = 0.5;
    CalibrationCtrl.iterateCalibration('no');
    expect(CalibrationCtrl.gainValue).toEqual(0.75);
  });

  it('should decrease the gainValue by adjusterValue when the user clicks Yes', function() {
    CalibrationCtrl.gainValue = 0.5;
    CalibrationCtrl.iterateCalibration('yes');
    expect(CalibrationCtrl.gainValue).toEqual(0.25);
  });

});