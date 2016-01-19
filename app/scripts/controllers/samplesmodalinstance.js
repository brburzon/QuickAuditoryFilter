(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name appApp.controller:SampleModalInstanceCtrl
     * @description
     * # SampleModalInstanceCtrl
     * Controller of the appApp
     */
    angular.module('appApp')
        .controller('SamplesModalInstanceCtrl', SamplesModalInstanceCtrl);

    /** @ngInject */
    function SamplesModalInstanceCtrl($http, $uibModalInstance, sampleExercises) {
        var vm = this;

        vm.loadSample = loadSample;
        vm.dismiss = dismiss;
        vm.highlightSelectedSample = highlightSelectedSample;
        vm.highlighted = null;
        vm.sampleExercises = sampleExercises;

        function highlightSelectedSample(selected) {
            if(vm.highlighted === selected) {
                vm.highlighted = null;
            } else {
                vm.highlighted = selected;
            }
        }

        function loadSample() {
            if(isHighlightedNull()) {
                dismiss();
            } else {
                var exercise = {},
                    signalFiles = [],
                    noSignalFiles = [];

                angular.forEach(vm.highlighted.signal, collectNameAndBuffer, signalFiles);
                angular.forEach(vm.highlighted.noSignal, collectNameAndBuffer, noSignalFiles);
                exercise.signal = signalFiles;
                exercise.noSignal = noSignalFiles;

                $uibModalInstance.close(exercise);
            }
        }

        function isHighlightedNull() {
            return vm.highlighted === null;
        }

        function collectNameAndBuffer(file) {
            this.push($http.get(file.url, { responseType: 'arraybuffer' })
                      .then(success, reject));

            function success(response) {
                var metadata = {};
                metadata.name = file.name;
                metadata.arrayBuffer = response.data;
                return metadata;
            }

            function reject(e) {
                throw 'Error with retrieving the file ' + e.err;
            }
        }

        function dismiss() {
            $uibModalInstance.dismiss('cancel');
        }
    }

}());
