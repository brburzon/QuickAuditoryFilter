'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:calibration
 * @description
 * # calibration
 */
angular.module('appApp')
  .directive('calibration', calibration);

function calibration() {
  return {
    templateUrl: 'views/calibration.html',
    scope: {},
    restrict: 'E',
    transclude: true,
    replace: true,
    controller: 'CalibrationCtrl',
    controllerAs: 'vm',
    bindToController: true
  };
}