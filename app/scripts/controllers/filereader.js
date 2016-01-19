(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name appApp.controller:FileReaderCtrl
     * @description
     * # FileReaderCtrl
     * Controller of the appApp
     */
    angular.module('appApp')
        .controller('FileReaderCtrl', FileReaderCtrl);


    /** @ngInject */
    function FileReaderCtrl($scope, Upload) {
        var vm = this;
        vm.uploadFiles = uploadFiles;

        function uploadFiles(files) {
            if(!files) return;
            for(var i = 0; i < files.length; i++) {
                readFile(files[i]);
            }
        }

        function readFile(file) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = onloadListener;

            function onloadListener(loadEvent) {
                $scope.$digest(function () {
                    var fileData = {
                        name: file.name,
                        arrayBuffer: loadEvent.target.result
                    };

                    vm.upload({file: fileData});
                });
            }
        }
    }

}());
