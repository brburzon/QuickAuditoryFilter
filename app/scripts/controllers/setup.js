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

function SetupCtrl($scope, $location, $window, audioFilesCollector) {
    var vm = this;

    vm.addSignalFile = audioFilesCollector.addSignalFile;
    vm.addNoSignalFile = audioFilesCollector.addNoSignalFile;
    vm.signalFiles = audioFilesCollector.getSignalFiles();
    vm.noSignalFiles = audioFilesCollector.getNoSignalFiles();
    vm.removeSignalByIndex = audioFilesCollector.removeSignalFileByIndex;
    vm.removeNoSignalByIndex = audioFilesCollector.removeNoSignalFileByIndex;
    vm.clearList = audioFilesCollector.resetAll;
    vm.reset = reset;
    vm.save = save;
    vm.nreps = 4;

    $scope.$watchCollection(function() {
        return audioFilesCollector.getSignalFiles();
    }, function(values) {
        if(values !== [])
            vm.signalFiles = values;
    });

    $scope.$watchCollection(function() {
        return audioFilesCollector.getNoSignalFiles();
    }, function(values) {
        if(values !== [])
            vm.noSignalFiles = values;
    });

    function reset() {
        vm.nreps = 4;
        audioFilesCollector.resetAll();
    }
    
    function save() {
        audioFilesCollector.prepAudioData(vm.nreps)
            .then(function(data) {
                $location.path('/exercise');
            }, function(err) {
                $window.alert(err);
            });
    }
}
