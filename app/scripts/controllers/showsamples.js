(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name appApp.controller:ShowSamplesCtrl
     * @description
     * # ShowSamplesCtrl
     * Controller of the appApp
     */
    angular
        .module('appApp')
        .controller('ShowSamplesCtrl', ShowSamplesCtrl);

    /** @ngInject */
    function ShowSamplesCtrl($uibModal, sampleFilesDataAccess) {
        var vm = this;
        vm.showSamplesOption = showSamplesOption;

        function showSamplesOption() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'showsamplesmodal.html',
                controller: 'SamplesModalInstanceCtrl',
                controllerAs: 'vm',
                bindToController: true,
                resolve: {
                    sampleExercises: function () {
                        return sampleFilesDataAccess.getSamples().$promise;
                    }
                }
            });

            modalInstance.result.then(onSelected);
        }

        function onSelected(experiment) {
            if(!experiment) return;
            vm.reset();
            addSignalFiles(experiment.signal);
            addNoSignalFiles(experiment.noSignal);
        }

        function addSignalFiles(files) {
            if(!files) return;
            for(var i = 0; i < files.length; i++) {
                files[i].then(function(file) {
                    vm.addSignal({ file: file });
                });
            }
        }

        function addNoSignalFiles(files) {
            if(!files) return;
            for(var i = 0; i < files.length; i++) {
                files[i].then(function(file) {
                    vm.addNoSignal({ file: file });
                });
            }
        }
    }
}());
