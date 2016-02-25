(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:SetupCtrl
     * @description
     * # SetupCtrl
     * Controller of the qafApp
     */
    angular.module('qafApp')
        .controller('SetupCtrl', SetupCtrl);

    /** @ngInject */
    function SetupCtrl($scope, $location, $window, userConfig) {
        var vm = this;

        vm.level     = 1;
        vm.frequency = 1000;
        vm.reset     = reset;
        vm.save      = save;
        vm.nreps     = 4;


        /**
         * Saves the configuration and changes the view.
         * @throws invalidUserSetupError - if level or frequency was invalid
         */
        function save() {
            try {
                userConfig.saveConfig(vm.level, vm.frequency);
                $location.path('/exercise');
            } catch(invalidUserSetupError) {
                $window.alert(invalidUserSetupError);
            }
        }

        /**
         * Resets all the signal and frequency values back to their default values.
         */
        function reset() {
            vm.level = 1;
            vm.frequency = 1000;
        }
    }

}());
