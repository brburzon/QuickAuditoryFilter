'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SetupCtrl
 * @description
 * # SetupCtrl
 * Controller of the appApp
 */
angular.module('appApp')
    .controller('SetupCtrl', SetupCtrl);

function SetupCtrl($scope, $location, $window, snrSuplier) {
    var vm = this;

    vm.snrList = snrSuplier.getSnrList();
    vm.addSnr = snrSuplier.addSnr;
    vm.removeSnrByIndex = snrSuplier.removeSnrByIndex;
    vm.reset = reset;
    vm.save = save;
    vm.nreps = 4;

    $scope.$watchCollection(function() {
        return snrSuplier.getSnrList();
    }, function(values) {
        if(values !== [])
            vm.snrList = values;
    });

    function reset() {
        vm.nreps = 4;
        snrSuplier.resetAll();
    }

    function save() {
        try {
            snrSuplier.prepSnr(vm.nreps);
            $location.path('/exercise');
        } catch(invalidUserSetupError) {
            $window.alert(invalidUserSetupError);
        }
    }
}
