(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:SetupCtrl
     * @description
     * # SetupCtrl
     * Responsible for allowing the user to set the signal level, frequency,
     * number of rounds, and calibrate the user's volume control prior to the
     * exercise.
     */
    angular.module('qafApp')
        .controller('SetupCtrl', SetupCtrl);

    /** @ngInject */
    function SetupCtrl($location, userConfig) {
        var vm = this;

        vm.levelOptions      = [
            { id: 1, value: 20, name: "20 dBSPL" },
            { id: 2, value: 30, name: "30 dBSPL" },
            { id: 3, value: 40, name: "40 dBSPL" },
            { id: 4, value: 50, name: "50 dBSPL" },
            { id: 5, value: 60, name: "60 dBSPL" },
            { id: 6, value: 70, name: "70 dBSPL" }
        ];

        vm.frequencyOptions  = [
            { id: 1, value: 500, name: "500 Hz" },
            { id: 2, value: 630, name: "630 Hz" },
            { id: 3, value: 800, name: "800 Hz" },
            { id: 4, value: 1000, name: "1000 Hz" },
            { id: 5, value: 1250, name: "1250 Hz" },
            { id: 6, value: 1600, name: "1600 Hz" },
            { id: 7, value: 2000, name: "2000 Hz" },
            { id: 8, value: 2500, name: "2500 Hz" },
            { id: 9, value: 3200, name: "3200 Hz" },
            { id: 10, value: 4000, name: "4000 Hz" }
        ];

        vm.nTrialOptions     = [
            { id: 1, value: 4, name: "4" },
            { id: 2, value: 50, name: "50" },
            { id: 3, value: 100, name: "100" },
            { id: 4, value: 150, name: "150" },
            { id: 5, value: 200, name: "200" }
        ];

        vm.levelSelected     = vm.levelOptions[0];
        vm.frequencySelected = vm.frequencyOptions[0];
        vm.nTrialSelected    = vm.nTrialOptions[0];
        vm.calibrate         = calibrate;
        vm.start             = start;

        /**
         * Saves the configuration and proceeds with the exercise.
         */
        function start() {
            userConfig.saveConfig(vm.levelSelected.value,
                                  vm.frequencySelected.value,
                                  vm.nTrialSelected.value);
            $location.path('/exercise');
        }

        /**
         * Opens up the calibration modal.
         */
        function calibrate() {
            // TODO implement after the creating the calibration modal
        }
    }

}());
