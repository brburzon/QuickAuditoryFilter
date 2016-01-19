(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name appApp.directive:fileReader
     * @description
     * # fileReader
     */
    angular
        .module('appApp')
        .directive('fileReader', fileReader);

    function fileReader() {
        return {
            templateUrl: 'views/filereader.html',
            restrict: 'E',
            replace: true,
            scope: { upload: '&' },
            controller: 'FileReaderCtrl',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();
