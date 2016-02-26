(function () {

    'use strict';

    /**
     * @ngdoc directive
     * @name appApp.directive:calibration
     * @description
     * # calibration
     * Calibrates the user machine's volume before the experiment starts.
     */
    angular.module('qafApp')
        .directive('calibration', calibration);

    /** @ngInject */
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

}());
