(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name qafApp.controller:ResultCtrl
     * @description
     * # ResultCtrl
     * Controller of the qafApp
     */
    angular
        .module('qafApp')
        .controller('ResultCtrl', ResultCtrl);

    /** @ngInject */
    function ResultCtrl($scope, $location, resultRecorder, snrSuplier) {
        var records = resultRecorder.getRecords();

        var vm = this;

        vm.exportAction = 'excel';
        vm.exportTable = exportTable;
        vm.getRecords = getRecords;
        vm.reset = reset;

        function exportTable() {
            switch(vm.exportAction){
            case 'pdf':
                $scope.$broadcast('export-pdf');
                break;
            case 'excel':
                $scope.$broadcast('export-excel');
                break;
            case 'doc':
                $scope.$broadcast('export-doc');
                break;
            case 'csv':
                $scope.$broadcast('export-csv');
                break;
            }
        }

        function getRecords() {
            return records;
        }

        function reset() {
            snrSuplier.resetAll();
            location.reload();
            $location.path('/');
        }
    }
})();
